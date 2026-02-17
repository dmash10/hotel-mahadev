import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface SiteSettings {
    hotel_name: string;
    tagline: string;
    primary_phone: string;
    secondary_phone: string;
    tertiary_phone: string;
    whatsapp_number: string;
    email: string;
    address: string;
    google_maps_url: string;
    whatsapp_default_message: string;
    booking_enabled: boolean;
    show_prices: boolean;
    maintenance_mode: boolean;
    announcement_text: string;
    announcement_enabled: boolean;
}

const defaultSettings: SiteSettings = {
    hotel_name: 'Hotel Mahadev',
    tagline: 'Your Home Near Kedarnath',
    primary_phone: '+91 9927279127',
    secondary_phone: '+91 7302712305',
    tertiary_phone: '+91 8218818955',
    whatsapp_number: '919927279127',
    email: 'hotelnewmahadev@gmail.com',
    address: 'Kedarnath Road, Byung gard, Guptkashi, Semkwerala, District Rudraprayag, Uttarakhand 246471',
    google_maps_url: 'https://maps.app.goo.gl/QxPjWZ8VC2akknCcA',
    whatsapp_default_message: 'Hi, I want to book a room at Hotel Mahadev',
    booking_enabled: true,
    show_prices: true,
    maintenance_mode: false,
    announcement_text: '',
    announcement_enabled: false,
};

export const useSiteSettings = () => {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .single();

                if (!error && data) {
                    setSettings({ ...defaultSettings, ...data });
                }
            } catch (err) {
                console.error('Error fetching settings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading };
};

export default useSiteSettings;
