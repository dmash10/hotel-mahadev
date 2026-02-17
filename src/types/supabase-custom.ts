export type ImageZoneRow = {
    id: string;
    created_at: string;
    zone_key: string;
    display_name: string;
    description: string | null;
    page: string | null;
    is_enabled: boolean | null;
    fallback_url: string | null;
    order_index: number | null;
    updated_at: string | null;
};

export type ZoneMediaRow = {
    id: string;
    created_at: string;
    zone_id: string | null;
    url: string;
    type: 'image' | 'video';
    order_index: number | null;
};

// Mocking the Database interface effectively for our usage
export interface Database {
    public: {
        Tables: {
            image_zones: {
                Row: ImageZoneRow;
                Insert: Partial<ImageZoneRow>;
                Update: Partial<ImageZoneRow>;
            };
            zone_media: {
                Row: ZoneMediaRow;
                Insert: Partial<ZoneMediaRow>;
                Update: Partial<ZoneMediaRow>;
            };
        };
    };
}
