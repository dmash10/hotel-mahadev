import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { attractions } from "@/data/attractions";
import { MapPin, Clock, Mountain, Sparkles, ArrowRight } from "lucide-react";
import { useImageZones } from "@/hooks/useImageZones";

const AttractionsPage = () => {
    const { getZoneImage } = useImageZones();
    const heroImage = getZoneImage('attractions_page_hero') || '';

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="pb-20">
                <PageHero
                    title="Sacred Destinations"
                    subtitle="Explore the divine beauty surrounding Hotel Mahadev"
                    badge="Nearby Attractions"
                    backgroundImage={heroImage}
                />

                {/* Intro Section */}
                <section className="py-8 md:py-12 bg-white">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4 md:mb-6">
                                <Mountain className="h-7 w-7 md:h-8 md:w-8 text-amber-600" />
                            </div>
                            <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
                                Your Gateway to Char Dham
                            </h2>
                            <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
                                Hotel Mahadev is perfectly located in Guptkashi — the last major town before Kedarnath.
                                Explore multiple sacred destinations from here.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Attractions Cards */}
                <section className="py-6 md:py-12">
                    <div className="container px-4 md:px-6">
                        <div className="space-y-4 md:space-y-10">
                            {attractions.map((attraction, index) => (
                                <div
                                    key={attraction.id}
                                    id={attraction.id}
                                    className="scroll-mt-20 md:scroll-mt-24"
                                >
                                    {/* MOBILE Card Design */}
                                    <div className="md:hidden bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                                        {/* Image */}
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <img
                                                src={attraction.image}
                                                alt={attraction.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Badges */}
                                            {attraction.highlight && (
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-amber-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
                                                        <Sparkles className="h-2.5 w-2.5" />
                                                        {attraction.highlight}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute bottom-3 right-3">
                                                <span className="bg-white/95 text-slate-800 px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 shadow-md">
                                                    <MapPin className="h-2.5 w-2.5 text-amber-600" />
                                                    {attraction.distance}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                                {attraction.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                                {attraction.description}
                                            </p>

                                            {/* Kedarnath extra info */}
                                            {attraction.id === "kedarnath" && (
                                                <div className="mt-3 bg-amber-50 rounded-lg p-3 border border-amber-100">
                                                    <p className="text-xs text-slate-700 flex items-center gap-2">
                                                        <Clock className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                                                        <span><strong>Pro Tip:</strong> Start early at 4 AM to avoid rush</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* DESKTOP Card Design */}
                                    <div className={`hidden md:block bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100`}>
                                        <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                            {/* Image Section */}
                                            <div className="relative w-1/2">
                                                <div className="aspect-auto h-full overflow-hidden">
                                                    <img
                                                        src={attraction.image}
                                                        alt={attraction.title}
                                                        className="w-full h-full object-cover min-h-[350px]"
                                                    />
                                                </div>
                                                {attraction.highlight && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                                                            <Sparkles className="h-3 w-3" />
                                                            {attraction.highlight}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Section */}
                                            <div className="w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                                                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                                                    {attraction.title}
                                                </h3>

                                                <p className="text-slate-600 text-base lg:text-lg leading-relaxed mb-6">
                                                    {attraction.description}
                                                </p>

                                                {/* Info Cards */}
                                                <div className="flex flex-wrap gap-3 mb-4">
                                                    <div className="bg-slate-50 px-4 py-2.5 rounded-xl flex items-center gap-2 border border-slate-200">
                                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                                            <MapPin className="h-4 w-4 text-amber-600" />
                                                        </div>
                                                        <span className="text-slate-700 font-medium text-sm">
                                                            {attraction.distance}
                                                        </span>
                                                    </div>
                                                    {attraction.id === "kedarnath" && (
                                                        <div className="bg-slate-50 px-4 py-2.5 rounded-xl flex items-center gap-2 border border-slate-200">
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                                <Clock className="h-4 w-4 text-blue-600" />
                                                            </div>
                                                            <span className="text-slate-700 font-medium text-sm">
                                                                Start Early (4 AM)
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {attraction.id === "kedarnath" && (
                                                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                                                        <p className="text-sm text-slate-700">
                                                            <strong>Pro Tip:</strong> Book your stay with us and we'll help you plan your Kedarnath trek with local guides.
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-10 md:py-16 bg-gradient-to-r from-slate-900 to-slate-800">
                    <div className="container px-4 md:px-6 text-center">
                        <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">
                            Ready to Explore These Sacred Places?
                        </h2>
                        <p className="text-slate-300 text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
                            Book your stay at Hotel Mahadev and let us help you plan your pilgrimage.
                        </p>
                        <a
                            href="https://wa.me/919927279127?text=Hi%2C%20I%20want%20to%20book%20a%20room%20and%20plan%20my%20Kedarnath%20trip"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-lg shadow-green-500/25 transition-all"
                        >
                            <WhatsAppIcon className="h-4 w-4 md:h-5 md:w-5" />
                            Book Your Stay
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
            <StickyMobileCTA />
        </div>
    );
};

export default AttractionsPage;
