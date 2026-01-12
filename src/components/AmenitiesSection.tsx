import { BedDouble, Droplets, Zap, Car, UtensilsCrossed, Wifi, Shield, Users } from "lucide-react";

const amenities = [
  {
    icon: BedDouble,
    title: "Premium Beds",
    description: "Comfortable beds with clean blankets",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-600",
  },
  {
    icon: Droplets,
    title: "Hot Water 24/7",
    description: "Geyser in every bathroom",
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-600",
  },
  {
    icon: Zap,
    title: "Power Backup",
    description: "Uninterrupted power supply",
    gradient: "from-amber-500/20 to-yellow-500/20",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-600",
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Secure space for vehicles",
    gradient: "from-slate-500/20 to-gray-500/20",
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-600",
  },
  {
    icon: UtensilsCrossed,
    title: "In-house Restaurant",
    description: "Fresh vegetarian meals",
    gradient: "from-orange-500/20 to-red-500/20",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-600",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected always",
    gradient: "from-purple-500/20 to-violet-500/20",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-600",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "24/7 security on premises",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-600",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Comfortable for all ages",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-600",
  },
];

const AmenitiesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {amenities.map((item, index) => (
            <div
              key={item.title}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              {/* Glassmorphism card */}
              <div className={`relative h-full p-5 md:p-6 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300`}>
                {/* Glass shine effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className={`relative w-12 h-12 rounded-xl ${item.iconBg} backdrop-blur-sm flex items-center justify-center mb-4 border border-white/10`}>
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="relative font-heading font-bold text-foreground mb-1">{item.title}</h3>
                <p className="relative text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
