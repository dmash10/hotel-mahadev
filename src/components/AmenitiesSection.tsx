import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users } from "lucide-react";

const amenities = [
  { icon: BedDouble, title: "Premium Beds", desc: "Comfortable mattresses" },
  { icon: Droplets, title: "Hot Water", desc: "On-demand geysers" },
  { icon: Zap, title: "Power Backup", desc: "Uninterrupted supply" },
  { icon: Car, title: "Free Parking", desc: "Safe & spacious" },
  { icon: UtensilsCrossed, title: "Restaurant", desc: "Fresh veg meals" },
  { icon: Wifi, title: "Free WiFi", desc: "Stay connected" },
  { icon: Shield, title: "24/7 Security", desc: "Safe premises" },
  { icon: Users, title: "Family Friendly", desc: "All ages welcome" },
];

const AmenitiesSection = () => {
  return (
    <section className="py-10 md:py-14 bg-amber-50/70 border-y border-amber-100/50">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">Amenities</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Everything You Need
          </h2>
        </div>

        {/* Grid - 4 cols on mobile, 8 on desktop */}
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6 max-w-6xl mx-auto">
          {amenities.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-3 md:p-4"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                <item.icon className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
              </div>
              <span className="text-xs md:text-sm font-medium text-slate-800 leading-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
