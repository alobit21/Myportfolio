"use client"; // Mark as Client Component for AOS and Theme

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "CodeMac",
  description: "Personal portfolio of CodeMac - Web Developer",
};

// Create a client component that wraps the app with ThemeProvider
function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering the theme after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={inter.className} suppressHydrationWarning>{children}</div>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className={`${inter.className} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        {children}
      </div>
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animations trigger only once
      easing: "ease-out", // Smooth easing for animations
      mirror: false, // Prevent animations when scrolling up
    });

    // Refresh AOS on route changes
    AOS.refresh();

    // Cleanup (optional, resets AOS on unmount)
    return () => {
      AOS.refreshHard();
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <div className="border-t border-gray-300 bg-gray-900"></div>
          <Footer />
        </ThemeWrapper>
      </body>
    </html>
  );
}