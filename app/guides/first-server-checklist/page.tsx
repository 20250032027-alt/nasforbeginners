import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your First Home Server: A Practical Checklist",
  description: "What to actually do, in what order. Hardware, OS install, first Docker container, remote access. No theory, just steps.",
};

const steps = [
  {
    n: "01", title: "Pick your hardware",
    body: "For most beginners, a used mini PC with an Intel N100 is the right answer. It idles at 6W, handles Jellyfin transcoding, and costs around $150. If you already have a spare PC or laptop, start with that instead.",
    sub: ["Beelink EQ12 or TRIGKEY S5 are the common picks", "Add a USB hard drive if you need storage and don't want to open the case", "16GB RAM is enough to start. You can add more later."],
  },
  {
    n: "02", title: "Choose your OS",
    body: "New to Linux: use Unraid ($69 license). Comfortable with command line: use Debian 12 with Docker Compose. Not sure: use Unraid. You can always reinstall later.",
    sub: ["Unraid: download from unraid.net, flash to USB, boot from it", "Debian: download the netinstall ISO, use Rufus to flash to USB, install"],
  },
  {
    n: "03", title: "Get remote access working before anything else",
    body: "Set a static IP for your server so it does not change. Enable SSH. Test that you can reach it from another device on your network. Do this before installing any apps.",
    sub: ["Set static IP in your router's DHCP settings, not on the server itself", "Test SSH: ssh username@192.168.x.x from another machine", "On Unraid, SSH is in Settings > Management Access"],
  },
  {
    n: "04", title: "Install Portainer (if using Debian)",
    body: "Portainer gives you a web interface for Docker. It is optional but removes a lot of friction when you are starting out. One compose file, two minutes, done.",
    sub: ["Skip this step if using Unraid — it has its own Docker UI", "Portainer Community Edition is free forever"],
  },
  {
    n: "05", title: "Run your first container",
    body: "Start with something low-stakes. Pi-hole (network-wide ad blocking) or Vaultwarden (self-hosted password manager) are good first containers. They are simple, useful, and teach you the basics without risking your media library.",
    sub: ["Pi-hole: blocks ads for every device on your network", "Vaultwarden: compatible with all Bitwarden apps, runs on almost nothing"],
  },
  {
    n: "06", title: "Set up Immich or Jellyfin",
    body: "Now that you know how Docker works, tackle your main use case. Immich for photo backup. Jellyfin for media streaming. Both have dedicated guides on this site.",
    sub: ["Immich setup guide walks through the full install", "Jellyfin vs Plex covers which one to pick first"],
  },
  {
    n: "07", title: "Set up remote access",
    body: "You will eventually want to reach your server from outside your home network. Tailscale is the easiest answer: install it on your server and your phone, and they connect as if they were on the same network.",
    sub: ["Tailscale is free for personal use up to 3 users and 100 devices", "It handles the networking so you do not have to touch your router"],
  },
  {
    n: "08", title: "Set up backups",
    body: "RAID is not a backup. Before you trust your server with important data, set up an actual backup. The 3-2-1 rule: three copies of data, on two different media types, with one copy offsite.",
    sub: ["Minimum: an external drive with automatic backups of your important data", "Immich has a built-in backup option to external storage", "Rclone can sync to cloud storage for the offsite copy"],
  },
];

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", fontFamily: "'Lora', Georgia, serif" }}>
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 1.5rem", position: "sticky", top: 0, background: "rgba(247,245,240,0.92)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", height: "3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <div style={{ width: "26px", height: "26px", background: "var(--ink)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--ink)", letterSpacing: "-0.02em" }}>NASforBeginners</span>
          </a>
          <a href="/#guides" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "var(--ink-3)", textDecoration: "none" }}>All guides</a>
        </div>
      </header>
      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "var(--ink-4)" }}>
              <a href="/" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Home</a>{" / "}
              <a href="/#guides" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Guides</a>{" / "}
              <span style={{ color: "var(--ink-3)" }}>First Server Checklist</span>
            </p>
          </nav>

          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#6b7280", marginBottom: "0.875rem" }}>Getting Started</p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "0.875rem" }}>
            Your First Server: A Practical Checklist
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--ink-2)", marginBottom: "0.875rem", lineHeight: 1.7 }}>
            What to actually do, in what order.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--ink-4)" }}>5 min read</span>
            <span style={{ color: "var(--border-dark)" }}>|</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--ink-4)" }}>Last updated May 2026</span>
          </div>

          <p style={{ fontSize: "0.975rem", color: "var(--ink-2)", lineHeight: 1.75, marginBottom: "3rem" }}>
            Most guides explain what everything is. This one tells you what to do first, second, and third.
            Skip ahead to whatever step you are on. Each one links to a deeper guide if you need it.
          </p>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "1.5rem", paddingBottom: "2.5rem", position: "relative" }}>
                {/* Line */}
                {i < steps.length - 1 && (
                  <div style={{ position: "absolute", left: "1.1rem", top: "2.5rem", bottom: 0, width: "1px", background: "var(--border)" }} />
                )}
                {/* Number */}
                <div style={{ flexShrink: 0, width: "2.25rem", height: "2.25rem", background: "var(--ink)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.7rem", color: "white" }}>{step.n}</span>
                </div>
                {/* Content */}
                <div style={{ flex: 1, paddingTop: "0.3rem" }}>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "var(--ink)", marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
                    {step.title}
                  </h2>
                  <p style={{ fontSize: "0.9rem", color: "var(--ink-2)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                    {step.body}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {step.sub.map((s, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: "var(--ink-3)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        <span style={{ color: "var(--accent)", marginTop: "0.1rem", flexShrink: 0 }}>+</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem", padding: "1.5rem", background: "var(--bg-warm)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", marginBottom: "0.5rem" }}>Read next</p>
            <a href="/guides/proxmox-vs-unraid-vs-truenas" style={{ textDecoration: "none" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "var(--ink)", marginBottom: "0.3rem" }}>Proxmox vs Unraid vs TrueNAS</p>
              <p style={{ fontSize: "0.875rem", color: "var(--ink-3)" }}>Now that you know the steps, figure out which OS to start with.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
