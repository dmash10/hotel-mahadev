import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, CheckCircle, Calendar, User, Phone, BedDouble, Moon, Users } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

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
    if (formData.guests < 100) {
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

  const getRoomPrice = (type: string) => {
    switch (type) {
      case "double": return 1500;
      case "triple": return 2200;
      case "four": return 2800;
      case "five": return 3400;
      default: return 1500;
    }
  };

  const generateWhatsAppMessage = () => {
    const pricePerNight = getRoomPrice(formData.roomType);
    const totalPrice = pricePerNight * formData.nights;
    const checkInDate = formData.checkIn ? new Date(formData.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

    const message = `Namaste! I want to book a room at Hotel Mahadev.

BOOKING DETAILS:
- Name: ${formData.name.trim()}
- Phone: ${formData.phone.trim()}
- Check-in: ${checkInDate}
- Nights: ${formData.nights}
- Guests: ${formData.guests}
- Room: ${getRoomTypeLabel(formData.roomType)}
- Estimated Total: Rs.${totalPrice}

Please confirm availability.`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.checkIn) {
      return;
    }
    const phoneNumber = "919927279127";
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const totalPrice = getRoomPrice(formData.roomType) * formData.nights;

  return (
    <div className="bg-white rounded-2xl w-full max-w-[320px] md:max-w-[340px] lg:max-w-[380px] shadow-2xl shadow-slate-900/10 overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3">
        <h2 className="font-heading text-lg font-bold text-white">
          Book Your Stay
        </h2>
        <p className="text-slate-300 text-xs mt-0.5">
          Instant WhatsApp confirmation
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleWhatsAppSubmit} className="p-4 space-y-3">
        {/* Name Field */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-slate-400" />
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
            className="h-10 rounded-lg text-sm bg-slate-50 border-slate-200 focus:border-amber-500 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
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
            className="h-10 rounded-lg text-sm bg-slate-50 border-slate-200 focus:border-amber-500 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>

        {/* Check-in & Room Type Row */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label htmlFor="checkIn" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Check-in
            </Label>
            {/* Standard date input - visible on all screens */}
            <input
              id="checkIn"
              name="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:border-amber-500 focus:ring-amber-500 focus:bg-white transition-all cursor-pointer"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="roomType" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-slate-400" />
              Room
            </Label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-sm font-medium focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:bg-white focus-visible:outline-none transition-all cursor-pointer"
            >
              <option value="double">Double (₹1,500)</option>
              <option value="triple">Triple (₹2,200)</option>
              <option value="four">Four Bed (₹2,800)</option>
              <option value="five">Five Bed (₹3,400)</option>
            </select>
          </div>
        </div>

        {/* Nights & Guests Counter Row */}
        <div className="grid grid-cols-2 gap-2">
          {/* Nights Counter */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Moon className="h-3.5 w-3.5 text-slate-400" />
              Nights
            </Label>
            <div className="flex items-center h-10 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
              <button
                type="button"
                onClick={decrementNights}
                disabled={formData.nights <= 1}
                className="h-full px-3 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 disabled:opacity-30 transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center text-base font-bold text-slate-800">
                {formData.nights}
              </span>
              <button
                type="button"
                onClick={incrementNights}
                disabled={formData.nights >= 14}
                className="h-full px-3 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 disabled:opacity-30 transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Guests Counter */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              Guests
            </Label>
            <div className="flex items-center h-10 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
              <button
                type="button"
                onClick={decrementGuests}
                disabled={formData.guests <= 1}
                className="h-full px-3 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 disabled:opacity-30 transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center text-base font-bold text-slate-800">
                {formData.guests}
              </span>
              <button
                type="button"
                onClick={incrementGuests}
                disabled={formData.guests >= 100}
                className="h-full px-3 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 disabled:opacity-30 transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-600">Estimated Total</p>
              <p className="text-xs text-slate-500">{formData.nights} night{formData.nights > 1 ? 's' : ''} × ₹{getRoomPrice(formData.roomType).toLocaleString()}</p>
            </div>
            <p className="text-xl font-bold text-amber-600">₹{totalPrice.toLocaleString()}</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-11 text-sm font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/30 rounded-lg"
        >
          <WhatsAppIcon className="h-4 w-4 mr-2" />
          Book via WhatsApp
        </Button>

        {/* Trust Footer */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
          <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
          <span>Pay securely at hotel on arrival</span>
        </div>
      </form>
    </div>
  );
};

export default BookingCard;
