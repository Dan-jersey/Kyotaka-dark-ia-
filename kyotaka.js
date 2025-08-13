import fetch from 'node-fetch';
import readlineSync from 'readline-sync';
import chalk from 'chalk';

const sysPrompt = "Tu es KYOTAKA, IA dark hacker style Zphisher. Sobre, concis, stylé, réponds en français.";
const API_KEY = 'sSRslpZw77sypspGcA58RLOO3QiHllp35MiKcih0uFd1GTPDBE10SfiROTdO';
const MODEL = 'gpt-4o-mini';

async function ask(message) {
  try {
    const r = await fetch('https://api.modelslab.com/uncensored_chat_completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: sysPrompt },
          { role: 'user', content: message },
        ],
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 800,
      }),
    });
    const data = await r.json();
    return data?.choices?.[0]?.message?.content || '(vide)';
  } catch (e) {
    return `(erreur API : ${e.message})`;
  }
}

function typeEffect(text, color = chalk.green, delay = 15) {
  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      process.stdout.write(color(text[i] || ''));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        process.stdout.write('\n');
        resolve();
      }
    }, delay);
  });
}

console.clear();
console.log(chalk.cyan.bold("┌─────────────────────────────┐"));
console.log(chalk.cyan.bold("│  KYOTAKA CLI • IA Dark ZPH  │"));
console.log(chalk.cyan.bold("└─────────────────────────────┘"));
console.log(chalk.gray("Tape 'exit' pour quitter.\n"));

(async () => {
  while (true) {
    const input = readlineSync.question(chalk.yellow('> '));
    if (input.toLowerCase() === 'exit') break;
    await typeEffect("⚡ KYOTAKA réfléchit...\n", chalk.magenta, 30);
    const reply = await ask(input);
    await typeEffect(reply + '\n', chalk.green, 15);
  }
})();