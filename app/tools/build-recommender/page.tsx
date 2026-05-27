"use client";
import { useState } from "react";
import { ArrowLeft, Cpu, ChevronRight } from "lucide-react";

type Rec = { hardware: string; os: string; apps: string[]; note: string };

function getRecommendation(budget: number, useCase: string, comfort: string): Rec {
  if (budget < 150) {
    return {
      hardware: "Used Raspberry Pi 4 (4GB or 8GB) or spare laptop",
      os: comfort === "beginner" ? "DietPi" : "Debian 12",
      apps: ["Immich (photos)", "Pi-hole (ad blocking)", "Tailscale (remote access)"],
      note: "Under $150 limits you. A Pi 4 can run Immich and basic services but won't transcode video reliably.",
    };
  }
  if (budget < 400) {
    if (useCase === "media") {
      return {
        hardware: "Beelink EQ12 or TRIGKEY S5 (N100 mini PC, ~$150–180)",
        os: comfort === "beginner" ? "Unraid ($59 license)" : "Debian 12 + Docker Compose",
        apps: ["Jellyfin (media streaming)", "Immich (photos)", "Tailscale", "Portainer (container management)"],
        note: "The N100 handles 4K HEVC direct play and 1080p transcoding. Add a USB HDD for storage if needed.",
      };
    }
    if (useCase === "nas") {
      return {
        hardware: "Mini PC with N100 + 2x 4TB HDDs",
        os: comfort === "beginner" ? "TrueNAS Scale" : "Debian 12 + mergerfs + snapraid",
        apps: ["Samba (file shares)", "Immich", "Tailscale", "Syncthing (sync)"],
        note: "TrueNAS Scale gives you ZFS data integrity out of the box. mergerfs+snapraid is more flexible but takes more setup.",
      };
    }
    return {
      hardware: "Beelink EQ12 (N100, ~$160)",
      os: comfort === "beginner" ? "Unraid" : "Proxmox + Debian VM",
      apps: ["Immich", "Jellyfin", "Vaultwarden (passwords)", "Tailscale", "Homepage (dashboard)"],
      note: "A solid all-rounder. Won't handle more than 1-2 simultaneous Jellyfin streams at 1080p.",
    };
  }
  if (budget < 800) {
    return {
      hardware: "Intel NUC 12 or Beelink SER5 Max (Ryzen 5 5560U) + 2x 4TB HDD",
      os: comfort === "beginner" ? "Unraid" : "Proxmox with TrueNAS Scale VM + Debian VM",
      apps: ["Jellyfin with hardware transcoding", "Immich", "Nextcloud (file sync)", "Vaultwarden", "Tailscale", "Uptime Kuma (monitoring)"],
      note: "Ryzen CPUs handle multiple Jellyfin streams better. The Beelink SER5 is the value pick here.",
    };
  }
  return {
    hardware: "Custom build: i5-12600T or i5-13500T + 32GB DDR4 + 4x 4TB HDD",
    os: "Proxmox (virtualize everything)",
    apps: ["TrueNAS Scale VM (storage)", "Debian + Docker VM (apps)", "Jellyfin + hardware transcoding", "Immich", "Nextcloud", "Vaultwarden", "Traefik (reverse proxy)", "Authelia (2FA)"],
    note: "At this budget you have room for proper redundancy and multiple VMs. The T-series CPUs run cool and quiet.",
  };
}

export default function BuildRecommender() {
  const [budget, setBudget] = useState(300);
  const [useCase, setUseCase] = useState("general");
  const [comfort, setComfort] = useState("beginner");
  const [result, setResult] = useState<Rec | null>(null);

  const useCases = [
    { value: "media", label: "Media server (Jellyfin/Plex)" },
    { value: "nas", label: "File storage / NAS" },
    { value: "photos", label: "Photo backup (Immich)" },
    { value: "general", label: "General self-hosting" },
  ];

  const comfortLevels = [
    { value: "beginner", label: "New to Linux" },
    { value: "intermediate", label: "Comfortable with command line" },
    { value: "advanced", label: "Used VMs / Docker before" },
  ];

  const rec = getRecommendation(budget, useCase, comfort);

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
          <div style={{ width: "2.5rem", height: "2.5rem", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Cpu size={18} color="#60a5fa" />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Build Recommender</h1>
        </div>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2.5rem", fontSize: "0.9rem" }}>
          Answer three questions. Get a concrete hardware recommendation and a prioritized app list.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {/* Budget */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span>Budget (USD)</span><span style={{ color: "var(--text-primary)", fontWeight: 700 }}>${budget}</span>
            </label>
            <input type="range" min={50} max={1500} step={50} value={budget} onChange={e => setBudget(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#3b82f6" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              <span>$50</span><span>$1,500</span>
            </div>
          </div>

          {/* Use case */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem", display: "block" }}>Primary use case</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              {useCases.map(u => (
                <button key={u.value} onClick={() => setUseCase(u.value)}
                  style={{ padding: "0.6rem 0.875rem", borderRadius: "0.6rem", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                    background: useCase === u.value ? "rgba(59,130,246,0.15)" : "var(--bg-surface)",
                    border: `1px solid ${useCase === u.value ? "rgba(59,130,246,0.4)" : "var(--border)"}`,
                    color: useCase === u.value ? "#60a5fa" : "var(--text-secondary)",
                  }}>{u.label}</button>
              ))}
            </div>
          </div>

          {/* Comfort */}
          <div>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem", display: "block" }}>Linux comfort level</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {comfortLevels.map(c => (
                <button key={c.value} onClick={() => setComfort(c.value)}
                  style={{ padding: "0.65rem 1rem", borderRadius: "0.6rem", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                    background: comfort === c.value ? "rgba(59,130,246,0.1)" : "transparent",
                    border: `1px solid ${comfort === c.value ? "rgba(59,130,246,0.3)" : "var(--border)"}`,
                    color: comfort === c.value ? "#60a5fa" : "var(--text-secondary)",
                  }}>{c.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Result — always shown, updates live */}
        <div style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: "1.25rem", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>Hardware</div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{rec.hardware}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>Operating System</div>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{rec.os}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "#60a5fa", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>Docker Apps (priority order)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
              {rec.apps.map((app, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <ChevronRight size={12} color="#3b82f6" style={{ flexShrink: 0 }} />
                  {app}
                </div>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(59,130,246,0.12)", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.65 }}>
            {rec.note}
          </div>
        </div>
      </div>
    </div>
  );
}
