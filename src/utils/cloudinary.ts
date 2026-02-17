export const CLOUD_NAME = "diyskapkc";

/**
 * Generates an optimized Cloudinary URL for a given specific image ID.
 * Features:
 * - f_auto: Automatically serves WebP/AVIF based on browser support
 * - q_auto: Automatically adjusts quality for balance of size/crispness
 * 
 * @param publicId The ID of the image in Cloudinary (e.g. "hotel-exterior" or "rooms/deluxe-1")
 * @returns The full URL
 */
export const getCloudinaryUrl = (publicId: string) => {
    // If it's already a full URL (like Unsplash), return it as is
    if (publicId.startsWith("http")) {
        return publicId;
    }

    // Remove leading slash if present to avoid double slashes
    const cleanId = publicId.startsWith('/') ? publicId.slice(1) : publicId;

    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${cleanId}`;
};

/**
 * Generates an optimized Cloudinary Video URL
 */
export const getCloudinaryVideoUrl = (publicId: string) => {
    if (publicId.startsWith("http")) return publicId;
    const cleanId = publicId.startsWith('/') ? publicId.slice(1) : publicId;
    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${cleanId}`;
};
