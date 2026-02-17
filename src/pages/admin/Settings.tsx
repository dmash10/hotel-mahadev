import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Phone, Mail, MapPin, Globe, MessageSquare, Bell, Loader2, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface SiteSettings {
    id?: string;
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
    hotel_name: "Hotel Mahadev",
    tagline: "Your Home Near Kedarnath",
    primary_phone: "+91 9927279127",
    secondary_phone: "+91 7302712305",
    tertiary_phone: "+91 8218818955",
    whatsapp_number: "919927279127",
    email: "hotelnewmahadev@gmail.com",
    address: "Kedarnath Road, Byung gard, Guptkashi, Semkwerala, District Rudraprayag, Uttarakhand 246471",
    google_maps_url: "https://maps.app.goo.gl/QxPjWZ8VC2akknCcA",
    whatsapp_default_message: "Hi, I want to book a room at Hotel Mahadev",
    booking_enabled: true,
    show_prices: true,
    maintenance_mode: false,
    announcement_text: "",
    announcement_enabled: false,
};

const Settings = () => {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching settings:', error);
            }

            if (data) {
                setSettings({ ...defaultSettings, ...data });
            }
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const { data: existing } = await supabase
                .from('site_settings')
                .select('id')
                .single();

            if (existing) {
                const { error } = await supabase
                    .from('site_settings')
                    .update(settings)
                    .eq('id', existing.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('site_settings')
                    .insert([settings]);

                if (error) throw error;
            }

            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
            toast({
                title: "Settings Saved",
                description: "Your site settings have been updated successfully.",
            });
        } catch (err: any) {
            console.error('Error saving settings:', err);
            toast({
                title: "Error",
                description: err.message || "Failed to save settings. The table might not exist yet.",
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    const updateSetting = (key: keyof SiteSettings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your hotel website settings</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-amber-500 hover:bg-amber-600"
                >
                    {saving ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : saved ? (
                        <Check className="h-4 w-4 mr-2" />
                    ) : (
                        <Save className="h-4 w-4 mr-2" />
                    )}
                    {saved ? "Saved!" : "Save Changes"}
                </Button>
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-500" />
                    Basic Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="hotel_name">Hotel Name</Label>
                        <Input
                            id="hotel_name"
                            value={settings.hotel_name}
                            onChange={(e) => updateSetting('hotel_name', e.target.value)}
                            placeholder="Hotel Mahadev"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tagline">Tagline</Label>
                        <Input
                            id="tagline"
                            value={settings.tagline}
                            onChange={(e) => updateSetting('tagline', e.target.value)}
                            placeholder="Your Home Near Kedarnath"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5 text-amber-500" />
                    Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="primary_phone">Primary Phone</Label>
                        <Input
                            id="primary_phone"
                            value={settings.primary_phone}
                            onChange={(e) => updateSetting('primary_phone', e.target.value)}
                            placeholder="+91 9927279127"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="secondary_phone">Secondary Phone</Label>
                        <Input
                            id="secondary_phone"
                            value={settings.secondary_phone}
                            onChange={(e) => updateSetting('secondary_phone', e.target.value)}
                            placeholder="+91 7302712305"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tertiary_phone">Tertiary Phone</Label>
                        <Input
                            id="tertiary_phone"
                            value={settings.tertiary_phone}
                            onChange={(e) => updateSetting('tertiary_phone', e.target.value)}
                            placeholder="+91 8218818955"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={settings.email}
                            onChange={(e) => updateSetting('email', e.target.value)}
                            placeholder="hotelnewmahadev@gmail.com"
                        />
                    </div>
                </div>
            </div>

            {/* WhatsApp Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                    WhatsApp Settings
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="whatsapp_number">WhatsApp Number (without +)</Label>
                        <Input
                            id="whatsapp_number"
                            value={settings.whatsapp_number}
                            onChange={(e) => updateSetting('whatsapp_number', e.target.value)}
                            placeholder="919927279127"
                        />
                        <p className="text-xs text-slate-500">Format: country code + number (e.g., 919927279127)</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="whatsapp_default_message">Default Booking Message</Label>
                        <Textarea
                            id="whatsapp_default_message"
                            value={settings.whatsapp_default_message}
                            onChange={(e) => updateSetting('whatsapp_default_message', e.target.value)}
                            placeholder="Hi, I want to book a room..."
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    Location
                </h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="address">Full Address</Label>
                        <Textarea
                            id="address"
                            value={settings.address}
                            onChange={(e) => updateSetting('address', e.target.value)}
                            placeholder="Hotel address..."
                            rows={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="google_maps_url">Google Maps Link</Label>
                        <Input
                            id="google_maps_url"
                            value={settings.google_maps_url}
                            onChange={(e) => updateSetting('google_maps_url', e.target.value)}
                            placeholder="https://maps.app.goo.gl/..."
                        />
                    </div>
                </div>
            </div>

            {/* Announcement Banner */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-amber-500" />
                    Announcement Banner
                </h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Label>Enable Announcement</Label>
                            <p className="text-xs text-slate-500">Show a banner at the top of the website</p>
                        </div>
                        <Switch
                            checked={settings.announcement_enabled}
                            onCheckedChange={(checked) => updateSetting('announcement_enabled', checked)}
                        />
                    </div>
                    {settings.announcement_enabled && (
                        <div className="space-y-2">
                            <Label htmlFor="announcement_text">Announcement Text</Label>
                            <Input
                                id="announcement_text"
                                value={settings.announcement_text}
                                onChange={(e) => updateSetting('announcement_text', e.target.value)}
                                placeholder="🎉 Special offer: Book 3 nights, get 1 free!"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Site Controls */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Site Controls</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                            <Label>Enable Booking</Label>
                            <p className="text-xs text-slate-500">Allow customers to make booking inquiries</p>
                        </div>
                        <Switch
                            checked={settings.booking_enabled}
                            onCheckedChange={(checked) => updateSetting('booking_enabled', checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                            <Label>Show Prices</Label>
                            <p className="text-xs text-slate-500">Display room prices on the website</p>
                        </div>
                        <Switch
                            checked={settings.show_prices}
                            onCheckedChange={(checked) => updateSetting('show_prices', checked)}
                        />
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <Label className="text-red-600">Maintenance Mode</Label>
                            <p className="text-xs text-slate-500">Temporarily disable the website for visitors</p>
                        </div>
                        <Switch
                            checked={settings.maintenance_mode}
                            onCheckedChange={(checked) => updateSetting('maintenance_mode', checked)}
                        />
                    </div>
                </div>
            </div>

            {/* Save Button (Bottom) */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600"
                >
                    {saving ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : saved ? (
                        <Check className="h-4 w-4 mr-2" />
                    ) : (
                        <Save className="h-4 w-4 mr-2" />
                    )}
                    {saved ? "Saved!" : "Save All Settings"}
                </Button>
            </div>
        </div>
    );
};

export default Settings;
