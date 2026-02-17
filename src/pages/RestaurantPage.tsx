import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PageHero from "@/components/PageHero";
import { UtensilsCrossed, Clock, Leaf, Coffee, Sun, Moon, Check } from "lucide-react";
import { useImageZones } from "@/hooks/useImageZones";

const menuItems = [
  {
    category: "Breakfast",
    icon: Coffee,
    time: "7:00 AM - 10:00 AM",
    color: "bg-amber-500",
    items: ["Poori Bhaji", "Aloo Paratha", "Idli Sambar", "Dosa", "Bread & Butter", "Tea/Coffee"],
  },
  {
    category: "Lunch",
    icon: Sun,
    time: "12:00 PM - 3:00 PM",
    color: "bg-orange-500",
    items: ["Vegetable Thali", "Rice & Dal", "Roti & Sabzi", "Rajma Chawal", "Chole Bhature", "Paneer Dishes"],
  },
  {
    category: "Dinner",
    icon: Moon,
    time: "7:00 PM - 10:00 PM",
    color: "bg-blue-500",
    items: ["Full Thali", "Roti & Dal", "Rice & Curry", "Naan & Paneer", "South Indian Options", "Soup & Salad"],
  },
];

const features = [
  { icon: Leaf, title: "100% Vegetarian", desc: "Pure veg kitchen", color: "bg-green-500" },
  { icon: UtensilsCrossed, title: "Freshly Made", desc: "Cooked to order", color: "bg-amber-500" },
  { icon: Clock, title: "Early Breakfast", desc: "From 7 AM daily", color: "bg-blue-500" },
];

const RestaurantPage = () => {
  const { getZoneImage } = useImageZones();
  const heroImage = getZoneImage('restaurant_page_hero') || getZoneImage('restaurant_section') || '';
  const restaurantImage = getZoneImage('restaurant_section') || '';

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero */}
        <PageHero
          title="Eat Fresh, Rest Well"
          subtitle="Delicious vegetarian meals prepared fresh daily — no need to step out"
          badge="In-House Restaurant"
          backgroundImage={heroImage}
        />

        {/* Features - Compact row on mobile */}
        <section className="py-6 md:py-10 bg-slate-50">
          <div className="container">
            <div className="grid grid-cols-3 gap-2 md:gap-6 max-w-3xl mx-auto">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-2`}>
                    <feature.icon className="h-5 w-5 md:h-7 md:w-7 text-white" />
                  </div>
                  <h3 className="font-sans font-semibold text-slate-900 text-xs md:text-sm">{feature.title}</h3>
                  <p className="text-slate-500 text-[10px] md:text-xs hidden md:block">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="font-heading text-xl md:text-3xl font-bold text-slate-900 mb-2">
                Our Menu
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                South & North Indian dishes available
              </p>
            </div>

            {/* Menu Cards */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {menuItems.map((menu) => (
                <div key={menu.category} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {/* Card Header */}
                  <div className={`${menu.color} px-4 py-3 flex items-center gap-3`}>
                    <menu.icon className="h-5 w-5 text-white" />
                    <div>
                      <h4 className="font-bold text-white">{menu.category}</h4>
                      <p className="text-white/80 text-xs">{menu.time}</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-4">
                    <ul className="space-y-2">
                      {menu.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Restaurant Gallery Section */}
        <section className="py-6 md:py-12 bg-white">
          <div className="container px-4">
            <div className="text-center mb-5 md:mb-8">
              <h2 className="font-heading text-xl md:text-3xl font-bold text-slate-900 mb-1">
                Restaurant Atmosphere
              </h2>
              <p className="text-slate-500 text-xs md:text-base">
                A warm and welcoming space for your meals
              </p>
            </div>

            {/* Mobile: Vertical Stack | Desktop: Grid */}
            <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
              {/* Main large image */}
              <div className="md:col-span-2 md:row-span-2">
                <div className="relative h-48 md:h-full md:min-h-[400px] rounded-xl overflow-hidden group">
                  <img
                    src={restaurantImage}
                    alt="Restaurant dining area"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                    <p className="text-white font-semibold text-base md:text-lg">Dining Area</p>
                    <p className="text-white/70 text-xs md:text-sm">Comfortable seating for families</p>
                  </div>
                </div>
              </div>

              {/* Two smaller images in a row on mobile */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={restaurantImage}
                    alt="Fresh food preparation"
                    className="w-full h-28 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 md:left-3">
                    <p className="text-white font-medium text-xs md:text-sm">Fresh Food</p>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={restaurantImage}
                    alt="Pure vegetarian kitchen"
                    className="w-full h-28 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 md:left-3">
                    <p className="text-white font-medium text-xs md:text-sm">Pure Veg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-8 md:py-12 bg-amber-50">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h3 className="font-heading text-lg md:text-2xl font-bold text-slate-900 mb-4 text-center">
                What We Offer
              </h3>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {[
                  "Hot & fresh meals",
                  "Room service available",
                  "Early morning breakfast",
                  "Packed food for journey",
                  "Tea & snacks anytime",
                  "Special kids meals",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2.5 shadow-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 text-xs md:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guest Quote */}
        <section className="py-8 md:py-10 bg-slate-900">
          <div className="container">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-white/90 text-sm md:text-lg italic mb-3">
                "Most guests prefer eating here instead of searching outside after a long journey.
                The food is simple, clean, and freshly prepared."
              </p>
              <p className="text-amber-400 text-xs md:text-sm font-medium">— From our guests</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default RestaurantPage;
