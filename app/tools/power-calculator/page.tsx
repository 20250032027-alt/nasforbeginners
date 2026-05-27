"use client";
import { useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";

const cpus = [
  { name: "Intel N100", tdp: 6 },
  { name: "Intel N305", tdp: 15 },
  { name: "Intel Core i3-12100", tdp: 60 },
  { name: "Intel Core i5-12400", tdp: 65 },
  { name: "Intel Core i7-12700", tdp: 125 },
  { name: "AMD Ryzen 5 5600", tdp: 65 },
  { name: "AMD Ryzen 7 5700G", tdp: 65 },
  { name: "Intel Xeon E5-2678 v3", tdp: 120 },
  { name: "Raspberry Pi 4", tdp: 8 },
];

export default function PowerCalc() {
  const [cpu, setCpu] = useState(cpus[0]);
  const [drives, setDrives] = useState(2);
  const [ram, setRam] = useState(16);
  const [rate, setRate] = useState(0.14);

  const driveWatts = drives * 6.5;
  const ramWatts = (ram / 8) * 3;
  const totalWatts = cpu.tdp * 0.65 + driveWatts + ramWatts + 15; // 15W system overhead
  const monthlyKwh = (totalWatts / 1000) * 24 * 30;
  const monthlyCost = monthlyKwh * rate;
  const yearlyCost = monthlyCost * 12;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "38rem", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2.5rem" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-secondary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <ArrowLeft size={14} /> Back
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ width: "2.5rem", height: "2.5rem", background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.25)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={18} color="#c084fc" />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Power Consumption Calculator</h1>
        </div>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Estimates based on typical real-world usage (not TDP maximums). Add ~20% for active transcoding.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
          {/* CPU */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>CPU</label>
            <select value={cpu.name} onChange={e => setCpu(cpus.find(c => c.name === e.target.value)!)}
              style={{ width: "100%", background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: "0.75rem", padding: "0.7rem 1rem", fontSize: "0.875rem", outline: "none", cursor: "pointer" }}>
              {cpus.map(c => <option key={c.name} value={c.name}>{c.name} ({c.tdp}W TDP)</option>)}
            </select>
          </div>

          {/* Drives */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>Hard drives (HDDs)</span><span style={{ color: "var(--text-primary)" }}>{drives}</span>
            </label>
            <input type="range" min={0} max={8} value={drives} onChange={e => setDrives(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#c084fc" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              <span>0</span><span>8</span>
            </div>
          </div>

          {/* RAM */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>RAM</span><span style={{ color: "var(--text-primary)" }}>{ram}GB</span>
            </label>
            <input type="range" min={4} max={128} step={4} value={ram} onChange={e => setRam(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#c084fc" }} />
          </div>

          {/* Rate */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>Electricity rate ($/kWh)</span><span style={{ color: "var(--text-primary)" }}>${rate.toFixed(2)}</span>
            </label>
            <input type="range" min={0.05} max={0.40} step={0.01} value={rate} onChange={e => setRate(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#c084fc" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              <span>$0.05 (cheap)</span><span>$0.40 (Europe avg)</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: "1.25rem", padding: "1.75rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#c084fc" }}>{Math.round(totalWatts)}W</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Estimated idle</div>
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#a78bfa" }}>${monthlyCost.toFixed(2)}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Per month</div>
            </div>
            <div>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#818cf8" }}>${Math.round(yearlyCost)}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>Per year</div>
            </div>
          </div>
          <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(168,85,247,0.15)", fontSize: "0.78rem", color: "var(--text-muted)" }}>
            Breakdown: {cpu.tdp}W CPU × 65% load + {Math.round(driveWatts)}W drives + {Math.round(ramWatts)}W RAM + 15W system overhead
          </div>
        </div>

        <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
          <strong style={{ color: "var(--text-secondary)" }}>N100 comparison:</strong>{" "}
          An N100 at idle typically pulls 10-15W total with 2 HDDs. At ${rate.toFixed(2)}/kWh, that's about ${(0.012 * 24 * 30 * rate).toFixed(2)}/month. Worthwhile if you're replacing a 65W+ machine.
        </div>
      </div>
    </div>
  );
}
