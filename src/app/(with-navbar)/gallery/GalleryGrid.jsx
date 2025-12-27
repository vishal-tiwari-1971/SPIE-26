"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

const images = [
    "/gallery/IMG-1.jpg",
    "/gallery/IMG-11.jpg",
    "/gallery/IMG-10.jpg",
    "/gallery/IMG-12.jpg",
    "/gallery/IMG-14.jpg",
    "/gallery/IMG-18.jpg",
    "/gallery/IMG-24.jpg",
];

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl cursor-pointer"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={500}
              height={350}
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          index={activeIndex}
          close={() => setActiveIndex(null)}
          setIndex={setActiveIndex}
        />
      )}
    </>
  );
}
