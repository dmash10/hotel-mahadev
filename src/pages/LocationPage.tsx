import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Mountain, Car, Clock, Plane, Train, Bus } from "lucide-react";
import { useImageZones } from "@/hooks/useImageZones";

const distances = [
  { place: "Sonprayag (Kedarnath Base)", distance: "15 km", time: "30 min" },
  { place: "Vishwanath Temple, Guptkashi", distance: "6.7 km", time: "15 min" },
  { place: "Triyuginarayan Temple", distance: "31 km", time: "50 min" },
  { place: "Omkareshwar, Ukhimath", distance: "17 km", time: "35 min" },
  { place: "Chopta (Tungnath Base)", distance: "45 km", time: "1.5 hrs" },
  { place: "Rudraprayag", distance: "45 km", time: "1.5 hrs" },
];

const howToReach = [
  {
    icon: Plane,
    title: "By Air",
    description: "Nearest airport is Jolly Grant Airport, Dehradun (225 km). From there, hire a taxi or take a bus to Guptkashi.",
  },
  {
    icon: Train,
    title: "By Train",
    description: "Nearest railway station is Rishikesh (180 km) or Haridwar (210 km). Regular buses and taxis available from both stations.",
  },
  {
    icon: Bus,
    title: "By Road",
    description: "Guptkashi is well-connected by road. Regular buses from Rishikesh, Haridwar, and Dehradun. Private taxis are also available.",
  },
  {
    icon: Car,
    title: "Self Drive",
    description: "If driving, take the Rishikesh-Badrinath Highway. The road is mostly good but has mountain curves. Petrol pumps available on the way.",
  },
];

const LocationPage = () => {
  const { getZoneImage } = useImageZones();
  const heroImage = getZoneImage('location_page_hero') || getZoneImage('location_section') || '';

  const openMaps = () => {
    window.open("https://maps.google.com/?q=New+Hotel+Mahadev+Guptkashi+Uttarakhand", "_blank");
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero */}
        <PageHero
          title="Easy to Find, Easy to Reach"
          subtitle="Located right on the Kedarnath route in Guptkashi"
          badge="Directions"
          backgroundImage={heroImage}
        />

        {/* Address & Map */}
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
              {/* Left: Address Info */}
              <div className="flex flex-col">
                <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Find Us</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-6">
                  Conveniently Located on Kedarnath Road
                </h2>

                {/* Address Card */}
                <div className="bg-slate-50 rounded-2xl p-6 md:p-8 mb-6 border border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="font-hero font-bold text-slate-900 text-xl mb-2">Hotel Mahadev</p>
                      <p className="text-slate-600 leading-relaxed">
                        Kedarnath Road, Byung Gard<br />
                        Near Phata, District Rudraprayag<br />
                        Uttarakhand 246439, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Directions Highlight */}
                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5 mb-6">
                  <p className="text-slate-800 font-medium leading-relaxed">
                    <span className="font-bold text-amber-700">How to reach:</span> If you are coming from Rishikesh or Rudraprayag, our hotel is located <strong>6.5 km ahead from Guptkashi</strong>, on the <strong>left-hand side</strong> of the main Kedarnath road.
                  </p>
                </div>

                <p className="text-slate-500 text-sm mb-6">
                  Look for the signboard near "Byung Gard". Easy parking available for all vehicles.
                </p>

                <Button onClick={openMaps} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 text-base font-semibold self-start">
                  <Navigation className="h-5 w-5 mr-2" />
                  Open in Google Maps
                </Button>
              </div>

              {/* Right: Map */}
              <div className="bg-slate-100 rounded-2xl overflow-hidden h-80 md:h-full min-h-[400px] shadow-lg border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d79.0876!3d30.5234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMxJzI0LjIiTiA3OcKwMDUnMTUuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel Location Map"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Distances */}
        <section className="py-14 md:py-20 bg-slate-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">Quick Reference</span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mt-2">
                Distances from Our Hotel
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {distances.map((item) => (
                <div key={item.place} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                    <Mountain className="h-5 w-5 text-amber-400" />
                  </div>
                  <p className="font-bold text-2xl text-white mb-1">{item.distance}</p>
                  <p className="text-sm text-slate-300 mb-2">{item.place}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Reach */}
        <section className="py-14 md:py-20 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <span className="text-amber-600 font-bold text-sm uppercase tracking-wider">Getting Here</span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-slate-900 mt-2">
                How to Reach Us
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {howToReach.map((item) => (
                <div key={item.title} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-7 w-7 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-900 text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default LocationPage;
