import locationImg from "@/assets/location-view.jpg";
import { MapPin, Navigation, Mountain, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationSection = () => {
  const openMaps = () => {
    window.open("https://maps.google.com/?q=New+Hotel+Mahadev+Guptkashi+Uttarakhand", "_blank");
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={locationImg}
                alt="Kedarnath Mountain View"
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
            </div>
          </div>

          <div className="animate-fade-in">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Location</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Right on the Kedarnath Route
            </h2>
            
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              New Hotel Mahadev is located in Guptkashi, directly on the Kedarnath pilgrimage route. 
              A convenient stop for travellers heading towards Sonprayag and Kedarnath, especially if 
              you're arriving late or starting early the next day.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary rounded-xl p-4 text-center">
                <Car className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-bold text-foreground">25 km</p>
                <p className="text-xs text-muted-foreground">to Sonprayag</p>
              </div>
              <div className="bg-secondary rounded-xl p-4 text-center">
                <Mountain className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-bold text-foreground">45 km</p>
                <p className="text-xs text-muted-foreground">to Kedarnath Base</p>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">New Hotel Mahadev</p>
                  <p className="text-sm text-muted-foreground">
                    Kedarnath Road, Byung Gard, Guptkashi, Rudraprayag, Uttarakhand 246439
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={openMaps} variant="outline" size="lg" className="w-full sm:w-auto">
              <Navigation className="h-4 w-4" />
              Open in Google Maps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
