import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Home | Second Life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
