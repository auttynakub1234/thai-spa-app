/** GET /api/services
 *  Returns list of all services from D1.
 */
export async function onRequestGet({ request, env }: { request: Request; env: Env }) {
  try {
    const result = await env.DB.prepare('SELECT * FROM services ORDER BY id').all();
    return new Response(JSON.stringify(result.results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
