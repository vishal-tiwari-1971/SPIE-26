import Link  from "next/link";
import ProdyogUHD from "@/components/home/ProdyogUHD";
export default function Hero() {
  return (
    <section className="hero-section" style={{
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      padding: '2rem',
      overflow: 'hidden'
    }}>
      <div className="hero-content" style={{ zIndex: 2, maxWidth: '700px' }}>
        {/* <div className="hero-badge" style={{
          background: '#D90429',
          color: '#F5F3F4',
          fontFamily: 'Bebas Neue, sans-serif',
          letterSpacing: '2px',
          padding: '0.5rem 1.5rem',
          display: 'inline-block',
          marginBottom: '1rem',
          border: '2px solid #FFB703',
          boxShadow: '0 0 20px rgba(217, 4, 41, 0.5)'
        }}>
          
        </div> */}
        <h1 className="hero-title" style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '4rem',
          color: '#F5F3F4',
          letterSpacing: '4px',
          marginBottom: '1rem',
          textShadow: '0 0 30px rgba(217, 4, 41, 0.7)'
        }}>
          Society of Production & Industrial Engineering
        </h1>
        <p className="hero-subtitle" style={{
          fontFamily: 'Courier Prime, monospace',
          fontSize: '1.3rem',
          color: '#FFB703',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          The Master Plan: Academia × Industry
        </p>
        <p className="hero-description" style={{
          fontFamily: 'Courier Prime, monospace',
          color: '#B1A7A6',
          fontSize: '1rem',
          lineHeight: '1.8',
          marginBottom: '2rem'
        }}>
          The Society of Production & Industrial Engineering (SPIE) is the academic and professional forum of the PIE Department at NIT Jamshedpur.
          SPIE works to bridge the gap between academia and industry through technical events, workshops, competitions, guest lectures, and hands-on initiatives that prepare students for real-world engineering and management challenges.
        </p>
        
        <div className="hero-actions" style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
          <Link href="/register" className="btn-primary" style={{
            background: '#D90429',
            color: '#F5F3F4',
            padding: '1rem 2rem',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.2rem',
            letterSpacing: '2px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '2px solid #FFB703',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(217, 4, 41, 0.5)'
          }}>
            <span>Join SPIE</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          {/* <a href="/events" className="btn-secondary" style={{
            background: 'transparent',
            color: '#FFB703',
            padding: '1rem 2rem',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.2rem',
            letterSpacing: '2px',
            textDecoration: 'none',
            border: '2px solid #FFB703',
            transition: 'all 0.3s ease'
          }}>
            VIEW TARGETS
          </a> */}
        </div>


       </div> 

      <ProdyogUHD />
    </section>
  );
}
