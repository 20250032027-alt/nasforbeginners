import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nasforbeginners.com"),
  title: {
    template: "%s | NASforBeginners",
    default: "NASforBeginners — Home Server Guides That Actually Make Sense",
  },
  description: "You want to stop paying for Google Photos and Netflix. A home server can do that. Here is how to build one without a computer science degree.",
  keywords: "home server, NAS beginner, Proxmox guide, Jellyfin vs Plex, Immich setup, self-hosting, N100 mini PC, Docker home server",
  openGraph: {
    siteName: "NASforBeginners",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "NASforBeginners",
  "url": "https://nasforbeginners.com",
  "description": "Plain-English home server setup guides for beginners.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://nasforbeginners.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NASforBeginners",
  "url": "https://nasforbeginners.com",
  "description": "Plain-English home server setup guides for beginners."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
