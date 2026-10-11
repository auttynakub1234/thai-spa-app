/** GET /api/slots?date=YYYY-MM-DD&therapistId=1&duration=60
 *  Returns free start‑time slots (30‑min granularity) for the given therapist & duration.
 */
export async function onRequestGet({ request, env }: { request: Request; env: Env }) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date');
  const therapistId = url.searchParams.get('therapistId');
  const durationParam = url.searchParams.get('duration');
  if (!date || !therapistId || !durationParam) {
    return new Response(JSON.stringify({ error: 'Missing query params' }), { status: 400 });
  }
  const duration = parseInt(durationParam, 10);

  // All possible start times (09:00‑20:00, step 30 min)
  const allSlots: string[] = [];
  for (let h = 9; h < 20; h++) {
    for (let m of [0, 30]) {
      allSlots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  // Fetch booked intervals for the day/therapist
  const booked = await env.DB.prepare(`
    SELECT start_time, end_time FROM bookings
    WHERE booking_date = ?
      AND therapist_id = ?
      AND status != 'cancelled'
  `).bind(date, therapistId).all();

  const busy = booked.results.map((r) => ({
    start: r.start_time as string,
    end: r.end_time as string,
  }));

  // Helper: convert HH:MM to minutes since 00:00
  const toMin = (t: string) => {
    const [hh, mm] = t.split(':').map(Number);
    return hh * 60 + mm;
  };
  const fromMin = (m: number) => {
    const hh = String(Math.floor(m / 60)).padStart(2, '0');
    const mm = String(m % 60).padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const free: string[] = [];
  for (const slot of allSlots) {
    const startMin = toMin(slot);
    const endMin = startMin + duration;
    let conflict = false;
    for (const b of busy) {
      if (startMin < toMin(b.end) && endMin > toMin(b.start)) {
        conflict = true;
        break;
      }
    }
    if (!conflict) free.push(slot);
  }

  return new Response(JSON.stringify({ free }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
