import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const AnnouncementBar = () => {
    const [announcement, setAnnouncement] = useState("");

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

    if (!announcement) return null;

    return (
        <div className="bg-amber-500 text-white text-xs md:text-sm py-4 relative z-40 overflow-hidden shadow-md border-y border-amber-600/20">
            <div className="flex items-center overflow-hidden w-full relative">
                {/* Two identical containers for seamless loop */}
                <div className="whitespace-nowrap flex items-center animate-marquee min-w-full shrink-0">
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                </div>

                <div className="whitespace-nowrap flex items-center animate-marquee min-w-full shrink-0 absolute top-0 left-full">
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                    <span className="mx-8 font-medium tracking-wide">{announcement}</span>
                    <span className="mx-8 text-amber-200 opacity-50">•</span>
                </div>

                <div className="absolute top-0 right-0 h-full bg-gradient-to-l from-amber-500 via-amber-500/50 to-transparent w-8 z-10"></div>
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 via-amber-500/50 to-transparent w-8 z-10"></div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
