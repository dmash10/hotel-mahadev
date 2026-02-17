import { attractions } from "@/data/attractions";
import { ArrowRight, MapPin, Mountain } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";

const AttractionsSection = () => {
    // Show 4 attractions on home, skipping Kedarnath (index 0)
    const featuredAttractions = attractions.slice(1, 5);

    return (
        <section className="py-10 md:py-14 bg-white">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-8 md:mb-10">
                    <p className="text-amber-600 font-bold text-base md:text-lg uppercase tracking-wider">Nearby Destinations</p>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-2 mb-3">
                        Sacred Places Around Us
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto">
                        Explore divine temples and scenic spots near our hotel
                    </p>
                </div>

                {/* Mobile: 2x2 Grid | Desktop: Horizontal Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
                    {featuredAttractions.map((attraction) => (
                        <TransitionLink
                            to={`/attractions#${attraction.id}`}
                            key={attraction.id}
                            className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300"
                        >
                            {/* Image with overlay */}
                            <div className="relative h-32 md:h-40 overflow-hidden">
                                <img
                                    src={attraction.image}
                                    alt={attraction.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Highlight badge */}
                                {attraction.highlight && (
                                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        {attraction.highlight}
                                    </span>
                                )}

                                {/* Title on image for mobile */}
                                <div className="absolute bottom-2 left-2 right-2 lg:hidden">
                                    <h3 className="font-bold text-white text-sm line-clamp-1">
                                        {attraction.title}
                                    </h3>
                                    <div className="flex items-center gap-1 text-white/80 text-xs">
                                        <MapPin className="h-3 w-3" />
                                        {attraction.distance}
                                    </div>
                                </div>
                            </div>

                            {/* Desktop: Card content below image */}
                            <div className="hidden lg:block p-4">
                                <h3 className="font-heading font-bold text-base text-slate-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                                    {attraction.title}
                                </h3>

                                <p className="text-slate-500 text-xs mb-3 line-clamp-2">
                                    {attraction.description.substring(0, 80)}...
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                                        <MapPin className="h-3.5 w-3.5 text-amber-500" />
                                        {attraction.distance}
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                                        <ArrowRight className="h-3.5 w-3.5 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>

                            {/* Mobile: Minimal content */}
                            <div className="lg:hidden p-2.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">View Details</span>
                                    <ArrowRight className="h-3.5 w-3.5 text-amber-500" />
                                </div>
                            </div>
                        </TransitionLink>
                    ))}
                </div>

                <div className="text-center">
                    <TransitionLink
                        to="/attractions"
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors"
                    >
                        <Mountain className="h-4 w-4" />
                        View All Sacred Places
                        <ArrowRight className="h-4 w-4" />
                    </TransitionLink>
                </div>
            </div>
        </section>
    );
};

export default AttractionsSection;
