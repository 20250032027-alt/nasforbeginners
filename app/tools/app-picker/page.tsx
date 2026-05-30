"use client";
import { PageHeader } from "@/app/_guide-nav";
import { useState } from "react";
import { ArrowLeft, Check, X, Minus } from "lucide-react";

type App = { cloud: string; self: string; slug: string; effort: "Easy" | "Medium" | "Hard"; worth: "Yes" | "Depends" | "Maybe"; desc: string; note: string; };

const apps: App[] = [
  { cloud: "Google Photos", self: "Immich", slug: "immich", effort: "Easy", worth: "Yes", desc: "Face recognition, shared albums, mobile auto-backup. The closest thing to Google Photos that actually exists.", note: "Requires at least 4GB RAM. GPU helps for face recognition but isn't required." },
  { cloud: "Netflix / Plex Pass", self: "Jellyfin", slug: "jellyfin", effort: "Easy", worth: "Yes", desc: "Stream your own movies and TV shows to any device. Hardware transcoding works on Intel N100 and newer.", note: "You provide the media files. Jellyfin doesn't download anything for you." },
  { cloud: "iCloud Drive / Google Drive", self: "Nextcloud", slug: "nextcloud", effort: "Medium", worth: "Depends", desc: "File sync, calendar, contacts, notes, and more. Very capable but heavier to run and maintain than simpler alternatives.", note: "Syncthing is a simpler option if you only need file sync across devices." },
  { cloud: "1Password / LastPass", self: "Vaultwarden", slug: "vaultwarden", effort: "Easy", worth: "Yes", desc: "Fully compatible with all Bitwarden apps. Runs on almost nothing — 256MB RAM is enough. One of the easiest containers to set up.", note: "Back up your Vaultwarden data. Losing your password manager is catastrophic." },
  { cloud: "Spotify", self: "Navidrome + Feishin", slug: "navidrome", effort: "Medium", worth: "Depends", desc: "Stream your own music collection from any device. Works with dozens of clients. You need to own the music files.", note: "Makes sense if you have a large music library you already own. Less useful if you mostly discover new music." },
  { cloud: "Google Keep / Notion", self: "Joplin / Silverbullet", slug: "notes", effort: "Easy", worth: "Depends", desc: "Self-hosted note-taking with sync. Joplin is simpler; Silverbullet is more powerful with a Markdown-first approach.", note: "Notion replacement is harder. Most self-hosted options are simpler by design." },
  { cloud: "ISP DNS (ads everywhere)", self: "Pi-hole", slug: "pihole", effort: "Easy", worth: "Yes", desc: "Blocks ads for every device on your network at the DNS level. Routers, smart TVs, phones — everything benefits.", note: "Can break some services if not configured carefully. Easy to whitelist domains." },
  { cloud: "Read-it-later apps", self: "Wallabag", slug: "wallabag", effort: "Easy", worth: "Maybe", desc: "Save articles to read later, offline, without tracking. Works with browser extensions and mobile apps.", note: "Less polished than Pocket or Instapaper. Fine if the feature matters more than the interface." },
];

export default function AppPicker() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["immich", "jellyfin", "vaultwarden", "pihole"]));
  const toggle = (slug: string) => setSelected(prev => { const s = new Set(prev); s.has(slug) ? s.delete(slug) : s.add(slug); return s; });
  const picked = apps.filter(a => selected.has(a.slug));

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <PageHeader section="App Picker" />

      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div className="wrap" style={{ maxWidth: "56rem" }}>
                    <div style={{ marginBottom: "2rem" }}>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", color: "var(--text-3)", textDecoration: "none", fontSize: ".78rem", fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-3)")}
            >
              <ArrowLeft size={13} /> Back to home
            </a>
          </div>
          <span className="eyebrow" style={{ marginBottom: "1.25rem", display: "inline-flex",  }}>App Picker</span>
          <h1  style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", color: "var(--text-1)", marginBottom: ".875rem" }}>
            Which apps should you run?
          </h1>
          <p  style={{ color: "var(--text-2)", marginBottom: "3rem", fontSize: "1rem", lineHeight: 1.75, maxWidth: "36rem" }}>
            Select the cloud services you currently pay for or use. See the self-hosted alternative, how hard it is to set up, and whether it's actually worth it.
          </p>

          {/* Grid of cloud services */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: ".75rem", marginBottom: "3rem" }}>
            {apps.map(app => {
              const on = selected.has(app.slug);
              return (
                <button key={app.slug} onClick={() => toggle(app.slug)}
                  
                  style={{
                    background: on ? "var(--teal-dim)" : "var(--surface)",
                    border: `1px solid ${on ? "var(--teal-border)" : "var(--border)"}`,
                    borderRadius: "var(--radius)", padding: "1rem 1.1rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    cursor: "pointer", textAlign: "left", transition: "all .3s var(--spring)",
                    minHeight: 44,
                  }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: ".9rem", color: on ? "var(--teal)" : "var(--text-1)" }}>{app.cloud}</p>
                    <p style={{ fontSize: ".75rem", color: "var(--text-3)", marginTop: ".1rem" }}>Self-host: {app.self}</p>
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: "9999px", background: on ? "var(--teal)" : "var(--bg-3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${on ? "var(--teal)" : "var(--border-2)"}`, transition: "all .3s var(--spring)" }}>
                    {on ? <Check size={13} color="#0d1210" /> : null}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Results */}
          {picked.length > 0 && (
            <div>
              <p  style={{ fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-4)", marginBottom: "1.25rem" }}>
                Your self-hosted stack ({picked.length} app{picked.length !== 1 ? "s" : ""})
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {picked.map(app => (
                  <div key={app.slug} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: ".75rem", flexWrap: "wrap" }}>
                      <div>
                        <p  style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-1)" }}>{app.cloud} <span style={{ color: "var(--text-3)", fontWeight: 400 }}>→</span> {app.self}</p>
                      </div>
                      <div style={{ display: "flex", gap: ".4rem", flexShrink: 0 }}>
                        <span  style={{ fontSize: ".68rem", fontWeight: 700, padding: ".2rem .55rem", borderRadius: "9999px", background: app.effort === "Easy" ? "var(--green-dim)" : app.effort === "Hard" ? "var(--red-dim)" : "var(--amber-dim)", color: app.effort === "Easy" ? "var(--green)" : app.effort === "Hard" ? "var(--red)" : "var(--amber)", border: `1px solid ${app.effort === "Easy" ? "rgba(82,199,122,.25)" : app.effort === "Hard" ? "rgba(224,92,92,.25)" : "rgba(245,166,35,.25)"}` }}>
                          {app.effort} setup
                        </span>
                        <span className={app.worth === "Yes" ? "v-yes" : app.worth === "Depends" ? "v-maybe" : "v-maybe"}>
                          {app.worth === "Yes" ? "Worth it" : app.worth === "Depends" ? "Depends" : "Maybe"}
                        </span>
                      </div>
                    </div>
                    <p  style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.7, marginBottom: ".6rem" }}>{app.desc}</p>
                    <p  style={{ fontSize: ".78rem", color: "var(--text-3)", lineHeight: 1.6, background: "var(--bg-3)", padding: ".6rem .875rem", borderRadius: "var(--radius-sm)", borderLeft: "2px solid var(--border-2)" }}>{app.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
