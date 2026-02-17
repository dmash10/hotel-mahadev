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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center md:gap-8 lg:gap-12">
          {trustItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-white/50 border border-slate-100 md:bg-transparent md:border-0 md:p-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-slate-700 md:text-secondary-foreground leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
