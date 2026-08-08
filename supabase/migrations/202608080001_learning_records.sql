-- LicensePath learning-record foundation. Review before applying to Supabase.
create extension if not exists pgcrypto;
create type public.enrollment_status as enum ('active', 'completed', 'suspended', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'student' check (role in ('student', 'admin', 'instructor', 'proctor')),
  full_name text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.enrollments (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete restrict,
  course_slug text not null check (course_slug in ('principles', 'practice', 'legal-aspects')),
  status public.enrollment_status not null default 'active', enrolled_at timestamptz not null default now(),
  earliest_final_exam_at timestamptz not null, completed_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique (user_id, course_slug)
);
create table public.seat_time_sessions (
  id uuid primary key default gen_random_uuid(), enrollment_id uuid not null references public.enrollments(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict, unit_number smallint not null check (unit_number between 1 and 99),
  device_id uuid not null, started_at timestamptz not null default now(), last_seen_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '90 seconds', total_seconds integer not null default 0 check (total_seconds >= 0),
  closed_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index seat_time_one_open_session_per_device on public.seat_time_sessions(enrollment_id, unit_number, device_id) where closed_at is null;
create index seat_time_sessions_enrollment_idx on public.seat_time_sessions(enrollment_id, last_seen_at desc);
create table public.seat_time_logs (
  id uuid primary key default gen_random_uuid(), session_id uuid not null references public.seat_time_sessions(id) on delete restrict,
  enrollment_id uuid not null references public.enrollments(id) on delete restrict, user_id uuid not null references auth.users(id) on delete restrict,
  unit_number smallint not null check (unit_number between 1 and 99), started_at timestamptz not null, ended_at timestamptz not null,
  credited_seconds smallint not null check (credited_seconds between 1 and 60),
  reason text not null default 'heartbeat' check (reason in ('heartbeat', 'admin-adjustment')),
  created_at timestamptz not null default now(), check (ended_at >= started_at)
);
create index seat_time_logs_enrollment_idx on public.seat_time_logs(enrollment_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.enrollments enable row level security;
alter table public.seat_time_sessions enable row level security;
alter table public.seat_time_logs enable row level security;
create policy "profiles: read own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "enrollments: read own" on public.enrollments for select to authenticated using ((select auth.uid()) = user_id);
create policy "seat sessions: read own" on public.seat_time_sessions for select to authenticated using ((select auth.uid()) = user_id);
create policy "seat logs: read own" on public.seat_time_logs for select to authenticated using ((select auth.uid()) = user_id);

-- The only student-facing write path; duration comes from the database clock.
create or replace function public.record_learning_heartbeat(p_enrollment_id uuid, p_unit_number smallint, p_device_id uuid)
returns table (credited_seconds integer, total_seconds integer, state text)
language plpgsql security definer set search_path = public as $$
declare v_user_id uuid := auth.uid(); v_now timestamptz := now(); v_session public.seat_time_sessions%rowtype; v_elapsed integer := 0; v_credit integer := 0;
begin
  if v_user_id is null then raise exception 'authentication required'; end if;
  perform 1 from public.enrollments where id = p_enrollment_id and user_id = v_user_id and status = 'active';
  if not found then raise exception 'active enrollment not found'; end if;
  select * into v_session from public.seat_time_sessions where enrollment_id = p_enrollment_id and unit_number = p_unit_number and device_id = p_device_id and closed_at is null order by created_at desc limit 1 for update;
  if not found then
    insert into public.seat_time_sessions (enrollment_id, user_id, unit_number, device_id) values (p_enrollment_id, v_user_id, p_unit_number, p_device_id) returning * into v_session;
  else
    v_elapsed := floor(extract(epoch from (v_now - v_session.last_seen_at)))::integer;
    if v_elapsed between 1 and 90 then v_credit := least(v_elapsed, 60); end if;
    update public.seat_time_sessions set last_seen_at = v_now, expires_at = v_now + interval '90 seconds', total_seconds = total_seconds + v_credit, updated_at = v_now where id = v_session.id returning * into v_session;
  end if;
  if v_credit > 0 then
    insert into public.seat_time_logs (session_id, enrollment_id, user_id, unit_number, started_at, ended_at, credited_seconds)
    values (v_session.id, p_enrollment_id, v_user_id, p_unit_number, v_now - make_interval(secs => v_credit), v_now, v_credit);
  end if;
  return query select v_credit, v_session.total_seconds, case when v_credit > 0 then 'active' else 'connected' end;
end; $$;
revoke all on function public.record_learning_heartbeat(uuid, smallint, uuid) from public;
grant execute on function public.record_learning_heartbeat(uuid, smallint, uuid) to authenticated;
