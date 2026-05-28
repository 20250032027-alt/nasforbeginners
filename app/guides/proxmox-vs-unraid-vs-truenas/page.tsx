import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";

export const metadata: Metadata = {
  title: "Proxmox vs Unraid vs TrueNAS — Which Should a Beginner Pick?",
  description: "Three home server operating systems compared for beginners. How to choose between Proxmox, Unraid, and TrueNAS Scale based on what you actually want to do.",
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <nav className="bc" aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <a href="/">Home</a> / <a href="/#guides">Guides</a> / <span>Proxmox vs Unraid vs TrueNAS</span>
          </nav>

          <p style={{ fontSize: ".62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", marginBottom: ".875rem" }}>Operating Systems</p>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".75rem" }}>
            Proxmox vs Unraid vs TrueNAS
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-2)", marginBottom: ".75rem", lineHeight: 1.7 }}>Which one should a beginner actually pick?</p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>8 min read</span>
            <span style={{ color: "var(--border-2)" }}>|</span>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>Last updated May 2026</span>
          </div>

          <div className="callout" style={{ marginBottom: "2.25rem" }}>
            <strong>Short answer:</strong> Pick <strong>Unraid</strong> if you want Docker apps alongside a NAS and would rather pay $69 than spend a weekend learning. Pick <strong>TrueNAS Scale</strong> if data integrity is your main concern. Pick <strong>Proxmox</strong> if you want to understand virtualization and have patience for it.
          </div>

          <div className="prose">
            <h2>Why three options exist</h2>
            <p>They solve different problems. Proxmox is a hypervisor: its job is running virtual machines and containers. Unraid is a NAS operating system with Docker added on top. TrueNAS is a storage OS built around ZFS, a file system that takes data integrity seriously in ways most alternatives don't.</p>
            <p>None of them is universally the best choice. The right one depends entirely on what you want your server to do.</p>

            <h2>Proxmox</h2>
            <p>Free, open source, built on Debian Linux. You install Proxmox and then install everything else inside it — a TrueNAS virtual machine for storage, a Debian VM with Docker for your apps, a Windows VM if you need it. Everything runs isolated from everything else.</p>
            <p>That flexibility is the appeal. It's also why Proxmox is not beginner-friendly. It does nothing useful out of the box. You have to build what you want on top of it, and that requires understanding at least the basics of virtualization and networking.</p>
            <p>Proxmox is worth it if you're interested in the technology itself, not just in getting Jellyfin running. The community is large and the documentation is thorough, but it assumes you're willing to read it.</p>
            <p><strong>Good fit if:</strong> You want to run multiple isolated systems, you're curious about virtualization, or you have enough hardware that the overhead matters.</p>

            <h2>Unraid</h2>
            <p>Costs $69 for a basic license, one-time. The most beginner-accessible of the three if you want Docker containers running alongside a NAS. The web interface is decent, the community is large, and it handles mismatched drive sizes well — you don't need to buy four identical drives.</p>
            <p>Storage works through parity drives rather than traditional RAID. One parity drive lets you recover from a single drive failure. This is not RAID 5, and understanding the difference matters before you rely on it.</p>
            <p>Unraid's app store (Community Applications) makes installing Docker containers close to one-click. Jellyfin, Immich, Vaultwarden, Nextcloud: find them, click install, fill in a few fields, done. That convenience is what you're paying $69 for.</p>
            <p><strong>Good fit if:</strong> You want a NAS that runs Docker apps without a steep learning curve, and you'd rather pay for a polished experience than figure it all out manually.</p>

            <h2>TrueNAS Scale</h2>
            <p>Free, runs on Linux. The whole system is built around ZFS, which checksums every block of data, detects bit rot, and lets you run regular scrubs to find and fix errors before they cause data loss. If you're storing photos you can't replace, ZFS is the serious answer.</p>
            <p>TrueNAS Scale has gotten better at running Docker apps through its Apps section, but it remains primarily a NAS OS. If containers are your main goal and storage is secondary, Unraid has a smoother experience.</p>
            <p><strong>Good fit if:</strong> Data integrity is your primary concern and you want purpose-built NAS software rather than a general virtualization platform.</p>

            <h2>What most beginners actually pick</h2>
            <p>One machine, running Jellyfin, Immich, and a few other containers: Unraid or plain Debian with Docker Compose. Unraid costs money and saves time. Debian is free and takes more setup. Most people starting out pick Unraid, get everything running in a weekend, and never feel a need to switch.</p>
          </div>

          <div style={{ overflowX: "auto", margin: "2rem 0" }}>
            <table className="ctable">
              <thead><tr><th></th><th>Proxmox</th><th>Unraid</th><th>TrueNAS Scale</th></tr></thead>
              <tbody>
                <tr><td style={{ fontWeight: 600, color: "var(--text-1)" }}>Cost</td><td>Free</td><td>$69 one-time</td><td>Free</td></tr>
                <tr><td style={{ fontWeight: 600, color: "var(--text-1)" }}>Beginner-friendly</td><td><span className="v-no">No</span></td><td><span className="v-yes">Yes</span></td><td><span className="v-maybe">Moderate</span></td></tr>
                <tr><td style={{ fontWeight: 600, color: "var(--text-1)" }}>Docker apps</td><td><span className="v-yes">Yes (in VMs)</span></td><td><span className="v-yes">Yes (native)</span></td><td><span className="v-maybe">Yes (improving)</span></td></tr>
                <tr><td style={{ fontWeight: 600, color: "var(--text-1)" }}>ZFS storage</td><td><span className="v-maybe">Via VM</span></td><td><span className="v-no">No</span></td><td><span className="v-yes">Built-in</span></td></tr>
                <tr><td style={{ fontWeight: 600, color: "var(--text-1)" }}>Mixed drive sizes</td><td><span className="v-maybe">Depends</span></td><td><span className="v-yes">Yes</span></td><td><span className="v-no">No</span></td></tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "3rem", padding: "1.35rem", background: "var(--bg-3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-4)", marginBottom: ".5rem" }}>Read next</p>
            <a href="/guides/docker-for-beginners" style={{ textDecoration: "none" }}>
              <p style={{ fontWeight: 700, fontSize: ".975rem", color: "var(--text-1)", marginBottom: ".2rem" }}>Docker for Normal People</p>
              <p style={{ fontSize: ".85rem", color: "var(--text-3)" }}>Every guide assumes you already know this. This one doesn't.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
