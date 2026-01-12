import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { Users, Wifi, Droplets, Tv, Zap, Bath, MessageCircle, Check, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import roomDouble from "@/assets/room-double.jpg";
import roomTriple from "@/assets/room-triple.jpg";
import roomQuad from "@/assets/room-quad.jpg";

const rooms = [
  {
    id: "double",
    name: "Double Bed Room",
    shortDesc: "Comfortable room for two guests",
    description: "Our Double Bed Room offers a peaceful retreat after a long journey. The room features a comfortable double bed with quality mattress, clean linens, and warm blankets. Natural light fills the space through windows that offer glimpses of the surrounding mountains.",
    maxGuests: 2,
    fakePrice: 2500,
    realPrice: 1500,
    discount: 40,
    images: [roomDouble, roomTriple, roomQuad],
    available: true,
    amenities: ["Double Bed", "Hot Water", "Free WiFi", "Attached Bath", "TV", "Power Backup"],
    fullAmenities: [
      "Comfortable double bed with quality mattress",
      "Attached bathroom with 24/7 hot water",
      "Free WiFi connectivity",
      "LED Television with cable",
      "Clean towels and toiletries",
      "Room service available",
      "Power backup",
      "Mountain view",
      "Daily housekeeping",
    ],
  },
  {
    id: "triple",
    name: "Triple Bed Room",
    shortDesc: "Perfect for small families or groups",
    description: "Perfect for small families or groups of three, this room provides ample space without feeling crowded. Three single beds are arranged thoughtfully to ensure everyone has their own comfortable sleeping space while still feeling connected.",
    maxGuests: 3,
    fakePrice: 3500,
    realPrice: 2200,
    discount: 37,
    images: [roomTriple, roomDouble, roomQuad],
    available: true,
    amenities: ["3 Single Beds", "Hot Water", "Free WiFi", "Attached Bath", "TV", "Power Backup"],
    fullAmenities: [
      "Three comfortable single beds",
      "Spacious room layout",
      "Attached bathroom with 24/7 hot water",
      "Free WiFi connectivity",
      "LED Television with cable",
      "Clean towels and toiletries",
      "Room service available",
      "Power backup",
      "Daily housekeeping",
    ],
  },
  {
    id: "four",
    name: "Four Bed Room",
    shortDesc: "Ideal for families with children",
    description: "Our Four Bed Room is ideal for families or groups travelling together. With four comfortable beds and a spacious layout, everyone can rest well before continuing their pilgrimage journey. Extra space for luggage and seating area included.",
    maxGuests: 4,
    fakePrice: 4500,
    realPrice: 2800,
    discount: 38,
    images: [roomQuad, roomDouble, roomTriple],
    available: true,
    amenities: ["4 Beds", "Hot Water", "Free WiFi", "Attached Bath", "TV", "Power Backup"],
    fullAmenities: [
      "Four comfortable beds",
      "Extra spacious room layout",
      "Attached bathroom with 24/7 hot water",
      "Free WiFi connectivity",
      "LED Television with cable",
      "Seating area",
      "Clean towels and toiletries",
      "Room service available",
      "Power backup",
      "Daily housekeeping",
    ],
  },
  {
    id: "five",
    name: "Five Bed Room",
    shortDesc: "Best for large groups and families",
    description: "Our largest room option, the Five Bed Room is perfect for large families or groups travelling together. With five comfortable beds arranged in a spacious layout, everyone gets their own space while staying together. Ideal for pilgrimage groups.",
    maxGuests: 5,
    fakePrice: 5500,
    realPrice: 3500,
    discount: 36,
    images: [roomQuad, roomTriple, roomDouble],
    available: true,
    amenities: ["5 Beds", "Hot Water", "Free WiFi", "Attached Bath", "TV", "Power Backup"],
    fullAmenities: [
      "Five comfortable beds",
      "Largest room option",
      "Attached bathroom with 24/7 hot water",
      "Free WiFi connectivity",
      "LED Television with cable",
      "Seating area",
      "Extra luggage space",
      "Clean towels and toiletries",
      "Room service available",
      "Power backup",
      "Daily housekeeping",
    ],
  },
];

const amenityIcons: Record<string, React.ElementType> = {
  "Double Bed": Users,
  "3 Single Beds": Users,
  "4 Beds": Users,
  "5 Beds": Users,
  "Hot Water": Droplets,
  "Free WiFi": Wifi,
  "Attached Bath": Bath,
  "TV": Tv,
  "Power Backup": Zap,
};

const RoomCard = ({ room, onClick }: { room: typeof rooms[0]; onClick: () => void }) => {
  const handleClick = () => {
    // Use View Transitions API if available
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        onClick();
      });
    } else {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer"
      style={{ viewTransitionName: `room-card-${room.id}` }}
    >
      {/* Card Container - No scale/shadow on hover, smooth border transition */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 transition-[border-color] duration-700 ease-out group-hover:border-primary/40">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:via-transparent group-hover:to-accent/3 transition-all duration-700 ease-out" />
        
        <div className="flex flex-col md:flex-row">
          {/* Image Section with Parallax Effect */}
          <div className="relative w-full md:w-56 lg:w-64 h-56 md:h-auto flex-shrink-0 overflow-hidden">
            {/* Parallax Image - translateY on hover instead of scale */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:-translate-y-2">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-[110%] object-cover"
                style={{ viewTransitionName: `room-image-${room.id}` }}
              />
            </div>
            
            {/* Gradient Overlay - Animated opacity */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card/40 opacity-70 group-hover:opacity-90 transition-opacity duration-700" />
            
            {/* Badges with smooth fade */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {room.available && (
                <span className="inline-flex items-center gap-1.5 bg-success/90 backdrop-blur-sm text-success-foreground px-3 py-1.5 rounded-full text-xs font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="w-1.5 h-1.5 bg-success-foreground rounded-full animate-pulse" />
                  Available Now
                </span>
              )}
            </div>
            
            {/* Discount Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground px-3 py-1.5 rounded-full text-xs font-bold">
                {room.discount}% OFF
              </span>
            </div>

            {/* Room Capacity Badge - Mobile Only */}
            <div className="absolute bottom-4 left-4 md:hidden">
              <span className="inline-flex items-center gap-1.5 bg-background/80 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                <Users className="h-4 w-4 text-primary" />
                {room.maxGuests} Guests
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative flex-1 p-5 md:p-6 flex flex-col">
            {/* Header with smooth color transition */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 
                  className="font-heading text-xl md:text-2xl font-bold text-foreground transition-colors duration-500 ease-out group-hover:text-primary"
                  style={{ viewTransitionName: `room-title-${room.id}` }}
                >
                  {room.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                  <span className="hidden md:inline-flex items-center gap-1">
                    <Users className="h-4 w-4 text-primary" />
                    Up to {room.maxGuests} guests
                  </span>
                  <span className="hidden md:inline-block w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span className="text-primary/80 font-medium transition-colors duration-500 group-hover:text-primary">{room.shortDesc}</span>
                </p>
              </div>
            </div>

            {/* Price Section with subtle background animation */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3 border border-border/30 transition-[background-color,border-color] duration-700 group-hover:bg-muted/70 group-hover:border-border/50">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Was</span>
                  <span className="text-base text-destructive/80 line-through font-medium">₹{room.fakePrice.toLocaleString()}</span>
                </div>
                <div className="w-px h-10 bg-border/50" />
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Now</span>
                  <span 
                    className="text-2xl font-bold text-success"
                    style={{ viewTransitionName: `room-price-${room.id}` }}
                  >
                    ₹{room.realPrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground self-end pb-1">/night</span>
              </div>
            </div>

            {/* Amenities with staggered hover reveal */}
            <div className="flex flex-wrap gap-2 mb-5">
              {room.amenities.map((amenity, idx) => {
                const Icon = amenityIcons[amenity] || Check;
                return (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full border border-border/20 transition-all duration-500 ease-out group-hover:bg-muted/60 group-hover:border-border/40 group-hover:text-foreground"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  >
                    <Icon className="h-3.5 w-3.5 text-primary transition-transform duration-500 group-hover:rotate-6" />
                    {amenity}
                  </span>
                );
              })}
            </div>

            {/* CTA with smooth arrow animation */}
            <div className="mt-auto flex items-center justify-between">
              <span className="text-sm text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                Click to view details
              </span>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm transition-all duration-500 ease-out group-hover:gap-3">
                View Room
                <ArrowLeft className="h-4 w-4 rotate-180 transition-transform duration-500 ease-out group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoomDetail = ({ room, onBack }: { room: typeof rooms[0]; onBack: () => void }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const handleBooking = () => {
    const message = encodeURIComponent(`Hi, I want to book ${room.name} at ₹${room.realPrice}/night. Please confirm availability.`);
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Image Gallery */}
      <section className="relative h-64 sm:h-80 md:h-[450px] overflow-hidden">
        <img
          src={room.images[currentImage]}
          alt={room.name}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {room.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentImage ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Rooms
        </button>

        {/* Room Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="container">
            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white mb-2">{room.name}</h1>
            <div className="flex items-center gap-3 text-white/80">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Up to {room.maxGuests} guests
              </span>
              <span className="w-1 h-1 rounded-full bg-white/50" />
              <span className="text-success font-semibold">Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Thumbnail Strip */}
      <section className="bg-muted py-3 overflow-x-auto">
        <div className="container">
          <div className="flex gap-2">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-4">About This Room</h2>
                <p className="text-muted-foreground leading-relaxed">{room.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-4">Room Amenities</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {room.fullAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Check className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-foreground">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-lg text-destructive line-through">₹{room.fakePrice.toLocaleString()}</span>
                    <span className="text-3xl font-bold text-success">₹{room.realPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">per night</p>
                  <div className="mt-2 inline-block bg-destructive/10 text-destructive text-sm font-semibold px-3 py-1 rounded-full">
                    Save ₹{(room.fakePrice - room.realPrice).toLocaleString()} ({room.discount}% off)
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Room Type</span>
                    <span className="font-medium">{room.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Max Guests</span>
                    <span className="font-medium">{room.maxGuests} persons</span>
                  </div>
                </div>

                <Button onClick={handleBooking} variant="whatsapp" size="xl" className="w-full mb-3">
                  <MessageCircle className="h-5 w-5" />
                  Book on WhatsApp
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  No advance payment required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const RoomsPage = () => {
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null);

  if (selectedRoom) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <Header />
        <main>
          <RoomDetail room={selectedRoom} onBack={() => setSelectedRoom(null)} />
        </main>
        <Footer />
        <StickyMobileCTA />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-48 md:h-64 overflow-hidden">
          <img src={roomDouble} alt="Hotel Rooms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-heading text-2xl md:text-4xl font-bold text-white mb-2">Our Rooms</h1>
              <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto px-4">
                Clean, comfortable rooms at honest prices. Click on any room to see details.
              </p>
            </div>
          </div>
        </section>

        {/* Rooms List */}
        <section className="py-8 md:py-12">
          <div className="container max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-foreground">
                {rooms.length} Room Types Available
              </h2>
              <span className="text-sm text-success font-medium">✓ Direct booking prices</span>
            </div>

            <div className="space-y-4">
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RoomCard room={room} onClick={() => setSelectedRoom(room)} />
                </div>
              ))}
            </div>

            {/* Info Note */}
            <div className="mt-8 p-4 bg-secondary rounded-xl text-center">
              <p className="text-sm text-secondary-foreground">
                <span className="font-semibold">Book directly with us</span> and get the best rates. 
                No middlemen, no hidden charges.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default RoomsPage;
