import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "SPIE-2026",
  description: "Event registration and dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
