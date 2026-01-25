export const prerender = false;

export async function GET() {
  const clientId = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const secret = import.meta.env.KEYSTATIC_SECRET || process.env.KEYSTATIC_SECRET;

  return new Response(JSON.stringify({
    clientId: clientId ? `Present (Length: ${clientId.length})` : 'Missing',
    clientSecret: clientSecret ? `Present (Length: ${clientSecret.length})` : 'Missing',
    secret: secret ? `Present (Length: ${secret.length})` : 'Missing',
    mode: import.meta.env.MODE,
    prod: import.meta.env.PROD,
    timestamp: new Date().toISOString()
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}
