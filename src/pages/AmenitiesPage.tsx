import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users, Clock, Tv, Phone, Wind } from "lucide-react";
import hotelExterior from "@/assets/hotel-exterior.jpg";

const amenities = [
  {
    icon: BedDouble,
    title: "Premium Beds",
    description: "Comfortable beds with quality mattresses, clean blankets, and fresh linens changed regularly. We understand that good sleep is essential after a long journey.",
  },
  {
    icon: Droplets,
    title: "Hot Water 24/7",
    description: "Geyser in every bathroom ensures hot water is available round the clock. No waiting, no cold showers — even during early morning departures.",
  },
  {
    icon: Zap,
    title: "Power Backup",
    description: "Uninterrupted power supply with backup generator. Mountain weather can be unpredictable, but your comfort won't be affected.",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking space for cars and taxis. Enough room for multiple vehicles with easy access. Your driver can also arrange accommodation nearby.",
  },
  {
    icon: UtensilsCrossed,
    title: "In-house Restaurant",
    description: "Pure vegetarian meals prepared fresh. South Indian and North Indian options available. Early breakfast for pilgrims starting their journey.",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected throughout your stay. Good enough for calls, messages, and basic browsing. Perfect for updating family about your journey.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "24/7 staff presence for your peace of mind. Secure environment for families and solo travelers alike.",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Comfortable for families with elderly members, children, and groups. Quiet atmosphere suitable for rest.",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Early check-in and late check-out can be arranged based on availability. We understand pilgrimage schedules.",
  },
  {
    icon: Phone,
    title: "Room Service",
    description: "Order food to your room if you prefer. Especially helpful for tired travelers who want to rest immediately.",
  },
  {
    icon: Wind,
    title: "Clean Air",
    description: "Fresh mountain air and well-ventilated rooms. No stuffy, closed environments.",
  },
  {
    icon: Tv,
    title: "Television",
    description: "TV available in rooms for news and entertainment. Cable connection with major channels.",
  },
];

const AmenitiesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero Banner */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img src={hotelExterior} alt="Hotel Amenities" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Amenities</h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto px-4">
                We focus on the basics and do them well. Everything you need for a comfortable stay.
              </p>
            </div>
          </div>
        </section>

        {/* Amenities Grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {amenities.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-card p-6 md:p-8 rounded-xl border border-border hover:shadow-card hover:border-primary/20 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Note */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                No Fancy Promises — Just Reliable Comfort
              </h3>
              <p className="text-muted-foreground">
                We're a family-run hotel focused on giving travelers a clean, quiet place to rest. 
                Everything we offer is maintained properly and works when you need it.
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

export default AmenitiesPage;
