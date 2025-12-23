// export default function HomePage() {
//   const highlights = [
//     "Flagship tech symposium of 2026",
//     "Workshops, panels, and student showcases",
//     "Built for innovators, designers, and researchers",
//   ];

//   return (
//     <main className="page-shell" id="home">
//       <section className="hero">
//         <p className="chip">Dive into SPIE</p>
//         <h1>Build with a community that ships fast.</h1>
//         <p>
//           Connect with students across disciplines, ship projects during the fest, and share your
//           work with peers and mentors. Explore our curated events to level up your craft.
//         </p>

//         <div className="pill-row" style={{ marginTop: "1.25rem" }}>
//           <a className="btn primary" href="/events">
//             View Events
//           </a>
//           <a className="btn secondary" href="/team">
//             Meet the Team
//           </a>
//         </div>
//       </section>

//       <section className="section">
//         <div className="section-header">
//           <div>
//             <p className="subtitle">Why join</p>
//             <h2 className="section-title">Experience the SPIE advantage</h2>
//           </div>
//         </div>

//         <div className="card-grid">
//           {highlights.map((text, index) => (
//             <div key={index} className="card list-item">
//               <span className="list-accent" />
//               <span>{text}</span>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

import Hero from "@/components/home/Hero";
import Authority from "@/components/home/Authority";
import Bridge from "@/components/home/Bridge";
import Prodyog from "@/components/home/Prodyog";
import Events from "@/components/home/Events";
import Gallery from "@/components/home/Gallery";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Authority />
      <Bridge />
      <Prodyog />
      <Events />
      <Gallery />
    </>
  );
}
