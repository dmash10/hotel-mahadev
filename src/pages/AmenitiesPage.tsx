import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users, Clock, Tv, Phone, Wind, Mountain, Sparkles, Heart } from "lucide-react";

const featuredAmenities = [
  {
    icon: BedDouble,
    title: "Deluxe Rooms",
    description: "Spacious and comfortable rooms with premium bedding and modern amenities. Perfect for families and groups.",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected with high-speed internet throughout the property. Stream, work, or share your journey moments.",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking space for cars, jeeps, and taxis. Well-lit and monitored for your peace of mind.",
  },
];

const allAmenities = [
  { icon: BedDouble, title: "Premium Beds", description: "Comfortable beds with quality mattresses and fresh linens" },
  { icon: Droplets, title: "Hot Water 24/7", description: "Geyser in every bathroom for hot water anytime" },
  { icon: Zap, title: "Power Backup", description: "Generator backup for uninterrupted power" },
  { icon: Car, title: "Free Parking", description: "Secure parking for cars, jeeps, and taxis" },
  { icon: UtensilsCrossed, title: "Restaurant", description: "Fresh vegetarian meals, South & North Indian" },
  { icon: Wifi, title: "Free WiFi", description: "Stay connected throughout your stay" },
  { icon: Shield, title: "Safe & Secure", description: "24/7 security for peace of mind" },
  { icon: Users, title: "Family Friendly", description: "Comfortable for families and elderly guests" },
  { icon: Mountain, title: "Mountain Views", description: "Scenic views of the Himalayan landscape" },
  { icon: Phone, title: "Room Service", description: "Food delivered to your room" },
  { icon: Sparkles, title: "Daily Housekeeping", description: "Clean rooms and fresh towels daily" },
  { icon: Clock, title: "Flexible Timings", description: "Early check-in and late check-out available" },
  { icon: Tv, title: "Television", description: "Cable TV with major channels" },
  { icon: Wind, title: "Fresh Mountain Air", description: "Well-ventilated rooms with fresh air" },
  { icon: Heart, title: "Warm Hospitality", description: "Family-run with personal attention" },
];

const AmenitiesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero Section with Gradient Background */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background gradients - gold theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-background to-amber-500/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold text-sm font-semibold rounded-full mb-4">
                Hotel Amenities
              </span>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
                Everything for Your Comfort
              </h1>
              <p className="text-muted-foreground text-lg">
                We focus on what matters most to tired travellers. Clean rooms, hot water, good food, 
                and a safe place to rest before your journey continues.
              </p>
            </div>

            {/* Featured Amenities - Premium Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {featuredAmenities.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card container with layered design */}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-gold/20 p-1">
                    {/* Inner card */}
                    <div className="relative rounded-2xl bg-gradient-to-br from-white/80 to-amber-50/50 dark:from-background/80 dark:to-amber-950/30 p-6 md:p-8 backdrop-blur-sm">
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/20 to-transparent rounded-bl-full" />
                      
                      {/* Icon with glow */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 w-16 h-16 bg-gold/20 rounded-2xl blur-xl" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center shadow-lg shadow-gold/25">
                          <item.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      
                      {/* Bottom accent line */}
                      <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-gold to-amber-400 group-hover:w-20 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Amenities Grid - Glassmorphism Cards */}
        <section className="py-12 md:py-16 relative">
          {/* Subtle background decoration - gold theme */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="text-center mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                All Amenities
              </h2>
              <p className="text-muted-foreground">
                Every comfort we provide for our guests
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {allAmenities.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {/* Refined card design */}
                  <div className="relative h-full p-5 rounded-2xl bg-gradient-to-br from-white to-amber-50/50 dark:from-card dark:to-amber-950/10 border border-gold/10 hover:border-gold/30 transition-all duration-300 overflow-hidden">
                    {/* Subtle corner decoration */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors duration-300" />
                    
                    {/* Icon */}
                    <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-gold/15 to-amber-500/10 flex items-center justify-center mb-4 border border-gold/20 group-hover:from-gold/25 group-hover:to-amber-500/20 transition-all duration-300">
                      <item.icon className="h-5 w-5 text-gold" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="relative font-heading font-bold text-foreground text-sm mb-1.5">{item.title}</h3>
                    <p className="relative text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Simple, Reliable Comfort
              </h2>
              <p className="text-muted-foreground mb-6">
                We believe in doing the basics well. Clean rooms, hot water, good food, and friendly service — 
                that's what tired travellers really need after a long journey.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Rooms available for booking
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

export default AmenitiesPage;
