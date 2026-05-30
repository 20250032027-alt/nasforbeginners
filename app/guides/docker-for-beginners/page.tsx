import type { Metadata } from "next";
import { PageHeader } from "@/app/_guide-nav";
import { VideoEmbed } from "@/app/_video-embed";

export const metadata: Metadata = {
  title: "Docker for Normal People",
  description: "Every home server guide assumes you already know Docker. This one explains it from scratch: containers, images, volumes, ports, and Docker Compose.",
};

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh", color: "var(--text-1)", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <PageHeader />
      <main id="main" style={{ padding: "3rem 1.5rem 6rem" }}>
        <div className="wrap-prose">
          <nav className="bc" style={{ marginBottom: "2rem" }}><a href="/">Home</a> / <a href="/#guides">Guides</a> / <span>Docker for Beginners</span></nav>

          <p style={{ fontSize: ".62rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", marginBottom: ".875rem" }}>Docker</p>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-.025em", color: "var(--text-1)", marginBottom: ".75rem" }}>Docker for Normal People</h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-2)", marginBottom: ".75rem", lineHeight: 1.7 }}>Every guide assumes you already know this. This one doesn't.</p>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "2.25rem", paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>8 min read</span>
            <span style={{ color: "var(--border-2)" }}>|</span>
            <span style={{ fontSize: ".75rem", color: "var(--text-4)" }}>Last updated May 2026</span>
          </div>

          <div className="callout" style={{ marginBottom: "2.25rem" }}>
            <strong>One sentence:</strong> Docker runs apps in isolated boxes so they can't interfere with each other, and you can start, stop, update, or delete any one of them without touching anything else on your system.
          </div>

          <div className="prose">
            <h2>Why Docker exists</h2>
            <p>Before Docker, installing an app on a server meant installing its dependencies directly onto your operating system. App A needs Python 3.8. App B needs Python 3.11. They conflict. One breaks. You spend an afternoon figuring out why.</p>
            <p>Docker solves this by packaging each app with everything it needs: the right Python version, its libraries, its config files. All of it. The package is called a container. Containers run in isolation from each other and from the rest of your system.</p>

            <h2>Containers vs virtual machines</h2>
            <p>A virtual machine is a full copy of an operating system running inside your operating system. It's isolated, but it's heavy: each VM might use 2GB of RAM just for the OS overhead.</p>
            <p>A Docker container shares your existing OS kernel. It's much lighter. You can run 10 containers on hardware that would struggle with 3 virtual machines. For running apps like Jellyfin or Immich, containers are almost always the right choice.</p>

            <h2>The vocabulary you'll see everywhere</h2>
            <p><strong>Image:</strong> A blueprint for a container. The Jellyfin image contains everything needed to run Jellyfin. You download it once; it lives on disk until you remove it.</p>
            <p><strong>Container:</strong> A running instance of an image. You can run the same image as multiple containers, though for home servers you usually run one of each app.</p>
            <p><strong>Volume:</strong> A folder on your actual hard drive that the container can read and write. This is where your data lives. When you delete or update a container, the volume stays untouched.</p>
            <p><strong>Port:</strong> Containers are isolated, so they need explicit permission to accept traffic from your browser. You map a port on your machine to a port inside the container. Jellyfin runs on port 8096 inside the container; you map your machine's port 8096 to it, then go to <code>http://yourserverip:8096</code>.</p>
            <p><strong>Docker Compose:</strong> Instead of typing a long command every time you start a container, you write a <code>docker-compose.yml</code> file that describes everything the container needs. One command starts it all.</p>

            <h2>A real example</h2>
            <p>Here is a minimal Docker Compose file for Jellyfin:</p>
          </div>

          <div className="code-block">
            <pre>{`services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    ports:
      - "8096:8096"
    volumes:
      - /opt/jellyfin/config:/config
      - /mnt/media:/media
    restart: unless-stopped`}</pre>
          </div>

          <div className="prose">
            <p>Line by line: use the official Jellyfin image, call the container "jellyfin", expose port 8096, store config in <code>/opt/jellyfin/config</code> on your drive, point it at your media folder, and restart automatically if the server reboots.</p>
            <p>Save that file, run <code>docker compose up -d</code> from the same folder, and Jellyfin is running. No installer, no wizard, no package conflicts.</p>

            <h2>What "restart: unless-stopped" means</h2>
            <p>The container will restart automatically when your server reboots, unless you explicitly stopped it yourself. This is what you want for apps you run permanently. Without it, you'd have to manually start every container after a reboot.</p>

            <h2>Updating a container</h2>
            <p>Pull the new image, then recreate the container:</p>
          </div>

          <div className="code-block">
            <pre>{`docker compose pull
docker compose up -d`}</pre>
          </div>

          <div className="prose">
            <p>Your data (in volumes) is untouched. The container gets the new version. That's the whole update process for most apps.</p>
            <h2>If you use Unraid</h2>
            <p>Unraid has a built-in GUI for Docker. You fill out a form, it generates the compose-equivalent config for you. You rarely write a compose file by hand. That's most of what you're paying $69 for: a web interface that makes Docker approachable without touching a terminal.</p>
          </div>

          
          <VideoEmbed
            videoId="VcDQgAwgMyg"
            title="How to Start Self-Hosting in 2026 | Linux & Docker Beginner Roadmap"
            channel="SysAdminHub"
            note="Published December 2025. Covers the full path from installing Docker to running your first containers — picks up right where this guide leaves off."
          />
          <div style={{ marginTop: "3rem", padding: "1.35rem", background: "var(--bg-3)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "var(--text-4)", marginBottom: ".5rem" }}>Read next</p>
            <a href="/guides/immich-setup-guide" style={{ textDecoration: "none" }}>
              <p style={{ fontWeight: 700, fontSize: ".975rem", color: "var(--text-1)", marginBottom: ".2rem" }}>Replace Google Photos with Immich</p>
              <p style={{ fontSize: ".85rem", color: "var(--text-3)" }}>Your first real Docker container. This one is worth it.</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
