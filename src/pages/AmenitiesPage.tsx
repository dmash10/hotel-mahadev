import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PageHero from "@/components/PageHero";
import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users, Clock, Tv, Phone, Wind, Mountain, Sparkles, Heart, Check } from "lucide-react";
import { useImageZones } from "@/hooks/useImageZones";

// Featured amenities with colors
const featuredAmenities = [
  {
    icon: BedDouble,
    title: "Deluxe Rooms",
    description: "Spacious rooms with premium bedding",
    color: "bg-blue-500",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "High-speed internet throughout",
    color: "bg-amber-500",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking for all vehicles",
    color: "bg-rose-500",
  },
];

// All amenities
const allAmenities = [
  { icon: BedDouble, title: "Premium Beds" },
  { icon: Droplets, title: "Hot Water 24/7" },
  { icon: Zap, title: "Power Backup" },
  { icon: Car, title: "Free Parking" },
  { icon: UtensilsCrossed, title: "Restaurant" },
  { icon: Wifi, title: "Free WiFi" },
  { icon: Shield, title: "Safe & Secure" },
  { icon: Users, title: "Family Friendly" },
  { icon: Mountain, title: "Mountain Views" },
  { icon: Phone, title: "Room Service" },
  { icon: Sparkles, title: "Daily Housekeeping" },
  { icon: Clock, title: "Flexible Timings" },
  { icon: Tv, title: "Smart TV" },
  { icon: Wind, title: "Fresh Air" },
  { icon: Heart, title: "Warm Hospitality" },
];

const AmenitiesPage = () => {
  const { getZoneImage } = useImageZones();
  const heroImage = getZoneImage('amenities_page_hero') || '';

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero */}
        <PageHero
          title="All the Comforts You Need"
          subtitle="Everything a traveller needs after a long journey — clean, safe, and reliable"
          badge="Amenities"
          backgroundImage={heroImage}
        />

        {/* Featured Amenities - Stacked on mobile, Grid on desktop */}
        <section className="py-8 md:py-12 bg-slate-50">
          <div className="container">
            <h2 className="font-heading text-lg md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 text-center">
              Top Amenities
            </h2>

            {/* Mobile: Stacked | Desktop: 3-column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
              {featuredAmenities.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 md:flex-col md:items-start bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm"
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-900 text-base md:text-lg">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Amenities - Compact Grid */}
        <section className="py-8 md:py-12">
          <div className="container">
            <h2 className="font-heading text-lg md:text-2xl font-bold text-slate-900 mb-4 md:mb-6 text-center">
              All Amenities
            </h2>

            {/* Mobile: 3 columns | Desktop: 5 columns */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
              {allAmenities.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center p-3 md:p-4 rounded-xl bg-slate-50 md:bg-white md:border md:border-slate-100"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-50 flex items-center justify-center mb-2">
                    <item.icon className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                  </div>
                  <span className="font-medium text-slate-700 text-xs md:text-sm leading-tight">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Promise - Simple List */}
        <section className="py-8 md:py-12 bg-emerald-50">
          <div className="container">
            <h2 className="font-heading text-lg md:text-2xl font-bold text-slate-900 mb-4 text-center">
              Our Promise
            </h2>
            <div className="max-w-md mx-auto space-y-2">
              {[
                "Clean and well-maintained rooms",
                "24/7 hot water guaranteed",
                "Fresh vegetarian food",
                "Safe and secure premises",
                "Helpful staff always available"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 shadow-sm">
                  <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA - Compact */}
        <section className="py-8 md:py-12 bg-slate-100">
          <div className="container">
            <div className="text-center">
              <h2 className="font-heading text-lg md:text-2xl font-bold text-slate-900 mb-2">
                Simple, Reliable Comfort
              </h2>
              <p className="text-slate-600 text-sm mb-4 max-w-md mx-auto">
                Everything tired travellers need after a long journey.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
