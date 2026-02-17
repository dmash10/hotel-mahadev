import { UtensilsCrossed, Leaf, Coffee, Soup } from "lucide-react";
import { useImageZones } from "@/hooks/useImageZones";
import ImageCarousel from "@/components/ImageCarousel";

const RestaurantSection = () => {
  const { getZoneMedia } = useImageZones();
  const restaurantImages = getZoneMedia('restaurant_section').map(m => m.url);

  // Fallback if no images
  if (restaurantImages.length === 0) {
    const fallback = getZoneMedia('restaurant_section')[0]?.url || ''; // try to get at least one
    if (fallback) restaurantImages.push(fallback);
  }

  return (
    <section className="py-10 md:py-14 bg-slate-50">
      <div className="container px-4 md:px-6">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid lg:grid-cols-5 items-stretch">
            {/* Image - 2/5 width on desktop */}
            <div className="lg:col-span-2 h-48 lg:h-auto relative min-h-[300px] lg:min-h-full">
              {restaurantImages.length > 0 ? (
                <ImageCarousel
                  images={restaurantImages}
                  alt="Hotel Mahadev Restaurant"
                  className="h-full w-full"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400">No images available</span>
                </div>
              )}
              {/* Overlay badge */}
              <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10">
                <Leaf className="h-3.5 w-3.5" />
                100% Vegetarian
              </div>
            </div>

            {/* Content - 3/5 width on desktop */}
            <div className="lg:col-span-3 p-5 lg:p-10 flex flex-col justify-center">
              <p className="text-amber-600 font-bold text-sm md:text-lg uppercase tracking-wider mb-2">Food & Dining</p>
              <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                Ghar Jaisa Khana
              </h2>
              <p className="text-slate-500 text-sm md:text-xl mb-4">Home-style meals for your pilgrimage</p>

              <p className="text-slate-600 text-sm md:text-lg mb-5 leading-relaxed">
                After a tiring journey, you don't want to search for food outside. Our kitchen serves
                fresh, sattvic meals—just like your mother would make.
              </p>

              {/* Features Grid - 4 items now */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-5">
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <Leaf className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-xs md:text-sm">Pure Veg</p>
                    <p className="text-[10px] md:text-xs text-slate-500">No onion/garlic option</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Coffee className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-xs md:text-sm">Hot Chai</p>
                    <p className="text-[10px] md:text-xs text-slate-500">Unlimited with meals</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                    <Soup className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-xs md:text-sm">Fresh Daily</p>
                    <p className="text-[10px] md:text-xs text-slate-500">Cooked per order</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                    <UtensilsCrossed className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-xs md:text-sm">North & South</p>
                    <p className="text-[10px] md:text-xs text-slate-500">Indian cuisine</p>
                  </div>
                </div>
              </div>

              {/* Centered Button */}
              <div className="text-center">
                <a
                  href="/restaurant"
                  className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all shadow-md hover:shadow-lg"
                >
                  View Our Menu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
