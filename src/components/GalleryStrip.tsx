import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useImageZones } from "@/hooks/useImageZones";

const HappyGuestsStrip = () => {
    const { getZoneMedia, loading } = useImageZones();
    const dynamicMedia = getZoneMedia('gallery_strip');

    // Only use database images - no hardcoded fallbacks
    const guestImages = dynamicMedia?.length > 0
        ? dynamicMedia.map(m => ({ src: m.url, alt: "Happy Guest Moment" }))
        : [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);


    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % guestImages.length);
    }, [guestImages.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + guestImages.length) % guestImages.length);
    }, [guestImages.length]);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 6000);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (diff > 50) nextSlide();
        else if (diff < -50) prevSlide();
        setTimeout(() => setIsPaused(false), 6000);
    };

    // Don't render section if no images from database
    if (!loading && guestImages.length === 0) {
        return null;
    }

    return (
        <section className="relative overflow-hidden bg-white py-12 md:py-16">
            {/* MOBILE: Simple slider with header above */}
            <div className="md:hidden">
                <div className="px-4 mb-6">
                    <p className="text-amber-600 font-bold text-sm uppercase tracking-wider">Memories of Our Guests</p>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1 mb-2">
                        Happy Guests, Happy Memories
                    </h2>
                    <p className="text-slate-600 text-sm">
                        Smiles from pilgrims who stayed with us and shared their special moments.
                    </p>
                </div>

                <div
                    className="relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="relative aspect-[16/10] overflow-hidden">
                        {guestImages.map((image, index) => (
                            <img
                                key={index}
                                src={image.src}
                                alt={image.alt}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        ))}

                        {/* Navigation arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                        >
                            <ChevronLeft className="h-5 w-5 text-slate-700" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                        >
                            <ChevronRight className="h-5 w-5 text-slate-700" />
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-1.5 py-4">
                        {guestImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-amber-500 w-5 h-1.5'
                                    : 'bg-slate-300 w-1.5 h-1.5'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* DESKTOP: Container-aligned gallery with better copywriting */}
            <div className="hidden md:block">
                {/* Header - Better Copywriting */}
                <div className="container mb-8 text-center">
                    <p className="text-amber-600 font-bold text-base md:text-lg uppercase tracking-wider">Memories of Our Guests</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-2 mb-4">
                        Happy Guests, Happy Memories
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        From cozy evenings at our hotel to breathtaking moments at Kedarnath —
                        see the smiles and memories our guests have shared with us.
                    </p>
                </div>

                {/* Gallery - Contained within container */}
                <div className="container">
                    <div
                        className="relative w-full h-[500px] lg:h-[550px] group overflow-hidden"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Images */}
                        <div className="absolute inset-0 bg-slate-100">
                            {guestImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.src}
                                    alt={image.alt}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/90 hover:text-slate-900 backdrop-blur-sm rounded-full flex items-center justify-center transition-all text-white border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 duration-300 z-10"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/90 hover:text-slate-900 backdrop-blur-sm rounded-full flex items-center justify-center transition-all text-white border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300 z-10"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {guestImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`rounded-full transition-all duration-300 shadow-md ${index === currentIndex
                                        ? 'bg-amber-500 w-8 h-2'
                                        : 'bg-white/50 w-2 h-2 hover:bg-white'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HappyGuestsStrip;
