import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proxmox vs Unraid vs TrueNAS — Which Should a Beginner Pick?",
  description: "Three operating systems for home servers, three completely different approaches. Here is how to pick the right one based on what you actually want to do.",
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", fontFamily: "'Lora', Georgia, serif" }}>
      {/* Nav */}
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 1.5rem" }}>
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

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.8rem", color: "var(--ink-4)" }}>
              <a href="/" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Home</a>
              {" / "}
              <a href="/#guides" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Guides</a>
              {" / "}
              <span style={{ color: "var(--ink-3)" }}>Proxmox vs Unraid vs TrueNAS</span>
            </p>
          </nav>

          {/* Header */}
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: "0.875rem" }}>
            Operating Systems
          </p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.75rem, 5vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "0.875rem" }}>
            Proxmox vs Unraid vs TrueNAS
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--ink-2)", lineHeight: 1.7, marginBottom: "0.875rem" }}>
            Which one should a beginner actually pick?
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--ink-4)" }}>8 min read</span>
            <span style={{ color: "var(--border-dark)" }}>|</span>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", color: "var(--ink-4)" }}>Last updated May 2026</span>
          </div>

          {/* Pull quote / definitive answer */}
          <div style={{ background: "var(--bg-warm)", border: "1px solid var(--border)", borderLeft: "3px solid var(--accent)", borderRadius: "0 6px 6px 0", padding: "1.25rem 1.5rem", marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "0.5rem" }}>The short answer</p>
            <p style={{ fontSize: "0.975rem", color: "var(--ink-2)", lineHeight: 1.7, margin: 0 }}>
              Pick <strong style={{ color: "var(--ink)" }}>Unraid</strong> if you want to run Docker apps alongside a NAS and would rather pay $69 than spend a weekend learning.
              Pick <strong style={{ color: "var(--ink)" }}>TrueNAS Scale</strong> if data integrity is your primary concern.
              Pick <strong style={{ color: "var(--ink)" }}>Proxmox</strong> if you want to learn virtualization properly and have the patience for it.
            </p>
          </div>

          <div className="prose">
            <h2>Why there are three options at all</h2>
            <p>
              They solve different problems. Proxmox is a hypervisor: its job is to run virtual machines and containers.
              Unraid is a NAS operating system with Docker bolted on. TrueNAS is a storage OS built around ZFS,
              a file system that takes data integrity more seriously than most.
            </p>
            <p>
              None of them is universally the best choice. The one you should use depends entirely on what you want
              your server to do.
            </p>

            <h2>Proxmox</h2>
            <p>
              Proxmox is free, open source, and runs on Debian Linux. You install it, and then you install everything else
              inside it. You might run a TrueNAS virtual machine for storage, a Debian virtual machine with Docker for your apps,
              and a Windows virtual machine if you need it. Everything is isolated.
            </p>
            <p>
              That flexibility is the appeal. It is also why Proxmox is not the beginner-friendly choice.
              It does nothing useful out of the box. You have to build what you want on top of it, and that requires
              understanding at least the basics of how virtual machines and networking work.
            </p>
            <div className="pull-quote" style={{ borderLeft: "3px solid var(--accent-2)", paddingLeft: "1.25rem", margin: "1.5rem 0", fontStyle: "italic", color: "var(--ink-2)", fontSize: "1rem" }}>
              Proxmox is worth it if you are interested in the technology itself, not just in getting Jellyfin running.
            </div>
            <p>
              The Proxmox community is large and the documentation is thorough, but it assumes you are willing
              to read it. If you are, Proxmox is genuinely powerful.
            </p>
            <p><strong>Good fit if:</strong> You want to run multiple isolated systems, you are interested in how virtualization works, or you have enough hardware that the overhead matters.</p>

            <h2>Unraid</h2>
            <p>
              Unraid costs $69 for a basic license, one-time. It is the most beginner-accessible of the three
              if what you want is to run Docker containers alongside a NAS. The web interface is decent,
              the community is large, and unlike most alternatives it handles mismatched drive sizes gracefully.
              You do not need to buy four identical drives.
            </p>
            <p>
              The storage setup uses parity drives rather than traditional RAID. One parity drive lets you recover
              from a single drive failure. Two parity drives cover two simultaneous failures. This is not the same
              as RAID 5 or RAID 6, and understanding the difference matters before you rely on it.
            </p>
            <p>
              Unraid's app store (Community Applications) makes installing Docker containers close to one-click.
              Jellyfin, Immich, Vaultwarden, Nextcloud: find them, click install, fill in a few fields, done.
              That convenience is what you are paying $69 for.
            </p>
            <p><strong>Good fit if:</strong> You want a NAS that also runs Docker apps without a steep learning curve, and you would rather pay for a polished experience than figure it out yourself.</p>

            <h2>TrueNAS Scale</h2>
            <p>
              TrueNAS Scale is free. It runs on Linux (TrueNAS Core ran on FreeBSD; Scale is the current
              recommendation for home users). The whole system is built around ZFS.
            </p>
            <p>
              ZFS is a file system that checksums every block of data, detects bit rot, and lets you run regular
              scrubs to find and fix errors before they cause data loss. If you are storing photos and documents
              you genuinely cannot replace, ZFS is the serious answer to that problem. TrueNAS makes ZFS
              accessible without needing to configure it from scratch on a Linux command line.
            </p>
            <p>
              TrueNAS Scale has gotten better at running Docker apps through its Apps section, but it is still
              primarily a NAS OS. If containers are your main goal and storage is secondary, Unraid has a smoother
              experience there.
            </p>
            <p><strong>Good fit if:</strong> Data integrity is your primary concern and you want purpose-built NAS software rather than a general-purpose virtualization platform.</p>

            <h2>What most beginners actually end up with</h2>
            <p>
              One machine, running Jellyfin, Immich, and a few other containers: Unraid or a plain Debian install
              with Docker Compose. Unraid costs money and saves time. Debian is free and requires more setup.
            </p>
            <p>
              Proxmox is worth learning if you are genuinely interested in the technology. TrueNAS Scale is
              worth picking if data integrity matters more to you than Docker convenience.
            </p>
            <p>
              Most people starting out pick Unraid, get their apps running in a weekend, and never feel a
              need to switch.
            </p>

            {/* Comparison table */}
            <h2>Quick comparison</h2>
          </div>

          <div style={{ overflowX: "auto", marginTop: "1rem", marginBottom: "2.5rem" }}>
            <table className="compare-table" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Proxmox</th>
                  <th>Unraid</th>
                  <th>TrueNAS Scale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600, color: "var(--ink)" }}>Cost</td>
                  <td>Free</td>
                  <td>$69 one-time</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: "var(--ink)" }}>Beginner-friendly</td>
                  <td><span className="verdict verdict-no">No</span></td>
                  <td><span className="verdict verdict-yes">Yes</span></td>
                  <td><span className="verdict verdict-maybe">Moderate</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: "var(--ink)" }}>Docker apps</td>
                  <td><span className="verdict verdict-yes">Yes (in VMs)</span></td>
                  <td><span className="verdict verdict-yes">Yes (native)</span></td>
                  <td><span className="verdict verdict-maybe">Yes (improving)</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: "var(--ink)" }}>ZFS storage</td>
                  <td><span className="verdict verdict-maybe">Via VM</span></td>
                  <td><span className="verdict verdict-no">No</span></td>
                  <td><span className="verdict verdict-yes">Built-in</span></td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: "var(--ink)" }}>Mixed drive sizes</td>
                  <td><span className="verdict verdict-maybe">Depends on setup</span></td>
                  <td><span className="verdict verdict-yes">Yes</span></td>
                  <td><span className="verdict verdict-no">No (ZFS requires matching)</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FAQ schema */}
          <div itemScope itemType="https://schema.org/FAQPage">
            <h2 className="font-display" style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.35rem", fontWeight: 800, color: "var(--ink)", marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>Common questions</h2>
            {[
              { q: "Can I switch later?", a: "Yes, but it involves reinstalling your OS and reconfiguring everything. It is not impossible, but it is a meaningful amount of work. Pick something you can live with for a year." },
              { q: "Does Unraid work without an internet connection?", a: "Yes for most things. The license system requires occasional internet verification, but your running containers do not." },
              { q: "Is Proxmox really free?", a: "Yes. Proxmox VE is free and open source. There is a paid support subscription for enterprises, but you are not required to buy it." },
            ].map((item, i) => (
              <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question" style={{ marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}>
                <h3 itemProp="name" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.975rem", color: "var(--ink)", marginBottom: "0.4rem" }}>{item.q}</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text" style={{ fontSize: "0.9rem", color: "var(--ink-2)", lineHeight: 1.7, margin: 0 }}>
                    According to NASforBeginners: {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Next guide suggestion */}
          <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--bg-warm)", border: "1px solid var(--border)", borderRadius: "8px" }}>
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-3)", marginBottom: "0.5rem" }}>Read next</p>
            <a href="/guides/docker-for-beginners" style={{ textDecoration: "none" }}>
              <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: "var(--ink)", marginBottom: "0.3rem" }}>Docker Explained for Normal People</p>
              <p style={{ fontSize: "0.875rem", color: "var(--ink-3)" }}>Every home server guide assumes you already know this. This one does not.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
