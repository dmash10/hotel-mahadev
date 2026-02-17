import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Where is Hotel Mahadev located on the Kedarnath route?",
        answer: "Hotel Mahadev is located on the main Kedarnath highway near Phata. We are 6.5 km ahead from Guptkashi and just 4.7 km from the nearest helicopter helipad (Guptkashi Helipad). Our location allows easy road access while avoiding heavy crowd zones, making it a perfect base for your Yatra."
    },
    {
        question: "How far is Hotel Mahadev from Guptkashi and Gaurikund?",
        answer: "We are centrally located: just 6.7 km from Vishwanath Temple (Guptkashi) and approximately 15 km from Sonprayag (the base for Gaurikund shuttles)."
    },
    {
        question: "How far is Hotel Mahadev from Kedarnath helicopter helipads?",
        answer: (
            <div className="space-y-3">
                <p>For guests planning to travel by helicopter, Hotel Mahadev is conveniently located near the main Kedarnath helicopter bases:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li><strong>Phata Helipad:</strong> approx. 5.7 km from the hotel</li>
                    <li><strong>Guptkashi Helipad:</strong> approx. 4.7 km from the hotel</li>
                </ul>
                <p>Staying nearby allows guests to reach helipads early, manage check-in timings better, and avoid last-minute travel stress during peak yatra season.</p>
            </div>
        )
    },
    {
        question: "Is Hotel Mahadev suitable for Kedarnath Yatra night stay?",
        answer: "Yes. Hotel Mahadev is designed for travelers who need a comfortable and peaceful night stay before or after the Kedarnath Yatra. Guests commonly stay here to rest, acclimatize, and prepare for the journey ahead."
    },
    {
        question: "Does Hotel Mahadev have luxury rooms?",
        answer: "Yes! We offer premium rooms with high-quality mattresses, soft cotton bedding, attached bathrooms with hot water geysers, LED TVs, and beautiful mountain views. Our luxury rooms are perfect for families and guests who want extra comfort during their Yatra."
    },
    {
        question: "Do you have rooms for budget travelers?",
        answer: "Absolutely. We understand that pilgrims have different budgets. We offer clean, comfortable rooms at affordable rates without compromising on hygiene and basic amenities. All rooms include attached bathroom, hot water, and fresh bedding."
    },
    {
        question: "Is it better to stay near Guptkashi or closer to Gaurikund?",
        answer: "Staying near Guptkashi offers better road access, calmer surroundings, and more flexibility compared to crowded transit points closer to Gaurikund, especially during peak yatra season."
    },
    {
        question: "Is Hotel Mahadev inside a crowded market or in a quieter area?",
        answer: "The hotel is located away from heavy market congestion, which helps guests avoid noise, traffic buildup, and last-minute stress—especially during peak yatra season."
    },
    {
        question: "Do guests usually stay before or after Kedarnath travel?",
        answer: "Both. Some guests stay before starting the yatra to prepare and rest, while others stay after returning to recover from the trek or helicopter journey before continuing onward."
    },
    {
        question: "Is Hotel Mahadev suitable for families and senior citizens?",
        answer: "Yes. The hotel is often chosen by families and senior travelers who prefer a calm environment, easier access, and a less hectic stay compared to crowded transit points."
    },
    {
        question: "Is Hotel Mahadev a good option for bikers and road-trip travelers?",
        answer: "Yes. Road travelers and bikers appreciate the hotel's easy road access, smoother arrival and departure, and the ability to avoid dense traffic zones."
    },
    {
        question: "Is Hotel Mahadev meant for short stays or longer stays as well?",
        answer: "Most guests stay for one night, but the hotel is also suitable for longer stays when weather, health, or travel schedules require additional rest days."
    },
    {
        question: "Does Hotel Mahadev work well during peak Kedarnath Yatra season?",
        answer: "Yes. During peak season, guests prefer staying in locations that are manageable and organized, rather than inside extremely crowded zones. Hotel Mahadev fits that need."
    },
    {
        question: "Why do travelers choose Hotel Mahadev over staying closer to Sonprayag?",
        answer: "Many travelers prefer staying slightly away from Sonprayag to rest better, avoid congestion, and plan early departures smoothly. Hotel Mahadev offers that balance without moving too far off the route."
    }
];

const FAQSection = () => {
    return (
        <section className="py-12 md:py-16 bg-slate-100 border-t border-slate-200 relative z-20">
            <div className="container max-w-4xl px-4 md:px-6">
                <div className="text-center mb-8 md:mb-12">
                    <p className="text-amber-600 font-bold text-base md:text-lg uppercase tracking-wider">Common Questions</p>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mt-2 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="font-sans text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Everything you need to know about our location near Phata, distances to Kedarnath, and stay experience.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 md:p-8">
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b-slate-100 last:border-0 px-2 md:px-0">
                                <AccordionTrigger className="text-left font-sans font-semibold text-slate-900 hover:text-amber-700 hover:no-underline py-4 text-[15px] md:text-lg leading-snug transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="font-sans text-slate-600 leading-relaxed text-sm md:text-base pt-2 pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
