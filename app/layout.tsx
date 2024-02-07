import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { Client } from "@/components/Client";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Anchor UI",
  description: "UI to interact with your Anchor Program with IDL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        <Client>{children}</Client>
      </body>
    </html>
  );
}
