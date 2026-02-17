import { useState, useEffect } from "react";
import { Droplets, Wifi, Car, Sparkles } from "lucide-react";
import BookingCard from "@/components/BookingCard";
import { useImageZones } from "@/hooks/useImageZones";

// Rotating badge messages (no emojis)
const badgeMessages = [
  "Clean Rooms",
  "Great Food",
  "Warm Hospitality",
  "100% Vegetarian",
  "24/7 Hot Water",
  "Free WiFi",
  "Free Parking",
];

const HeroSection = () => {
  const { getZoneDisplay, loading } = useImageZones();
  const heroMedia = getZoneDisplay('home_hero');
  const [currentBadge, setCurrentBadge] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Rotate badge messages every 3.5 seconds with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Fade out
      setTimeout(() => {
        setCurrentBadge((prev) => (prev + 1) % badgeMessages.length);
        setIsVisible(true); // Fade in
      }, 300); // Wait for fade out, then change text
    }, 3500); // 3.5 seconds delay
    return () => clearInterval(interval);
  }, []);

  // Only use database image, no hardcoded fallback
  const mediaUrl = heroMedia?.url || '';
  const isVideo = heroMedia?.type === 'video';
  const hasMedia = !!mediaUrl;

  return (
    <section className="relative overflow-hidden">
      {/* MOBILE HERO - Phone Only */}
      <div className="md:hidden">
        {/* Hero image with distributed content */}
        <div className="relative h-[55vh] md:h-[60vh] min-h-[380px] md:min-h-[450px]">
          {hasMedia && isVideo ? (
            <video
              src={mediaUrl}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : hasMedia ? (
            <img
              src={mediaUrl}
              alt="Hotel Mahadev - Your peaceful stay on the Kedarnath route"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
          {/* Gradient overlay - darker at top and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

          {/* Content spread across full height */}
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 md:p-8 py-5">
            {/* CENTER: Badge + Heading */}
            <div className="text-center">
              {/* Rotating Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs md:text-sm font-bold rounded-full shadow-xl shadow-amber-500/30 mb-4">
                <span className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {badgeMessages[currentBadge]}
                </span>
              </span>

              <h1 className="font-hero text-4xl md:text-5xl font-bold text-white leading-tight mb-3 drop-shadow-lg">
                Hotel{" "}
                <span className="text-amber-400">Mahadev</span>
                <span className="block text-2xl md:text-3xl text-white/90 mt-1">& Restaurant</span>
              </h1>
              <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-[300px] md:max-w-[450px] mx-auto">
                Clean, comfortable rooms with mountain views. Your perfect rest stop before Kedarnath.
              </p>
            </div>
          </div>

          {/* BOTTOM: Features - positioned absolutely */}
          <div className="absolute bottom-4 left-0 right-0 px-4 md:px-8">
            <div className="flex justify-center gap-2 md:gap-4">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 md:px-4 py-2 md:py-2.5 rounded-lg">
                <Droplets className="h-4 w-4 text-amber-400" />
                <span className="text-white text-xs md:text-sm font-medium">Hot Water</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 md:px-4 py-2 md:py-2.5 rounded-lg">
                <Wifi className="h-4 w-4 text-amber-400" />
                <span className="text-white text-xs md:text-sm font-medium">Free WiFi</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 md:px-4 py-2 md:py-2.5 rounded-lg">
                <Car className="h-4 w-4 text-amber-400" />
                <span className="text-white text-xs md:text-sm font-medium">Parking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Highlight Strip */}
        <div className="bg-slate-900 py-3 px-4 md:px-8">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            <div>
              <p className="text-slate-400 text-xs md:text-sm">Starting from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl md:text-2xl font-bold text-white">₹1,500</span>
                <span className="text-xs md:text-sm text-slate-400">/night</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 text-xs md:text-sm font-semibold">Limited Time</p>
              <p className="text-amber-400 text-base md:text-lg font-bold">40% OFF</p>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Booking Form - Below Hero */}
        <div id="booking-form" className="scroll-mt-20 bg-slate-50 py-6 px-4 md:py-10 md:px-8">
          <div className="flex justify-center">
            <BookingCard />
          </div>
        </div>
      </div>

      {/* TABLET & DESKTOP HERO - Side by Side Layout */}
      <div className="hidden md:block min-h-[70vh] lg:min-h-[80vh] gradient-hero">
        {/* Background Image/Video */}
        <div className="absolute inset-0 z-0">
          {hasMedia && isVideo ? (
            <video
              src={mediaUrl}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : hasMedia ? (
            <img
              src={mediaUrl}
              alt="Hotel Mahadev Exterior"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        </div>

        <div className="container relative z-10 py-6 md:py-8 lg:py-12">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-10 items-center min-h-[calc(70vh-4rem)] lg:min-h-[calc(80vh-4rem)]">
            {/* Left Content */}
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs md:text-sm font-bold rounded-full mb-4 md:mb-6 shadow-lg shadow-amber-500/30">
                <span className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {badgeMessages[currentBadge]}
                </span>
              </span>

              <h1 className="font-hero text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 md:mb-5">
                A simple, clean stay on the{" "}
                <span className="text-amber-400">Kedarnath</span> route.
              </h1>

              <p className="text-white/80 text-base md:text-lg mb-4 md:mb-6 max-w-xl leading-relaxed">
                Hotel Mahadev is a comfortable and peaceful stop with clean rooms, food, wifi and parking.
              </p>

              <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 text-xs md:text-sm text-white/80 mb-4 md:mb-6 lg:mb-8">
                <span className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm px-2.5 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg">
                  <Droplets className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-400" />
                  <span className="hidden lg:inline">24/7 </span>Hot Water
                </span>
                <span className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm px-2.5 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg">
                  <Wifi className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-400" />
                  <span className="hidden md:inline">Free </span>WiFi
                </span>
                <span className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm px-2.5 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-lg">
                  <Car className="h-3.5 w-3.5 md:h-4 md:w-4 text-amber-400" />
                  Parking
                </span>
              </div>

              {/* Price highlight - Compact on tablet */}
              <div className="inline-flex items-center gap-3 md:gap-4 bg-slate-800/80 backdrop-blur px-4 md:px-5 lg:px-6 py-3 md:py-4 rounded-xl">
                <div>
                  <p className="text-slate-400 text-[10px] md:text-xs">Starting from</p>
                  <div className="flex items-baseline gap-1 md:gap-2">
                    <span className="text-2xl md:text-3xl font-bold text-white">₹1,500</span>
                    <span className="text-slate-400 text-xs md:text-sm">/night</span>
                  </div>
                </div>
                <div className="w-px h-10 md:h-12 bg-slate-600" />
                <div className="text-center">
                  <p className="text-amber-400 text-xl md:text-2xl font-bold">40% OFF</p>
                  <p className="text-emerald-400 text-[10px] md:text-xs font-semibold">Book Direct</p>
                </div>
              </div>
            </div>

            {/* Right - Booking Card */}
            <div id="booking-form-desktop" className="flex justify-center lg:justify-end">
              <BookingCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
