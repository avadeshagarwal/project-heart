import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Configure standard sans-serif font
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Configure serif font for special elements (letters, headings)
const fontSerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Project Heart | Unforgettable Digital Experiences",
    template: "%s | Project Heart",
  },
  description: "Create unforgettable digital experiences for the people you love. Turn memories into stories.",
  keywords: ["gifts", "digital experience", "memories", "anniversary", "birthday"],
  authors: [{ name: "Project Heart" }],
  creator: "Project Heart",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://projectheart.app",
    title: "Project Heart",
    description: "Create unforgettable digital experiences for the people you love.",
    siteName: "Project Heart",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Heart",
    description: "Create unforgettable digital experiences for the people you love.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSerif.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
        {children}
      </body>
    </html>
  );
}
