import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { Users, Wifi, Droplets, Bath, MessageCircle, Check, BedDouble } from "lucide-react";
import { Link } from "react-router-dom";
import roomDouble from "@/assets/room-double.jpg";
import roomTriple from "@/assets/room-triple.jpg";
import roomQuad from "@/assets/room-quad.jpg";

const rooms = [
  {
    id: "double",
    name: "Double Bed Room",
    description: "A comfortable room for two. Good for couples, friends, or solo travellers who prefer extra space.",
    longDescription: "Our Double Bed Room offers a peaceful retreat after a long journey. The room features a comfortable double bed with quality mattress, clean linens, and warm blankets. Natural light fills the space through windows that offer glimpses of the surrounding mountains.",
    maxGuests: 2,
    price: 1500,
    image: roomDouble,
    available: true,
    amenities: [
      "Comfortable double bed",
      "Attached bathroom with hot water",
      "Free WiFi",
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
    description: "A practical option for three guests. Often chosen by small families or groups travelling together.",
    longDescription: "Perfect for small families or groups of three, this room provides ample space without feeling crowded. Three single beds are arranged thoughtfully to ensure everyone has their own comfortable sleeping space while still feeling connected.",
    maxGuests: 3,
    price: 2200,
    image: roomTriple,
    available: true,
    amenities: [
      "Three comfortable single beds",
      "Attached bathroom with hot water",
      "Free WiFi",
      "Spacious layout",
      "Room service available",
      "Power backup",
      "Mountain view",
      "Daily housekeeping",
    ],
  },
  {
    id: "quad",
    name: "Quad Bed Room",
    description: "Designed for families or groups of four. Spacious enough to stay comfortably without feeling crowded.",
    longDescription: "Our largest room option, the Quad Bed Room is ideal for families or groups travelling together. With four comfortable beds and a spacious layout, everyone can rest well before continuing their pilgrimage journey.",
    maxGuests: 4,
    price: 2800,
    image: roomQuad,
    available: true,
    amenities: [
      "Four comfortable beds",
      "Attached bathroom with hot water",
      "Free WiFi",
      "Extra spacious layout",
      "Room service available",
      "Power backup",
      "Mountain view",
      "Daily housekeeping",
    ],
  },
];

const RoomsPage = () => {
  const handleBooking = (roomName: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in booking the ${roomName}. Please let me know availability.`);
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img src={roomDouble} alt="Hotel Rooms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Our Rooms</h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto px-4">
                Simple, clean, and meant for rest. Choose based on how many people you're travelling with.
              </p>
            </div>
          </div>
        </section>

        {/* Rooms List */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="space-y-12 md:space-y-16">
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-elevated group">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-64 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {room.available && (
                        <span className="absolute top-4 left-4 bg-success text-success-foreground px-4 py-1.5 rounded-full text-sm font-semibold">
                          Available
                        </span>
                      )}
                      <div className="absolute top-4 right-4 bg-price text-price-foreground px-4 py-1.5 rounded-full text-base font-bold">
                        ₹{room.price.toLocaleString()}/night
                      </div>
                    </div>
                  </div>

                  <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <BedDouble className="h-6 w-6 text-primary" />
                      <span className="text-sm text-muted-foreground">Up to {room.maxGuests} guests</span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{room.name}</h2>
                    <p className="text-muted-foreground text-lg mb-6">{room.longDescription}</p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {room.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2 text-sm text-foreground">
                          <Check className="h-4 w-4 text-success flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>

                    <Button onClick={() => handleBooking(room.name)} variant="hero" size="xl">
                      <MessageCircle className="h-5 w-5" />
                      Book on WhatsApp
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Info */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">All Rooms Include</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                  <Droplets className="h-4 w-4 text-primary" />
                  <span className="text-sm">Hot Water 24/7</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                  <Wifi className="h-4 w-4 text-primary" />
                  <span className="text-sm">Free WiFi</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                  <Bath className="h-4 w-4 text-primary" />
                  <span className="text-sm">Attached Bathroom</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">Family Friendly</span>
                </div>
              </div>
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
