import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GoogleOAuthProvider } from '@react-oauth/google';


export const metadata = {
  title: "SPIE-2026",
  description: "Event registration and dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className="min-h-screen flex flex-col bg-[#0b1220]">
        
        {/* Navbar at top */}
        // <Navbar />

        {/* Main content grows and pushes footer down */}
        <main className="flex-1">
           <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {children}
        </GoogleOAuthProvider>
        </main>

        {/* Footer appears ONLY at end of page */}
        <Footer />

      </body>
    </html>
  );
}
