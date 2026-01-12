import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/TransitionLink";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCall = () => {
    window.open("tel:+919876543210", "_self");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi, I'd like to enquire about room availability.");
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Rooms", href: "/rooms" },
    { label: "Gallery", href: "/gallery" },
    { label: "Restaurant", href: "/restaurant" },
    { label: "Amenities", href: "/amenities" },
    { label: "Location", href: "/location" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-primary/10" 
          : "bg-gradient-to-r from-primary to-primary-light"
      }`}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with gold accent */}
          <TransitionLink to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center shadow-md">
              <span className="text-primary font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-white leading-tight">New Hotel Mahadev</p>
              <p className="text-xs text-white/70">Guptkashi, Uttarakhand</p>
            </div>
          </TransitionLink>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.label}
                to={link.href}
                className="relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                activeClassName="!text-gold bg-white/10"
              >
                {link.label}
              </TransitionLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              onClick={handleCall} 
              size="sm"
              className="bg-white/15 hover:bg-white/25 text-white border-0 backdrop-blur-sm"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">Call</span>
            </Button>
            <Button 
              onClick={handleWhatsApp} 
              size="sm"
              className="bg-gold hover:bg-gold/90 text-primary border-0 font-semibold"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 -mr-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/10 py-3 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg font-medium text-white/90 hover:bg-white/10 transition-colors"
                  activeClassName="bg-white/15 text-gold"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </nav>
            
            {/* Mobile CTA Buttons */}
            <div className="flex gap-2 mt-4 px-4 pt-3 border-t border-white/10">
              <Button 
                onClick={handleCall} 
                size="sm"
                className="flex-1 bg-white/15 hover:bg-white/25 text-white border-0"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button 
                onClick={handleWhatsApp} 
                size="sm"
                className="flex-1 bg-gold hover:bg-gold/90 text-primary border-0 font-semibold"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;