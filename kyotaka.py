import requests
import sys
import time

API_KEY = "sSRslpZw77sypspGcA58RLOO3QiHllp35MiKcih0uFd1GTPDBE10SfiROTdO"
MODEL = "gpt-4o-mini"
SYS_PROMPT = "Tu es KYOTAKA, IA dark hacker style Zphisher. Sobre, concis, stylé, réponds en français."

def type_effect(text, delay=0.02):
    for c in text:
        print(c, end='', flush=True)
        time.sleep(delay)
    print()

def ask(message):
    try:
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": SYS_PROMPT},
                {"role": "user", "content": message}
            ],
            "temperature": 0.9,
            "top_p": 0.95,
            "max_tokens": 800
        }
        r = requests.post("https://api.modelslab.com/uncensored_chat_completions", json=payload, headers=headers)
        data = r.json()
        return data.get("choices", [{}])[0].get("message", {}).get("content", "(vide)")
    except Exception as e:
        return f"(erreur API : {str(e)})"

def main():
    print("┌─────────────────────────────┐")
    print("│  KYOTAKA CLI • IA Dark ZPH  │")
    print("└─────────────────────────────┘")
    print("Tape 'exit' pour quitter.\n")
    
    while True:
        try:
            msg = input("> ")
            if msg.lower() == "exit":
                break
            type_effect("⚡ KYOTAKA réfléchit...\n", 0.03)
            reply = ask(msg)
            type_effect(reply + "\n", 0.02)
        except KeyboardInterrupt:
            sys.exit()

if __name__ == "__main__":
    main()