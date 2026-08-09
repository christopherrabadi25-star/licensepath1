"use client";

import { useEffect, useRef } from "react";

/**
 * A generated golden-hour view of the San Gabriel ridgeline — the horizon of the
 * founders' actual market (San Gabriel Valley, Inland Empire, LA, OC).
 *
 * Rendered once, statically. The cinematic quality here comes from composition and
 * light, not motion: perpetual animation is what makes a hero read as templated.
 * The only movement on the page is the one-time title-card reveal in CSS.
 *
 * Deterministic — a fixed seed means the scene is composed, not re-randomized on
 * every load into something we never reviewed.
 */

/** mulberry32 — small, fast, seedable. */
function makeRng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Midpoint-displacement ridgeline. Real mountains are self-similar at every
 * scale, which is why a sine wave reads as fake and this reads as terrain.
 */
function makeRidge(rand: () => number, width: number, roughness: number): number[] {
  let pts = [rand() * 0.4 + 0.3, rand() * 0.4 + 0.3];
  let displacement = roughness;
  while (pts.length < width) {
    const next: number[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      next.push(pts[i]);
      next.push((pts[i] + pts[i + 1]) / 2 + (rand() - 0.5) * displacement);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
    displacement *= 0.5;
  }
  return pts;
}

export function CaliforniaHorizon() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // The horizon sits low — a widescreen establishing shot gives most of the
      // frame to sky, which is where the light lives.
      const horizon = h * 0.79;
      const sunX = w * 0.68;

      // --- Sky ---------------------------------------------------------------
      // The band near the horizon has to be genuinely luminous. Silhouettes only
      // read against bright ground, and the ridgeline and palms below are all
      // silhouette — an evenly dark sky would erase the entire composition.
      const sky = ctx.createLinearGradient(0, 0, 0, horizon);
      sky.addColorStop(0, "#08111E");
      sky.addColorStop(0.34, "#152941");
      sky.addColorStop(0.58, "#3B4257");
      sky.addColorStop(0.76, "#8A5F53");
      sky.addColorStop(0.9, "#CE8149");
      sky.addColorStop(1, "#F0AC62");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, horizon);

      // --- Sun bloom just above the ridge ------------------------------------
      const bloom = ctx.createRadialGradient(sunX, horizon, 0, sunX, horizon, h * 0.55);
      bloom.addColorStop(0, "rgba(255,201,124,0.85)");
      bloom.addColorStop(0.18, "rgba(233,163,90,0.5)");
      bloom.addColorStop(0.45, "rgba(201,169,110,0.18)");
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, horizon + 2);

      // --- Stars, only in the upper third where the sky is still dark ---------
      const starRand = makeRng(20260809);
      for (let i = 0; i < 90; i++) {
        const sx = starRand() * w;
        const sy = starRand() * h * 0.4;
        const fade = 1 - sy / (h * 0.4);
        ctx.fillStyle = `rgba(244,239,230,${(starRand() * 0.4 + 0.1) * fade})`;
        ctx.fillRect(sx, sy, 1.1, 1.1);
      }

      // --- Ridgelines, back to front ------------------------------------------
      // Atmospheric perspective: distant ranges are lighter and hazier because
      // more air sits between them and the viewer.
      const ranges = [
        { seed: 7741, amp: 0.34, base: 0.34, color: "#4A5065", rough: 0.85 },
        { seed: 1553, amp: 0.28, base: 0.23, color: "#2C3243", rough: 0.95 },
        { seed: 9012, amp: 0.24, base: 0.12, color: "#141A26", rough: 1.05 },
      ];

      for (const range of ranges) {
        const rand = makeRng(range.seed);
        const pts = makeRidge(rand, 129, range.rough);
        ctx.beginPath();
        ctx.moveTo(0, horizon);
        for (let i = 0; i < pts.length; i++) {
          const x = (i / (pts.length - 1)) * w;
          const y = horizon - (range.base + pts[i] * range.amp) * h * 0.42;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, horizon);
        ctx.closePath();
        ctx.fillStyle = range.color;
        ctx.fill();
      }

      // --- Valley floor --------------------------------------------------------
      const ground = ctx.createLinearGradient(0, horizon, 0, h);
      ground.addColorStop(0, "#0E1722");
      ground.addColorStop(1, "#060F1A");
      ctx.fillStyle = ground;
      ctx.fillRect(0, horizon, w, h - horizon);

      // A hairline where land meets sky, catching the last of the light.
      ctx.fillStyle = "rgba(217,132,63,0.5)";
      ctx.fillRect(0, horizon - 0.5, w, 1);

      // --- Window lights across the valley ------------------------------------
      // The reason this reads as inhabited rather than as a landscape: the homes
      // are the subject of this business.
      const lightRand = makeRng(4432);
      const rows = 9;
      for (let r = 0; r < rows; r++) {
        const depth = r / rows;
        const y = horizon + 3 + depth * (h - horizon) * 0.95;
        const count = Math.round(w / (16 + depth * 30));
        for (let i = 0; i < count; i++) {
          if (lightRand() > 0.72 - depth * 0.2) continue;
          const x = lightRand() * w;
          const size = 1.1 + depth * 2.2;
          const alpha = (1 - depth * 0.45) * (lightRand() * 0.45 + 0.55);
          ctx.fillStyle = `rgba(240,190,120,${alpha})`;
          ctx.fillRect(x, y, size, size * 0.7);
        }
      }

      // --- Palm silhouettes ----------------------------------------------------
      // Unmistakably Southern California, and the one place in the composition
      // where a recognizable shape appears — so it stays a silhouette, not detail.
      // Foreground framing at the right edge, partially cropped — depth cue, not
      // subject. They sit on this side because a silhouette needs bright sky
      // behind it, and they stay small so they do not compete with the ridge.
      const palms = [
        { x: w * 0.9, height: h * 0.34, lean: -0.05, fronds: 8 },
        { x: w * 0.965, height: h * 0.25, lean: 0.06, fronds: 7 },
        { x: w * 1.02, height: h * 0.42, lean: 0.03, fronds: 8 },
      ];

      ctx.fillStyle = "#050B12";
      for (const palm of palms) {
        const baseY = h * 1.02;
        const topY = baseY - palm.height;
        const topX = palm.x + palm.lean * palm.height;

        // Trunk, tapered — thicker at the base, as a real trunk is.
        const baseW = Math.max(3.5, palm.height * 0.022);
        const topW = baseW * 0.5;
        const bendX = palm.x + palm.lean * palm.height * 0.3;
        const bendY = baseY - palm.height * 0.55;
        ctx.beginPath();
        ctx.moveTo(palm.x - baseW, baseY);
        ctx.quadraticCurveTo(bendX - topW, bendY, topX - topW, topY);
        ctx.lineTo(topX + topW, topY);
        ctx.quadraticCurveTo(bendX + topW, bendY, palm.x + baseW, baseY);
        ctx.closePath();
        ctx.fill();

        // Fronds, drawn as filled tapered blades rather than hairlines: they
        // leave the crown rising, then droop under their own weight. Strokes
        // read as a spider; filled blades read as a palm.
        const spread = Math.PI * 1.22;
        const start = Math.PI - (spread - Math.PI) / 2;
        const frondRand = makeRng(Math.round(palm.x) + 313);
        for (let f = 0; f < palm.fronds; f++) {
          const t = palm.fronds === 1 ? 0.5 : f / (palm.fronds - 1);
          const angle = start + spread * t;
          // Outer fronds hang longer and droop harder than the crown fronds; the
          // jitter keeps the crown from reading as a mechanical fan.
          const edge = Math.abs(t - 0.5) * 2;
          const len = palm.height * (0.23 + edge * 0.07) * (0.86 + frondRand() * 0.28);
          const droop = len * (0.3 + edge * 0.85);
          const width = Math.max(2.6, palm.height * 0.026) * (1 - edge * 0.3);

          const tipX = topX + Math.cos(angle) * len;
          const tipY = topY + Math.sin(angle) * len * 0.62 + droop;
          // Control sits high and outward, producing the arch before the fall.
          const ctrlX = topX + Math.cos(angle) * len * 0.52;
          const ctrlY = topY + Math.sin(angle) * len * 0.78;

          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.quadraticCurveTo(ctrlX, ctrlY - width, tipX, tipY);
          ctx.quadraticCurveTo(ctrlX, ctrlY + width, topX, topY);
          ctx.closePath();
          ctx.fill();
        }

        // Crown knot where the fronds meet — small, but it is what stops the
        // fan from looking like it is floating above the trunk.
        ctx.beginPath();
        ctx.ellipse(topX, topY, topW * 2.1, topW * 1.7, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Grade the frame -----------------------------------------------------
      // The type sits in the left half, so the scrim runs left-to-right rather
      // than top-down. A top-down scrim would buy legibility by flattening the
      // sunset — which is the only reason this image exists.
      const scrim = ctx.createLinearGradient(0, 0, w, 0);
      scrim.addColorStop(0, "rgba(6,15,26,0.92)");
      scrim.addColorStop(0.3, "rgba(6,15,26,0.72)");
      scrim.addColorStop(0.58, "rgba(6,15,26,0.26)");
      scrim.addColorStop(1, "rgba(6,15,26,0)");
      ctx.fillStyle = scrim;
      ctx.fillRect(0, 0, w, h);

      // Just enough top wash to seat the sticky header, and a soft floor so the
      // survey strip reads against the valley.
      const topWash = ctx.createLinearGradient(0, 0, 0, h * 0.3);
      topWash.addColorStop(0, "rgba(6,15,26,0.7)");
      topWash.addColorStop(1, "rgba(6,15,26,0)");
      ctx.fillStyle = topWash;
      ctx.fillRect(0, 0, w, h * 0.3);

      const floor = ctx.createLinearGradient(0, h * 0.82, 0, h);
      floor.addColorStop(0, "rgba(6,15,26,0)");
      floor.addColorStop(1, "rgba(6,15,26,0.72)");
      ctx.fillStyle = floor;
      ctx.fillRect(0, h * 0.82, w, h * 0.18);
    };

    draw();

    // Redraw on resize so the composition reflows rather than stretching.
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={ref} className="horizon-canvas" aria-hidden="true" />;
}
