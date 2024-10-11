import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/component/Footer";
import Header from "@/components/component/Header";
import { ClerkProvider } from "@clerk/nextjs";
import CreateEvent from "@/components/component/CreateEvent";

export const metadata = {
  title: "ChronoHub",
  description: "Free to meet everyone at anytime",
};

const interFont = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={interFont.className}>
          {/* Header */}
          <Header />
          <main className=" min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>
          {/* Footer */}
          <Footer />

          {/* CreateEventDrawer */}
          <CreateEvent />
        </body>
      </html>
    </ClerkProvider>
  );
}
