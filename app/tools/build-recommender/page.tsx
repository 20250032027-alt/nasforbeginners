"use client";
import { PageHeader } from "@/app/_guide-nav";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";

type Rec = { hardware: string; os: string; apps: string[]; note: string };

function getRec(budget: number, useCase: string, comfort: string): Rec {
  if (budget < 150) return { hardware: "Raspberry Pi 4 (4GB or 8GB), or a spare laptop you already own", os: comfort === "beginner" ? "DietPi (easiest)" : "Debian 12", apps: ["Immich (photos)", "Pi-hole (ad blocking)", "Tailscale (remote access)", "Vaultwarden (passwords)"], note: "Under $150 limits your options. A Pi 4 runs Immich and basic services well but will not transcode video reliably." };
  if (budget < 350) {
    if (useCase === "media") return { hardware: "Beelink EQ12 or TRIGKEY S5 (N100, ~$150-180 new or ~$80-120 used)", os: comfort === "beginner" ? "Unraid ($69 license)" : "Debian 12 + Docker Compose", apps: ["Jellyfin with hardware transcoding", "Immich", "Tailscale", "Portainer (container UI)"], note: "The N100 handles 4K direct play and 1-2 simultaneous 1080p transcodes. Intel Quick Sync hardware transcoding is excellent." };
    if (useCase === "nas") return { hardware: "N100 mini PC + 2x 4TB HDD (used drives from reputable sellers)", os: comfort === "beginner" ? "TrueNAS Scale" : "Debian 12 + mergerfs + snapraid", apps: ["Samba (Windows file sharing)", "Immich", "Tailscale", "Syncthing (file sync)"], note: "TrueNAS Scale gives you ZFS data integrity out of the box. mergerfs + snapraid is more flexible but takes more setup." };
    return { hardware: "Beelink EQ12 N100 mini PC (~$160 new)", os: comfort === "beginner" ? "Unraid ($69 license)" : "Proxmox + Debian VM", apps: ["Immich", "Jellyfin", "Vaultwarden", "Pi-hole", "Tailscale", "Homepage (dashboard)"], note: "A capable all-rounder. Will handle 1-2 simultaneous Jellyfin streams without breaking a sweat." };
  }
  if (budget < 700) return { hardware: "Beelink SER5 Max (Ryzen 5 5560U, ~$200-250) + 2x 4TB HDD", os: comfort === "beginner" ? "Unraid" : "Proxmox with TrueNAS Scale VM + Debian VM", apps: ["Jellyfin with hardware transcoding", "Immich with face recognition GPU acceleration", "Nextcloud (file sync)", "Vaultwarden", "Tailscale", "Uptime Kuma (monitoring)", "Homepage"], note: "Ryzen CPUs handle multiple simultaneous Jellyfin streams better than N100. The integrated GPU also speeds up Immich face detection." };
  return { hardware: "Custom build: i5-12600T or i5-13500T (65W TDP) + 32GB DDR4 + 4x 4TB HDD", os: "Proxmox (virtualize everything)", apps: ["TrueNAS Scale VM for storage", "Debian + Docker VM for apps", "Jellyfin + hardware transcoding", "Immich", "Nextcloud", "Vaultwarden", "Traefik (reverse proxy)", "Uptime Kuma", "Grafana (monitoring)"], note: "T-series CPUs run cool and quiet at full load. At this budget you can run separate VMs for storage and apps, which is cleaner to manage." };
}

export default function BuildRec() {
  const [budget, setBudget] = useState(300);
  const [useCase, setUseCase] = useState("general");
  const [comfort, setComfort] = useState("beginner");

  const rec = getRec(budget, useCase, comfort);

  const useCases = [
    { v: "media", l: "Streaming (Jellyfin / Plex)" },
    { v: "nas", l: "File storage / NAS" },
    { v: "photos", l: "Photo backup (Immich)" },
    { v: "general", l: "General self-hosting" },
  ];
  const comfortLevels = [
    { v: "beginner", l: "New to Linux" },
    { v: "intermediate", l: "Comfortable with command line" },
    { v: "advanced", l: "Used VMs or Docker before" },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <PageHeader section="Build Recommender" />

      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div className="wrap" style={{ maxWidth: "40rem" }}>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "var(--text-4)", textDecoration: "none", fontSize: ".8rem", marginBottom: "2rem" }} >
            <ArrowLeft size={14} /> Back
          </a>

          <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>Build Recommender</span>
          <h1  style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", color: "var(--text-1)", marginBottom: ".875rem" }}>
            What should I build?
          </h1>
          <p  style={{ color: "var(--text-2)", marginBottom: "3rem", lineHeight: 1.75 }}>
            Three questions. One concrete answer with hardware, OS, and a prioritized app list.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", marginBottom: "2.5rem" }}>
            <div>
              <label  style={{ display: "flex", justifyContent: "space-between", fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".4rem" }}>
                <span>Budget (USD)</span><span style={{ color: "var(--text-1)" }}>${budget}</span>
              </label>
              <input type="range" min={50} max={1500} step={50} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--teal)" }} />
              <div  style={{ display: "flex", justifyContent: "space-between", fontSize: ".68rem", color: "var(--text-4)", marginTop: ".25rem" }}><span>$50</span><span>$1,500+</span></div>
            </div>

            <div>
              <p  style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".6rem" }}>Primary use case</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".5rem" }}>
                {useCases.map(u => (
                  <button key={u.v} onClick={() => setUseCase(u.v)} 
                    style={{ padding: ".65rem 1rem", borderRadius: "var(--radius)", fontSize: ".85rem", fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all .25s var(--spring)", minHeight: 44, background: useCase === u.v ? "var(--teal-dim)" : "var(--surface)", border: `1px solid ${useCase === u.v ? "var(--teal-border)" : "var(--border)"}`, color: useCase === u.v ? "var(--teal)" : "var(--text-2)" }}>
                    {u.l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p  style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)", marginBottom: ".6rem" }}>Linux comfort level</p>
              <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
                {comfortLevels.map(c => (
                  <button key={c.v} onClick={() => setComfort(c.v)} 
                    style={{ padding: ".65rem 1rem", borderRadius: "var(--radius)", fontSize: ".875rem", fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all .25s var(--spring)", minHeight: 44, background: comfort === c.v ? "var(--teal-dim)" : "transparent", border: `1px solid ${comfort === c.v ? "var(--teal-border)" : "var(--border)"}`, color: comfort === c.v ? "var(--teal)" : "var(--text-2)" }}>
                    {c.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: "var(--radius-lg)", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              { label: "Hardware", val: rec.hardware, color: "var(--teal)" },
              { label: "Operating System", val: rec.os, color: "var(--teal)" },
            ].map(r => (
              <div key={r.label}>
                <p  style={{ fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-4)", marginBottom: ".35rem" }}>{r.label}</p>
                <p  style={{ fontWeight: 600, fontSize: ".9rem", color: "var(--text-1)" }}>{r.val}</p>
              </div>
            ))}
            <div>
              <p  style={{ fontSize: ".62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-4)", marginBottom: ".6rem" }}>Apps (priority order)</p>
              <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
                {rec.apps.map((app, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: ".5rem", fontSize: ".875rem", color: "var(--text-2)" }} >
                    <ChevronRight size={14} color="var(--teal)" style={{ flexShrink: 0, marginTop: ".15rem" }} />
                    {app}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--border)", fontSize: ".8rem", color: "var(--text-3)", lineHeight: 1.65 }} >
              {rec.note}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
