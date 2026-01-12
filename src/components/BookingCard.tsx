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
    <div className="bg-card rounded-xl shadow-xl w-full max-w-sm animate-scale-in overflow-hidden border border-border/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light px-4 py-3 text-primary-foreground">
        <h2 className="font-heading text-lg font-bold">
          Book Your Stay
        </h2>
        <p className="text-primary-foreground/80 text-xs">
          Quick booking via WhatsApp
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleWhatsAppSubmit} className="p-4 space-y-3">
        {/* Name & Phone Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-xs font-semibold text-foreground">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={100}
              className="h-10 rounded-lg text-sm bg-muted/50 border-border/80 focus:bg-background"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone" className="text-xs font-semibold text-foreground">
              WhatsApp
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 XXXXX"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={15}
              className="h-10 rounded-lg text-sm bg-muted/50 border-border/80 focus:bg-background"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="space-y-1">
          <Label htmlFor="checkIn" className="text-xs font-semibold text-foreground">
            Check-in Date
          </Label>
          <Input
            id="checkIn"
            name="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="h-10 rounded-lg text-sm bg-muted/50 border-border/80 focus:bg-background"
          />
        </div>

        {/* Nights & Guests Counter Row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Nights Counter */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-foreground">Nights</Label>
            <div className="flex items-center h-10 rounded-lg border border-border/80 bg-muted/50 overflow-hidden">
              <button
                type="button"
                onClick={decrementNights}
                disabled={formData.nights <= 1}
                className="h-full px-2.5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="flex-1 text-center font-semibold text-sm text-foreground">
                {formData.nights}
              </span>
              <button
                type="button"
                onClick={incrementNights}
                disabled={formData.nights >= 14}
                className="h-full px-2.5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Guests Counter */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-foreground">Guests</Label>
            <div className="flex items-center h-10 rounded-lg border border-border/80 bg-muted/50 overflow-hidden">
              <button
                type="button"
                onClick={decrementGuests}
                disabled={formData.guests <= 1}
                className="h-full px-2.5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="flex-1 text-center font-semibold text-sm text-foreground">
                {formData.guests}
              </span>
              <button
                type="button"
                onClick={incrementGuests}
                disabled={formData.guests >= 10}
                className="h-full px-2.5 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div className="space-y-1">
          <Label htmlFor="roomType" className="text-xs font-semibold text-foreground">
            Room Type
          </Label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="flex h-10 w-full rounded-lg border border-border/80 bg-muted/50 px-3 py-2 text-sm font-medium focus:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <option value="double">Double Bed</option>
            <option value="triple">Triple Bed</option>
            <option value="four">Four Bed</option>
            <option value="five">Five Bed</option>
          </select>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="whatsapp" size="default" className="w-full shadow-md">
          <MessageCircle className="h-4 w-4" />
          Book via WhatsApp
        </Button>

        <p className="text-[10px] text-center text-muted-foreground">
          No advance payment • Instant confirmation
        </p>
      </form>
    </div>
  );
};

export default BookingCard;
