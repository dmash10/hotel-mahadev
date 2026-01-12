import { Button } from "@/components/ui/button";
import { Users, Wifi, Droplets, Bath, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import roomDouble from "@/assets/room-double.jpg";
import roomTriple from "@/assets/room-triple.jpg";
import roomQuad from "@/assets/room-quad.jpg";

const rooms = [
  {
    id: "double",
    name: "Double Bed Room",
    maxGuests: 2,
    fakePrice: 2500,
    realPrice: 1500,
    discount: 40,
    image: roomDouble,
    available: true,
  },
  {
    id: "triple",
    name: "Triple Bed Room",
    maxGuests: 3,
    fakePrice: 3500,
    realPrice: 2200,
    discount: 37,
    image: roomTriple,
    available: true,
  },
  {
    id: "four",
    name: "Four Bed Room",
    maxGuests: 4,
    fakePrice: 4500,
    realPrice: 2800,
    discount: 38,
    image: roomQuad,
    available: true,
  },
];

const RoomsSection = () => {
  const handleBooking = (roomName: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in booking the ${roomName}. Please let me know availability.`);
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10 animate-fade-in">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Rooms</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Book Direct & Save More
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All rooms include hot water, attached bathrooms, and access to restaurant and parking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="bg-card rounded-xl overflow-hidden border border-transparent hover:border-primary/20 transition-colors duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-95"
                />
                {room.available && (
                  <span className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-0.5 rounded text-xs font-semibold">
                    Available
                  </span>
                )}
                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-2 py-0.5 rounded text-xs font-bold">
                  {room.discount}% OFF
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-bold text-foreground">{room.name}</h3>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" /> {room.maxGuests}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm text-destructive line-through">₹{room.fakePrice.toLocaleString()}</span>
                  <span className="text-xl font-bold text-success">₹{room.realPrice.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">/night</span>
                </div>

                {/* Quick Amenities */}
                <div className="flex gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> WiFi</span>
                  <span className="flex items-center gap-1"><Droplets className="h-3 w-3" /> Hot Water</span>
                  <span className="flex items-center gap-1"><Bath className="h-3 w-3" /> Attached</span>
                </div>

                <Button onClick={() => handleBooking(room.name)} variant="hero" size="default" className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  Book on WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/rooms">
              View All Rooms & Details
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
