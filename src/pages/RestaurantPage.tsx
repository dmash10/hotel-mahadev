import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { UtensilsCrossed, Clock, Leaf, Coffee, Sun, Moon } from "lucide-react";
import restaurant from "@/assets/restaurant.jpg";

const menuItems = [
  {
    category: "Breakfast",
    icon: Coffee,
    time: "7:00 AM - 10:00 AM",
    items: ["Poori Bhaji", "Aloo Paratha", "Idli Sambar", "Dosa", "Bread & Butter", "Tea/Coffee"],
  },
  {
    category: "Lunch",
    icon: Sun,
    time: "12:00 PM - 3:00 PM",
    items: ["Vegetable Thali", "Rice & Dal", "Roti & Sabzi", "Rajma Chawal", "Chole Bhature", "Paneer Dishes"],
  },
  {
    category: "Dinner",
    icon: Moon,
    time: "7:00 PM - 10:00 PM",
    items: ["Full Thali", "Roti & Dal", "Rice & Curry", "Naan & Paneer", "South Indian Options", "Soup & Salad"],
  },
];

const RestaurantPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0" style={{ viewTransitionName: "page-content" }}>
      <Header />
      <main>
        {/* Hero Banner */}
        <section 
          className="relative h-64 md:h-96 overflow-hidden"
          style={{ viewTransitionName: "hero-section" }}
        >
          <img 
            src={restaurant} 
            alt="Hotel Restaurant" 
            className="w-full h-full object-cover" 
            style={{ viewTransitionName: "hero-image" }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center" style={{ viewTransitionName: "section-header" }}>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Restaurant</h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto px-4">
                Hot, fresh, vegetarian meals prepared with care. You don't have to step out after a long journey.
              </p>
            </div>
          </div>
        </section>

        {/* About Restaurant */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Pure Vegetarian</span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Simple, Filling, Home-Style Cooking
              </h2>
              <p className="text-muted-foreground text-lg">
                Our restaurant serves vegetarian meals that are simple, filling, and suitable for all age groups. 
                Food is cooked fresh for every order. Both South Indian and North Indian options are available.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <div 
                className="bg-card p-6 rounded-xl border border-border text-center"
                style={{ viewTransitionName: "menu-card-1" }}
              >
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-7 w-7 text-success" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">100% Vegetarian</h3>
                <p className="text-sm text-muted-foreground">Pure vegetarian kitchen with no non-veg items</p>
              </div>
              <div 
                className="bg-card p-6 rounded-xl border border-border text-center"
                style={{ viewTransitionName: "menu-card-2" }}
              >
                <div className="w-14 h-14 rounded-full bg-price/10 flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="h-7 w-7 text-price" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">Freshly Prepared</h3>
                <p className="text-sm text-muted-foreground">Every dish is cooked fresh, not reheated</p>
              </div>
              <div 
                className="bg-card p-6 rounded-xl border border-border text-center"
                style={{ viewTransitionName: "menu-card-3" }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">Early Breakfast</h3>
                <p className="text-sm text-muted-foreground">Available from 7 AM for early pilgrims</p>
              </div>
            </div>

            {/* Menu */}
            <div className="max-w-4xl mx-auto">
              <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-8">Our Menu</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {menuItems.map((menu, index) => (
                  <div 
                    key={menu.category} 
                    className="bg-muted/50 rounded-xl p-6"
                    style={{ viewTransitionName: `menu-card-${index + 4}` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <menu.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-foreground">{menu.category}</h4>
                        <p className="text-xs text-muted-foreground">{menu.time}</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {menu.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="py-12 bg-secondary">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-secondary-foreground text-lg">
                "Most guests prefer eating here instead of searching outside after a long journey. 
                The food is simple, clean, and prepared with fresh ingredients."
              </p>
              <p className="text-muted-foreground mt-4 text-sm">— From our guests</p>
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
