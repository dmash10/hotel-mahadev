import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Users, Wifi, Droplets, Tv, Zap, Bath, ArrowRight, BedDouble, Loader2, Mountain, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRooms } from "@/hooks/useRooms";
import { useImageZones } from "@/hooks/useImageZones";

const RoomsPage = () => {
  const { rooms: dbRooms, loading } = useRooms();
  const { getZoneMedia, getZoneImage } = useImageZones();
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const galleryDouble = getZoneMedia('room_double_gallery');
  const galleryTriple = getZoneMedia('room_triple_gallery');
  const galleryQuad = getZoneMedia('room_quad_gallery');
  const galleryFive = getZoneMedia('room_five_gallery');
  const heroImage = getZoneImage('rooms_page_hero') || getZoneImage('home_hero') || '';

  // Get room images based on room type - database only, no hardcoded fallbacks
  const getRoomImages = (roomName: string): string[] => {
    const dynamicMap: Record<string, any[]> = {
      "Super Deluxe Room": galleryDouble,
      "Premium Triple Room": galleryTriple,
      "Deluxe Family Suite": galleryQuad,
      "Grand Family Suite": galleryFive,
    };

    const zoneMedia = dynamicMap[roomName];
    if (zoneMedia && zoneMedia.length >= 1) {
      return zoneMedia.map(m => m.url);
    }
    return []; // No fallback - will show placeholder
  };

  // Transform rooms
  const displayRooms = dbRooms
    .map(room => ({
      ...room,
      images: getRoomImages(room.name),
      discount: room.fake_price && room.real_price
        ? Math.round(((room.fake_price - room.real_price) / room.fake_price) * 100)
        : 0,
    }))
    .sort((a, b) => a.real_price! - b.real_price!);

  // Get room type label
  const getRoomType = (maxGuests: number) => {
    if (maxGuests <= 2) return "Affordable";
    if (maxGuests === 3) return "Popular";
    return "Family Suite";
  };

  // Get key amenities to show on card
  const getKeyAmenities = (room: typeof displayRooms[0]) => {
    const icons = [
      { icon: Wifi, label: "WiFi" },
      { icon: Droplets, label: "Hot Water" },
      { icon: Tv, label: "TV" },
      { icon: Zap, label: "Power" },
    ];
    if (room.max_guests >= 5) {
      icons.push({ icon: Mountain, label: "Balcony" });
    }
    return icons.slice(0, 4);
  };

  // Handle image load for shimmer effect
  const handleImageLoad = (roomId: string) => {
    setImageLoaded(prev => ({ ...prev, [roomId]: true }));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 pb-20">
        <PageHero
          title="Comfortable Stays for Every Pilgrim"
          subtitle="Experience warm hospitality and clean, spacious rooms designed for your comfort during the Kedarnath Yatra."
          badge="Premium Accommodations"
          backgroundImage={heroImage}
        />

        <div className="container py-8 px-4 md:px-6">

          {/* Rooms Grid */}
          <div>
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-amber-500" />
              </div>
            ) : displayRooms.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-slate-500">No rooms available at the moment.</p>
              </div>
            ) : (
              <>
                {/* Desktop Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayRooms.map((room) => (
                    <Link
                      key={room.id}
                      to={`/rooms/${room.slug}`}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden group flex flex-col transition-all duration-300 hover:border-amber-200"
                    >
                      {/* Image Section */}
                      <div className="relative h-44 overflow-hidden bg-slate-100">
                        {/* Shimmer placeholder */}
                        {!imageLoaded[room.id] && (
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer" />
                        )}
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded[room.id] ? 'opacity-100' : 'opacity-0'
                            }`}
                          onLoad={() => handleImageLoad(room.id)}
                        />

                        {/* Badges */}
                        {!room.is_available && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                            <span className="bg-red-600/90 text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-wider transform -rotate-12 border-2 border-white shadow-xl text-sm">
                              Sold Out
                            </span>
                          </div>
                        )}
                        {room.is_available && room.discount > 0 && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg z-10">
                            {room.discount}% OFF
                          </div>
                        )}
                        {/* Room Type Badge */}
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                            {getRoomType(room.max_guests)}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-4 flex flex-col flex-1">
                        <div className="mb-3">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                              {room.name}
                            </h3>
                          </div>

                          {/* Price - Green for real price, red strikethrough for fake */}
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-2xl font-bold text-emerald-600">₹{room.real_price}</span>
                            <span className="text-sm text-slate-500">/night</span>
                            {room.fake_price && (
                              <span className="text-sm text-red-500 line-through">₹{room.fake_price}</span>
                            )}
                          </div>

                          {/* Guest count */}
                          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" /> Up to {room.max_guests} Guests
                            </span>
                          </div>
                        </div>

                        {/* Amenities - Better display with labels */}
                        <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-slate-100">
                          {getKeyAmenities(room).map((amenity, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs text-slate-600"
                            >
                              <amenity.icon className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                              <span>{amenity.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-auto">
                          <div className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                            View Details
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Mobile: Horizontal Cards */}
                <div className="md:hidden space-y-4">
                  {displayRooms.map((room) => (
                    <Link
                      key={room.id}
                      to={`/rooms/${room.slug}`}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden flex transition-all duration-300 w-full"
                    >
                      {/* Image - Left Side */}
                      <div className="relative w-[45%] flex-shrink-0 bg-slate-100 min-h-[160px]">
                        {!imageLoaded[room.id] && (
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer" />
                        )}
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded[room.id] ? 'opacity-100' : 'opacity-0'
                            }`}
                          onLoad={() => handleImageLoad(room.id)}
                        />
                        {room.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {room.discount}%
                          </div>
                        )}
                        {!room.is_available && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold bg-red-600 px-1.5 py-0.5 rounded">
                              SOLD OUT
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content - Right Side */}
                      <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                              {room.name}
                            </h3>
                          </div>

                          {/* Price - Green for real, red strikethrough */}
                          <div className="flex items-baseline gap-1.5 mb-2">
                            <span className="text-lg font-bold text-emerald-600">₹{room.real_price}</span>
                            {room.fake_price && (
                              <span className="text-xs text-red-500 line-through">₹{room.fake_price}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                            <Users className="h-3 w-3" />
                            <span>{room.max_guests} Guests</span>
                          </div>

                          {/* Compact amenities */}
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            <span className="flex items-center gap-0.5"><Wifi className="h-3 w-3" /></span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5"><Droplets className="h-3 w-3" /></span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5"><Tv className="h-3 w-3" /></span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5"><Zap className="h-3 w-3" /></span>
                          </div>
                        </div>

                        <div className="flex items-center justify-end mt-2">
                          <div className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                            Details <ArrowRight className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Daily Cleaning Notice */}
          <div className="mt-12 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-8 w-8 text-amber-600" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Clean & Comfortable Stay</h3>
                <p className="text-slate-600 text-sm">
                  We clean all rooms daily, provide fresh bedding, and ensure hygienic washrooms.
                  Hot water and power backup available for your comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyMobileCTA />
      <WhatsAppIcon />
    </>
  );
};

export default RoomsPage;
