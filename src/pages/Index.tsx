import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import RoomsSection from "@/components/RoomsSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import RestaurantSection from "@/components/RestaurantSection";
import LocationSection from "@/components/LocationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0" style={{ viewTransitionName: "page-content" }}>
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />
        <section id="rooms" style={{ viewTransitionName: "rooms-section" }}>
          <RoomsSection />
        </section>
        <section id="amenities" style={{ viewTransitionName: "amenities-section" }}>
          <AmenitiesSection />
        </section>
        <section id="restaurant" style={{ viewTransitionName: "restaurant-section" }}>
          <RestaurantSection />
        </section>
        <section id="location" style={{ viewTransitionName: "location-section" }}>
          <LocationSection />
        </section>
        <CTASection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
