import GalleryGrid from "./GalleryGrid";

export default function GalleryPage() {
  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-400">
        WELCOME TO OUR GALLERY
      </h1>

      <GalleryGrid />
    </section>
  );
}
