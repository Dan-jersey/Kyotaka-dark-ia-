import fetch from 'node-fetch';
import readlineSync from 'readline-sync';
import chalk from 'chalk';

const sysPrompt = "Tu es KYOTAKA, une IA dark, hacker style. Sobre, concis et stylé, réponds en français.";

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

console.clear();
console.log(chalk.green.bold("🜏 KYOTAKA CLI • IA Dark"));
console.log(chalk.gray("Mode hacker • mobile/termux friendly"));
console.log(chalk.gray("Tape 'exit' pour quitter.\n"));

(async ()=>{
  while(true){
    const input = readlineSync.question(chalk.cyan('> '));
    if(input.toLowerCase() === 'exit') break;
    
    console.log(chalk.yellowBright("⚡ KYOTAKA réfléchit..."));
    const reply = await ask(input);

    // effet hacker style, ligne par ligne
    reply.split('\n').forEach(line=>{
      console.log(chalk.green(line));
    });
    console.log('');
  }
})();