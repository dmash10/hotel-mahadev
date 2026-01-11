import { MapPin, Droplets, Wifi, Car, UtensilsCrossed, Zap, Shield } from "lucide-react";

const trustItems = [
  { icon: MapPin, label: "On Kedarnath Route" },
  { icon: Droplets, label: "Hot Water 24/7" },
  { icon: Wifi, label: "Free WiFi" },
  { icon: Car, label: "Parking Space" },
  { icon: UtensilsCrossed, label: "Restaurant Inside" },
  { icon: Zap, label: "Power Backup" },
];

const TrustStrip = () => {
  return (
    <section className="bg-secondary py-4 md:py-6 border-y border-border">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
          {trustItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-secondary-foreground animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
