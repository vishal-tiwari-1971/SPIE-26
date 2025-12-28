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
    <>
      {/* <RecIndicator /> */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}