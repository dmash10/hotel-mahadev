import { Users, Wifi, Droplets, Bath, ArrowRight, Loader2, Tv, Car } from "lucide-react";
import { Link } from "react-router-dom";
import TransitionLink from "@/components/TransitionLink";
import { useRooms } from "@/hooks/useRooms";
import { useImageZones } from "@/hooks/useImageZones";

const amenities = [
  { icon: Wifi, label: "WiFi" },
  { icon: Droplets, label: "Hot Water" },
  { icon: Bath, label: "Attached Bath" },
  { icon: Tv, label: "TV" },
  { icon: Car, label: "Parking" },
];

const RoomsSection = () => {
  const { rooms: dbRooms, loading } = useRooms();
  const { getZoneMedia } = useImageZones();

  // Map room names to their gallery zones
  const roomZoneMap: Record<string, string> = {
    "Super Deluxe Room": 'room_double_gallery',
    "Premium Triple Room": 'room_triple_gallery',
    "Deluxe Family Suite": 'room_quad_gallery',
    "Grand Family Suite": 'room_five_gallery',
  };

  // Get room card image - uses FIRST image from gallery zone
  const getRoomCardImage = (roomName: string): string => {
    const zoneKey = roomZoneMap[roomName];
    if (!zoneKey) return '';

    const media = getZoneMedia(zoneKey);
    return media.length > 0 ? media[0].url : '';
  };

  // Get short description based on room type
  const getShortDesc = (maxGuests: number): string => {
    if (maxGuests <= 2) return "Perfect for couples";
    if (maxGuests === 3) return "Ideal for small families";
    if (maxGuests === 4) return "Great for families";
    return "Large groups & families";
  };

  // Transform rooms (show first 3 only)
  // Priority: card_image_url (from DB) > first image from zone gallery
  const displayRooms = dbRooms
    .map(room => ({
      ...room,
      image: room.card_image_url || getRoomCardImage(room.name),
      discount: room.fake_price && room.real_price
        ? Math.round(((room.fake_price - room.real_price) / room.fake_price) * 100)
        : 0,
      shortDesc: getShortDesc(room.max_guests),
    }))
    .sort((a, b) => a.real_price! - b.real_price!)
    .slice(0, 3);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 font-bold text-base md:text-lg uppercase tracking-wider">Accommodations</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Choose Your Room
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto">
            Clean, comfortable rooms with all essential amenities. Book directly and save up to 40%.
          </p>
        </div>

        {/* Room Cards */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
          </div>
        ) : (
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
            {displayRooms.map((room) => (
              <Link
                key={room.id}
                to={`/rooms/${room.slug}`}
                className="flex-shrink-0 w-[280px] md:w-auto snap-center bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-amber-200 group"
              >
                {/* Image Section */}
                <div className="relative h-40 md:h-44 bg-slate-100">
                  {room.image ? (
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <span className="text-slate-400 text-sm">Loading...</span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {room.discount > 0 && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                        {room.discount}% OFF
                      </span>
                    </div>
                  )}

                  {/* Availability Badge */}
                  {room.is_available && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Available
                      </span>
                    </div>
                  )}

                  {/* Sold Out Badge */}
                  {!room.is_available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-3 md:p-3 lg:p-4">
                  {/* Room Name & Guests */}
                  <div className="mb-2">
                    <h3 className="font-bold text-base lg:text-lg text-slate-900 group-hover:text-amber-600 transition-colors truncate">{room.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Users className="h-3 w-3" /> {room.max_guests} Guests
                      </span>
                    </div>
                  </div>

                  {/* Amenities - Show all on all screens */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-slate-600">
                    {amenities.map((amenity) => (
                      <span key={amenity.label} className="flex items-center gap-1 text-[10px] md:text-xs bg-slate-100 px-2 py-0.5 rounded">
                        <amenity.icon className="h-3 w-3 text-amber-600" />
                        {amenity.label}
                      </span>
                    ))}
                  </div>

                  {/* Price Row and Button */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg lg:text-xl font-bold text-emerald-600">₹{room.real_price?.toLocaleString()}</span>
                          {room.fake_price && (
                            <span className="text-red-500 line-through text-[10px] md:text-xs">₹{room.fake_price.toLocaleString()}</span>
                          )}
                        </div>
                        <span className="text-slate-500 text-[10px] md:text-xs">per night</span>
                      </div>
                    </div>

                    <div className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-center transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                      View Details
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center mt-8">
          <TransitionLink to="/rooms" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors">
            View All Rooms & Details
            <ArrowRight className="h-4 w-4" />
          </TransitionLink>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
