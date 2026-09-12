import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { site, siteUrl, asset } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: { default: site.title, template: "%s — Coda Agency" },
  description: site.description,
  alternates: { canonical: `${siteUrl}/` },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  openGraph: { type: "website", locale: "fr_MA", siteName: site.name, url: `${siteUrl}/`, title: site.title, description: site.description, images: [{url:`${siteUrl}/assets/social/coda-og.jpg`,width:1200,height:630,alt:"Coda Agency — Création de sites web au Maroc"}] },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [`${siteUrl}/assets/social/coda-og.jpg`] },
  icons: { icon: [{ url: asset("favicon/favicon.svg"), type: "image/svg+xml" }], apple: asset("favicon/apple-touch-icon.png") },
  manifest: asset("favicon/site.webmanifest"),
};
export const viewport: Viewport = { themeColor: "#F8F4E9", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className={GeistSans.variable}><body>{children}</body></html>;
}
