import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { useState } from "react";
import { X } from "lucide-react";
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

// Bento grid sizes: "large" = 2x2, "wide" = 2x1, "tall" = 1x2, "normal" = 1x1
const galleryImages = [
  { id: 1, src: hotelExterior, category: "hotel", title: "Hotel Exterior", size: "large" as const },
  { id: 2, src: roomDouble, category: "rooms", title: "Double Bed Room", size: "wide" as const },
  { id: 3, src: roomTriple, category: "rooms", title: "Triple Bed Room", size: "normal" as const },
  { id: 4, src: roomQuad, category: "rooms", title: "Quad Bed Room", size: "tall" as const },
  { id: 5, src: restaurant, category: "restaurant", title: "In-house Restaurant", size: "wide" as const },
  { id: 6, src: locationView, category: "surroundings", title: "Mountain View", size: "large" as const },
];

const getBentoClasses = (size: string) => {
  switch (size) {
    case "large":
      return "md:col-span-2 md:row-span-2";
    case "wide":
      return "md:col-span-2 md:row-span-1";
    case "tall":
      return "md:col-span-1 md:row-span-2";
    default:
      return "md:col-span-1 md:row-span-1";
  }
};

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0" style={{ viewTransitionName: "page-content" }}>
      <Header />
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-16 md:py-20 overflow-hidden"
          style={{ viewTransitionName: "hero-section" }}
        >
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-gold/5" />
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          
          <div className="container relative z-10">
            <div 
              className="text-center max-w-3xl mx-auto animate-fade-in"
              style={{ viewTransitionName: "section-header" }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                Photo Gallery
              </span>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                Explore Our Hotel
              </h1>
              <p className="text-muted-foreground text-lg">
                Take a look at our rooms, restaurant, and the beautiful mountain surroundings.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-40">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Gallery Grid */}
        <section className="py-10 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group animate-fade-in ${getBentoClasses(image.size)}`}
                  style={{ 
                    animationDelay: `${index * 80}ms`,
                    viewTransitionName: `gallery-image-${image.id}`
                  }}
                >
                  {/* Image */}
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Glassmorphism label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                      <span className="text-white font-medium text-sm">{image.title}</span>
                    </div>
                  </div>

                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No photos in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              
              {/* Title label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <p className="text-white font-semibold">{selectedImage.title}</p>
                </div>
              </div>
              
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/20"
              >
                <X className="h-5 w-5" />
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
