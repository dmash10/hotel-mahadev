
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageCarouselProps {
    images: string[];
    alt: string;
    className?: string;
    aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
    autoPlayInterval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    alt,
    className,
    aspectRatio = 'auto',
    autoPlayInterval = 4000
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);

        // Auto-play logic
        const intervalId = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, autoPlayInterval);

        return () => {
            emblaApi.off('select', onSelect);
            clearInterval(intervalId);
        };
    }, [emblaApi, onSelect, autoPlayInterval]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (!images || images.length === 0) return null;

    if (images.length === 1) {
        return (
            <div className={cn("overflow-hidden rounded-xl relative", className)}>
                <img
                    src={images[0]}
                    alt={alt}
                    className={cn(
                        "w-full h-full object-cover",
                        aspectRatio === 'video' && "aspect-video",
                        aspectRatio === 'square' && "aspect-square",
                        aspectRatio === 'wide' && "aspect-[21/9]"
                    )}
                />
            </div>
        );
    }

    return (
        <div className={cn("relative group rounded-xl overflow-hidden", className)}>
            <div className="overflow-hidden h-full rounded-xl" ref={emblaRef}>
                <div className="flex h-full">
                    {images.map((src, index) => (
                        <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
                            <img
                                src={src}
                                alt={`${alt} ${index + 1}`}
                                className={cn(
                                    "block w-full h-full object-cover",
                                    aspectRatio === 'video' && "aspect-video",
                                    aspectRatio === 'square' && "aspect-square",
                                    aspectRatio === 'wide' && "aspect-[21/9]"
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={scrollPrev}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={scrollNext}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all shadow-sm",
                            index === selectedIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                        )}
                        onClick={() => emblaApi?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
