import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, MapPin, Mail, Clock, Calendar, Users, BedDouble } from "lucide-react";
import { useState } from "react";
import hotelExterior from "@/assets/hotel-exterior.jpg";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: "",
    nights: "1",
    guests: "2",
    roomType: "double",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello, I'd like to book a room at New Hotel Mahadev.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Check-in: ${formData.checkIn}
Nights: ${formData.nights}
Guests: ${formData.guests}
Room Type: ${formData.roomType === "double" ? "Double Bed Room" : formData.roomType === "triple" ? "Triple Bed Room" : "Quad Bed Room"}
${formData.message ? `\nMessage: ${formData.message}` : ""}

Please confirm availability.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encodedMessage}`, "_blank");
  };

  const handleCall = () => {
    window.open("tel:+919876543210", "_self");
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0" style={{ viewTransitionName: "page-content" }}>
      <Header />
      <main>
        {/* Hero Banner */}
        <section 
          className="relative h-64 md:h-80 overflow-hidden"
          style={{ viewTransitionName: "hero-section" }}
        >
          <img 
            src={hotelExterior} 
            alt="Contact Us" 
            className="w-full h-full object-cover" 
            style={{ viewTransitionName: "hero-image" }}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center" style={{ viewTransitionName: "section-header" }}>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">Contact & Booking</h1>
              <p className="text-white/80 text-lg max-w-xl mx-auto px-4">
                Get in touch with us directly. We respond quickly on WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Info */}
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">
                  We're Here to Help
                </h2>
                
                <p className="text-muted-foreground mb-8">
                  For availability and bookings, contact us directly. We prefer WhatsApp for quick responses, 
                  but you can also call us. No advance payment required — we confirm everything before you travel.
                </p>

                <div className="space-y-4 mb-8">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                    style={{ viewTransitionName: "contact-card-1" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Call Us</p>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-[#25D366]/30 transition-colors"
                    style={{ viewTransitionName: "contact-card-2" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">WhatsApp</p>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@hotelmahadev.com"
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors"
                    style={{ viewTransitionName: "contact-card-3" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground">info@hotelmahadev.com</p>
                    </div>
                  </a>

                  <div 
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                    style={{ viewTransitionName: "contact-card-4" }}
                  >
                    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-muted-foreground">
                        Kedarnath Road, Byung Gard, Guptkashi,<br />
                        Rudraprayag, Uttarakhand 246439
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>We typically respond within 30 minutes on WhatsApp</span>
                </div>
              </div>

              {/* Booking Form */}
              <div 
                className="bg-card rounded-2xl shadow-elevated p-6 md:p-8"
                style={{ viewTransitionName: "booking-form" }}
              >
                <h3 className="font-heading text-xl font-bold text-foreground mb-6">Send Booking Request</h3>
                
                <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Check-in Date *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                          id="checkIn"
                          name="checkIn"
                          type="date"
                          value={formData.checkIn}
                          onChange={handleChange}
                          required
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nights">Number of Nights</Label>
                      <select
                        id="nights"
                        name="nights"
                        value={formData.nights}
                        onChange={handleChange}
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "Night" : "Nights"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roomType">Room Type</Label>
                      <div className="relative">
                        <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <select
                          id="roomType"
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm"
                        >
                          <option value="double">Double Bed (₹1,500)</option>
                          <option value="triple">Triple Bed (₹2,200)</option>
                          <option value="quad">Quad Bed (₹2,800)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message (Optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Any special requests or questions..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button type="submit" variant="whatsapp" size="xl" className="w-full">
                      <MessageCircle className="h-5 w-5" />
                      Send on WhatsApp
                    </Button>
                    <Button type="button" onClick={handleCall} variant="outline" size="lg" className="w-full">
                      <Phone className="h-4 w-4" />
                      Or Call Us Directly
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    No advance payment required. We confirm everything on WhatsApp.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default ContactPage;
