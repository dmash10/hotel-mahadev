import { Button } from "@/components/ui/button";
import { Users, Wifi, Droplets, Bath, MessageCircle, ArrowRight } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";
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
              className="group relative animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card - No scale/shadow on hover */}
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card/95 to-card/90 border border-border/50 transition-[border-color] duration-700 ease-out group-hover:border-primary/40">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/3 group-hover:via-transparent group-hover:to-accent/3 transition-all duration-700 ease-out" />
                
                {/* Image with Parallax Effect */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:-translate-y-2">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-[115%] object-cover"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-700" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3">
                    {room.available && (
                      <span className="inline-flex items-center gap-1.5 bg-success/90 backdrop-blur-sm text-success-foreground px-2.5 py-1 rounded-full text-xs font-bold opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="w-1.5 h-1.5 bg-success-foreground rounded-full animate-pulse" />
                        Available
                      </span>
                    )}
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground px-2.5 py-1 rounded-full text-xs font-bold">
                      {room.discount}% OFF
                    </span>
                  </div>

                  {/* Room Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-bold text-lg text-white drop-shadow-lg transition-transform duration-500 ease-out group-hover:translate-x-1">
                      {room.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-white/80 text-xs">
                      <Users className="h-3 w-3" /> Up to {room.maxGuests} guests
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-4">
                  {/* Price Section */}
                  <div className="flex items-center gap-3 mb-4 bg-muted/50 rounded-xl px-3 py-2.5 border border-border/30 transition-[background-color,border-color] duration-700 group-hover:bg-muted/70 group-hover:border-border/50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Was</span>
                      <span className="text-sm text-destructive/80 line-through font-medium">₹{room.fakePrice.toLocaleString()}</span>
                    </div>
                    <div className="w-px h-8 bg-border/50" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Now</span>
                      <span className="text-xl font-bold text-success">₹{room.realPrice.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground self-end pb-0.5">/night</span>
                  </div>

                  {/* Quick Amenities with staggered hover */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { icon: Wifi, label: "WiFi" },
                      { icon: Droplets, label: "Hot Water" },
                      { icon: Bath, label: "Attached" }
                    ].map((amenity, idx) => (
                      <span 
                        key={amenity.label}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/40 px-2 py-1 rounded-full border border-border/20 transition-all duration-500 group-hover:bg-muted/60 group-hover:border-border/40 group-hover:text-foreground"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        <amenity.icon className="h-3 w-3 text-primary transition-transform duration-500 group-hover:rotate-6" /> {amenity.label}
                      </span>
                    ))}
                  </div>

                  <Button onClick={() => handleBooking(room.name)} variant="whatsapp" size="default" className="w-full transition-all duration-500">
                    <MessageCircle className="h-4 w-4" />
                    Book on WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <TransitionLink to="/rooms">
              View All Rooms & Details
              <ArrowRight className="h-4 w-4" />
            </TransitionLink>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
