import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";

const MONTSERRAT = Montserrat({
  variable: "--font-montserrat",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Meet",
  description: "Online meet with AI Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${MONTSERRAT.variable}  antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
