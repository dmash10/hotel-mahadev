import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft, ChevronRight, ArrowLeft, Users, Wifi, Droplets, Tv, Zap, Bath,
    Check, BedDouble, Sparkles, Coffee, UtensilsCrossed, Mountain, Phone, Loader2
} from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useRoomBySlug, useRooms } from "@/hooks/useRooms";
import { useImageZones } from "@/hooks/useImageZones";



// Icon mapping for amenities
const amenityIcons: Record<string, any> = {
    "Attached Washroom": Bath,
    "Hot Water": Droplets,
    "Power Backup": Zap,
    "Daily Cleaning": Sparkles,
    "Free WiFi": Wifi,
    "Smart TV": Tv,
    "Private Balcony": Mountain,
    "Mountain View": Mountain,
    "Dining Table": UtensilsCrossed,
    "Fresh Bedding": BedDouble,
    "Premium Bedding": BedDouble,
    "Extra Space": Sparkles,
};

const RoomDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { room, loading, error } = useRoomBySlug(slug);
    const { rooms: allRooms } = useRooms();
    const { getZoneMedia } = useImageZones();

    // Gallery state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Get room images based on room type - database only, no hardcoded fallbacks
    const getRoomImages = (roomName: string): string[] => {
        const dynamicMap: Record<string, string> = {
            "Super Deluxe Room": "room_double_gallery",
            "Premium Triple Room": "room_triple_gallery",
            "Deluxe Family Suite": "room_quad_gallery",
            "Grand Family Suite": "room_five_gallery",
        };

        const zoneKey = dynamicMap[roomName];
        const zoneMedia = zoneKey ? getZoneMedia(zoneKey) : [];

        if (zoneMedia && zoneMedia.length > 0) {
            return zoneMedia.map(m => m.url);
        }
        return []; // No fallback - will show placeholder
    };

    const images = room ? getRoomImages(room.name) : [];

    // Gallery navigation
    const nextSlide = useCallback(() => {
        if (images.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }
    }, [images.length]);

    const prevSlide = useCallback(() => {
        if (images.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    }, [images.length]);

    useEffect(() => {
        if (isPaused || images.length === 0) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide, images.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();
        setTimeout(() => setIsPaused(false), 8000);
    };

    const handleBook = () => {
        if (!room) return;
        const message = encodeURIComponent(`Hi, I'm interested in booking the *${room.name}* at Hotel Mahadev. Please share availability and pricing.`);
        window.open(`https://wa.me/919927279127?text=${message}`, "_blank");
    };

    // Get other rooms for "Similar Rooms" section
    const otherRooms = allRooms.filter(r => r.slug !== slug).slice(0, 3);

    // Calculate discount
    const discount = room && room.fake_price && room.real_price
        ? Math.round(((room.fake_price - room.real_price) / room.fake_price) * 100)
        : 0;

    // Room highlights based on room type
    const getHighlights = (roomName: string) => {
        const base = ["Daily Room Cleaning", "Free WiFi", "Hot Water", "Power Backup", "Hygienic Washrooms", "Fresh Bedding"];
        if (roomName === "Grand Family Suite") {
            return ["Private Balcony", "Dining Table", "Mountain View", "Daily Room Cleaning", "Hot Water", "Extra Space"];
        }
        if (roomName === "Deluxe Family Suite") {
            return ["Extra Space", "Mountain View", "Premium Bedding", "Daily Room Cleaning", "Hot Water", "Free WiFi"];
        }
        return base;
    };

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-amber-500" />
                </main>
                <Footer />
            </>
        );
    }

    if (error || !room) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Room Not Found</h1>
                    <p className="text-slate-600 mb-6">The room you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate("/rooms")} className="bg-amber-500 hover:bg-amber-600">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Rooms
                    </Button>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-slate-50 pb-24 md:pb-12">
                {/* Back Button - Fixed on mobile */}
                <div className="container pt-4 pb-2">
                    <Link
                        to="/rooms"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to All Rooms
                    </Link>
                </div>

                {/* HERO IMAGE GALLERY - Full Width, No Rounded Corners */}
                <div className="relative overflow-hidden">
                    {/* MOBILE Gallery */}
                    <div
                        className="md:hidden relative"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div className="relative aspect-[16/10] overflow-hidden">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${room.name} - Image ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            ))}

                            {/* Navigation arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                            >
                                <ChevronLeft className="h-5 w-5 text-slate-700" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                            >
                                <ChevronRight className="h-5 w-5 text-slate-700" />
                            </button>
                        </div>

                        {/* Thumbnail strip - scrollable */}
                        <div className="bg-slate-100 py-3 px-4">
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => goToSlide(idx)}
                                        className={`w-14 h-10 flex-shrink-0 rounded overflow-hidden transition-all ${idx === currentIndex ? 'ring-2 ring-amber-500 opacity-100' : 'opacity-60'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP Gallery - Contained within container */}
                    <div className="hidden md:block container">
                        <div
                            className="relative w-full h-[500px] lg:h-[550px] group overflow-hidden"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* Images - Full Width Strip */}
                            <div className="absolute inset-0 bg-slate-100">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${room.name} - Image ${index + 1}`}
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/90 hover:text-slate-900 backdrop-blur-sm rounded-full flex items-center justify-center transition-all text-white border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300 z-10"
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/90 hover:text-slate-900 backdrop-blur-sm rounded-full flex items-center justify-center transition-all text-white border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300 z-10"
                            >
                                <ChevronRight className="h-8 w-8" />
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`rounded-full transition-all duration-300 shadow-md ${index === currentIndex
                                            ? 'bg-amber-500 w-8 h-2'
                                            : 'bg-white/50 w-2 h-2 hover:bg-white'
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Thumbnail strip at bottom */}
                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {images.slice(0, 6).map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => goToSlide(idx)}
                                        className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-amber-500 scale-105' : 'border-white/30 hover:border-white/60'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROOM DETAILS SECTION */}
                <div className="container py-8 md:py-12">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Left Column - Room Info */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Room Title & Quick Info */}
                            <div>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    {room.is_available && (
                                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                            Available Now
                                        </span>
                                    )}
                                    {discount > 0 && (
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                                            {discount}% OFF
                                        </span>
                                    )}
                                    {room.max_guests >= 4 && (
                                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                                            Family Suite
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                                    {room.name}
                                </h1>
                                <div className="flex items-center gap-4 text-slate-600">
                                    <span className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-amber-500" />
                                        <span className="font-medium">Up to {room.max_guests} Guests</span>
                                    </span>
                                    <span className="hidden md:inline">•</span>
                                    <span className="hidden md:flex items-center gap-2">
                                        <BedDouble className="h-5 w-5 text-amber-500" />
                                        <span className="font-medium">
                                            {room.max_guests === 2 && '1 Double Bed'}
                                            {room.max_guests === 3 && '1 Double + 1 Single Bed'}
                                            {room.max_guests === 4 && '2 Double Beds'}
                                            {room.max_guests === 5 && '2 Double + 1 Single Bed'}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white rounded-xl p-6 border border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-amber-500" />
                                    About This Room
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-base">
                                    {room.description}
                                </p>
                            </div>

                            {/* Amenities Grid */}
                            <div className="bg-white rounded-xl p-6 border border-slate-100">
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Check className="h-5 w-5 text-emerald-500" />
                                    Room Amenities
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {room.amenities.map((amenity, idx) => {
                                        const IconComponent = amenityIcons[amenity] || Check;
                                        return (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                                    <IconComponent className="h-5 w-5 text-amber-600" />
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">{amenity}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-amber-400" />
                                    Room Highlights
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {getHighlights(room.name).map((highlight, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                            <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                            <span className="text-slate-200">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Pricing & CTA (Desktop) */}
                        <div className="hidden lg:block">
                            <div className="sticky top-24 bg-white rounded-xl p-6 border border-slate-200 shadow-lg">
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-4xl font-bold text-emerald-600">₹{room.real_price}</span>
                                        <span className="text-slate-500">/night</span>
                                    </div>
                                    {discount > 0 && room.fake_price && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg text-red-500 line-through">₹{room.fake_price}</span>
                                            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-bold">
                                                Save ₹{room.fake_price - (room.real_price || 0)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 mb-6 pb-6 border-b border-slate-100">
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Check className="h-4 w-4 text-emerald-500" />
                                        <span>Instant Booking via WhatsApp</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Check className="h-4 w-4 text-emerald-500" />
                                        <span>Daily Room Cleaning</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Check className="h-4 w-4 text-emerald-500" />
                                        <span>Fresh Bedding & Hygienic Washrooms</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleBook}
                                    disabled={!room.is_available}
                                    size="lg"
                                    className={`w-full text-lg font-bold ${room.is_available
                                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25'
                                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                        }`}
                                >
                                    {room.is_available ? (
                                        <>
                                            <WhatsAppIcon className="h-5 w-5 mr-2" />
                                            Book via WhatsApp
                                        </>
                                    ) : (
                                        'Currently Unavailable'
                                    )}
                                </Button>

                                {!room.is_available && (
                                    <p className="text-center text-red-500 text-sm mt-3 bg-red-50 p-2 rounded-lg">
                                        This room is currently not available
                                    </p>
                                )}

                                <p className="text-center text-slate-500 text-xs mt-4">
                                    Prices may vary based on season and availability
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Similar Rooms Section */}
                    {otherRooms.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                                Other Rooms You May Like
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {otherRooms.map((otherRoom) => {
                                    const otherImages = getRoomImages(otherRoom.name);
                                    const otherDiscount = otherRoom.fake_price && otherRoom.real_price
                                        ? Math.round(((otherRoom.fake_price - otherRoom.real_price) / otherRoom.fake_price) * 100)
                                        : 0;

                                    return (
                                        <Link
                                            key={otherRoom.id}
                                            to={`/rooms/${otherRoom.slug}`}
                                            className="bg-white rounded-xl border border-slate-200 overflow-hidden group"
                                        >
                                            <div className="relative h-40 overflow-hidden">
                                                <img
                                                    src={otherImages[0]}
                                                    alt={otherRoom.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {otherDiscount > 0 && (
                                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                        {otherDiscount}% OFF
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                                                    {otherRoom.name}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-slate-500 flex items-center gap-1">
                                                        <Users className="h-4 w-4" /> {otherRoom.max_guests} Guests
                                                    </span>
                                                    <span className="font-bold text-emerald-600">₹{otherRoom.real_price}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* MOBILE STICKY CTA */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-emerald-600">₹{room.real_price}</span>
                                <span className="text-slate-500 text-sm">/night</span>
                            </div>
                            {discount > 0 && room.fake_price && (
                                <span className="text-sm text-red-500 line-through">₹{room.fake_price}</span>
                            )}
                        </div>
                        <Button
                            onClick={handleBook}
                            disabled={!room.is_available}
                            className={`flex-1 max-w-[200px] font-bold ${room.is_available
                                ? 'bg-gradient-to-r from-green-500 to-green-600'
                                : 'bg-slate-300 text-slate-500'
                                }`}
                        >
                            {room.is_available ? (
                                <>
                                    <WhatsAppIcon className="h-4 w-4 mr-1.5" />
                                    Book Now
                                </>
                            ) : 'Unavailable'}
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
            <WhatsAppIcon />
        </>
    );
};

export default RoomDetailPage;
