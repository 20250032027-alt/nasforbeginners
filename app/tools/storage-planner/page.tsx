"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function StoragePlanner() {
  const [photos, setPhotos]       = useState(50);
  const [movies, setMovies]       = useState(200);
  const [tvShows, setTvShows]     = useState(500);
  const [backups, setBackups]     = useState(100);
  const [growth, setGrowth]       = useState(20);

  // Photos: avg 4MB each (modern smartphone)
  const photoGB   = (photos * 1000 * 4) / 1024;
  // Movies: avg 15GB per movie (1080p)
  const movieGB   = movies * 15;
  // TV: avg 700MB per episode, assume 22 eps per show
  const tvGB      = tvShows * 22 * 0.7;
  // Backups: user defined
  const backupGB  = backups;

  const totalNow  = photoGB + movieGB + tvGB + backupGB;
  const totalY1   = totalNow * (1 + growth / 100);
  const totalY3   = totalNow * Math.pow(1 + growth / 100, 3);

  const recs = [
    { label: "Minimum (tight)", drives: "2 × 4TB", note: "No redundancy. Back up offsite.", gb: 8000 },
    { label: "Comfortable", drives: "2 × 8TB", note: "Room to grow for 2+ years.", gb: 16000 },
    { label: "With redundancy", drives: "2 × 8TB + parity", note: "Survive a single drive failure.", gb: 16000 },
    { label: "Future-proof", drives: "4 × 8TB + parity", note: "5-7 year runway.", gb: 32000 },
  ];

  const rec = recs.find(r => r.gb >= totalY3 * 1.3) || recs[recs.length - 1];

  const fmt = (gb: number) => gb >= 1000 ? `${(gb / 1024).toFixed(1)} TB` : `${Math.round(gb)} GB`;

  const bars = [
    { label: "Photos", gb: photoGB, color: "var(--teal)" },
    { label: "Movies", gb: movieGB, color: "var(--purple)" },
    { label: "TV Shows", gb: tvGB, color: "var(--blue)" },
    { label: "Backups", gb: backupGB, color: "var(--amber)" },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <header className="guide-header">
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: ".55rem", textDecoration: "none" }}>
            <div style={{ width: 26, height: 26, background: "var(--teal)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0d1210" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
            <span className="sans" style={{ fontWeight: 700, fontSize: ".9rem", color: "var(--text-1)" }}>NASforBeginners</span>
          </a>
          <a href="/" className="sans" style={{ fontSize: ".8rem", color: "var(--text-3)", textDecoration: "none" }}>Home</a>
        </div>
      </header>

      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div className="wrap" style={{ maxWidth: "44rem" }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "var(--text-4)", textDecoration: "none", fontSize: ".8rem", marginBottom: "2rem" }} className="sans">
            <ArrowLeft size={14} /> Back
          </a>

          <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex", background: "var(--green-dim)", borderColor: "rgba(82,199,122,.25)", color: "var(--green)" }}>Storage Planner</span>
          <h1 className="display" style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", color: "var(--text-1)", marginBottom: ".875rem" }}>
            How much storage do you actually need?
          </h1>
          <p className="serif" style={{ color: "var(--text-2)", marginBottom: "3rem", lineHeight: 1.75 }}>
            Photos, movies, and backups grow at very different rates. Tell us what you're storing and get a realistic projection.
          </p>

          {/* Inputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
            {[
              { label: "Photos", sub: "approx. 4MB each on modern phones", val: photos, set: setPhotos, unit: "photos", min: 0, max: 500, step: 10, suffix: "k" },
              { label: "Movies", sub: "approx. 15GB each at 1080p", val: movies, set: setMovies, unit: "movies", min: 0, max: 2000, step: 10 },
              { label: "TV Shows", sub: "approx. 15GB per season", val: tvShows, set: setTvShows, unit: "seasons", min: 0, max: 2000, step: 10 },
              { label: "Backups & Documents", sub: "PC backups, important files", val: backups, set: setBackups, unit: "GB", min: 0, max: 2000, step: 10 },
            ].map(f => (
              <div key={f.label}>
                <label className="sans" style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                  <span>{f.label} <span style={{ color: "var(--text-4)", fontWeight: 400 }}>{f.sub}</span></span>
                  <span style={{ color: "var(--text-1)" }}>{f.val.toLocaleString()}{f.suffix || ""} {f.unit}</span>
                </label>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.val}
                  onChange={e => f.set(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "var(--teal)" }} />
              </div>
            ))}
            <div>
              <label className="sans" style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>Annual growth rate</span>
                <span style={{ color: "var(--text-1)" }}>{growth}% / year</span>
              </label>
              <input type="range" min={0} max={60} step={5} value={growth}
                onChange={e => setGrowth(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--teal)" }} />
              <div className="sans" style={{ display: "flex", justifyContent: "space-between", fontSize: ".68rem", color: "var(--text-4)", marginTop: ".2rem" }}>
                <span>0% (static)</span><span>60% (heavy growth)</span>
              </div>
            </div>
          </div>

          {/* Breakdown bars */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", marginBottom: "1rem" }}>
            <p className="sans" style={{ fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-4)", marginBottom: "1.25rem" }}>Storage breakdown</p>
            {bars.map(b => (
              <div key={b.label} style={{ marginBottom: ".875rem" }}>
                <div className="sans" style={{ display: "flex", justifyContent: "space-between", fontSize: ".8rem", color: "var(--text-2)", marginBottom: ".3rem" }}>
                  <span>{b.label}</span><span style={{ color: "var(--text-1)", fontWeight: 600 }}>{fmt(b.gb)}</span>
                </div>
                <div style={{ height: 6, background: "var(--bg-3)", borderRadius: 9999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (b.gb / Math.max(totalNow, 1)) * 100)}%`, background: b.color, borderRadius: 9999, transition: "width .5s var(--spring)" }} />
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "1.25rem", paddingTop: "1rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".5rem", textAlign: "center" }}>
              {[
                { label: "Now", val: fmt(totalNow) },
                { label: "Year 1", val: fmt(totalY1) },
                { label: "Year 3", val: fmt(totalY3) },
              ].map(s => (
                <div key={s.label}>
                  <p className="display" style={{ fontSize: "1.35rem", color: "var(--text-1)" }}>{s.val}</p>
                  <p className="sans" style={{ fontSize: ".7rem", color: "var(--text-4)", marginTop: ".15rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div style={{ background: "var(--green-dim)", border: "1px solid rgba(82,199,122,.2)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
            <p className="sans" style={{ fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--green)", marginBottom: ".5rem" }}>Recommended setup</p>
            <p className="display" style={{ fontSize: "1.4rem", color: "var(--text-1)", marginBottom: ".4rem" }}>{rec.label}</p>
            <p className="sans" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--green)", marginBottom: ".4rem" }}>{rec.drives}</p>
            <p className="serif" style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.65 }}>{rec.note}</p>
          </div>

          <p className="sans" style={{ fontSize: ".75rem", color: "var(--text-4)", marginTop: "1.25rem", lineHeight: 1.6 }}>
            Estimates assume 1080p movies, modern smartphone photos at 4MB average, and 700MB per TV episode. Your actual usage may vary significantly.
          </p>
        </div>
      </main>
    </div>
  );
}
