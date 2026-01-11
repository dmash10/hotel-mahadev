import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl font-bold mb-3">New Hotel Mahadev</h3>
            <p className="text-primary-foreground/70 mb-4 max-w-md">
              A simple, comfortable stay on the Kedarnath route. We focus on cleanliness, 
              comfort, and straightforward service.
            </p>
            <div className="flex gap-4">
              <a
                href="tel:+919876543210"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20BA5A] flex items-center justify-center transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#rooms" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Our Rooms
                </a>
              </li>
              <li>
                <a href="#amenities" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Amenities
                </a>
              </li>
              <li>
                <a href="#restaurant" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Restaurant
                </a>
              </li>
              <li>
                <a href="#location" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Location
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Kedarnath Road, Byung Gard, Guptkashi, Uttarakhand 246439</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary-foreground">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@hotelmahadev.com" className="hover:text-primary-foreground">
                  info@hotelmahadev.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} New Hotel Mahadev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
