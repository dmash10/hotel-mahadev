import { Shield, BedDouble, UtensilsCrossed, Star } from "lucide-react";

// Google's official G logo colors
const GoogleG = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

const PromiseBanner = () => {
    return (
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-3 md:py-4 border-y border-slate-700/50">
            <div className="container">
                <div className="flex items-center justify-center gap-6 md:gap-8 lg:gap-10">

                    {/* 100% Satisfaction - Visible on all screens */}
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Shield className="h-4 w-4 md:h-5 md:w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-xs md:text-sm whitespace-nowrap">100% Satisfaction</p>
                            <p className="text-slate-400 text-[10px] md:text-xs">Promised</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 md:h-10 bg-slate-600 shrink-0" />

                    {/* Google Rating - Visible on all screens */}
                    <div className="flex items-center gap-2 md:gap-3 shrink-0">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <GoogleG />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-white font-bold text-sm md:text-base">4.7</span>
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3.5 w-3.5 md:h-4 md:w-4 ${i < 4 ? 'text-amber-400 fill-amber-400' : 'text-amber-400/50 fill-amber-400/50'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-400 text-[10px] md:text-xs">Google Rating</p>
                        </div>
                    </div>

                    {/* Divider - Tablet+ only */}
                    <div className="hidden md:block w-px h-10 bg-slate-600 shrink-0" />

                    {/* Deluxe Rooms - Tablet+ */}
                    <div className="hidden md:flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <BedDouble className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm whitespace-nowrap">Deluxe Rooms</p>
                            <p className="text-slate-400 text-xs">Clean & Spacious</p>
                        </div>
                    </div>

                    {/* Divider - Desktop only */}
                    <div className="hidden lg:block w-px h-10 bg-slate-600 shrink-0" />

                    {/* In-House Restaurant - Desktop only */}
                    <div className="hidden lg:flex items-center gap-3 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <UtensilsCrossed className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm whitespace-nowrap">In-House Restaurant</p>
                            <p className="text-slate-400 text-xs">Fresh Veg Food</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromiseBanner;
