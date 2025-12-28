import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import RecIndicator from "@/components/RecIndicator";

export default function WithNavbarLayout({ children }) {
  return (
    <>
      <RecIndicator />
      <Navbar />
      {children}
      <Footer/>
    </>
  );
}
