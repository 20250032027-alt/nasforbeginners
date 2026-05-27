import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description: "Why NASforBeginners exists and who it is for.",
};
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", fontFamily: "'Lora', Georgia, serif" }}>
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 1.5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", height: "3.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "var(--ink)", textDecoration: "none", letterSpacing: "-0.02em" }}>NASforBeginners</a>
          <a href="/#guides" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.82rem", color: "var(--ink-3)", textDecoration: "none" }}>All guides</a>
        </div>
      </header>
      <main id="main" style={{ padding: "3.5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: "2rem" }}>About</h1>
          <div className="prose">
            <p>The r/homeserver subreddit gets the same beginner posts every week. Not because people are lazy — because most existing documentation assumes you already know what you are doing. The official Proxmox wiki is not written for someone who just bought a used mini PC off eBay.</p>
            <p>Every guide on this site starts from a real cluster of posts: actual questions, actual confusion, actual mistakes people made. The content is driven by what the community actually struggles with.</p>
            <p>NASforBeginners is not affiliated with Reddit, Proxmox, Unraid, TrueNAS, Jellyfin, or any hardware manufacturer. There are no sponsored posts. If we recommend something, it is because it is genuinely the right answer for beginners.</p>
            <h2>Who is this for?</h2>
            <p>Someone who has decided they want to stop paying for cloud storage, or wants to run their own Jellyfin server, or saw a Reddit post about Immich and wants to try it. Someone who has a mini PC or a spare laptop and does not know where to start.</p>
            <p>Not for enterprise sysadmins. Not for people who already know what they are doing. For people who are actually new to this.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
