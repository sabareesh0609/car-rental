import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/providers/auth-provider";
import { SonnerProvider } from "@/components/providers/sonner-provider";
import { getSessionUser } from "@/lib/auth";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "DriveEase — Car Rental",
    template: "%s | DriveEase",
  },
  description: "Find and book your perfect rental car.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();

  return (
    <html lang="en" className={cn("font-sans", geistSans.variable)}>
      <body className="min-h-screen antialiased">
        <AuthProvider user={user}>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <SonnerProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
