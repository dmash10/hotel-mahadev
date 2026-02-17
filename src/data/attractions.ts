import { getCloudinaryUrl } from "@/utils/cloudinary";

export interface Attraction {
    id: string;
    title: string;
    description: string;
    distance: string;
    image: string;
    highlight?: string;
}

export const attractions: Attraction[] = [
    {
        id: "kedarnath",
        title: "Kedarnath Temple",
        description: "The ultimate destination of your yatra. From our hotel, drive 15 km to Sonprayag, then 4.7 km to Gaurikund (the trek starting point). From Gaurikund, the sacred 16 km trek leads you to the divine Kedarnath Temple. We recommend starting as early as 4 AM to avoid the rush.",
        distance: "15 km to Sonprayag → 4.7 km to Gaurikund → 16 km Trek",
        // To change image: Upload 'kedarnath' to Cloudinary or change this URL
        image: getCloudinaryUrl("kedarnath"),
        highlight: "Main Dham"
    },
    {
        id: "vishwanath",
        title: "Vishwanath Temple, Guptkashi",
        description: "Just a short drive away, this ancient temple holds the same spiritual significance as Kashi Vishwanath in Varanasi. It is dedicated to Lord Shiva and Ardhanarishvara. Many pilgrims stop here for the evening Aarti before proceeding further towards Kedarnath.",
        distance: "6.7 km from Hotel",
        image: getCloudinaryUrl("vishwanath-temple"),
        highlight: "Must Visit Stop"
    },
    {
        id: "triyuginarayan",
        title: "Triyuginarayan Temple",
        description: "The sacred site where Lord Shiva and Goddess Parvati were married. An 'Akhand Dhuni' (eternal flame) has been burning here for three Yugas. Pilgrims often add wood to the fire and take the holy ash (Bhasm) home for marital blessings.",
        distance: "31 km from Hotel",
        image: getCloudinaryUrl("triyuginarayan"),
        highlight: "Shiva-Parvati Wedding Site"
    },
    {
        id: "omkareshwar",
        title: "Omkareshwar Temple, Ukhimath",
        description: "This is the winter seat of Lord Kedarnath. During the snowy winter months when the main Kedarnath temple closes, the deity is brought here in a grand procession. It is located across the valley and offers a peaceful, crowd-free darshan year-round.",
        distance: "17 km from Hotel",
        image: getCloudinaryUrl("omkareshwar"),
        highlight: "Winter Seat of Kedar"
    },
    {
        id: "tungnath",
        title: "Tungnath & Chandrashila",
        description: "The world's highest Shiva temple. You drive 45 km to Chopta (known as Mini Switzerland for its meadows), and then take a 3.5 km scenic trek. Unlike the steep Kedar trek, this path offers breathtaking 360-degree views of Nanda Devi and other Himalayan peaks.",
        distance: "45 km to Chopta + 3.5 km Trek",
        image: getCloudinaryUrl("tungnath"),
        highlight: "Highest Shiva Temple"
    },
    {
        id: "kartik-swami",
        title: "Kartik Swami Temple",
        description: "Dedicated to Lord Kartikeya (Murugan), the son of Lord Shiva. Perched on a high ridge with a 360-degree view of the Himalayas. The temple is famous for its bell offerings and the dramatic ridge sunrise. A hidden gem often missed by regular tourists.",
        distance: "56 km from Hotel",
        image: getCloudinaryUrl("kartik-swami"),
        highlight: "Hidden Gem"
    }
];
