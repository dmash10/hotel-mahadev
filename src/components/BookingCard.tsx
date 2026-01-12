import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Minus, Plus, CheckCircle } from "lucide-react";

interface BookingFormData {
  name: string;
  phone: string;
  checkIn: string;
  nights: number;
  guests: number;
  roomType: string;
}

const BookingCard = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    checkIn: "",
    nights: 1,
    guests: 2,
    roomType: "double",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const incrementGuests = () => {
    if (formData.guests < 10) {
      setFormData({ ...formData, guests: formData.guests + 1 });
    }
  };

  const decrementGuests = () => {
    if (formData.guests > 1) {
      setFormData({ ...formData, guests: formData.guests - 1 });
    }
  };

  const incrementNights = () => {
    if (formData.nights < 14) {
      setFormData({ ...formData, nights: formData.nights + 1 });
    }
  };

  const decrementNights = () => {
    if (formData.nights > 1) {
      setFormData({ ...formData, nights: formData.nights - 1 });
    }
  };

  const getRoomTypeLabel = (type: string) => {
    switch (type) {
      case "double": return "Double Bed Room";
      case "triple": return "Triple Bed Room";
      case "four": return "Four Bed Room";
      case "five": return "Five Bed Room";
      default: return "Double Bed Room";
    }
  };

  const generateWhatsAppMessage = () => {
    const message = `Hello, I'd like to book a room at New Hotel Mahadev.

Name: ${formData.name.trim()}
Phone: ${formData.phone.trim()}
Check-in: ${formData.checkIn}
Nights: ${formData.nights}
Guests: ${formData.guests}
Room Type: ${getRoomTypeLabel(formData.roomType)}

Please confirm availability.`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.checkIn) {
      return;
    }
    const phoneNumber = "919876543210";
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-card/95 backdrop-blur-sm rounded-2xl w-full max-w-[360px] animate-scale-in overflow-hidden border border-border/50">
      {/* Header with gold accent */}
      <div className="relative bg-gradient-to-r from-primary to-primary-light px-5 py-4 text-primary-foreground">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gold/20 rounded-full blur-2xl -mr-10 -mt-10" />
        <h2 className="font-heading text-xl font-bold relative z-10">
          Book Your Stay
        </h2>
        <p className="text-primary-foreground/80 text-sm relative z-10">
          Instant WhatsApp confirmation
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleWhatsAppSubmit} className="p-5 space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-semibold text-foreground uppercase tracking-wide">
            Your Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            className="h-11 rounded-xl text-sm bg-muted/40 border-border focus:border-primary focus:bg-background transition-all"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-semibold text-foreground uppercase tracking-wide">
            WhatsApp Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
            required
            maxLength={15}
            className="h-11 rounded-xl text-sm bg-muted/40 border-border focus:border-primary focus:bg-background transition-all"
          />
        </div>

        {/* Check-in & Room Type Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="checkIn" className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Check-in
            </Label>
            <Input
              id="checkIn"
              name="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="h-11 rounded-xl text-sm bg-muted/40 border-border focus:border-primary focus:bg-background transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="roomType" className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Room
            </Label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="flex h-11 w-full rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm font-medium focus:border-primary focus:bg-background focus-visible:outline-none transition-all cursor-pointer"
            >
              <option value="double">Double Bed</option>
              <option value="triple">Triple Bed</option>
              <option value="four">Four Bed</option>
              <option value="five">Five Bed</option>
            </select>
          </div>
        </div>

        {/* Nights & Guests Counter Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Nights Counter */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground uppercase tracking-wide">Nights</Label>
            <div className="flex items-center h-11 rounded-xl border border-border bg-muted/40 overflow-hidden">
              <button
                type="button"
                onClick={decrementNights}
                disabled={formData.nights <= 1}
                className="h-full px-3 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 disabled:opacity-30 transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center font-bold text-foreground">
                {formData.nights}
              </span>
              <button
                type="button"
                onClick={incrementNights}
                disabled={formData.nights >= 14}
                className="h-full px-3 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 disabled:opacity-30 transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Guests Counter */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground uppercase tracking-wide">Guests</Label>
            <div className="flex items-center h-11 rounded-xl border border-border bg-muted/40 overflow-hidden">
              <button
                type="button"
                onClick={decrementGuests}
                disabled={formData.guests <= 1}
                className="h-full px-3 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 disabled:opacity-30 transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center font-bold text-foreground">
                {formData.guests}
              </span>
              <button
                type="button"
                onClick={incrementGuests}
                disabled={formData.guests >= 10}
                className="h-full px-3 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 disabled:opacity-30 transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="whatsapp" size="lg" className="w-full mt-1">
          <MessageCircle className="h-5 w-5" />
          Book via WhatsApp
        </Button>

        {/* Trust Footer */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
          <CheckCircle className="h-3.5 w-3.5 text-success" />
          <span>No advance payment required</span>
        </div>
      </form>
    </div>
  );
};

export default BookingCard;
