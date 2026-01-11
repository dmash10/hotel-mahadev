import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { useState } from "react";
import hotelExterior from "@/assets/hotel-exterior.jpg";
import roomDouble from "@/assets/room-double.jpg";
import roomTriple from "@/assets/room-triple.jpg";
import roomQuad from "@/assets/room-quad.jpg";
import restaurant from "@/assets/restaurant.jpg";
import locationView from "@/assets/location-view.jpg";

const categories = [
  { id: "all", label: "All Photos" },
  { id: "hotel", label: "Hotel" },
  { id: "rooms", label: "Rooms" },
  { id: "restaurant", label: "Restaurant" },
  { id: "surroundings", label: "Surroundings" },
];

const galleryImages = [
  { id: 1, src: hotelExterior, category: "hotel", title: "Hotel Exterior" },
  { id: 2, src: roomDouble, category: "rooms", title: "Double Bed Room" },
  { id: 3, src: roomTriple, category: "rooms", title: "Triple Bed Room" },
  { id: 4, src: roomQuad, category: "rooms", title: "Quad Bed Room" },
  { id: 5, src: restaurant, category: "restaurant", title: "In-house Restaurant" },
  { id: 6, src: locationView, category: "surroundings", title: "Mountain View" },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img src={hotelExterior} alt="Hotel Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Photo Gallery</h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto px-4">
                Take a look at our hotel, rooms, restaurant, and the beautiful surroundings.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-40">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-semibold">{image.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full animate-scale-in">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg font-semibold bg-foreground/50 inline-block px-4 py-2 rounded-lg">
                  {selectedImage.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default GalleryPage;
