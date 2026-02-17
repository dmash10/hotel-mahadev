import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Rajesh Kumar",
        location: "Delhi",
        rating: 5,
        text: "Excellent stay! The rooms were clean, hot water was available 24/7, and the food was delicious. Perfect location for Kedarnath yatra.",
        date: "November 2024"
    },
    {
        name: "Priya Sharma",
        location: "Mumbai",
        rating: 5,
        text: "Very cooperative staff and well-maintained rooms. The restaurant serves fresh home-style food. Highly recommended for pilgrims.",
        date: "October 2024"
    },
    {
        name: "Amit Patel",
        location: "Gujarat",
        rating: 4,
        text: "Good hotel on the Kedarnath route. Clean rooms with attached bathroom. Parking available. Good value for money.",
        date: "September 2024"
    },
    {
        name: "Sunita Devi",
        location: "Jaipur",
        rating: 5,
        text: "Second time staying here. The staff remembers us and treats us like family. Best hotel in Guptkashi for families.",
        date: "August 2024"
    },
    {
        name: "Vikram Singh",
        location: "Lucknow",
        rating: 5,
        text: "Amazing hospitality! The food was excellent and rooms were spotless. Will definitely come back on my next Kedarnath trip.",
        date: "July 2024"
    }
];

const ReviewsSection = () => {
    return (
        <section className="py-12 md:py-16 bg-blue-900">
            <div className="container mb-8">
                {/* Section Header */}
                <div className="text-center">
                    <span className="text-blue-300 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
                        What Our Guests Say
                    </h2>
                </div>
            </div>

            {/* Scrollable Reviews - Touch/Finger Scrollable */}
            <div className="overflow-x-auto scrollbar-hide px-4 md:px-8">
                <div className="flex gap-4 w-max">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-80 md:w-96 bg-white rounded-xl p-6"
                        >
                            {/* Quote Icon */}
                            <Quote className="h-8 w-8 text-blue-200 mb-3" />

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                                    />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-slate-700 text-sm leading-relaxed mb-4">
                                "{review.text}"
                            </p>

                            {/* Reviewer Info */}
                            <div>
                                <p className="font-semibold text-slate-900">{review.name}</p>
                                <p className="text-sm text-slate-500">{review.location} • {review.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Hint */}
            <p className="text-center text-white/50 text-sm mt-4">
                Swipe to read more reviews →
            </p>
        </section>
    );
};

export default ReviewsSection;
