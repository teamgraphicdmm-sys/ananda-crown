import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/^\/+|\/+$/g, "") ?? "";
const iconPrefix = basePath ? `/${basePath}` : "";

export const metadata: Metadata = {
  metadataBase: new URL("https://anandacrownmohali.com"),
  title: "Ananda Crown | Sector 78 Mohali - Ultra Luxury Residences",
  description:
    "Ananda Crown Sector 78 Mohali - A new pinnacle of royal living featuring ultra-luxury 3, 4 & 5 BHK palatial residences, 600 ft frontage, 11.5 ft ceilings, and bespoke private skydecks.",
  keywords: [
    "Ananda Crown",
    "Ananda Crown Mohali",
    "Sector 78 Mohali luxury apartments",
    "Ananda Group Mohali",
    "luxury flats in Mohali",
    "3 BHK luxury Mohali",
    "4 BHK luxury Mohali",
    "penthouses Mohali",
  ],
  openGraph: {
    title: "Ananda Crown | Sector 78 Mohali - Ultra Luxury Residences",
    description:
      "Comfort, elegance and royal architecture at Sector 78 Mohali. Discover limited edition high-rise sky residences.",
    images: [`${iconPrefix}/images/ananda-building.png`],
  },
  icons: {
    icon: [
      { url: `${iconPrefix}/favicon.ico` },
      { url: `${iconPrefix}/favicon-32x32.png`, sizes: "32x32", type: "image/png" },
      { url: `${iconPrefix}/favicon-16x16.png`, sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: `${iconPrefix}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="bg-[#180E09] text-[#F3ECE6] antialiased selection:bg-[#C5A880] selection:text-[#120902]">
        {children}
      </body>
    </html>
  );
}
