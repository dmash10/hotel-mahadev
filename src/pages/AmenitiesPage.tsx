import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users, Clock, Tv, Phone, Wind, Mountain, Sparkles, Heart } from "lucide-react";

// Each featured amenity has its own color accent
const featuredAmenities = [
  {
    icon: BedDouble,
    title: "Deluxe Rooms",
    description: "Spacious and comfortable rooms with premium bedding and modern amenities. Perfect for families and groups.",
    gradient: "from-primary to-primary-light",
    iconBg: "bg-gradient-to-br from-primary to-primary-light",
    accentColor: "bg-primary",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected with high-speed internet throughout the property. Stream, work, or share your journey moments.",
    gradient: "from-gold to-amber-500",
    iconBg: "bg-gradient-to-br from-gold to-amber-500",
    accentColor: "bg-gold",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking space for cars, jeeps, and taxis. Well-lit and monitored for your peace of mind.",
    gradient: "from-rose-600 to-rose-500",
    iconBg: "bg-gradient-to-br from-rose-600 to-rose-500",
    accentColor: "bg-rose-600",
  },
];

// All amenities use primary blue color
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

// Primary blue color classes for all amenity cards
const primaryColorClasses = {
  iconBg: "bg-primary/10",
  iconColor: "text-primary",
  border: "border-primary/15",
  glow: "bg-primary/10",
};

const AmenitiesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero Section with Mixed Gradient Background */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background gradients - mixed colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-gold/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          
          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
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

            {/* Featured Amenities - Premium Cards with different colors */}
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {featuredAmenities.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card with gradient border effect */}
                  <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-card border border-border/50 shadow-lg shadow-black/5">
                    {/* Top gradient bar */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${item.gradient}`} />
                    
                    {/* Content */}
                    <div className="p-5 md:p-7">
                      {/* Icon with glow - always visible on mobile */}
                      <div className="relative mb-5">
                        <div className={`absolute inset-0 w-14 h-14 ${item.iconBg} rounded-2xl blur-xl opacity-50`} />
                        <div className={`relative w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-lg`}>
                          <item.icon className="h-7 w-7 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
                      
                      {/* Bottom accent line - always visible */}
                      <div className={`mt-5 h-1 w-16 md:w-12 rounded-full ${item.accentColor} md:group-hover:w-20 transition-all duration-500`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Amenities Grid */}
        <section className="py-12 md:py-16 relative">
          {/* Subtle background decoration - mixed colors */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl" />
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {allAmenities.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {/* Clean card design with primary blue accent */}
                  <div className={`relative h-full p-4 md:p-5 rounded-xl md:rounded-2xl bg-card border ${primaryColorClasses.border} shadow-sm transition-all duration-300 overflow-hidden`}>
                    {/* Subtle corner glow - always visible */}
                    <div className={`absolute -top-4 -right-4 w-14 h-14 ${primaryColorClasses.glow} rounded-full blur-2xl`} />
                    
                    {/* Icon with primary blue color */}
                    <div className={`relative w-10 h-10 md:w-11 md:h-11 rounded-lg md:rounded-xl ${primaryColorClasses.iconBg} flex items-center justify-center mb-3 md:mb-4`}>
                      <item.icon className={`h-5 w-5 ${primaryColorClasses.iconColor}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="relative font-heading font-bold text-foreground text-sm mb-1">{item.title}</h3>
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
