import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromiseBanner from "@/components/PromiseBanner";
import SocialProofSection from "@/components/SocialProofSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import AboutSection from "@/components/AboutSection";
import RoomsSection from "@/components/RoomsSection";
import LocationSection from "@/components/LocationSection";
import RestaurantSection from "@/components/RestaurantSection";
import HappyGuestsStrip from "@/components/GalleryStrip";
import AttractionsSection from "@/components/AttractionsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

/**
 * HOMEPAGE SECTION ORDER - Optimized Flow
 * 
 * 1. Hero - First impression
 * 2. Social Proof - Reviews
 * 3. Why Yatris Choose Us - Features
 * 4. Rooms - The Product
 * 5. Gallery - Visual trust
 * 6. Restaurant/Food
 * 7. Location
 * 8. About - Emotional connection
 * 9. Attractions
 * 10. FAQ
 * 11. CTA
 */

const Index = () => {
  // Handle scroll to booking form on page load
  useEffect(() => {
    if (window.location.hash === '#booking-form') {
      setTimeout(() => {
        const form = document.getElementById('booking-form') || document.getElementById('booking-form-desktop');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main>
        {/* 1. First Impression */}
        <HeroSection />

        {/* 1.5. Promise Banner - Trust Signals */}
        <PromiseBanner />

        {/* 2. Social Proof - Reviews */}
        <SocialProofSection />

        {/* 3. Why Yatris Choose Us */}
        <WhyChooseSection />

        {/* 4. Rooms - The Product */}
        <section id="rooms">
          <RoomsSection />
        </section>

        {/* 5. Gallery - Visual Trust */}
        <HappyGuestsStrip />

        {/* 6. Restaurant/Food */}
        <section id="restaurant">
          <RestaurantSection />
        </section>

        {/* 7. Location */}
        <section id="location">
          <LocationSection />
        </section>

        {/* 8. About - Emotional Connection */}
        <section id="about">
          <AboutSection />
        </section>

        {/* 9. Nearby Attractions */}
        <AttractionsSection />

        {/* 10. FAQ */}
        <FAQSection />

        {/* 11. Final CTA */}
        <CTASection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
