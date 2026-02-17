import { useState, useEffect, useRef } from "react";
import { CalendarCheck, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/TransitionLink";
import { useLocation } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { supabase } from "@/lib/supabase";

// Store navbar scroll position globally so it persists across re-renders
let savedNavScrollPosition = 0;

const TopBar = () => {
  const [announcement, setAnnouncement] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data } = await supabase
        .from('site_content')
        .select('value')
        .eq('section', 'general')
        .eq('key', 'announcement')
        .single();

      if (data?.value) setAnnouncement(data.value);
    };
    fetchAnnouncement();
  }, []);

  if (!announcement || !isVisible) return null;

  return (
    <div className="bg-amber-500 text-white text-xs md:text-sm py-2 relative z-50 overflow-hidden">
      <div className="flex items-center">
        <div className="whitespace-nowrap animate-marquee flex items-center gap-8 min-w-full">
          <span className="mx-4">{announcement}</span>
          <span className="mx-4 text-amber-200 opacity-50">•</span>
          <span className="mx-4">{announcement}</span>
          <span className="mx-4 text-amber-200 opacity-50">•</span>
          <span className="mx-4">{announcement}</span>
          <span className="mx-4 text-amber-200 opacity-50">•</span>
          <span className="mx-4">{announcement}</span>
          <span className="mx-4 text-amber-200 opacity-50">•</span>
        </div>
        <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-amber-500 via-amber-500/80 to-transparent w-16 z-10 flex items-center justify-end pr-2">
          <button
            onClick={() => setIsVisible(false)}
            className="hover:bg-amber-600 rounded-full p-1 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Save nav scroll position before navigation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleNavScroll = () => {
      savedNavScrollPosition = nav.scrollLeft;
    };

    nav.addEventListener('scroll', handleNavScroll);
    return () => nav.removeEventListener('scroll', handleNavScroll);
  }, []);

  // Restore nav scroll position after navigation
  useEffect(() => {
    if (navRef.current && savedNavScrollPosition > 0) {
      navRef.current.scrollLeft = savedNavScrollPosition;
    }
  }, [location.pathname]);

  const handleBookNow = () => {
    const message = encodeURIComponent("Hi, I'd like to book a room at Hotel Mahadev. Please share availability.");
    window.open(`https://wa.me/919927279127?text=${message}`, "_blank");
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
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-900 shadow-xl" : "bg-slate-900"
        }`}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="container">
        {/* Main Row: Logo + Nav (desktop) + Book Now */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <TransitionLink to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <img src={logo} alt="Hotel Mahadev" className="h-11 lg:h-13 w-auto transition-transform group-hover:scale-105" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-sm lg:text-lg leading-tight group-hover:text-amber-400 transition-colors">Hotel Mahadev</p>
              <p className="text-[10px] lg:text-xs text-slate-400 font-medium">Guptkashi, Uttarakhand</p>
            </div>
          </TransitionLink>

          {/* Desktop: Nav Links inline - better spacing and hover */}
          <nav className="hidden lg:flex items-center bg-slate-800/50 rounded-full px-2 py-1.5">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.label}
                to={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all rounded-full hover:bg-white/10 whitespace-nowrap"
                activeClassName="!text-slate-900 !bg-amber-400 font-semibold"
                style={{ viewTransitionName: 'none' }}
              >
                {link.label}
              </TransitionLink>
            ))}
          </nav>

          {/* Book Now Button - Premium look */}
          <Button
            onClick={handleBookNow}
            size="default"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 font-bold text-xs lg:text-sm px-4 lg:px-6 py-2 lg:py-2.5 rounded-full shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40 hover:scale-105 shrink-0"
          >
            <CalendarCheck className="h-4 w-4 mr-1.5" />
            Check Availability
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Horizontal Scroll with better styling */}
      <div className="lg:hidden border-t border-slate-700/50 bg-slate-800/50">
        <div className="container">
          <nav
            ref={navRef}
            className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-2 -mx-4 px-4"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <TransitionLink
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-2 text-sm font-semibold transition-all rounded-full whitespace-nowrap flex-shrink-0 ${isActive
                    ? 'bg-amber-500 text-slate-900 shadow-md'
                    : 'text-slate-300 hover:text-white bg-slate-700/50 hover:bg-slate-600/50'
                    }`}
                  style={{ viewTransitionName: 'none' }}
                >
                  {link.label}
                </TransitionLink>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
