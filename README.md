# Voetbal 501 🔴⚪

Het voetbal gezelschapsspel gebaseerd op darts 501.

---

## Online zetten in 5 stappen

### Stap 1 — Installeer Node.js
Download en installeer via: https://nodejs.org (kies "LTS" versie)

### Stap 2 — Pak de projectmap uit
Pak de gedownloade zip uit op je computer.

### Stap 3 — Installeer de app
Open Terminal (Mac) of Command Prompt (Windows), ga naar de map:
```
cd voetbal501
npm install
```

### Stap 4 — Zet op GitHub
1. Maak account op github.com
2. Maak nieuw repository aan (klik op "+")
3. Upload alle bestanden

### Stap 5 — Zet op Vercel
1. Maak account op vercel.com (log in met GitHub)
2. Klik "New Project" → kies jouw repository
3. Voeg environment variable toe:
   - Naam: `REACT_APP_GEMINI_API_KEY`
   - Waarde: jouw API key van aistudio.google.com
4. Klik "Deploy"

Je app staat nu online! Vercel geeft je een link zoals:
`https://voetbal501.vercel.app`

---

## Installeren als app op je telefoon

**Android:**
1. Ga naar de Vercel link in Chrome
2. Tik op de drie puntjes (menu)
3. Kies "Toevoegen aan startscherm"
4. De app staat nu op je homescreen!

**iPhone:**
1. Ga naar de Vercel link in Safari
2. Tik op het deel-icoon (vierkant met pijl)
3. Kies "Zet op beginscherm"

---

## Spelregels

- Begin op **501** punten
- Noem een speler die voor de gekozen club heeft gespeeld
- Het aantal wedstrijden van die speler gaat van je score af
- Maximaal **180 wedstrijden** per beurt (meer = ongeldig)
- Win door **exact te eindigen op 1–99** (een geldig shirtnummer)
- Eindig je onder 0 of op 0? Beurt gaat naar de tegenstander
