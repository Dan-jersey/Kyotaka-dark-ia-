export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, system } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message required' });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing OPENROUTER_API_KEY' });

  const model = process.env.OPENROUTER_MODEL || 'nousresearch/nous-hermes-2-mixtral-8x7b-dpo';

  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': req.headers['origin'] || 'http://localhost',
        'X-Title': 'Kyotaka IA Dark'
      },
      body: JSON.stringify({
        model,
        messages: [
          system ? { role: 'system', content: system } : null,
          { role: 'user', content: message }
        ].filter(Boolean),
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 800
      })
    });

    const payload = await r.json();
    if (!r.ok) {
      const detail = payload?.error || payload;
      return res.status(r.status).json({ error: 'openrouter_error', detail });
    }

    const reply = payload?.choices?.[0]?.message?.content || '';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'server_error', detail: String(err) });
  }
}