import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import BookingCard from "@/components/BookingCard";
import FAQSection from "@/components/FAQSection";
import { useImageZones } from "@/hooks/useImageZones";

const ContactPage = () => {
  const { getZoneImage } = useImageZones();
  const heroImage = getZoneImage('contact_page_hero') || '';

  const handleCall = () => {
    window.open("tel:+919927279127", "_self");
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header />
      <main>
        {/* Hero */}
        <PageHero
          title="Let's Get You Booked"
          subtitle="Quick response on WhatsApp — just send us a message"
          badge="Contact Us"
          backgroundImage={heroImage}
        />

        {/* Contact Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Contact Info */}
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                  We're Here to Help
                </h2>

                <p className="text-muted-foreground mb-8">
                  For availability and bookings, contact us directly. We respond quickly on WhatsApp and calls.
                  Book your stay hassle-free with flexible payment options.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div className="w-full">
                        <p className="font-semibold text-foreground mb-2">Call Us</p>
                        <div className="flex flex-col gap-2">
                          <a href="tel:+919927279127" className="text-muted-foreground hover:text-primary transition-colors">
                            +91 9927279127
                          </a>
                          <a href="tel:+917302712305" className="text-muted-foreground hover:text-primary transition-colors">
                            +91 7302712305
                          </a>
                          <a href="tel:+918218818955" className="text-muted-foreground hover:text-primary transition-colors">
                            +91 8218818955
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/919927279127"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-[#25D366]/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">WhatsApp</p>
                      <p className="text-muted-foreground">+91 9927279127</p>
                    </div>
                  </a>

                  <a
                    href="mailto:hotelnewmahadev@gmail.com"
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground">hotelnewmahadev@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Kedarnath Road, Byung gard, Guptkashi,<br />
                        Semkwerala, District Rudraprayag,<br />
                        Uttarakhand 246471
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>We typically respond within 30 minutes on WhatsApp</span>
                </div>
              </div>

              {/* Booking Form (Reused Component) */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md">
                  <BookingCard />
                </div>
              </div>
            </div>
          </div>
        </section>

        <FAQSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default ContactPage;
