import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Mountain, Car, Clock, Plane, Train, Bus } from "lucide-react";
import locationView from "@/assets/location-view.jpg";

const distances = [
  { place: "Sonprayag", distance: "25 km", time: "45 min" },
  { place: "Kedarnath Base (Gaurikund)", distance: "30 km", time: "1 hr" },
  { place: "Triyuginarayan Temple", distance: "12 km", time: "25 min" },
  { place: "Ukhimath", distance: "13 km", time: "30 min" },
  { place: "Chopta", distance: "45 km", time: "1.5 hrs" },
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
  const openMaps = () => {
    window.open("https://maps.google.com/?q=New+Hotel+Mahadev+Guptkashi+Uttarakhand", "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0" style={{ viewTransitionName: "page-content" }}>
      <Header />
      <main>
        {/* Hero Banner */}
        <section 
          className="relative h-64 md:h-96 overflow-hidden"
          style={{ viewTransitionName: "hero-section" }}
        >
          <img 
            src={locationView} 
            alt="Location" 
            className="w-full h-full object-cover" 
            style={{ viewTransitionName: "hero-image" }}
          />
          <div className="absolute inset-0 bg-foreground/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center" style={{ viewTransitionName: "section-header" }}>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Location</h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto px-4">
                Right on the Kedarnath pilgrimage route, in the heart of Guptkashi
              </p>
            </div>
          </div>
        </section>

        {/* Address & Map */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Find Us</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                  Conveniently Located on Kedarnath Road
                </h2>
                
                <div className="bg-muted rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-lg">New Hotel Mahadev</p>
                      <p className="text-muted-foreground mt-1">
                        Kedarnath Road, Byung Gard<br />
                        Guptkashi, Rudraprayag<br />
                        Uttarakhand 246439, India
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  Our hotel is located directly on the main Kedarnath route. It's easy to find and accessible for all vehicles. 
                  If you're coming from Rishikesh or Rudraprayag, we're about 500 meters before the main Guptkashi market.
                </p>

                <Button onClick={openMaps} variant="hero" size="lg">
                  <Navigation className="h-5 w-5" />
                  Open in Google Maps
                </Button>
              </div>

              <div 
                className="bg-muted rounded-xl overflow-hidden h-80 md:h-96"
                style={{ viewTransitionName: "map-section" }}
              >
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
        <section className="py-12 bg-secondary">
          <div className="container">
            <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-8">
              Distances from Hotel
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {distances.map((item, index) => (
                <div 
                  key={item.place} 
                  className="bg-card rounded-xl p-4 text-center shadow-sm"
                  style={{ viewTransitionName: `distance-card-${index + 1}` }}
                >
                  <Mountain className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="font-bold text-foreground">{item.distance}</p>
                  <p className="text-sm text-muted-foreground">{item.place}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Reach */}
        <section className="py-12 md:py-16">
          <div className="container">
            <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-8">
              How to Reach Guptkashi
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {howToReach.map((item, index) => (
                <div 
                  key={item.title} 
                  className="bg-card p-6 rounded-xl border border-border"
                  style={{ viewTransitionName: `contact-card-${index + 1}` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
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
