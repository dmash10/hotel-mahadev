import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PageHero from "@/components/PageHero";
import { useState } from "react";
import { X, Play, Loader2 } from "lucide-react";
import { useImageZones, ZoneMedia } from "@/hooks/useImageZones";

const categories = [
  { id: "all", label: "All" },
  { id: "hotel", label: "Hotel" },
  { id: "rooms", label: "Rooms" },
  { id: "restaurant", label: "Restaurant" },
  { id: "surroundings", label: "Views" },
  { id: "guests", label: "Guests" },
];

// Gallery items - supports both images and videos
type GalleryItem = {
  id: number | string;
  src: string;
  category: string;
  title: string;
  type: "image" | "video";
};

const GalleryPage = () => {
  const { getZoneMedia, getZoneDisplay, getZoneImage, loading } = useImageZones();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Dynamic Data - database only
  const mainGallery = getZoneMedia('gallery_page_grid');
  const restaurantImg = getZoneDisplay('restaurant_section');
  const locationImg = getZoneDisplay('location_section');
  const roomDoubleMedia = getZoneMedia('room_double_gallery');
  const roomTripleMedia = getZoneMedia('room_triple_gallery');
  const roomQuadMedia = getZoneMedia('room_quad_gallery');
  const heroImage = getZoneImage('gallery_page_hero') || '';

  // Map Helpers
  const mapMedia = (media: ZoneMedia[], category: string, titleBase: string): GalleryItem[] => {
    return media.map((m, i) => ({
      id: m.id,
      src: m.url,
      category,
      title: `${titleBase} ${i + 1}`,
      type: m.type as 'image' | 'video'
    }));
  };

  // Only use database images - no hardcoded fallbacks
  const displayItems = [
    ...mapMedia(mainGallery, 'hotel', 'Hotel'),
    ...(restaurantImg ? [{ id: 'rest_hero', src: restaurantImg.url, category: 'restaurant', title: 'Restaurant', type: restaurantImg.type as 'image' | 'video' }] : []),
    ...(locationImg ? [{ id: 'loc_hero', src: locationImg.url, category: 'surroundings', title: 'Location', type: locationImg.type as 'image' | 'video' }] : []),
    ...mapMedia(roomDoubleMedia, 'rooms', 'Double Room'),
    ...mapMedia(roomTripleMedia, 'rooms', 'Triple Room'),
    ...mapMedia(roomQuadMedia, 'rooms', 'Quad Room'),
  ];

  const filteredItems = activeCategory === "all"
    ? displayItems
    : displayItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero */}
        <PageHero
          title="See Our Spaces"
          subtitle="Browse through our rooms, dining area, and mountain views"
          badge="Gallery"
          backgroundImage={heroImage}
        />

        {/* Category Filters */}
        <section className="py-4 md:py-5 border-b border-slate-200 sticky top-[104px] md:top-[112px] bg-white/95 backdrop-blur-md z-40">
          <div className="container">
            <div className="flex justify-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry Gallery */}
        <section className="py-4 md:py-6">
          <div className="container">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-2 md:gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="break-inside-avoid mb-2 md:mb-3 cursor-pointer group overflow-hidden"
                >
                  {item.type === "video" ? (
                    <div className="relative">
                      <video
                        src={item.src}
                        className="w-full h-auto block"
                        muted
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="w-12 h-12 bg-white/90 flex items-center justify-center">
                          <Play className="h-5 w-5 text-slate-900 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-500">No photos in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-2 md:p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  className="w-full h-auto max-h-[90vh]"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[90vh] object-contain"
                />
              )}

              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-2 right-2 w-10 h-10 bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-colors"
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
