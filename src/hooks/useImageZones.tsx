import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase-custom";
import imageCompression from "browser-image-compression";
import { toast } from "sonner";

export type ImageZone = Database['public']['Tables']['image_zones']['Row'] & {
    zone_media: ZoneMedia[];
};

export type ZoneMedia = Database['public']['Tables']['zone_media']['Row'];

// Module-level cache to persist across component unmounts
let zonesCache: ImageZone[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface ImageZonesContextType {
    zones: ImageZone[];
    loading: boolean;
    uploading: boolean;
    getZoneDisplay: (key: string) => ZoneMedia | undefined;
    getZoneImage: (key: string) => string | undefined;
    getZoneMedia: (key: string) => ZoneMedia[];
    getZoneInfo: (key: string) => ImageZone | undefined;
    addMedia: (zoneId: string, file: File, type?: 'image' | 'video') => Promise<{ success: boolean; error?: any }>;
    removeMedia: (mediaId: string, url: string) => Promise<void>;
    toggleZone: (zoneId: string, currentStatus: boolean) => Promise<void>;
    setPrimaryMedia: (zoneId: string, mediaId: string) => Promise<void>;
    refresh: () => Promise<void>;
}

const ImageZonesContext = createContext<ImageZonesContextType | null>(null);

export const ImageZonesProvider = ({ children }: { children: ReactNode }) => {
    const [zones, setZones] = useState<ImageZone[]>(zonesCache || []);
    const [loading, setLoading] = useState(!zonesCache);
    const [uploading, setUploading] = useState(false);

    const fetchZones = useCallback(async (forceRefresh = false) => {
        try {
            // Use cache if fresh and not forcing refresh
            const now = Date.now();
            if (!forceRefresh && zonesCache && (now - cacheTimestamp) < CACHE_DURATION) {
                if (zones.length === 0) {
                    setZones(zonesCache);
                    setLoading(false);
                }
                return;
            }

            if (zones.length === 0) setLoading(true);

            const { data, error } = await supabase
                .from("image_zones")
                .select("*, zone_media(*)")
                .order("page")
                .order("order_index");

            if (error) throw error;

            // Sort media by order_index for each zone
            const processedData = data?.map(zone => ({
                ...zone,
                zone_media: zone.zone_media.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
            })) || [];

            // Update both state and cache
            zonesCache = processedData;
            cacheTimestamp = Date.now();
            setZones(processedData);
        } catch (error) {
            console.error("Error fetching image zones:", error);
            if (zones.length === 0) toast.error("Failed to load image settings");
        } finally {
            setLoading(false);
        }
    }, [zones.length]);

    useEffect(() => {
        fetchZones();
    }, [fetchZones]);

    // --- Helpers ---

    const getZoneInfo = useCallback((key: string) => {
        return zones.find(z => z.zone_key === key);
    }, [zones]);

    const getZoneDisplay = useCallback((key: string) => {
        const zone = zones.find(z => z.zone_key === key);
        if (!zone || zone.is_enabled === false || !zone.zone_media.length) return undefined;
        return zone.zone_media[0];
    }, [zones]);

    const getZoneImage = useCallback((key: string): string | undefined => {
        const media = getZoneDisplay(key);
        return media?.url;
    }, [getZoneDisplay]);

    const getZoneMedia = useCallback((key: string) => {
        const zone = zones.find(z => z.zone_key === key);
        if (!zone || zone.is_enabled === false) return [];
        return zone.zone_media;
    }, [zones]);

    // --- Actions ---

    const addMedia = async (zoneId: string, file: File, type: 'image' | 'video' = 'image') => {
        try {
            setUploading(true);

            let fileToUpload = file;
            if (type === 'image') {
                const options = {
                    maxSizeMB: 2,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    fileType: "image/webp"
                };
                const compressedBlob = await imageCompression(file, options);
                fileToUpload = new File([compressedBlob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                    type: "image/webp",
                    lastModified: Date.now(),
                });
            }

            const timestamp = Date.now();
            const ext = type === 'image' ? 'webp' : file.name.split('.').pop();
            const fileName = `zones/${zoneId}/${timestamp}.${ext}`;

            const { error: uploadError } = await supabase.storage
                .from("site-images")
                .upload(fileName, fileToUpload, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from("site-images")
                .getPublicUrl(fileName);

            const { error: dbError } = await supabase
                .from("zone_media")
                .insert({
                    zone_id: zoneId,
                    url: publicUrl,
                    type: type,
                    order_index: 999
                });

            if (dbError) throw dbError;

            toast.success("Media added successfully");
            await fetchZones(true); // Force refresh
            return { success: true };
        } catch (error) {
            console.error("Error adding media:", error);
            toast.error(`Failed to upload ${type}`);
            return { success: false, error };
        } finally {
            setUploading(false);
        }
    };

    const removeMedia = async (mediaId: string, url: string) => {
        try {
            const { error: dbError } = await supabase
                .from("zone_media")
                .delete()
                .eq("id", mediaId);

            if (dbError) throw dbError;

            try {
                const path = url.split('/site-images/')[1];
                if (path) {
                    await supabase.storage.from("site-images").remove([path]);
                }
            } catch (e) {
                console.warn("Failed to cleanup storage file:", e);
            }

            toast.success("Media removed");

            // Update both state and cache
            const updatedZones = zones.map(z => ({
                ...z,
                zone_media: z.zone_media.filter(m => m.id !== mediaId)
            }));
            zonesCache = updatedZones;
            setZones(updatedZones);
        } catch (error) {
            console.error("Error removing media:", error);
            toast.error("Failed to delete media");
        }
    };

    const toggleZone = async (zoneId: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from("image_zones")
                .update({ is_enabled: !currentStatus })
                .eq("id", zoneId);

            if (error) throw error;

            const updatedZones = zones.map(z =>
                z.id === zoneId ? { ...z, is_enabled: !currentStatus } : z
            );
            zonesCache = updatedZones;
            setZones(updatedZones);
            toast.success(`Zone ${!currentStatus ? 'enabled' : 'disabled'}`);
        } catch (error) {
            console.error("Error toggling zone:", error);
            toast.error("Failed to update status");
        }
    };

    const setPrimaryMedia = async (zoneId: string, mediaId: string) => {
        try {
            // Set selected media to order_index 0 (first)
            const { error: primaryError } = await supabase
                .from("zone_media")
                .update({ order_index: 0 })
                .eq("id", mediaId);

            if (primaryError) throw primaryError;

            // Increment all other media in this zone
            const zone = zones.find(z => z.id === zoneId);
            if (zone) {
                const otherMedia = zone.zone_media.filter(m => m.id !== mediaId);
                for (let i = 0; i < otherMedia.length; i++) {
                    await supabase
                        .from("zone_media")
                        .update({ order_index: i + 1 })
                        .eq("id", otherMedia[i].id);
                }
            }

            toast.success("Primary image updated");
            await fetchZones(true);
        } catch (error) {
            console.error("Error setting primary media:", error);
            toast.error("Failed to set primary image");
        }
    };

    return (
        <ImageZonesContext.Provider value={{
            zones,
            loading,
            uploading,
            getZoneDisplay,
            getZoneImage,
            getZoneMedia,
            getZoneInfo,
            addMedia,
            removeMedia,
            toggleZone,
            setPrimaryMedia,
            refresh: () => fetchZones(true)
        }}>
            {children}
        </ImageZonesContext.Provider>
    );
};

// Hook that uses context for cached data
export const useImageZones = () => {
    const context = useContext(ImageZonesContext);

    // Fallback for components outside provider (shouldn't happen but safe)
    if (!context) {
        // Return minimal implementation using cache directly
        const zones = zonesCache || [];
        return {
            zones,
            loading: !zonesCache,
            uploading: false,
            getZoneDisplay: (key: string) => {
                const zone = zones.find(z => z.zone_key === key);
                if (!zone || zone.is_enabled === false || !zone.zone_media?.length) return undefined;
                return zone.zone_media[0];
            },
            getZoneImage: (key: string) => {
                const zone = zones.find(z => z.zone_key === key);
                if (!zone || zone.is_enabled === false || !zone.zone_media?.length) return undefined;
                return zone.zone_media[0]?.url;
            },
            getZoneMedia: (key: string) => {
                const zone = zones.find(z => z.zone_key === key);
                if (!zone || zone.is_enabled === false) return [];
                return zone.zone_media || [];
            },
            getZoneInfo: (key: string) => zones.find(z => z.zone_key === key),
            addMedia: async () => ({ success: false }),
            removeMedia: async () => { },
            toggleZone: async () => { },
            setPrimaryMedia: async () => { },
            refresh: async () => { }
        };
    }

    return context;
};
