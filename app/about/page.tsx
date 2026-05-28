import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";
export const metadata: Metadata = { title: "About", description: "Why NASforBeginners exists and who it is for." };
export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <h1 style={{ fontWeight: 800, fontSize: "2.25rem", letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: "2rem" }}>About</h1>
          <div className="prose">
            <p>r/homeserver gets the same beginner posts every week. Not because people are lazy — because most documentation assumes you already know what you're doing. The official Proxmox wiki is not written for someone who just picked up a used mini PC.</p>
            <p>Every guide on this site starts from a real cluster of posts: actual questions, actual confusion, actual mistakes people made. NASforBeginners is not affiliated with Reddit, Proxmox, Unraid, or any hardware vendor. There are no sponsored posts, no affiliate links.</p>
            <h2>Who this is for</h2>
            <p>Someone who wants to replace Google Photos with Immich, or run their own Jellyfin server, or saw a Reddit post about self-hosting and wants to try it. Someone who has a mini PC or a spare laptop and doesn't know where to start. Not enterprise sysadmins. Not people who already know the answers.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
