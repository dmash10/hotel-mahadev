import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const CTASection = () => {
  const handleCall = () => {
    window.open("tel:+919927279127", "_self");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Namaste 🙏 I'm planning my Kedarnath yatra and need accommodation. Please help me with room availability and booking.");
    window.open(`https://wa.me/919927279127?text=${message}`, "_blank");
  };

  return (
    <section className="gradient-cta py-12 md:py-14">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            If you're planning to stop in Guptkashi, message us directly. We'll confirm availability
            and answer your questions right away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleCall} variant="secondary" size="xl" className="font-bold">
              <Phone className="h-5 w-5" />
              Call Now
            </Button>
            <Button onClick={handleWhatsApp} variant="whatsapp" size="xl" className="font-bold">
              <WhatsAppIcon className="h-5 w-5" />
              Message on WhatsApp
            </Button>
          </div>

          <p className="text-primary-foreground/60 text-sm mt-6">
            No advance payment required • Instant confirmation
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
