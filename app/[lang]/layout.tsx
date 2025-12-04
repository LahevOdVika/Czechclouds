import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import React from "react";

import { Providers } from "./providers";

import NavbarComponent from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/app/[lang]/dictionaries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextcloud Solutions",
  description: "Secure, self-hosted cloud solutions for your business.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dist = await getDictionary(lang as "en" | "cs" | "de");

  return (
    <html suppressHydrationWarning lang={lang}>
      <body className={`${inter.className} text-foreground`}>
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <NavbarComponent params={{ dist, lang }} />
            <main className="flex-grow">{children}</main>
            <Footer params={{ dist, lang }} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
