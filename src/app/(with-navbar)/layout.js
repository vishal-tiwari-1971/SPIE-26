import Navbar from "@/components/navbar";

export default function WithNavbarLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
