import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NASforBeginners — Plain-English Home Server Guides",
  description: "Build your first home server without drowning in enterprise docs. Guides for Proxmox, Jellyfin, Immich, Docker, and more — written for actual beginners.",
  keywords: "NAS, home server, Proxmox, Jellyfin, Immich, Docker, beginner, self-hosting, TrueNAS, Unraid",
  openGraph: {
    title: "NASforBeginners",
    description: "Plain-English home server setup guides.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
