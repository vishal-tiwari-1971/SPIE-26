import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing-full">
      <div className="landing-video" aria-hidden="true">
        <video
          className="landing-video-el"
          autoPlay
          loop
          playsInline
          poster="/media/landing-poster.jpg"
        >
          <source src="/Prodyog bg .mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      <Link className="explore-btn" href="/home" aria-label="Go to the home page">
        Explore
        <span className="right-arrow">→</span>
      </Link>
    </main>
  );
}
