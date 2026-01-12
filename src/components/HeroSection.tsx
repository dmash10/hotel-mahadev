import BookingCard from "@/components/BookingCard";
import hotelExterior from "@/assets/hotel-exterior.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hotelExterior}
          alt="New Hotel Mahadev Exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent md:hidden" />
      </div>

      <div className="container relative z-10 py-8 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(90vh-4rem)] md:min-h-[calc(85vh-5rem)]">
          {/* Left Content */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-success text-success-foreground text-sm font-semibold rounded-full mb-4">
              On the Kedarnath Route
            </span>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              A Clean, Comfortable Place to Stop Before{" "}
              <span className="text-gold-light">Kedarnath</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-6 max-w-xl">
              If you're travelling through Guptkashi and need a place that's quiet, clean, and reliable, 
              New Hotel Mahadev is a good place to rest.
            </p>

            <div className="hidden lg:flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                Hot water available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                Restaurant inside
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success" />
                Free parking
              </span>
            </div>
          </div>

          {/* Right - Booking Card */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <BookingCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
