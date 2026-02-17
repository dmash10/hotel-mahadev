import { MapPin, Star, Users, Calendar, Heart, Home, Shield } from "lucide-react";
import { useImageZones } from "@/hooks/useImageZones";

const AboutSection = () => {
    const { getZoneImage } = useImageZones();
    const aboutImage = getZoneImage('about_section') || '';

    return (
        <section className="py-10 md:py-14 bg-amber-50/50">
            <div className="container px-4 md:px-6">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="grid lg:grid-cols-5 items-stretch">
                        {/* Image - 2/5 width on desktop */}
                        <div className="lg:col-span-2 h-48 lg:h-auto relative">
                            <img
                                src={aboutImage}
                                alt="Hotel Mahadev - Guptkashi"
                                className="w-full h-full object-cover"
                            />
                            {/* Rating Badge */}
                            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-2 rounded-xl shadow-lg">
                                <div className="flex items-center gap-0.5 mb-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-xs font-bold text-slate-900">4.7/5 • 241 reviews</p>
                            </div>
                        </div>

                        {/* Content - 3/5 width on desktop */}
                        <div className="lg:col-span-3 p-5 lg:p-10 flex flex-col justify-center">
                            <p className="text-amber-600 font-bold text-sm md:text-lg uppercase tracking-wider mb-2">Since 2014</p>
                            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                                Our Story
                            </h2>
                            <p className="text-slate-500 text-sm md:text-xl mb-4">A family that truly understands your yatra</p>

                            <p className="text-slate-600 text-sm md:text-lg mb-4 leading-relaxed">
                                We started Hotel Mahadev right here on the Kedarnath highway when we saw how tired
                                pilgrims looked after long journeys. They needed a home away from home.
                            </p>

                            <p className="text-slate-700 text-sm md:text-base italic border-l-4 border-amber-400 pl-3 bg-amber-50 py-2 rounded-r-lg mb-5">
                                "Aap yahan mehmaan nahi, parivaar ho."
                            </p>

                            {/* Why Us Grid */}
                            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-5">
                                <div className="flex flex-col items-center text-center p-2 md:p-3 bg-slate-50 rounded-xl">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-1">
                                        <Home className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
                                    </div>
                                    <p className="font-semibold text-slate-800 text-xs md:text-sm">Family Run</p>
                                </div>
                                <div className="flex flex-col items-center text-center p-2 md:p-3 bg-slate-50 rounded-xl">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-100 flex items-center justify-center mb-1">
                                        <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                                    </div>
                                    <p className="font-semibold text-slate-800 text-xs md:text-sm">12+ Years</p>
                                </div>
                                <div className="flex flex-col items-center text-center p-2 md:p-3 bg-slate-50 rounded-xl">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-rose-100 flex items-center justify-center mb-1">
                                        <Heart className="h-4 w-4 md:h-5 md:w-5 text-rose-600" />
                                    </div>
                                    <p className="font-semibold text-slate-800 text-xs md:text-sm">Like Family</p>
                                </div>
                            </div>

                            {/* Stats - Horizontal Centered */}
                            <div className="flex justify-center gap-6 md:gap-8 pt-4 border-t border-slate-200">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-0.5">
                                        <Calendar className="h-4 w-4 text-amber-600" />
                                        <p className="text-xl md:text-2xl font-bold text-slate-900">12+</p>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-slate-500 uppercase font-medium">Years</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-0.5">
                                        <MapPin className="h-4 w-4 text-amber-600" />
                                        <p className="text-xl md:text-2xl font-bold text-slate-900">20+</p>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-slate-500 uppercase font-medium">Rooms</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-0.5">
                                        <Users className="h-4 w-4 text-amber-600" />
                                        <p className="text-xl md:text-2xl font-bold text-slate-900">10k+</p>
                                    </div>
                                    <p className="text-[10px] md:text-xs text-slate-500 uppercase font-medium">Guests</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
