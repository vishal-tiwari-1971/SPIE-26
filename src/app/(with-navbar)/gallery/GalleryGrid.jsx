"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

const imageSets = {
  "prodyog-25": [
    "/gallery/prodyog-25/IMG_1402.JPG",
    "/gallery/prodyog-25/IMG_1328.JPG",
    "/gallery/prodyog-25/IMG_1369.JPG",
    "/gallery/prodyog-25/IMG_1424.JPG",
    "/gallery/prodyog-25/IMG_1455.JPG",
    "/gallery/prodyog-25/IMG_1194.JPG",
    "/gallery/prodyog-25/IMG_1197.JPG",
    "/gallery/prodyog-25/IMG_1205.JPG",
    "/gallery/prodyog-25/IMG_1246.JPG",
    "/gallery/prodyog-25/IMG_1251.JPG",
    "/gallery/prodyog-25/IMG_1278.JPG",
    "/gallery/prodyog-25/IMG_1304.JPG",
    "/gallery/prodyog-25/IMG_1311.JPG",
    "/gallery/prodyog-25/IMG_1473.JPG",
    "/gallery/prodyog-25/IMG_1496.JPG",
    "/gallery/prodyog-25/IMG_1515.JPG",
    "/gallery/prodyog-25/IMG_1587.JPG",
    "/gallery/prodyog-25/IMG_1591.JPG",
    "/gallery/prodyog-25/IMG_1729.JPG",
    "/gallery/prodyog-25/IMG_1739.JPG",
    "/gallery/prodyog-25/IMG_1755.JPG",
    "/gallery/prodyog-25/IMG_1791.JPG",
    "/gallery/prodyog-25/IMG_1803.JPG",
    "/gallery/prodyog-25/IMG_1968.JPG",
    "/gallery/prodyog-25/IMG_1975.JPG",
    "/gallery/prodyog-25/IMG_1997.JPG",
    "/gallery/prodyog-25/IMG_2161.JPG",
    "/gallery/prodyog-25/IMG_2186.JPG",
    "/gallery/prodyog-25/IMG_2202.JPG",
    "/gallery/prodyog-25/IMG_2228.JPG",
    "/gallery/prodyog-25/IMG_2242.JPG",
    "/gallery/prodyog-25/IMG_2429.JPG",
    "/gallery/prodyog-25/IMG_3064 (1).JPG",
    "/gallery/prodyog-25/DSC_0385.JPG",
    "/gallery/prodyog-25/DSC_0421.JPG",
    "/gallery/prodyog-25/DSC_0458.JPG",
    "/gallery/prodyog-25/DSC_0469.JPG",
    "/gallery/prodyog-25/DSC_0504.JPG",
    "/gallery/prodyog-25/DSC_0523 (1) (1).JPG",
    "/gallery/prodyog-25/DSC_0865.JPG",
    "/gallery/prodyog-25/DSC_0918.JPG",

    // add all Prodyog-25 images here
  ],
  "prodyog-24": [
    "/gallery/prodyog-24/IMG-1 (2).jpg",
    "/gallery/prodyog-24/IMG-2.jpg",
    "/gallery/prodyog-24/IMG-3.jpg",
    "/gallery/prodyog-24/IMG-4.jpg",
    "/gallery/prodyog-24/IMG-5.jpg",
    "/gallery/prodyog-24/IMG-6.jpg",
    "/gallery/prodyog-24/IMG-7.jpg",
    "/gallery/prodyog-24/IMG-8.jpg",
    "/gallery/prodyog-24/IMG-9.jpg",
    "/gallery/prodyog-24/IMG-10 (1).jpg",
    "/gallery/prodyog-24/IMG-11 (2).jpg",
    "/gallery/prodyog-24/IMG-12 (1).jpg",
    "/gallery/prodyog-24/IMG-13.jpg",
    "/gallery/prodyog-24/IMG-14 (1).jpg",
    "/gallery/prodyog-24/IMG-15.jpg",
    "/gallery/prodyog-24/IMG-16.jpg",
    "/gallery/prodyog-24/IMG-17.jpg",
    "/gallery/prodyog-24/IMG-18 (1).jpg",
    "/gallery/prodyog-24/IMG-19.jpg",
    "/gallery/prodyog-24/IMG-20.jpg",
    "/gallery/prodyog-24/IMG-21.jpg",
    "/gallery/prodyog-24/IMG-22.jpg",
    "/gallery/prodyog-24/IMG-23.jpg",
    "/gallery/prodyog-24/IMG-24 (1).jpg",
    // add all Prodyog-24 images here
  ],
};

export default function GalleryGrid() {
  const [selectedEvent, setSelectedEvent] = useState("prodyog-25");
  const [activeIndex, setActiveIndex] = useState(null);

  const images = imageSets[selectedEvent];

  // Generate random timestamp for security footage effect
  const generateTimestamp = () => {
    const now = new Date();
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  };

  return (
    <>
      {/* 🔽 DROPDOWN */}
      <div className="flex justify-end mb-6">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          style={{
            background: '#161315',
            color: '#F5F3F4',
            padding: '0.75rem 1.25rem',
            borderRadius: '4px',
            border: '2px solid #D90429',
            fontFamily: 'Courier Prime, monospace',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(217, 4, 41, 0.3)'
          }}
        >
          <option value="prodyog-25" style={{ background: '#0B090A' }}>
            OPERATION: PRODYOG-25
          </option>
          <option value="prodyog-24" style={{ background: '#0B090A' }}>
            OPERATION: PRODYOG-24
          </option>
        </select>

      </div>

            {/* 🖼 IMAGE GRID WITH CRT EFFECT + HOVER POP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className="
              crt-overlay group cursor-pointer
              overflow-hidden rounded-lg
              transition-all duration-300 ease-out
              hover:scale-[1.05]
              hover:-translate-y-1
              hover:shadow-[0_0_30px_rgba(255,183,3,0.4)]
            "
            style={{ 
              border: '1px solid rgba(255, 183, 3, 0.3)',
              background: 'linear-gradient(135deg, rgba(11, 9, 10, 0.8), rgba(20, 18, 19, 0.8))',
              position: 'relative',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 183, 3, 0.1)',
            }}
          >
            {/* Timestamp overlay removed to keep images clean (no labels) */}


            {/* 📸 IMAGE */}
              <Image
                src={src}
                alt={`Surveillance footage ${index + 1}`}
                width={500}
                height={350}
                className="
                  crt-image w-full h-full object-cover
                  transition-all duration-300
                  group-hover:filter-none
                "
                style={{
                  filter: 'grayscale(25%) contrast(1.15) brightness(0.95)',
                  aspectRatio: '16/11'
                }}
                priority={index < 3}
              />

          </div>
        ))}
      </div>


      {/* 🔍 LIGHTBOX */}
      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          setIndex={setActiveIndex}
          close={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}
