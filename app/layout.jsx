import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata = {
  title: "EnScribe — Generate charts with one click",
  description:
    "EnScribe frees up time in your day so you can care about what matters most — your patients.",
  icons: {
    icon: "/enscribe-icon.svg",
  },
};

export const viewport = {
  themeColor: "#183278",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen bg-[#F9FAFF] font-sans text-[#183278] antialiased">
        {children}
      </body>
    </html>
  );
}
