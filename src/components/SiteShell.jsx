"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import RecIndicator from "@/components/RecIndicator";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return children;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* <RecIndicator /> */}
      <Navbar />
      <div style={{ flex: 1, marginTop: "100px" }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}