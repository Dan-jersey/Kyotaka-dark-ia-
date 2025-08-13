import fetch from 'node-fetch';
import readlineSync from 'readline-sync';

const sysPrompt = "Tu es KYOTAKA, une IA dark, sobre. Reste concis et stylé. Réponds en français.";

const API_KEY = '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';
const MODEL = 'nousresearch/nous-hermes-2-mixtral-8x7b-dpo';

async function ask(message) {
  const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: sysPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.9,
      top_p: 0.95,
      max_tokens: 800
    })
  });
  const data = await r.json();
  return data?.choices?.[0]?.message?.content || '(vide)';
}

(async ()=>{
  console.log("KYOTAKA CLI • IA Dark");
  console.log("Tape 'exit' pour quitter.\n");
  while(true){
    const input = readlineSync.question('> ');
    if(input.toLowerCase() === 'exit') break;
    const reply = await ask(input);
    console.log('Kyotaka:', reply, '\n');
  }
})();