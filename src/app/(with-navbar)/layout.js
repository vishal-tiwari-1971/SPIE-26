import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function WithNavbarLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    <Footer/>
    </>
  );
}
