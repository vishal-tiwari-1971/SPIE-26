"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

const imageSets = {
  "prodyog-25": [
    // "/gallery/prodyog-25/IMG-12.jpg",
    // "/gallery/prodyog-25/IMG-24.jpg",
    // "/gallery/prodyog-25/IMG-14.jpg",
    // "/gallery/prodyog-25/IMG-18.jpg",
    "/gallery/prodyog-25/IMG_1194.JPG",
    "/gallery/prodyog-25/IMG_1197.JPG",
    "/gallery/prodyog-25/IMG_1205.JPG",
    "/gallery/prodyog-25/IMG_1246.JPG",
    "/gallery/prodyog-25/IMG_1251.JPG",
    "/gallery/prodyog-25/IMG_1278.JPG",
    "/gallery/prodyog-25/IMG_1304.JPG",
    "/gallery/prodyog-25/IMG_1311.JPG",
    "/gallery/prodyog-25/IMG_1369 (1).JPG",
    "/gallery/prodyog-25/IMG_1328.JPG",
    "/gallery/prodyog-25/IMG_1369.JPG",
    "/gallery/prodyog-25/IMG_1402.JPG",
    "/gallery/prodyog-25/IMG_1423.JPG",
    "/gallery/prodyog-25/IMG_1424.JPG",
    "/gallery/prodyog-25/IMG_1455.JPG",
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

  return (
    <>
      {/* 🔽 DROPDOWN */}
      <div className="flex justify-end mb-6">
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="
            bg-[#0b1220]
            text-white
            px-4 py-2
            rounded-lg
            border border-white/10
            shadow-md
            focus:outline-none
            focus:ring-2 focus:ring-purple-500/60
            hover:bg-[#101a30]
            transition
          "
        >
          <option value="prodyog-25" className="bg-[#0b1220] text-white">
            Prodyog-25
          </option>
          <option value="prodyog-24" className="bg-[#0b1220] text-white">
            Prodyog-24
          </option>
        </select>

      </div>

      {/* 🖼 IMAGE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl cursor-pointer"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={src}
              alt=""
              width={500}
              height={350}
              className="w-full h-full object-cover"
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
