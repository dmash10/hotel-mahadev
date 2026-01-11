import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users } from "lucide-react";

const amenities = [
  {
    icon: BedDouble,
    title: "Premium Beds",
    description: "Comfortable beds with clean blankets and fresh linens",
  },
  {
    icon: Droplets,
    title: "Hot Water 24/7",
    description: "Geyser in every bathroom for hot water anytime",
  },
  {
    icon: Zap,
    title: "Power Backup",
    description: "Uninterrupted power supply with backup generator",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure parking space for cars and taxis",
  },
  {
    icon: UtensilsCrossed,
    title: "In-house Restaurant",
    description: "Vegetarian meals prepared fresh, South & North Indian",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected throughout your stay",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "24/7 security for peace of mind",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Comfortable for families, elderly guests, and groups",
  },
];

const AmenitiesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Amenities</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Everything You Need for a Good Rest
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We focus on the basics and do them well. No fancy promises — just reliable comfort after your long journey.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {amenities.map((item, index) => (
            <div
              key={item.title}
              className="bg-card p-5 md:p-6 rounded-xl border border-border hover:shadow-card hover:border-primary/20 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
