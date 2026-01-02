"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  XMarkIcon,
  ArrowDownTrayIcon,
  ArrowsPointingOutIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ShareIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function Lightbox({ images, index, close, setIndex }) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const overlayRef = useRef(null);
  const imageRef = useRef(null);

  const touchStart = useRef({ x: 0, y: 0, dist: 0 });

  /* 🔹 OPEN ANIMATION */
  useEffect(() => {
    setVisible(true);
  }, []);

  /* 🔹 KEYBOARD SHORTCUTS */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "+") zoomIn();
      if (e.key === "-") zoomOut();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const prev = () =>
    setIndex((index - 1 + images.length) % images.length);
  const next = () =>
    setIndex((index + 1) % images.length);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.3, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.3, 1));

  const rotateLeft = () => setRotation((r) => r - 90);
  const rotateRight = () => setRotation((r) => r + 90);

  const reset = () => {
    setZoom(1);
    setRotation(0);
  };

  /* 🔹 DOUBLE CLICK ZOOM */
  const handleDoubleClick = () => {
    setZoom((z) => (z === 1 ? 2 : 1));
  };

  /* 🔹 CLICK OUTSIDE TO CLOSE */
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  /* 🔹 MOBILE SWIPE + PINCH */
  const getDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      touchStart.current.dist = getDistance(e.touches);
    } else {
      touchStart.current.x = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const newDist = getDistance(e.touches);
      const scale = newDist / touchStart.current.dist;
      setZoom((z) => Math.min(Math.max(z * scale, 1), 3));
      touchStart.current.dist = newDist;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches.length === 1) {
      const diffX =
        e.changedTouches[0].clientX - touchStart.current.x;
      if (diffX > 80) prev();
      if (diffX < -80) next();
    }
  };

  /* 🔹 CLOSE WITH ANIMATION */
  const handleClose = () => {
    setVisible(false);
    setTimeout(close, 200);
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 🔝 TOP BAR */}
      <div className="flex items-center justify-between px-4 py-2 text-white border-b border-white/20 text-sm">
        <span>{index + 1} / {images.length}</span>

        <div className="flex items-center gap-4">
          <IconBtn title="Share"><ShareIcon /></IconBtn>
          <IconBtn title="Rotate Left" onClick={rotateLeft}><ArrowUturnLeftIcon /></IconBtn>
          <IconBtn title="Rotate Right" onClick={rotateRight}><ArrowUturnRightIcon /></IconBtn>
          <IconBtn title="Reset" onClick={reset}><ArrowPathIcon /></IconBtn>
          <IconBtn title="Zoom In" onClick={zoomIn}><MagnifyingGlassPlusIcon /></IconBtn>
          <IconBtn title="Zoom Out" onClick={zoomOut}><MagnifyingGlassMinusIcon /></IconBtn>
          <IconBtn title="Fullscreen"><ArrowsPointingOutIcon /></IconBtn>

          <a href={images[index]} download title="Download">
            <IconBtn><ArrowDownTrayIcon /></IconBtn>
          </a>

          <IconBtn title="Close" onClick={handleClose}>
            <XMarkIcon />
          </IconBtn>
        </div>
      </div>

      {/* 🖼 IMAGE AREA */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden"
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Skeleton */}
        {loading && (
          <div className="absolute w-72 h-48 bg-white/10 animate-pulse rounded-lg" />
        )}

        <div
          className={`transition-transform duration-300 ${
            visible ? "scale-100" : "scale-95"
          }`}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg)`,
          }}
        >
          <Image
            ref={imageRef}
            src={images[index]}
            alt="preview"
            width={900}
            height={600}
            quality={85}
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQA/9k="
            onLoadingComplete={() => setLoading(false)}
            className="max-h-[80vh] w-auto rounded-lg shadow-xl"
            loading="eager"
          />
        </div>
      </div>

      {/* 🧱 THUMBNAILS */}
      <div className="flex gap-2 p-3 overflow-x-auto border-t border-white/20 bg-black">
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Thumbnail ${i + 1}`}
            width={64}
            height={64}
            quality={60}
            onClick={() => {
              setLoading(true);
              setIndex(i);
            }}
            className={`h-16 w-16 object-cover rounded cursor-pointer transition ${
              i === index ? "ring-2 ring-white" : "opacity-50 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* 🔹 Icon Button */
function IconBtn({ children, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-2 rounded hover:bg-white/10 transition"
    >
      <span className="w-5 h-5 block text-white">{children}</span>
    </button>
  );
}
