import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandra Kawombe — Software Engineer",
  description:
    "Sandra Kawombe — full-stack software engineer building elegant React + Python products. Portfolio, projects, and contact.",
  keywords: ["Sandra Kawombe", "software engineer", "React", "Python", "FastAPI", "full-stack"],
  authors: [{ name: "Sandra Kawombe", url: "https://github.com/sandrakawombe" }],
  openGraph: {
    title: "Sandra Kawombe — Software Engineer",
    description: "Full-stack engineer building elegant React + Python products.",
    type: "website",
    url: "https://sandra-portfolio.vercel.app",
    siteName: "Sandra Kawombe",
  },
  twitter: { card: "summary_large_image", title: "Sandra Kawombe — Software Engineer" },
  themeColor: "#FBF6EF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${mono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
