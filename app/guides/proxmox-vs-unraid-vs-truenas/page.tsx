"use client";
import { ArrowLeft, Server } from "lucide-react";

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-primary)", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "42rem", margin: "0 auto", padding: "6rem 1.5rem 4rem" }}>
        <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "2.5rem" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-secondary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <ArrowLeft size={14} /> Back to guides
        </a>

        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa", fontSize: "0.65rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", padding: "0.3rem 0.75rem", borderRadius: "9999px", marginBottom: "1.25rem" }}>
          <Server size={10} /> Most Requested
        </span>

        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Proxmox vs Unraid vs TrueNAS — Plain English
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "3rem" }}>
          Three operating systems for home servers. Three very different ideas about how a server should work.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "0.95rem" }}>
          <section>
            <h2 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>The short version</h2>
            <p>Proxmox is a hypervisor. Unraid is a NAS OS that runs Docker containers. TrueNAS is built around ZFS storage. Pick based on what you actually care about, not which one sounds most impressive.</p>
          </section>

          <section>
            <h2 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>Proxmox</h2>
            <p>Free, open source, and built on Debian. Its job is to run virtual machines and containers. You're not running apps directly on Proxmox — you're running a TrueNAS VM, or a Debian VM with Docker, or whatever you want inside it.</p>
            <p style={{ marginTop: "0.75rem" }}>That flexibility is the appeal. It's also the complexity. Proxmox doesn't do anything out of the box. You install it, and then you build whatever you want on top of it.</p>
            <p style={{ marginTop: "0.75rem" }}>Good fit if: you want to run multiple isolated systems, you're interested in learning virtualization, or you have enough hardware to justify the overhead.</p>
          </section>

          <section>
            <h2 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>Unraid</h2>
            <p>Paid ($60-$150 one-time license). The most beginner-accessible of the three if what you want is to run Docker containers alongside a NAS. The UI is decent, the community is large, and it handles mismatched drive sizes better than most alternatives.</p>
            <p style={{ marginTop: "0.75rem" }}>The parity drive setup is not RAID — data is striped with a parity drive that can recover from a single failure. Understand that before you rely on it.</p>
            <p style={{ marginTop: "0.75rem" }}>Good fit if: you want a NAS with Docker apps and you'd rather pay $60 than spend a weekend figuring out Proxmox.</p>
          </section>

          <section>
            <h2 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>TrueNAS</h2>
            <p>TrueNAS Core (FreeBSD) and TrueNAS Scale (Linux) are both free. TrueNAS Scale is the current focus for home users. It's built around ZFS, which is a file system that takes data integrity seriously in ways that ext4 and NTFS don't.</p>
            <p style={{ marginTop: "0.75rem" }}>If you're storing irreplaceable data — photos, documents, things you actually can't recreate — ZFS checksumming and regular scrubs are worth understanding. TrueNAS makes that accessible.</p>
            <p style={{ marginTop: "0.75rem" }}>Good fit if: storage reliability is your primary concern and you want a purpose-built NAS OS rather than a general virtualization platform.</p>
          </section>

          <section>
            <h2 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>What most beginners actually pick</h2>
            <p>If you have one machine and want to run Jellyfin, Immich, and a few other containers: Unraid or a plain Debian install with Docker Compose. Both work. Unraid costs money and saves you time; Debian is free and takes longer to set up.</p>
            <p style={{ marginTop: "0.75rem" }}>Proxmox is worth learning if you're genuinely interested in the technology. TrueNAS Scale is worth picking if data integrity matters more to you than container flexibility.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
