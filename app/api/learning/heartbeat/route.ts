import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type HeartbeatBody = { enrollmentId?: unknown; unitNumber?: unknown; deviceId?: unknown };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Records activity without trusting browser-reported duration. */
export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Learning records are not configured." }, { status: 503 });

  let body: HeartbeatBody;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }

  const enrollmentId = typeof body.enrollmentId === "string" ? body.enrollmentId : "";
  const deviceId = typeof body.deviceId === "string" ? body.deviceId : "";
  const unitNumber = typeof body.unitNumber === "number" ? body.unitNumber : NaN;
  if (!UUID.test(enrollmentId) || !UUID.test(deviceId) || !Number.isInteger(unitNumber) || unitNumber < 1 || unitNumber > 99) {
    return NextResponse.json({ error: "Invalid learning session." }, { status: 400 });
  }

  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) return NextResponse.json({ error: "Sign in to record official learning time." }, { status: 401 });

  const { data, error } = await supabase.rpc("record_learning_heartbeat", {
    p_enrollment_id: enrollmentId, p_unit_number: unitNumber, p_device_id: deviceId,
  });
  if (error) return NextResponse.json({ error: "Unable to record learning activity." }, { status: 403 });

  const record = Array.isArray(data) ? data[0] : data;
  return NextResponse.json({
    creditedSeconds: Number(record?.credited_seconds ?? 0),
    totalSeconds: Number(record?.total_seconds ?? 0),
    state: String(record?.state ?? "active"),
  });
}
