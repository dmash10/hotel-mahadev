import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Calendar, Users, BedDouble, Phone as PhoneIcon, Minus, Plus, Moon, Shield, Clock } from "lucide-react";

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
    <div className="bg-card rounded-2xl shadow-xl w-full max-w-md animate-scale-in overflow-hidden border border-border/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light p-5 text-primary-foreground">
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-1">
          Book Your Stay
        </h2>
        <p className="text-primary-foreground/80 text-sm">
          Quick booking via WhatsApp • Instant confirmation
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleWhatsAppSubmit} className="p-5 md:p-6 space-y-5">
        {/* Name Field */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-semibold text-foreground">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            className="h-12 rounded-xl bg-muted/50 border-border/80 focus:bg-background transition-colors"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
            WhatsApp Number
          </Label>
          <div className="relative">
            <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={15}
              className="h-12 rounded-xl pl-11 bg-muted/50 border-border/80 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="space-y-1.5">
          <Label htmlFor="checkIn" className="text-sm font-semibold text-foreground">
            Check-in Date
          </Label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="checkIn"
              name="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="h-12 rounded-xl pl-11 bg-muted/50 border-border/80 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Nights & Guests Counter Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Nights Counter */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Moon className="h-3.5 w-3.5" />
              Nights
            </Label>
            <div className="flex items-center h-12 rounded-xl border border-border/80 bg-muted/50 overflow-hidden">
              <button
                type="button"
                onClick={decrementNights}
                disabled={formData.nights <= 1}
                className="h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center font-semibold text-foreground">
                {formData.nights}
              </span>
              <button
                type="button"
                onClick={incrementNights}
                disabled={formData.nights >= 14}
                className="h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Guests Counter */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Guests
            </Label>
            <div className="flex items-center h-12 rounded-xl border border-border/80 bg-muted/50 overflow-hidden">
              <button
                type="button"
                onClick={decrementGuests}
                disabled={formData.guests <= 1}
                className="h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center font-semibold text-foreground">
                {formData.guests}
              </span>
              <button
                type="button"
                onClick={incrementGuests}
                disabled={formData.guests >= 10}
                className="h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div className="space-y-1.5">
          <Label htmlFor="roomType" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5" />
            Room Type
          </Label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="flex h-12 w-full rounded-xl border border-border/80 bg-muted/50 px-4 py-2 text-sm font-medium ring-offset-background focus:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors cursor-pointer"
          >
            <option value="double">Double Bed Room</option>
            <option value="triple">Triple Bed Room</option>
            <option value="four">Four Bed Room</option>
            <option value="five">Five Bed Room</option>
          </select>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="whatsapp" size="xl" className="w-full mt-2 shadow-lg">
          <MessageCircle className="h-5 w-5" />
          Send Booking on WhatsApp
        </Button>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-4 pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-success" />
            Secure
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gold" />
            Quick Reply
          </span>
        </div>

        <p className="text-xs text-center text-muted-foreground border-t border-border/50 pt-4">
          No advance payment required.<br />
          <span className="text-foreground font-medium">We confirm everything on WhatsApp.</span>
        </p>
      </form>
    </div>
  );
};

export default BookingCard;
