"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/app/_guide-nav";

export default function NoiseEstimator() {
  const [fans, setFans] = useState(2);
  const [fanSize, setFanSize] = useState(80);
  const [drives, setDrives] = useState(2);
  const [location, setLocation] = useState("office");
  const [cpuCooler, setCpuCooler] = useState("stock");

  const locations = [
    { v: "office", l: "Home office (shared)" },
    { v: "bedroom", l: "Bedroom" },
    { v: "closet", l: "Closet / cupboard" },
    { v: "basement", l: "Basement / utility room" },
  ];
  const coolers = [
    { v: "passive", l: "Passive / fanless" },
    { v: "stock", l: "Stock CPU cooler" },
    { v: "aftermarket", l: "Aftermarket quiet cooler" },
    { v: "blower", l: "Server blower fan" },
  ];

  // Noise scoring (rough dB estimate)
  const fanNoise = fans * (fanSize < 60 ? 8 : fanSize < 80 ? 4 : fanSize < 120 ? 2 : 1);
  const driveNoise = drives * 3;
  const coolerNoise = { passive: 0, stock: 5, aftermarket: 2, blower: 15 }[cpuCooler] || 0;
  const baseDb = 28; // quiet room baseline
  const estDb = Math.min(55, baseDb + fanNoise + driveNoise + coolerNoise);

  const locationThreshold = { office: 38, bedroom: 32, closet: 55, basement: 55 }[location] || 38;
  const isOk = estDb <= locationThreshold;
  const isMarginal = !isOk && estDb <= locationThreshold + 6;

  const tips: string[] = [];
  if (fanSize < 80 && fans > 0) tips.push("Smaller fans have to spin faster to move the same air, which makes them louder. 120mm fans at low RPM are almost silent.");
  if (drives > 2) tips.push("HDDs click and hum. Each one adds noise. SSDs are silent. If you can put drives in a storage server separate from your main machine, you can isolate the noise.");
  if (cpuCooler === "stock") tips.push("Stock coolers are designed to be cheap, not quiet. A $25 Noctua L9i or similar makes a noticeable difference.");
  if (cpuCooler === "blower") tips.push("Server blower fans are essentially impossible to make quiet. Enterprise hardware belongs in a closet, not an office.");
  if (location === "bedroom") tips.push("Anything you can hear while trying to sleep will bother you. The threshold for bedroom use is strict — passive cooling only, or put it in another room.");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader section="Noise Estimator" />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-sm">
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "var(--text-4)", textDecoration: "none", fontSize: ".78rem", marginBottom: "2rem" }}>
            <ArrowLeft size={13} /> Back
          </a>
          <span className="eyebrow" style={{ marginBottom: "1rem", display: "inline-flex" }}>Noise Estimator</span>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.25rem)", letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".65rem", lineHeight: 1.2 }}>
            How loud will my server actually be?
          </h1>
          <p style={{ color: "var(--text-2)", marginBottom: "2.5rem", lineHeight: 1.75, fontSize: ".9rem" }}>
            Noise is one of the most underestimated parts of building a home server. One person's "barely noticeable hum" is another person's "I can't sleep." Tell us your setup and where you're putting it.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.35rem", marginBottom: "2.5rem" }}>
            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>Number of case fans</span><span style={{ color: "var(--text-1)" }}>{fans}</span>
              </label>
              <input type="range" min={0} max={8} value={fans} onChange={e => setFans(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
            </div>
            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>Fan size</span><span style={{ color: "var(--text-1)" }}>{fanSize}mm</span>
              </label>
              <input type="range" min={40} max={140} step={20} value={fanSize} onChange={e => setFanSize(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".68rem", color: "var(--text-4)", marginTop: ".2rem" }}>
                <span>40mm (loud)</span><span>140mm (quiet)</span>
              </div>
            </div>
            <div>
              <label style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>Hard drives (HDDs)</span><span style={{ color: "var(--text-1)" }}>{drives}</span>
              </label>
              <input type="range" min={0} max={8} value={drives} onChange={e => setDrives(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--accent)" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".5rem" }}>CPU cooler type</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".4rem" }}>
                {coolers.map(c => (
                  <button key={c.v} onClick={() => setCpuCooler(c.v)}
                    style={{ padding: ".6rem .875rem", borderRadius: "var(--radius)", fontSize: ".82rem", fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all .2s", minHeight: 44, background: cpuCooler === c.v ? "var(--accent-dim)" : "var(--surface)", border: `1px solid ${cpuCooler === c.v ? "var(--accent-border)" : "var(--border)"}`, color: cpuCooler === c.v ? "var(--accent)" : "var(--text-2)" }}>
                    {c.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".5rem" }}>Where will this server live?</label>
              <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                {locations.map(l => (
                  <button key={l.v} onClick={() => setLocation(l.v)}
                    style={{ padding: ".6rem 1rem", borderRadius: "var(--radius)", fontSize: ".85rem", fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all .2s", minHeight: 44, background: location === l.v ? "var(--accent-dim)" : "transparent", border: `1px solid ${location === l.v ? "var(--accent-border)" : "var(--border)"}`, color: location === l.v ? "var(--accent)" : "var(--text-2)" }}>
                    {l.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div style={{ background: "var(--surface)", border: `1px solid ${isOk ? "var(--border)" : isMarginal ? "rgba(251,191,36,.3)" : "rgba(248,113,113,.3)"}`, borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", borderBottom: "1px solid var(--border)" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontWeight: 800, fontSize: "2.5rem", color: isOk ? "var(--green)" : isMarginal ? "var(--amber)" : "var(--red)", lineHeight: 1, letterSpacing: "-.03em" }}>~{estDb}dB</p>
                <p style={{ fontSize: ".7rem", color: "var(--text-4)", marginTop: ".2rem" }}>estimated noise</p>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: ".95rem", color: "var(--text-1)", marginBottom: ".3rem" }}>
                  {isOk ? "Should be fine for this location." : isMarginal ? "Borderline. You'll probably notice it." : "This will bother you in this location."}
                </p>
                <p style={{ fontSize: ".82rem", color: "var(--text-3)", lineHeight: 1.6 }}>
                  {location === "bedroom" ? `Bedroom threshold is roughly ${locationThreshold}dB. ` : location === "office" ? `Shared office threshold is roughly ${locationThreshold}dB. ` : ""}
                  {isOk ? "At this level, it should blend into background noise." : isMarginal ? "You'll hear it when the room is quiet, but it probably won't bother you constantly." : "At this level in this location, it's likely to become annoying."}
                </p>
              </div>
            </div>
            {tips.length > 0 && (
              <div style={{ padding: "1.25rem 1.5rem" }}>
                <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-4)", marginBottom: ".75rem" }}>How to reduce noise</p>
                {tips.map((tip, i) => (
                  <p key={i} style={{ fontSize: ".83rem", color: "var(--text-2)", marginBottom: ".5rem", lineHeight: 1.65, display: "flex", alignItems: "flex-start", gap: ".5rem" }}>
                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>→</span>{tip}
                  </p>
                ))}
              </div>
            )}
          </div>

          <p style={{ fontSize: ".72rem", color: "var(--text-4)", marginTop: "1rem", lineHeight: 1.6 }}>
            Estimates are rough guides only. Real noise depends heavily on fan RPM, case design, and room acoustics.
          </p>
        </div>
      </main>
    </div>
  );
}
