import GalleryGrid from "./GalleryGrid";

export default function GalleryPage() {
  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <div className="confidential-banner">
        ▸ SURVEILLANCE FOOTAGE ▸ SECURITY CLEARANCE REQUIRED ▸
      </div>
      
      <h1 style={{ 
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '2.5rem',
        textAlign: 'center',
        marginTop: '2rem',
        marginBottom: '2rem',
        color: '#FFB703',
        letterSpacing: '0.15em'
      }}>
        ARCHIVED SURVEILLANCE: OPERATION SPIE
      </h1>
      
      <p style={{
        textAlign: 'center',
        fontFamily: 'Courier Prime, monospace',
        color: '#B1A7A6',
        marginBottom: '2rem'
      }}>
        Security camera footage from previous reconnaissance missions. All timestamps are encrypted.
      </p>

      <GalleryGrid />
    </section>
  );
}
