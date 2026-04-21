import { useState, useRef } from "react";

const EREDIVISIE = [
  { name: "Ajax", city: "Amsterdam", color: "cc0000" },
  { name: "PSV", city: "Eindhoven", color: "cc0000" },
  { name: "Feyenoord", city: "Rotterdam", color: "cc0000" },
  { name: "AZ", city: "Alkmaar", color: "cc0000" },
  { name: "FC Twente", city: "Enschede", color: "cc0000" },
  { name: "FC Utrecht", city: "Utrecht", color: "cc0000" },
  { name: "NEC", city: "Nijmegen", color: "006400" },
  { name: "SC Heerenveen", city: "Heerenveen", color: "003399" },
  { name: "FC Groningen", city: "Groningen", color: "006400" },
  { name: "Go Ahead Eagles", city: "Deventer", color: "cc9900" },
  { name: "Heracles Almelo", city: "Almelo", color: "333333" },
  { name: "NAC Breda", city: "Breda", color: "cc9900" },
  { name: "PEC Zwolle", city: "Zwolle", color: "003399" },
  { name: "Sparta Rotterdam", city: "Rotterdam", color: "cc0000" },
  { name: "Fortuna Sittard", city: "Sittard", color: "cc9900" },
  { name: "FC Volendam", city: "Volendam", color: "ff6600" },
  { name: "RKC Waalwijk", city: "Waalwijk", color: "cc9900" },
  { name: "Willem II", city: "Tilburg", color: "cc0000" },
];

const EERSTE_DIVISIE = [
  { name: "ADO Den Haag", city: "Den Haag", color: "006400" },
  { name: "Almere City", city: "Almere", color: "cc0000" },
  { name: "SC Cambuur", city: "Leeuwarden", color: "cc9900" },
  { name: "De Graafschap", city: "Doetinchem", color: "003399" },
  { name: "FC Den Bosch", city: "Den Bosch", color: "cc0000" },
  { name: "FC Dordrecht", city: "Dordrecht", color: "cc0000" },
  { name: "FC Eindhoven", city: "Eindhoven", color: "003399" },
  { name: "FC Emmen", city: "Emmen", color: "cc0000" },
  { name: "Excelsior", city: "Rotterdam", color: "cc0000" },
  { name: "Helmond Sport", city: "Helmond", color: "cc9900" },
  { name: "MVV Maastricht", city: "Maastricht", color: "cc0000" },
  { name: "Roda JC", city: "Kerkrade", color: "333333" },
  { name: "Telstar", city: "Velsen-Zuid", color: "333333" },
  { name: "TOP Oss", city: "Oss", color: "cc0000" },
  { name: "VVV-Venlo", city: "Venlo", color: "cc9900" },
  { name: "Vitesse", city: "Arnhem", color: "cc9900" },
  { name: "Jong Ajax", city: "Amsterdam", color: "cc0000" },
  { name: "Jong PSV", city: "Eindhoven", color: "cc0000" },
  { name: "Jong FC Utrecht", city: "Utrecht", color: "cc0000" },
  { name: "Jong AZ", city: "Alkmaar", color: "cc0000" },
];

const INITIAL_SCORE = 501;
const COLORS = ["#cc0000", "#0066cc", "#009933", "#ff9900"];

