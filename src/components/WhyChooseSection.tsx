import { MapPin, Droplets, Wifi, Car, UtensilsCrossed, Zap, BedDouble, Shield, Users, Luggage } from "lucide-react";

// Combined features from WhyChoose + Amenities
const features = [
    { icon: MapPin, title: "Near Helipads" },
    { icon: Droplets, title: "Hot Water" },
    { icon: Zap, title: "Power Backup" },
    { icon: Car, title: "Free Parking" },
    { icon: UtensilsCrossed, title: "In-House Restaurant" },
    { icon: Wifi, title: "Free WiFi" },
    { icon: BedDouble, title: "Premium Beds" },
    { icon: Shield, title: "24/7 Security" },
    { icon: Luggage, title: "Luggage Storage" },
    { icon: Users, title: "Family Friendly" },
];

const WhyChooseSection = () => {
    return (
        <section className="py-10 md:py-14 bg-amber-50/70 border-y border-amber-100/50">
            <div className="container px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <span className="inline-block bg-amber-100 text-amber-700 font-bold text-xs uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-3">
                        Divine Hospitality
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mt-2">
                        Why Yatris Choose Hotel Mahadev
                    </h2>
                    <p className="font-sans text-slate-600 text-sm md:text-base max-w-lg mx-auto leading-relaxed mt-3">
                        Maximum rest and spiritual peace before your sacred journey
                    </p>
                </div>

                {/* Grid - 5 cols on mobile (2 rows), 10 on desktop (1 row) */}
                <div className="grid grid-cols-5 lg:grid-cols-10 gap-3 md:gap-4 max-w-6xl mx-auto">
                    {features.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col items-center text-center p-2 md:p-3"
                        >
                            <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                                <item.icon className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
                            </div>
                            <span className="text-[10px] md:text-xs font-medium text-slate-800 leading-tight">
                                {item.title}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Bottom Trust Badge */}
                <div className="flex justify-center mt-8 md:mt-10">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-blue-600 text-white rounded-full text-xs md:text-sm font-medium shadow-lg">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Trusted by 1000+ Kedarnath Yatris every season
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
