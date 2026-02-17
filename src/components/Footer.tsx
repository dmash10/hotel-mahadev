import { Phone, MapPin, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import TransitionLink from "@/components/TransitionLink";

const Footer = () => {
  return (
    <footer
      className="bg-foreground text-primary-foreground py-10 md:py-16"
      style={{ viewTransitionName: "site-footer" }}
    >
      <div className="container px-5 md:px-4">
        {/* Mobile: 2-column grid. Desktop: 4 columns. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 md:gap-8 mb-10 md:mb-12">

          {/* Brand - Spans full width on mobile (2 cols), 2 cols on tablet/desktop */}
          <div className="col-span-2 lg:col-span-2 text-center md:text-left">
            <h3 className="font-hero text-2xl md:text-3xl font-bold mb-4">Hotel Mahadev & Restaurant</h3>
            <p className="font-sans text-primary-foreground/70 mb-6 max-w-sm mx-auto md:mx-0 text-sm md:text-base">
              A simple, comfortable stay on the Kedarnath route. We focus on cleanliness,
              comfort, and straightforward service.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="tel:+919927279127"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Call Us"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/919927279127?text=Hi%2C%20I%20found%20you%20on%20newhotelmahadev.com.%20I%20have%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20BA5A] flex items-center justify-center transition-colors"
                aria-label="WhatsApp Us"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - 1 col on mobile */}
          <div className="text-left pl-2 md:pl-0">
            <h4 className="font-hero font-bold text-lg mb-4 text-primary-foreground">Quick Links</h4>
            <ul className="space-y-3 font-sans">
              <li>
                <TransitionLink to="/rooms" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors block py-1 text-sm">
                  Our Rooms
                </TransitionLink>
              </li>
              <li>
                <TransitionLink to="/gallery" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors block py-1 text-sm">
                  Gallery
                </TransitionLink>
              </li>
              <li>
                <TransitionLink to="/attractions" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors block py-1 text-sm">
                  Nearby Attractions
                </TransitionLink>
              </li>
              <li>
                <TransitionLink to="/amenities" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors block py-1 text-sm">
                  Amenities
                </TransitionLink>
              </li>
              <li>
                <TransitionLink to="/restaurant" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors block py-1 text-sm">
                  Restaurant
                </TransitionLink>
              </li>
              <li>
                <TransitionLink to="/location" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors block py-1 text-sm">
                  Location
                </TransitionLink>
              </li>
              <li>
                <TransitionLink to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors block py-1 text-sm">
                  Contact
                </TransitionLink>
              </li>
            </ul>
          </div>

          {/* Contact - 1 col on mobile */}
          <div className="text-left md:text-left">
            <h4 className="font-hero font-bold text-lg mb-4 text-primary-foreground">Contact Us</h4>
            <ul className="space-y-4 font-sans">
              <li className="flex flex-col md:flex-row items-start gap-1 md:gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 hidden md:block" />
                <span className="block md:hidden font-medium text-white">Address</span>
                <span className="leading-relaxed">Kedarnath Road, Byung gard, Guptkashi, Uttarakhand 246471</span>
              </li>
              <li className="flex flex-col md:flex-row items-start gap-1 md:gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 flex-shrink-0 mt-0.5 hidden md:block" />
                <span className="block md:hidden font-medium text-white">Phone</span>
                <div className="flex flex-col gap-1.5 items-start">
                  <a href="tel:+919927279127" className="hover:text-primary-foreground font-medium">+91 9927279127</a>
                  <a href="tel:+917302712305" className="hover:text-primary-foreground">+91 7302712305</a>
                  <a href="tel:+918218818955" className="hover:text-primary-foreground">+91 8218818955</a>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-start gap-1 md:gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 flex-shrink-0 mt-0.5 hidden md:block" />
                <span className="block md:hidden font-medium text-white">Email</span>
                <a href="mailto:hotelnewmahadev@gmail.com" className="hover:text-primary-foreground break-all">
                  hotelnewmahadev<br className="md:hidden" />@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center px-4 font-sans">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Hotel Mahadev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
