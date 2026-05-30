"use client";
import { PageHeader } from "@/app/_guide-nav";
import { useState } from "react";
import { ArrowLeft, Zap } from "lucide-react";

const cpus = [
  { name: "Raspberry Pi 4 (8GB)", tdp: 8 },
  { name: "Intel N100", tdp: 6 },
  { name: "Intel N305", tdp: 15 },
  { name: "Intel Core i3-12100T", tdp: 35 },
  { name: "Intel Core i3-12100", tdp: 60 },
  { name: "Intel Core i5-12400T", tdp: 35 },
  { name: "Intel Core i5-12400", tdp: 65 },
  { name: "Intel Core i7-12700T", tdp: 35 },
  { name: "Intel Core i7-12700", tdp: 125 },
  { name: "AMD Ryzen 5 5500", tdp: 65 },
  { name: "AMD Ryzen 5 5600", tdp: 65 },
  { name: "AMD Ryzen 7 5700G", tdp: 65 },
  { name: "Intel Xeon E5-2678 v3 (used)", tdp: 120 },
  { name: "Intel Xeon E5-2680 v4 (used)", tdp: 120 },
];

export default function PowerCalc() {
  const [cpu, setCpu] = useState(cpus[1]);
  const [drives, setDrives] = useState(2);
  const [ssds, setSsds] = useState(1);
  const [ram, setRam] = useState(16);
  const [rate, setRate] = useState(0.14);

  const driveWatts = drives * 6.5;
  const ssdWatts   = ssds * 1.5;
  const ramWatts   = (ram / 8) * 3;
  const idleWatts  = Math.round(cpu.tdp * 0.55 + driveWatts + ssdWatts + ramWatts + 12);
  const loadWatts  = Math.round(cpu.tdp * 0.9  + driveWatts + ssdWatts + ramWatts + 15);

  const monthKwh   = (idleWatts / 1000) * 24 * 30;
  const monthlyCost= monthKwh * rate;
  const yearlyCost = monthlyCost * 12;

  const n100Idle   = 12;
  const n100Monthly= (n100Idle / 1000) * 24 * 30 * rate;
  const saving     = monthlyCost - n100Monthly;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <PageHeader section="Power Calculator" />

      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div className="wrap" style={{ maxWidth: "40rem" }}>
                    <div style={{ marginBottom: "2rem" }}>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "var(--text-3)", textDecoration: "none", fontSize: ".78rem", fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            >
              <ArrowLeft size={13} /> Back to home
            </a>
          </div>
          <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex",  }}>Power Calculator</span>
          <h1  style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", color: "var(--text-1)", marginBottom: ".875rem" }}>
            How much will this cost to run?
          </h1>
          <p  style={{ color: "var(--text-2)", marginBottom: "3rem", lineHeight: 1.75 }}>
            The highest-voted post in r/homeserver is about power consumption. Plug in your setup and see your monthly electricity bill.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {/* CPU */}
            <div>
              <label  style={{ display: "block", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>CPU</label>
              <select value={cpu.name} onChange={e => setCpu(cpus.find(c => c.name === e.target.value)!)}
                
                style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border-2)", color: "var(--text-1)", borderRadius: "var(--radius)", padding: ".65rem 1rem", fontSize: ".875rem", outline: "none", cursor: "pointer", minHeight: 44 }}>
                {cpus.map(c => <option key={c.name} value={c.name}>{c.name} ({c.tdp}W TDP)</option>)}
              </select>
            </div>

            {[
              { label: "HDDs", sub: "~6.5W each", val: drives, set: setDrives, min: 0, max: 12 },
              { label: "SSDs / NVMe drives", sub: "~1.5W each", val: ssds, set: setSsds, min: 0, max: 8 },
            ].map(f => (
              <div key={f.label}>
                <label  style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                  <span>{f.label} <span style={{ color: "var(--text-4)", fontWeight: 400 }}>{f.sub}</span></span>
                  <span style={{ color: "var(--text-1)" }}>{f.val}</span>
                </label>
                <input type="range" min={f.min} max={f.max} value={f.val} onChange={e => f.set(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--amber)" }} />
              </div>
            ))}

            <div>
              <label  style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>RAM</span><span style={{ color: "var(--text-1)" }}>{ram}GB</span>
              </label>
              <input type="range" min={4} max={128} step={4} value={ram} onChange={e => setRam(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--amber)" }} />
            </div>

            <div>
              <label  style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>Electricity rate</span><span style={{ color: "var(--text-1)" }}>${rate.toFixed(2)}/kWh</span>
              </label>
              <input type="range" min={0.05} max={0.45} step={0.01} value={rate} onChange={e => setRate(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--amber)" }} />
              <div  style={{ display: "flex", justifyContent: "space-between", fontSize: ".68rem", color: "var(--text-4)", marginTop: ".2rem" }}>
                <span>$0.05 (very cheap)</span><span>$0.45 (expensive)</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.75rem", marginBottom: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", textAlign: "center", marginBottom: "1.5rem" }}>
              {[
                { label: "Idle draw", val: `${idleWatts}W`, sub: `${loadWatts}W at full load` },
                { label: "Per month", val: `$${monthlyCost.toFixed(2)}` },
                { label: "Per year", val: `$${Math.round(yearlyCost)}` },
              ].map(s => (
                <div key={s.label}>
                  <p  style={{ fontSize: "1.5rem", color: "var(--amber)" }}>{s.val}</p>
                  <p  style={{ fontSize: ".68rem", color: "var(--text-4)", marginTop: ".2rem" }}>{s.label}</p>
                  {s.sub && <p  style={{ fontSize: ".65rem", color: "var(--text-4)", marginTop: ".1rem" }}>{s.sub}</p>}
                </div>
              ))}
            </div>
            <p  style={{ fontSize: ".72rem", color: "var(--text-4)", borderTop: "1px solid var(--border)", paddingTop: "1rem", lineHeight: 1.6 }}>
              Idle estimate: {cpu.tdp}W CPU at 55% + {Math.round(driveWatts)}W HDDs + {Math.round(ssdWatts)}W SSDs + {Math.round(ramWatts)}W RAM + 12W overhead
            </p>
          </div>

          {saving > 0.5 && (
            <div style={{ background: "var(--teal-dim)", border: "1px solid var(--teal-border)", borderRadius: "var(--radius)", padding: "1rem 1.25rem" }}>
              <p  style={{ fontSize: ".82rem", color: "var(--teal)", lineHeight: 1.65 }}>
                <strong>N100 comparison:</strong> An N100 system with the same drives typically idles at ~{n100Idle}W, costing ${n100Monthly.toFixed(2)}/month. You could save roughly <strong>${saving.toFixed(2)}/month</strong> (${Math.round(saving * 12)}/year) by switching.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
