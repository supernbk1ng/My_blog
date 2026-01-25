export const prerender = false;

export const GET = async () => {
  const clientId = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const secret = import.meta.env.KEYSTATIC_SECRET || process.env.KEYSTATIC_SECRET;

  return new Response(JSON.stringify({
    status: 'debug',
    hasClientId: !!clientId,
    clientIdLength: clientId ? clientId.length : 0,
    clientIdPreview: clientId ? `${clientId.substring(0, 4)}...` : 'N/A',
    hasClientSecret: !!clientSecret,
    clientSecretLength: clientSecret ? clientSecret.length : 0,
    hasSecret: !!secret,
    isProd: import.meta.env.PROD,
    nodeEnv: process.env.NODE_ENV
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
