import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users, Clock, Tv, Phone, Wind, Mountain, Sparkles, Heart } from "lucide-react";

const featuredAmenities = [
  {
    icon: Droplets,
    title: "24/7 Hot Water",
    description: "Every room has a geyser for hot water anytime you need it. Essential after a long journey in the mountains.",
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    icon: UtensilsCrossed,
    title: "In-house Restaurant",
    description: "Fresh vegetarian meals including South Indian and North Indian cuisine. No need to step out after a tiring day.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking space for cars, jeeps, and taxis. Well-lit and monitored for your peace of mind.",
    gradient: "from-slate-500 to-gray-600",
  },
];

const allAmenities = [
  {
    icon: BedDouble,
    title: "Premium Beds",
    description: "Comfortable beds with quality mattresses and fresh linens",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-600",
  },
  {
    icon: Droplets,
    title: "Hot Water 24/7",
    description: "Geyser in every bathroom for hot water anytime",
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-600",
  },
  {
    icon: Zap,
    title: "Power Backup",
    description: "Generator backup for uninterrupted power",
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-600",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking for cars, jeeps, and taxis",
    gradient: "from-slate-500/20 to-gray-500/20",
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-600",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant",
    description: "Fresh vegetarian meals, South & North Indian",
    gradient: "from-orange-500/20 to-red-500/20",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-600",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected throughout your stay",
    gradient: "from-purple-500/20 to-violet-500/20",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-600",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "24/7 security for peace of mind",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-600",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Comfortable for families and elderly guests",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-600",
  },
  {
    icon: Mountain,
    title: "Mountain Views",
    description: "Scenic views of the Himalayan landscape",
    gradient: "from-sky-500/20 to-blue-500/20",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-600",
  },
  {
    icon: Phone,
    title: "Room Service",
    description: "Food delivered to your room",
    gradient: "from-indigo-500/20 to-purple-500/20",
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-600",
  },
  {
    icon: Sparkles,
    title: "Daily Housekeeping",
    description: "Clean rooms and fresh towels daily",
    gradient: "from-teal-500/20 to-emerald-500/20",
    iconBg: "bg-teal-500/20",
    iconColor: "text-teal-600",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Early check-in and late check-out available",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-600",
  },
  {
    icon: Tv,
    title: "Television",
    description: "Cable TV with major channels",
    gradient: "from-gray-500/20 to-slate-500/20",
    iconBg: "bg-gray-500/20",
    iconColor: "text-gray-600",
  },
  {
    icon: Wind,
    title: "Fresh Mountain Air",
    description: "Well-ventilated rooms with fresh air",
    gradient: "from-cyan-500/20 to-sky-500/20",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-600",
  },
  {
    icon: Heart,
    title: "Warm Hospitality",
    description: "Family-run with personal attention",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-600",
  },
];

const AmenitiesPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero Section with Gradient Background */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-gold/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
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

            {/* Featured Amenities - Large Gradient Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {featuredAmenities.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative animate-fade-in overflow-hidden rounded-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`} />
                  
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative p-6 md:p-8 text-white">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/20">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-heading text-xl md:text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Amenities Grid - Glassmorphism Cards */}
        <section className="py-12 md:py-16 relative">
          {/* Subtle background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
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
                  {/* Glassmorphism card */}
                  <div className={`relative h-full p-4 rounded-xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300`}>
                    {/* Glass shine effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Icon */}
                    <div className={`relative w-10 h-10 rounded-lg ${item.iconBg} backdrop-blur-sm flex items-center justify-center mb-3 border border-white/10`}>
                      <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="relative font-heading font-bold text-foreground text-sm mb-1">{item.title}</h3>
                    <p className="relative text-xs text-muted-foreground line-clamp-2">{item.description}</p>
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