function ClubLogo({ color = "cc0000", name, size = 48 }) {
  const initials = name.replace(/^(FC |SC |NAC |PEC |RKC |ADO )/, "").substring(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `#${color}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 900, color: "#fff",
      flexShrink: 0, letterSpacing: -1, fontFamily: "system-ui, sans-serif"
    }}>
      {initials}
    </div>
  );
}

function RulesPopup({ onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, padding: 28, maxWidth: 420, width: "100%", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "#cc0000", margin: "-28px -28px 24px", padding: "18px 28px", borderRadius: "12px 12px 0 0", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>⚽</span>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: 1 }}>SPELREGELS</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2 }}>VOETBAL 501</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
          {[
            { icon: "🎯", title: "Doel", text: "Verlaag je score van 501 naar een getal tussen 1 en 99 (een geldig shirtnummer)." },
            { icon: "👤", title: "Speler noemen", text: "Noem een voetballer die voor de gekozen club heeft gespeeld. Het aantal wedstrijden gaat van je score af." },
            { icon: "📏", title: "Max 180", text: "Een speler met meer dan 180 wedstrijden is ongeldig. Beurt gaat naar de volgende speler." },
            { icon: "🚫", title: "Geen herhaling", text: "Elke speler mag maar één keer per potje gebruikt worden." },
            { icon: "💥", title: "Bust", text: "Ga je onder nul? Dan is je beurt ongeldig en gaat de beurt door." },
            { icon: "🏆", title: "Winnen", text: "Eindig exact op een getal van 1 t/m 99. Dat is jouw shirtnummer — jij wint!" },
          ].map((rule, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ fontSize: 18, flexShrink: 0, width: 28, textAlign: "center" }}>{rule.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{rule.title}</div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{rule.text}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} style={{ width: "100%", background: "#cc0000", color: "#fff", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 900, padding: "14px", cursor: "pointer", letterSpacing: 2 }}>
          BEGREPEN!
        </button>
      </div>
    </div>
  );
}

function PlayersSetup({ club, onStart, onCancel }) {
  const [count, setCount] = useState(2);
  const [names, setNames] = useState(["", "", "", ""]);

  const updateName = (i, val) => {
    const n = [...names];
    n[i] = val;
    setNames(n);
  };

  const canStart = names.slice(0, count).every(n => n.trim().length > 0);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 12, padding: 0, maxWidth: 400, width: "100%", overflow: "hidden" }}>
        <div style={{ background: "#cc0000", padding: "18px 24px", display: "flex", alignItems: "center", gap: 14 }}>
          <ClubLogo color={club.color} name={club.name} size={44} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#fff" }}>{club.name}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 1 }}>SPELERS INSTELLEN</div>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Aantal spelers</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[2, 3, 4].map(n => (
                <button key={n} onClick={() => setCount(n)}
                  style={{ flex: 1, background: count === n ? "#cc0000" : "#111", border: `2px solid ${count === n ? "#cc0000" : "#333"}`, borderRadius: 8, color: "#fff", fontSize: 20, fontWeight: 900, padding: "12px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#666", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Namen invullen</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 4, background: COLORS[i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#fff", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <input value={names[i]} onChange={e => updateName(i, e.target.value)}
                    placeholder={`Naam speler ${i + 1}...`}
                    style={{ flex: 1, background: "#111", border: `1px solid ${COLORS[i]}66`, borderRadius: 6, color: "#fff", fontSize: 15, padding: "10px 14px", outline: "none", fontFamily: "inherit" }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onCancel} style={{ flex: 1, background: "#111", color: "#888", border: "1px solid #333", borderRadius: 8, fontSize: 13, fontWeight: 700, padding: "12px", cursor: "pointer", fontFamily: "inherit" }}>
              ← Terug
            </button>
            <button onClick={() => onStart(names.slice(0, count).map(n => n.trim()))} disabled={!canStart}
              style={{ flex: 2, background: canStart ? "#cc0000" : "#333", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 900, padding: "12px", cursor: canStart ? "pointer" : "not-allowed", fontFamily: "inherit", letterSpacing: 1 }}>
              START ⚽
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Voetbal501() {
  const [screen, setScreen] = useState("club");
  const [tab, setTab] = useState("eredivisie");
  const [showRules, setShowRules] = useState(false);
  const [setupClub, setSetupClub] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [playerNames, setPlayerNames] = useState(["Speler 1", "Speler 2"]);
  const [scores, setScores] = useState([INITIAL_SCORE, INITIAL_SCORE]);
  const [current, setCurrent] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [feedback, setFeedback] = useState({ type: "info", text: "" });
  const [log, setLog] = useState([]);
  const [usedPlayers, setUsedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState(null);
  const inputRef = useRef();

  const startGame = (club, names) => {
    setSelectedClub(club);
    setPlayerNames(names);
    setScores(names.map(() => INITIAL_SCORE));
    setCurrent(0);
    setInputVal("");
    setLog([]);
    setUsedPlayers([]);
    setWinner(null);
    setSetupClub(null);
    setFeedback({ type: "info", text: `${names[0]} begint! Noem een speler van ${club.name}.` });
    setScreen("game");
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  const nextTurn = (cur) => (cur + 1) % playerNames.length;

  const handleSubmit = async () => {
    const name = inputVal.trim();
    if (!name || loading || winner !== null) return;

    const alreadyUsed = usedPlayers.find(p => p.toLowerCase() === name.toLowerCase());
    if (alreadyUsed) {
      setFeedback({ type: "error", text: `❌ ${name} is al gebruikt! Noem een andere speler.` });
      setInputVal("");
      return;
    }

    setLoading(true);
    setInputVal("");
    setFeedback({ type: "loading", text: `Controleren of ${name} voor ${selectedClub.name} heeft gespeeld... ⏳` });

    try {
      const prompt = `Je bent spelleider van "Voetbal 501 - ${selectedClub.name} Editie".
De speler heeft "${name}" ingevoerd.

BELANGRIJK: Wees RUIMHARTIG bij het beoordelen. Als een speler mogelijk voor ${selectedClub.name} heeft gespeeld, kies dan voor valid=true. Twijfel je? Geef valid=true.

1. Controleer of deze persoon ooit voor ${selectedClub.name} heeft gespeeld (eerste elftal, officiele wedstrijden, alle seizoenen ooit). Denk ook aan minder bekende of oudere spelers.
2. Als ja of mogelijk ja: geef het geschatte totale aantal officiele wedstrijden voor ${selectedClub.name}. Geef het echte getal, ook boven 180. Als je het niet precies weet, geef dan een redelijke schatting.
3. Alleen als je ZEKER weet dat de speler NOOIT voor ${selectedClub.name} heeft gespeeld: valid=false, matches=0.
4. Geef bekendste shirtnummer bij ${selectedClub.name} en een leuke fact (max 8 woorden).
Antwoord ALLEEN JSON (geen uitleg, geen markdown backticks):
{"valid":true,"matches":42,"shirt":10,"fact":"Snelle buitenspeler bekend om zijn dribbels"}
of: {"valid":false,"matches":0,"shirt":null,"fact":""}` ;

      const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.map(i => i.text || "").join("") || "";
      const jsonMatch = text.match(/\{[\s\S]*?"valid"[\s\S]*?\}/);
      if (!jsonMatch) throw new Error("Geen JSON gevonden");
      processResult(JSON.parse(jsonMatch[0]), name);
    } catch (e) {
      setFeedback({ type: "error", text: "Er ging iets mis. Probeer opnieuw." });
    }

    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const processResult = (result, name) => {
    const cur = current;
    const next = nextTurn(cur);

    if (!result.valid || result.matches === 0) {
      setFeedback({ type: "error", text: `❌ ${name} heeft nooit voor ${selectedClub.name} gespeeld! Beurt naar ${playerNames[next]}.` });
      setCurrent(next); return;
    }
    if (result.matches > 180) {
      setFeedback({ type: "error", text: `❌ ${name} speelde ${result.matches} wedstrijden — meer dan 180, ongeldig! Beurt naar ${playerNames[next]}.` });
      setCurrent(next); return;
    }

    setUsedPlayers(prev => [...prev, name]);
    const matches = result.matches;
    const newScores = [...scores];
    newScores[cur] = scores[cur] - matches;

    // Win check: huidige score IS het shirtnummer van de genoemde speler
    if (result.shirt && scores[cur] === result.shirt) {
      setScores(newScores);
      setLog(prev => [{ player: cur, name, matches, shirt: result.shirt, fact: result.fact }, ...prev].slice(0, 10));
      setWinner(cur);
      setFeedback({ type: "win", text: `🏆 ${playerNames[cur]} WINT! ${name} droeg #${result.shirt} bij ${selectedClub.name}! 🎽` });
      return;
    }

    // Bust check: onder nul
    if (newScores[cur] < 0) {
      setFeedback({ type: "warning", text: `⚠️ Bust! ${name} (${matches} wedstrijden) gaat onder nul. Beurt naar ${playerNames[next]}.` });
      setCurrent(next);
      return;
    }

    setScores(newScores);
    setLog(prev => [{ player: cur, name, matches, shirt: result.shirt, fact: result.fact }, ...prev].slice(0, 10));
    setFeedback({ type: "success", text: `✅ ${name} — ${matches} wedstrijden voor ${selectedClub.name}! ${result.fact || ""}` });
    setCurrent(next);
  };

  const fbStyle = {
    info:    { bg: "#111", border: "#333",    text: "#888" },
    loading: { bg: "#111", border: "#333",    text: "#666" },
    success: { bg: "#0a1f0d", border: "#1a6b2a", text: "#4caf6e" },
    error:   { bg: "#1f0a0a", border: "#7a1a1a", text: "#e05555" },
    warning: { bg: "#1f1800", border: "#7a5a00", text: "#e0a030" },
    win:     { bg: "#1a1400", border: "#cc9900", text: "#ffd700" },
  };
  const fb = fbStyle[feedback.type] || fbStyle.info;
  const clubs = tab === "eredivisie" ? EREDIVISIE : EERSTE_DIVISIE;

  return (
    <>
      {showRules && <RulesPopup onClose={() => setShowRules(false)} />}
      {setupClub && <PlayersSetup club={setupClub} onStart={(names) => startGame(setupClub, names)} onCancel={() => setSetupClub(null)} />}

      {screen === "club" && (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
          {/* Header */}
          <div style={{ background: "#cc0000", padding: "0 16px" }}>
            <div style={{ maxWidth: 540, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 18, letterSpacing: 1 }}>APPIE'S VOETBAL 501</div>
              </div>
              <button onClick={() => setShowRules(true)} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 12px", cursor: "pointer", fontFamily: "inherit", letterSpacing: 1 }}>
                📋 REGELS
              </button>
            </div>
          </div>

          {/* Subheader */}
          <div style={{ background: "#111", borderBottom: "1px solid #222", padding: "0 16px" }}>
            <div style={{ maxWidth: 540, margin: "0 auto", display: "flex", gap: 0 }}>
              {["eredivisie", "eerste divisie"].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{ background: "none", border: "none", borderBottom: `3px solid ${tab === t ? "#cc0000" : "transparent"}`, color: tab === t ? "#fff" : "#666", fontSize: 12, fontWeight: 700, padding: "14px 16px", cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", fontFamily: "inherit", transition: "all 0.15s" }}>
                  {t === "eredivisie" ? "🏆 Eredivisie" : "⚽ Eerste Divisie"}
                </button>
              ))}
            </div>
          </div>

          {/* Club grid */}
          <div style={{ maxWidth: 540, margin: "0 auto", padding: "16px" }}>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 12, fontWeight: 700 }}>
              Kies een club om te spelen
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
              {clubs.map(club => (
                <button key={club.name} onClick={() => setSetupClub(club)}
                  style={{ background: "#111", border: "1px solid #222", borderRadius: 8, color: "#fff", padding: "16px 12px", cursor: "pointer", textAlign: "center", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#cc0000"; e.currentTarget.style.background = "#1a0000"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.background = "#111"; }}
                >
                  <ClubLogo color={club.color} name={club.name} size={52} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{club.name}</div>
                    <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{club.city}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === "game" && (
        <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
          {/* Header */}
          <div style={{ background: "#cc0000", padding: "0 16px" }}>
            <div style={{ maxWidth: 540, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                
                <ClubLogo color={selectedClub.color} name={selectedClub.name} size={28} />
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 14, letterSpacing: 1 }}>{selectedClub.name.toUpperCase()}</div>
              </div>
              <button onClick={() => setScreen("club")} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 6, color: "#fff", fontSize: 12, fontWeight: 700, padding: "6px 12px", cursor: "pointer", fontFamily: "inherit" }}>
                ← CLUBS
              </button>
            </div>
          </div>

          {/* Live indicator */}
          <div style={{ background: "#111", borderBottom: "1px solid #222", padding: "8px 16px" }}>
            <div style={{ maxWidth: 540, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#cc0000", animation: "pulse 1.5s infinite" }} />
              <div style={{ fontSize: 11, color: "#cc0000", fontWeight: 700, letterSpacing: 2 }}>LIVE</div>
              <div style={{ fontSize: 11, color: "#555", marginLeft: 4 }}>
                Beurt van <span style={{ color: COLORS[current], fontWeight: 700 }}>{winner !== null ? playerNames[winner] : playerNames[current]}</span>
                {winner !== null && <span style={{ color: "#ffd700", fontWeight: 700 }}> — WINNAAR! 🏆</span>}
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 540, margin: "0 auto", padding: "16px" }}>
            {/* Scorebord */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {playerNames.map((pname, p) => (
                <div key={p} style={{ flex: 1, background: "#111", border: `1px solid ${winner === p ? "#ffd700" : current === p && winner === null ? COLORS[p] : "#222"}`, borderRadius: 8, overflow: "hidden", transition: "all 0.3s" }}>
                  <div style={{ background: winner === p ? "#ffd700" : current === p && winner === null ? COLORS[p] : "#1a1a1a", padding: "6px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1, color: current === p || winner === p ? (winner === p ? "#000" : "#fff") : "#555", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {winner === p ? "🏆 " : ""}{pname}
                    </div>
                    {current === p && winner === null && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <div style={{ padding: "12px 10px", textAlign: "center" }}>
                    <div style={{ fontSize: playerNames.length > 2 ? 38 : 48, fontWeight: 900, color: winner === p ? "#ffd700" : current === p && winner === null ? COLORS[p] : "#fff", lineHeight: 1, transition: "color 0.3s" }}>
                      {scores[p]}
                    </div>
                    {log.filter(l => l.player === p)[0] && (
                      <div style={{ fontSize: 10, color: "#444", marginTop: 4 }}>
                        {log.filter(l => l.player === p)[0].name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            {winner === null && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input ref={inputRef} value={inputVal} onChange={e => setInputVal(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    placeholder={`Speler van ${selectedClub.name}...`} disabled={loading} autoFocus
                    style={{ flex: 1, background: "#111", border: `1px solid ${COLORS[current]}66`, borderRadius: 8, color: "#fff", fontSize: 16, padding: "13px 16px", outline: "none", fontFamily: "inherit" }} />
                  <button onClick={handleSubmit} disabled={loading || !inputVal.trim()}
                    style={{ background: loading || !inputVal.trim() ? "#222" : COLORS[current], color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 900, padding: "13px 20px", cursor: loading || !inputVal.trim() ? "not-allowed" : "pointer", letterSpacing: 1 }}>
                    {loading ? "⏳" : "GO"}
                  </button>
                </div>
              </div>
            )}

            {winner !== null && (
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button onClick={() => startGame(selectedClub, playerNames)} style={{ flex: 1, background: "#cc0000", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 900, padding: "13px", cursor: "pointer", letterSpacing: 1 }}>🔄 OPNIEUW</button>
                <button onClick={() => setScreen("club")} style={{ flex: 1, background: "#111", color: "#888", border: "1px solid #333", borderRadius: 8, fontSize: 13, fontWeight: 900, padding: "13px", cursor: "pointer", letterSpacing: 1 }}>🏠 CLUBS</button>
              </div>
            )}

            {/* Feedback */}
            <div style={{ background: fb.bg, border: `1px solid ${fb.border}`, borderRadius: 8, padding: "12px 16px", marginBottom: 12, fontSize: 13, lineHeight: 1.5, color: fb.text, minHeight: 44, transition: "all 0.3s" }}>
              {feedback.text}
            </div>

            {/* Gebruikte spelers */}
            {usedPlayers.length > 0 && (
              <div style={{ fontSize: 11, color: "#333", marginBottom: 10, lineHeight: 1.6 }}>
                🚫 {usedPlayers.join(" · ")}
              </div>
            )}

            {/* Log */}
            {log.length > 0 && (
              <>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 8, fontWeight: 700, borderTop: "1px solid #1a1a1a", paddingTop: 12 }}>
                  Speelverloop
                </div>
                {log.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1a1a1a", padding: "10px 0", fontSize: 13 }}>
                    <div>
                      <div style={{ fontSize: 10, color: COLORS[item.player], fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                        {playerNames[item.player]}{item.shirt ? ` · #${item.shirt}` : ""}
                      </div>
                      <div style={{ color: "#fff", marginTop: 2 }}>{item.name}</div>
                      {item.fact && <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{item.fact}</div>}
                    </div>
                    <div style={{ color: "#cc0000", fontSize: 18, fontWeight: 900, flexShrink: 0 }}>-{item.matches}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
