import type { Metadata } from "next";
export const metadata: Metadata = { title: "About", description: "Why NASforBeginners exists and who it is written for." };
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <header className="guide-header"><div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "3.5rem" }}>
        <a href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: ".9rem", color: "var(--text-1)", textDecoration: "none" }}>NASforBeginners</a>
        <a href="/#guides" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".8rem", color: "var(--text-3)", textDecoration: "none" }}>Guides</a>
      </div></header>
      <main id="main" style={{ padding: "4rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <h1 className="display" style={{ fontSize: "2.5rem", color: "var(--text-1)", marginBottom: "2rem" }}>About</h1>
          <div className="prose">
            <p>r/homeserver gets the same beginner posts every week. Not because people are lazy — because most documentation assumes you already know what you're doing. The official Proxmox wiki is not written for someone who just bought a used mini PC off eBay.</p>
            <p>Every guide on this site starts from a real cluster of posts: actual questions, actual confusion, actual mistakes people made. NASforBeginners is not affiliated with Reddit, Proxmox, Unraid, or any hardware vendor. There are no sponsored posts.</p>
            <h2>Who this is for</h2>
            <p>Someone who wants to replace Google Photos with Immich, or run their own Jellyfin server, or saw a Reddit post about self-hosting and wants to try it. Someone who has a mini PC or a spare laptop and doesn't know where to start. Not enterprise sysadmins. Not people who already know what they're doing.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
