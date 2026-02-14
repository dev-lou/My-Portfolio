import type { Metadata } from "next";
import { Space_Grotesk, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Lou Vincent Baroro | Creative Developer",
  description: "Portfolio of Lou Vincent Baroro — AI augmented full-stack developer crafting modern web, mobile, and blockchain applications.",
  keywords: ["Lou Vincent Baroro", "portfolio", "developer", "web development", "mobile apps", "AI", "blockchain", "creative"],
  openGraph: {
    title: "Lou Vincent Baroro | Creative Developer",
    description: "AI augmented full-stack developer crafting modern digital experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${bebasNeue.variable} antialiased bg-[#0a0a0a]`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
