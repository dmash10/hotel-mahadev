import restaurantImg from "@/assets/restaurant.jpg";
import { UtensilsCrossed, Clock, Leaf } from "lucide-react";

const RestaurantSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Food & Restaurant</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Hot, Fresh, Vegetarian Meals
            </h2>
            
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Travelling is tiring. Food shouldn't be a problem. Our restaurant serves simple, filling vegetarian 
              meals that are suitable for all age groups. You don't have to step out after a long drive.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Pure Vegetarian</h4>
                  <p className="text-sm text-muted-foreground">South Indian & North Indian dishes available</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-price/10 flex items-center justify-center flex-shrink-0">
                  <UtensilsCrossed className="h-5 w-5 text-price" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Freshly Prepared</h4>
                  <p className="text-sm text-muted-foreground">Food is cooked fresh for every order</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Convenient Timings</h4>
                  <p className="text-sm text-muted-foreground">Early breakfast available for pilgrims</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={restaurantImg}
                alt="Hotel Mahadev Restaurant"
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-foreground font-medium">
                    "Most guests prefer eating here instead of searching outside after a long journey."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
