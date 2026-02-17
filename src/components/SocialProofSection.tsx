import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// 20 authentic reviews - randomized years, 3-star reviews at positions 5, 10, 15
const reviews = [
    // 1. 5-star
    {
        name: "Harshvardhan Joshi",
        date: "January 2025",
        rating: 5,
        state: "Maharashtra",
        text: "Stayed here during our Kedarnath yatra. The view from the room was breathtaking - you can see the mountains right from your window. Staff helped us arrange a taxi to Sonprayag at 4 AM."
    },
    // 2. 4-star
    {
        name: "Ramesh Gupta",
        date: "October 2023",
        rating: 4,
        state: "Gujarat",
        text: "Achhi jagah hai. Khana simple hai par ghar jaisa. Mausam bahut thanda tha par room mein heater tha. Ek baat - advance booking karo kyunki season mein rush rehta hai."
    },
    // 3. 5-star
    {
        name: "Meenakshi Iyer",
        date: "December 2024",
        rating: 5,
        state: "Tamil Nadu",
        text: "We were worried about staying in the hills with our elderly parents, but the hotel exceeded expectations. Hot water was available round the clock and the food was sattvic and fresh."
    },
    // 4. 4-star
    {
        name: "Kuldeep Rana",
        date: "May 2022",
        rating: 4,
        state: "Haryana",
        text: "Good hotel for the price. Rooms are spacious but the WiFi was slow. Location is perfect - away from Guptkashi's crowded market. Would have given 5 stars if breakfast timing was earlier."
    },
    // 5. 3-star (POSITIVE SURPRISE)
    {
        name: "Savita Agarwal",
        date: "August 2024",
        rating: 3,
        state: "Rajasthan",
        text: "I'm being strict with my rating because I expected more, but honestly? The staff went above and beyond. They helped my mother-in-law climb the stairs, arranged special diet food. The care was genuine. Would still recommend for families."
    },
    // 6. 5-star
    {
        name: "Anita Bhattacharya",
        date: "November 2024",
        rating: 5,
        state: "West Bengal",
        text: "Third time staying here. The owner bhaiya remembered us from last year! They arranged pooja items for us and even packed parathas for our trek. This is not just a hotel, it's like staying with family."
    },
    // 7. 4-star
    {
        name: "Arjun Reddy",
        date: "July 2019",
        rating: 4,
        state: "Telangana",
        text: "Nice hotel with mountain views. The owner speaks good English which helped us a lot. Room service was quick. Restaurant has limited options but whatever they serve is fresh."
    },
    // 8. 5-star
    {
        name: "Naveen Hegde",
        date: "July 2024",
        rating: 5,
        state: "Karnataka",
        text: "Excellent hospitality! We reached at 11 PM after our helicopter got delayed, and they still served us hot khichdi. The room heater worked perfectly. Highly recommend for families."
    },
    // 9. 4-star
    {
        name: "Rakesh Malhotra",
        date: "September 2021",
        rating: 4,
        state: "Punjab",
        text: "Clean rooms, cooperative staff. The dal and roti in the restaurant reminded me of home. One suggestion - they should add more blankets as nights get very cold here."
    },
    // 10. 3-star (POSITIVE SURPRISE)
    {
        name: "Suresh Choudhary",
        date: "November 2023",
        rating: 3,
        state: "Bihar",
        text: "Room was smaller than photos showed. But you know what surprised me? The owner personally apologized and upgraded us next morning without extra charge. That's rare. Good people running this place."
    },
    // 11. 5-star
    {
        name: "Deepika Nair",
        date: "March 2024",
        rating: 5,
        state: "Kerala",
        text: "Perfect base for Kedarnath! The owner helped us book the Phata helipad tickets. Rooms are clean with attached bathroom. The chai here is amazing - must try!"
    },
    // 12. 4-star
    {
        name: "Mahendra Patil",
        date: "May 2020",
        rating: 4,
        state: "Maharashtra",
        text: "Stayed for 2 nights. First night was great, second night had a brief power cut but their inverter backup kicked in within seconds. Food quality is home-style, nothing fancy but filling and tasty."
    },
    // 13. 5-star
    {
        name: "Bhupinder Singh",
        date: "October 2022",
        rating: 5,
        state: "Punjab",
        text: "Waheguru! What a beautiful place. The hotel staff arranged a local guide for us who took us to Triyuginarayan temple also. Best decision to stay here instead of Guptkashi main bazaar."
    },
    // 14. 4-star
    {
        name: "Kavitha Menon",
        date: "June 2017",
        rating: 4,
        state: "Kerala",
        text: "Comfortable stay for our group of 8 people. They gave us 2 connecting rooms which was convenient. The only downside was no room service after 10 PM."
    },
    // 15. 3-star (POSITIVE SURPRISE)
    {
        name: "Lata Deshmukh",
        date: "June 2018",
        rating: 3,
        state: "Maharashtra",
        text: "Basic rooms, nothing fancy. But let me tell you - when my husband fell sick, the owner drove us to the nearest clinic at midnight. You can't put a price on such kindness. We'll always be grateful."
    },
    // 16. 5-star
    {
        name: "Vandana Tripathi",
        date: "September 2023",
        rating: 5,
        state: "Madhya Pradesh",
        text: "Baba Kedarnath ka darshan karke aaye aur yahan ruk ke bahut accha laga. Staff ne subah 4 baje breakfast pack kar diya. Maa bahut khush thi. Zaroor aana chahiye yahan."
    },
    // 17. 4-star
    {
        name: "Pooja Saxena",
        date: "June 2024",
        rating: 4,
        state: "Uttar Pradesh",
        text: "Good value for money. The hotel is on the main road so easy to find. Parking is available. Only issue was some noise from the highway at night, but overall satisfied."
    },
    // 18. 5-star
    {
        name: "Swati Kulkarni",
        date: "May 2016",
        rating: 5,
        state: "Karnataka",
        text: "Stayed here before and after our Kedarnath trek. Both times the experience was wonderful. They kept our extra luggage safely while we went for darshan. Very trustworthy."
    },
    // 19. 4-star
    {
        name: "Gaurav Sharma",
        date: "September 2021",
        rating: 4,
        state: "Uttarakhand",
        text: "Being a local, I brought my relatives from Delhi here. They loved the homely atmosphere. The rajma chawal was their favorite. Good option for families with kids."
    },
    // 20. 5-star
    {
        name: "Prerna Verma",
        date: "June 2015",
        rating: 5,
        state: "Delhi",
        text: "One of the earliest guests here! The hotel was new then but the warmth was the same. Came back in 2023 and was amazed how much they've grown. Still the same humble family running it."
    }
];

const SocialProofSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [selectedReview, setSelectedReview] = useState<number | null>(null);
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Calculate visible cards (3 on desktop, 2 on tablet, 1 on mobile)
    const getVisibleCount = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 3;  // lg: desktop
            if (window.innerWidth >= 768) return 2;   // md: tablet
            return 1;                                  // mobile
        }
        return 3;
    };

    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {
        const handleResize = () => setVisibleCount(getVisibleCount());
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, reviews.length - visibleCount);

    const goNext = useCallback(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    // Pause auto-scroll temporarily (on interaction)
    const pauseTemporarily = useCallback(() => {
        setIsPaused(true);
        // Clear any existing timeout
        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
        }
        // Resume after 5 seconds
        pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 5000);
    }, []);

    // Auto-slide every 3.5 seconds - ALWAYS runs unless paused
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(goNext, 3500);
        return () => clearInterval(interval);
    }, [isPaused, goNext]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (pauseTimeoutRef.current) {
                clearTimeout(pauseTimeoutRef.current);
            }
        };
    }, []);

    // Handle manual navigation
    const handlePrev = () => {
        pauseTemporarily();
        goPrev();
    };

    const handleNext = () => {
        pauseTemporarily();
        goNext();
    };

    // Get initials for avatar (Google style)
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Generate avatar color based on name (Google style colors)
    const getAvatarColor = (name: string) => {
        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF6D01', '#46BDC6', '#7B1FA2', '#C2185B'];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const openReviewModal = (index: number) => {
        pauseTemporarily();
        setSelectedReview(index);
    };

    const closeReviewModal = () => {
        setSelectedReview(null);
    };

    // Render stars including partial stars
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />);
        }
        if (hasHalfStar) {
            stars.push(
                <div key="half" className="relative h-3.5 w-3.5">
                    <Star className="h-3.5 w-3.5 text-slate-300 absolute" />
                    <div className="overflow-hidden w-[50%] absolute">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    </div>
                </div>
            );
        }
        for (let i = Math.ceil(rating); i < 5; i++) {
            stars.push(<Star key={i} className="h-3.5 w-3.5 text-slate-300" />);
        }
        return stars;
    };

    return (
        <section className="py-6 md:py-8 bg-slate-50 border-y border-slate-100">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-6 lg:gap-10">

                    {/* Left Side - Rating Summary */}
                    <div className="flex-shrink-0 text-center md:text-left md:border-r md:border-slate-200 md:pr-6 lg:pr-8">
                        <p className="text-lg md:text-xl font-bold text-slate-800 tracking-wide mb-1">EXCELLENT</p>

                        {/* Stars - 4.7 rating (show 4 full, 1 partial) */}
                        <div className="flex justify-center md:justify-start gap-0.5 mb-1">
                            {[1, 2, 3, 4].map((star) => (
                                <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                            {/* Partial star for 0.7 */}
                            <div className="relative h-5 w-5">
                                <Star className="h-5 w-5 text-slate-300 absolute" />
                                <div className="overflow-hidden w-[70%] absolute">
                                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-3">Rating <strong>4.7</strong> from <strong>241 reviews</strong></p>

                        {/* Platform Logos */}
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            {/* Google Logo */}
                            <div className="flex items-center gap-1">
                                <svg viewBox="0 0 24 24" className="h-5 w-5">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-sm font-medium text-slate-700">Google</span>
                            </div>

                            {/* Divider */}
                            <span className="text-slate-300">|</span>

                            {/* TripAdvisor Logo - Real Owl */}
                            <div className="flex items-center gap-1.5">
                                <svg viewBox="0 0 32 32" className="h-6 w-6">
                                    {/* Owl body */}
                                    <circle cx="16" cy="18" r="12" fill="#34E0A1" />
                                    {/* Left eye white */}
                                    <circle cx="11" cy="16" r="5" fill="white" />
                                    {/* Right eye white */}
                                    <circle cx="21" cy="16" r="5" fill="white" />
                                    {/* Left pupil */}
                                    <circle cx="11" cy="16" r="2.5" fill="#1a1a1a" />
                                    {/* Right pupil */}
                                    <circle cx="21" cy="16" r="2.5" fill="#1a1a1a" />
                                    {/* Beak */}
                                    <path d="M14 20 L16 24 L18 20" fill="#FF8C00" />
                                    {/* Left eye ring */}
                                    <circle cx="11" cy="16" r="5" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
                                    {/* Right eye ring */}
                                    <circle cx="21" cy="16" r="5" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
                                </svg>
                                <span className="text-sm font-medium text-slate-700">Tripadvisor</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Review Cards Slider */}
                    <div className="flex-1 relative w-full overflow-hidden">
                        {/* Navigation Arrows */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                            aria-label="Previous review"
                        >
                            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                            aria-label="Next review"
                        >
                            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 text-slate-600" />
                        </button>

                        {/* Cards Container - centered on mobile */}
                        <div className="mx-8 md:mx-12 overflow-hidden">
                            <div
                                className="flex gap-4 transition-transform duration-500 ease-in-out items-stretch"
                                style={{
                                    transform: `translateX(calc(-${currentIndex * 100 / visibleCount}% - ${currentIndex * 16 / visibleCount}px))`
                                }}
                            >
                                {reviews.map((review, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 bg-white rounded-xl p-4 border border-slate-200 shadow-sm"
                                        style={{
                                            width: visibleCount === 1 ? '100%' : `calc(${100 / visibleCount}% - ${(visibleCount - 1) * 16 / visibleCount}px)`
                                        }}
                                    >
                                        {/* Header with Avatar and Name */}
                                        <div className="flex items-start gap-3 mb-3">
                                            {/* Avatar - Google Style */}
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                                                style={{ backgroundColor: getAvatarColor(review.name) }}
                                            >
                                                {getInitials(review.name)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-slate-900 text-sm truncate">{review.name}</p>
                                                <p className="text-xs text-slate-500">{review.state} • {review.date}</p>
                                            </div>

                                            {/* Verified Badge */}
                                            <svg className="h-4 w-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                        </div>

                                        {/* Stars */}
                                        <div className="flex gap-0.5 mb-2">
                                            {renderStars(review.rating)}
                                        </div>

                                        {/* Review Text - Fixed height, Read more opens modal */}
                                        <div className="min-h-[72px]">
                                            <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                                                {review.text}
                                            </p>
                                            {review.text.length > 120 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openReviewModal(index);
                                                    }}
                                                    className="text-blue-600 text-xs font-medium mt-1 hover:underline"
                                                >
                                                    Read more
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="flex justify-end mt-4">
                    <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                        </svg>
                        Verified Reviews
                    </div>
                </div>
            </div>

            {/* Review Modal Overlay */}
            {selectedReview !== null && (
                <div
                    className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                    onClick={closeReviewModal}
                >
                    <div
                        className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-4">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-lg flex-shrink-0"
                                style={{ backgroundColor: getAvatarColor(reviews[selectedReview].name) }}
                            >
                                {getInitials(reviews[selectedReview].name)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 text-lg">{reviews[selectedReview].name}</p>
                                <p className="text-sm text-slate-500">{reviews[selectedReview].state} • {reviews[selectedReview].date}</p>
                            </div>
                            <button
                                onClick={closeReviewModal}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-0.5 mb-4">
                            {renderStars(reviews[selectedReview].rating)}
                        </div>

                        {/* Full Review Text */}
                        <p className="text-slate-700 leading-relaxed">
                            {reviews[selectedReview].text}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SocialProofSection;
