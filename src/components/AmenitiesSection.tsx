import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users } from "lucide-react";

const amenities = [
  { icon: BedDouble, title: "Premium Beds", description: "Comfortable beds with clean blankets", color: "primary" },
  { icon: Droplets, title: "Hot Water 24/7", description: "Geyser in every bathroom", color: "gold" },
  { icon: Zap, title: "Power Backup", description: "Uninterrupted power supply", color: "rose" },
  { icon: Car, title: "Free Parking", description: "Secure space for vehicles", color: "primary" },
  { icon: UtensilsCrossed, title: "In-house Restaurant", description: "Fresh vegetarian meals", color: "gold" },
  { icon: Wifi, title: "Free WiFi", description: "Stay connected always", color: "rose" },
  { icon: Shield, title: "Safe & Secure", description: "24/7 security on premises", color: "primary" },
  { icon: Users, title: "Family Friendly", description: "Comfortable for all ages", color: "gold" },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return { iconBg: "bg-primary/10", iconColor: "text-primary", glow: "bg-primary/10" };
    case "gold":
      return { iconBg: "bg-gold/10", iconColor: "text-gold", glow: "bg-gold/10" };
    case "rose":
      return { iconBg: "bg-rose-500/10", iconColor: "text-rose-500", glow: "bg-rose-500/10" };
    default:
      return { iconBg: "bg-primary/10", iconColor: "text-primary", glow: "bg-primary/10" };
  }
};

const AmenitiesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background decoration - mixed colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-500/3 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Amenities</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Everything You Need for a Good Rest
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We focus on the basics and do them well. No fancy promises — just reliable comfort after your long journey.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {amenities.map((item, index) => {
            const colors = getColorClasses(item.color);
            return (
              <div
                key={item.title}
                className="group relative animate-fade-in"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {/* Clean card design with color accents */}
                <div className="relative h-full p-4 md:p-6 rounded-xl md:rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-300 overflow-hidden">
                  {/* Subtle corner glow - always visible */}
                  <div className={`absolute -top-4 -right-4 w-14 h-14 ${colors.glow} rounded-full blur-2xl`} />
                  
                  {/* Icon with color */}
                  <div className={`relative w-11 h-11 md:w-12 md:h-12 rounded-lg md:rounded-xl ${colors.iconBg} flex items-center justify-center mb-3 md:mb-4`}>
                    <item.icon className={`h-5 w-5 md:h-6 md:w-6 ${colors.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="relative font-heading font-bold text-foreground text-sm md:text-base mb-1">{item.title}</h3>
                  <p className="relative text-xs md:text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
