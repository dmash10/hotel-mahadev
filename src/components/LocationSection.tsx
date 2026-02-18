import { MapPin, Navigation, Plane, Mountain, Clock, Car, Route, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageZones } from "@/hooks/useImageZones";
import ImageCarousel from "@/components/ImageCarousel";

const LocationSection = () => {
  const { getZoneMedia } = useImageZones();
  const locationImages = getZoneMedia('location_section').map(m => m.url);

  const openMaps = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=30.5549505746706,79.05412617557344", "_blank");
  };

  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container px-4 md:px-6">
        {/* Card */}
        <div className="bg-slate-50 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid lg:grid-cols-5 items-stretch">
            {/* Content - 3/5 width on desktop */}
            <div className="lg:col-span-3 p-5 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
              <p className="text-amber-600 font-bold text-sm md:text-lg uppercase tracking-wider mb-2">Prime Location</p>
              <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                Closest to Helipads
              </h2>
              <p className="text-slate-500 text-sm md:text-xl mb-4">6.5 km ahead of Guptkashi, on NH-107</p>

              <p className="text-slate-600 text-sm md:text-lg mb-5 leading-relaxed">
                We're strategically located on the main Kedarnath highway—close to helipads and
                Sonprayag, yet away from crowded market noise.
              </p>

              {/* Distance Cards */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-5">
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-xl border border-slate-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Plane className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-slate-500 font-medium uppercase">Phata Helipad</p>
                    <p className="font-bold text-slate-900 text-sm md:text-lg">4.7 km</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-xl border border-slate-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Mountain className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-slate-500 font-medium uppercase">Sonprayag</p>
                    <p className="font-bold text-slate-900 text-sm md:text-lg">15 km</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-xl border border-slate-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Car className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-slate-500 font-medium uppercase">Parking</p>
                    <p className="font-bold text-slate-900 text-sm md:text-lg">Free</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-white rounded-xl border border-slate-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Route className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-slate-500 font-medium uppercase">Highway</p>
                    <p className="font-bold text-slate-900 text-sm md:text-lg">NH-107</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-slate-600 mb-4 text-sm">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Kedarnath Rd, Byung gard, Guptkashi, Uttarakhand</span>
              </div>

              {/* Centered Buttons */}
              <div className="flex justify-center gap-2">
                <Button
                  onClick={openMaps}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-4 md:px-5 py-2 md:py-2.5 text-sm shadow-md"
                >
                  <Navigation className="h-4 w-4 mr-1.5" />
                  Directions
                </Button>
                <a
                  href="tel:+919927279127"
                  className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white rounded-full px-4 md:px-5 py-2 md:py-2.5 text-sm font-semibold shadow-md transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </div>
            </div>

            {/* Image - 2/5 width on desktop */}
            <div className="lg:col-span-2 h-48 lg:h-auto order-1 lg:order-2 relative min-h-[300px] lg:min-h-full">
              {locationImages.length > 0 ? (
                <ImageCarousel
                  images={locationImages}
                  alt="Hotel Mahadev Location"
                  className="h-full w-full"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400">No images available</span>
                </div>
              )}
              {/* Overlay with key info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 z-10">
                <div className="flex items-center gap-2 text-white text-xs md:text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  Check-in: 12 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
