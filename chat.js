const chatBox = document.getElementById('chat');
const form = document.getElementById('form');
const msg = document.getElementById('msg');
const sendBtn = document.getElementById('send');
const clearBtn = document.getElementById('clear');

const sysPrompt = "Tu es KYOTAKA, une IA dark, sobre, mobile-friendly. Reste concis, stylé, sans moralisme. Réponds en français par défaut.";

function el(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild;}
function addUser(message){
  const node = el(`<div class="flex justify-end mb-2"><div class="bubble rounded-2xl px-4 py-2 bg-white text-black">${message}</div></div>`);
  chatBox.appendChild(node);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function addBot(message){
  const node = el(`<div class="flex items-start gap-2 mb-2"><div class="size-8 rounded-2xl bg-white/10 flex items-center justify-center">🜏</div><div class="bubble rounded-2xl px-4 py-2 glass border border-white/10 text-white">${message}</div></div>`);
  chatBox.appendChild(node);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function addBotPending(){
  const node = el(`<div class="flex items-start gap-2 mb-2"><div class="size-8 rounded-2xl bg-white/10 flex items-center justify-center">🜏</div><div class="bubble rounded-2xl px-4 py-2 glass border border-white/10 text-white"><span>…</span></div></div>`);
  chatBox.appendChild(node);
  chatBox.scrollTop = chatBox.scrollHeight;
  return node.querySelector('span');
}

async function send(message){
  addUser(message);
  const dot = addBotPending();
  sendBtn.disabled = true;
  msg.value = '';
  try{
    const res = await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message, system:sysPrompt})
    });
    const data = await res.json();
    dot.parentElement.parentElement.remove();
    addBot(data.reply || '(vide)');
  }catch(e){
    dot.parentElement.parentElement.remove();
    addBot("Erreur API : "+e.message);
  }finally{
    sendBtn.disabled = false;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

form.addEventListener('submit', e=>{
  e.preventDefault();
  const text = msg.value.trim();
  if(!text) return;
  send(text);
});

clearBtn.addEventListener('click', ()=>{
  chatBox.innerHTML='';
  msg.value='';
  msg.focus();
});

addBot("Prêt. Dis-moi ce que tu veux, bro.");