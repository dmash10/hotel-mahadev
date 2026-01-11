import { Button } from "@/components/ui/button";
import { Users, Wifi, Droplets, Bath, MessageCircle } from "lucide-react";
import roomDouble from "@/assets/room-double.jpg";
import roomTriple from "@/assets/room-triple.jpg";
import roomQuad from "@/assets/room-quad.jpg";

interface RoomCardProps {
  name: string;
  description: string;
  maxGuests: number;
  price: number;
  image: string;
  available: boolean;
}

const RoomCard = ({ name, description, maxGuests, price, image, available }: RoomCardProps) => {
  const handleBooking = () => {
    const message = encodeURIComponent(`Hi, I'm interested in booking the ${name}. Please let me know availability.`);
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden group hover:shadow-elevated transition-all duration-300">
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {available && (
          <span className="absolute top-3 left-3 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Available
          </span>
        )}
        <div className="absolute top-3 right-3 bg-price text-price-foreground px-3 py-1 rounded-full text-sm font-bold">
          ₹{price.toLocaleString()}/night
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>Up to {maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Wifi className="h-3.5 w-3.5" />
            <span>Free WiFi</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Droplets className="h-3.5 w-3.5" />
            <span>Hot Water</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Bath className="h-3.5 w-3.5" />
            <span>Attached Bath</span>
          </div>
        </div>

        <Button onClick={handleBooking} variant="hero" className="w-full" size="lg">
          <MessageCircle className="h-4 w-4" />
          Book on WhatsApp
        </Button>
      </div>
    </div>
  );
};

const rooms = [
  {
    name: "Double Bed Room",
    description: "A comfortable room for two. Good for couples, friends, or solo travellers who prefer extra space.",
    maxGuests: 2,
    price: 1500,
    image: roomDouble,
    available: true,
  },
  {
    name: "Triple Bed Room",
    description: "A practical option for three guests. Often chosen by small families or groups travelling together.",
    maxGuests: 3,
    price: 2200,
    image: roomTriple,
    available: true,
  },
  {
    name: "Quad Bed Room",
    description: "Designed for families or groups of four. Spacious enough to stay comfortably without feeling crowded.",
    maxGuests: 4,
    price: 2800,
    image: roomQuad,
    available: true,
  },
];

const RoomsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Rooms</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Simple, Clean & Comfortable
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose based on how many people you're travelling with. All rooms include hot water, 
            attached bathrooms, and access to the restaurant and parking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rooms.map((room, index) => (
            <div key={room.name} className="animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
              <RoomCard {...room} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
