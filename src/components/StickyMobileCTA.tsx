import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const StickyMobileCTA = () => {
  const handleCall = () => {
    window.open("tel:+919927279127", "_self");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Namaste 🙏 I'm looking for a room at Hotel Mahadev for my Kedarnath yatra. Please share availability and rates.");
    window.open(`https://wa.me/919927279127?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-md border-t border-border p-3 safe-area-bottom">
      <div className="flex gap-3">
        <button
          onClick={handleCall}
          className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-300 hover:brightness-110"
        >
          <Phone className="h-5 w-5" />
          Call Now
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-[#25D366] text-white font-semibold transition-all duration-300 hover:brightness-110"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
