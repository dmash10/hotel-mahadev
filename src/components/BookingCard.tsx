import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Calendar, Users, BedDouble, Phone as PhoneIcon } from "lucide-react";

interface BookingFormData {
  name: string;
  phone: string;
  checkIn: string;
  nights: string;
  guests: string;
  roomType: string;
}

const BookingCard = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    checkIn: "",
    nights: "1",
    guests: "2",
    roomType: "double",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppMessage = () => {
    const message = `Hello, I'd like to book a room at New Hotel Mahadev.

Name: ${formData.name}
Phone: ${formData.phone}
Check-in: ${formData.checkIn}
Nights: ${formData.nights}
Guests: ${formData.guests}
Room Type: ${formData.roomType === "double" ? "Double Bed Room" : formData.roomType === "triple" ? "Triple Bed Room" : "Quad Bed Room"}

Please confirm availability.`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "919876543210"; // Replace with actual hotel WhatsApp number
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 w-full max-w-md animate-scale-in">
      <div className="mb-6">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-1">
          Book Your Stay
        </h2>
        <p className="text-muted-foreground text-sm">
          Quick booking via WhatsApp. No advance payment.
        </p>
      </div>

      <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Your Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
          <div className="relative">
            <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              required
              className="h-12 rounded-xl pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkIn" className="text-sm font-medium">Check-in Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="checkIn"
                name="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={handleChange}
                required
                className="h-12 rounded-xl pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nights" className="text-sm font-medium">Nights</Label>
            <select
              id="nights"
              name="nights"
              value={formData.nights}
              onChange={handleChange}
              className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "Night" : "Nights"}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guests" className="text-sm font-medium">Guests</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomType" className="text-sm font-medium">Room Type</Label>
            <div className="relative">
              <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="flex h-12 w-full rounded-xl border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="double">Double Bed</option>
                <option value="triple">Triple Bed</option>
                <option value="quad">Quad Bed</option>
              </select>
            </div>
          </div>
        </div>

        <Button type="submit" variant="whatsapp" size="xl" className="w-full mt-6">
          <MessageCircle className="h-5 w-5" />
          Send Booking on WhatsApp
        </Button>

        <p className="text-xs text-center text-muted-foreground mt-3">
          No advance payment required. We confirm everything on WhatsApp.
        </p>
      </form>
    </div>
  );
};

export default BookingCard;
