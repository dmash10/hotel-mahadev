import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-foreground leading-tight">New Hotel Mahadev</p>
              <p className="text-xs text-muted-foreground">Guptkashi, Uttarakhand</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button onClick={handleCall} variant="gold" size="sm">
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">Call</span>
            </Button>
            <Button onClick={handleWhatsApp} variant="gold" size="sm">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 -mr-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
