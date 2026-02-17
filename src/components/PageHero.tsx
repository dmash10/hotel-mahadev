import { ReactNode } from "react";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    badge?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    children?: ReactNode;
}

const PageHero = ({
    title,
    subtitle,
    badge,
    backgroundImage,
    backgroundVideo,
    children
}: PageHeroProps) => {
    return (
        <section className="relative h-48 md:h-72 overflow-hidden">
            {/* Background - Video or Image */}
            {backgroundVideo ? (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            ) : backgroundImage ? (
                <img
                    src={backgroundImage}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : (
                <div className="absolute inset-0 bg-slate-900" />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />

            {/* Content - Centered */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto px-4">
                        {badge && (
                            <span className="inline-block px-3 py-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
                                {badge}
                            </span>
                        )}
                        <h1 className="font-hero text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-white/80 text-sm md:text-lg max-w-lg mx-auto">
                                {subtitle}
                            </p>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageHero;
