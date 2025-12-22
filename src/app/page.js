"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function LandingPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
    };

    const handlePlaying = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);

    // Fallback in case video doesn't load
    const timeout = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 5000);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="landing-full">
      {!isVideoLoaded && (
        <div className="video-loader">
          <div className="loader-spinner"></div>
          <p>Loading experience...</p>
        </div>
      )}

      <div className="landing-video" aria-hidden="true" style={{ opacity: isVideoLoaded ? 1 : 0 }}>
        <video
          ref={videoRef}
          className="landing-video-el"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/landing-poster.jpg"
        >
          <source src="/Prodyog bg .mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      <Link 
        className="explore-btn" 
        href="/home" 
        aria-label="Go to the home page"
        style={{ opacity: isVideoLoaded ? 1 : 0, pointerEvents: isVideoLoaded ? "auto" : "none" }}
      >
        Explore
        <span className="right-arrow">→</span>
      </Link>
    </main>
  );
}
