import { useState, useEffect } from "react";
import { useContent } from "@/hooks/useContent";
import { Save, Loader2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Helper component for fields
const Field = ({
    section,
    keyName,
    label,
    type = "text",
    placeholder = "",
    formValues,
    getValue,
    handleChange,
    handleSave,
    saving
}: any) => {
    const id = `${section}:${keyName}`;
    const currentVal = formValues[id] ?? getValue(section, keyName, "");
    const originalVal = getValue(section, keyName, "");
    const isDirty = currentVal !== originalVal;

    return (
        <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex justify-between items-center mb-2">
                <Label>{label}</Label>
                {isDirty && (
                    <span className="text-xs text-amber-600 font-medium">Unsaved changes</span>
                )}
            </div>
            {type === "textarea" ? (
                <Textarea
                    value={currentVal}
                    onChange={(e) => handleChange(section, keyName, e.target.value)}
                    placeholder={placeholder}
                    rows={3}
                />
            ) : (
                <Input
                    value={currentVal}
                    onChange={(e) => handleChange(section, keyName, e.target.value)}
                    placeholder={placeholder}
                />
            )}
            <div className="flex justify-end mt-3 gap-2">
                {isDirty && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleChange(section, keyName, originalVal)}
                    >
                        <Undo className="h-3 w-3 mr-1" /> Revert
                    </Button>
                )}
                <Button
                    size="sm"
                    disabled={!isDirty || saving}
                    onClick={() => handleSave(section, keyName)}
                    className={isDirty ? "bg-amber-500 hover:bg-amber-600" : ""}
                >
                    {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3 mr-1" />}
                    Save
                </Button>
            </div>
        </div>
    );
};

const ContentEditor = () => {
    const { content, loading, updateContent, getValue } = useContent();
    const [formValues, setFormValues] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    // Initialize form with current values when loaded
    useEffect(() => {
        if (content.length > 0) {
            const initial: Record<string, string> = {};
            content.forEach(c => {
                initial[`${c.section}:${c.key}`] = c.value;
            });
            setFormValues(prev => ({ ...prev, ...initial }));
        }
    }, [content]);

    const handleChange = (section: string, key: string, val: string) => {
        setFormValues(prev => ({
            ...prev,
            [`${section}:${key}`]: val
        }));
    };

    const handleSave = async (section: string, key: string) => {
        const id = `${section}:${key}`;
        const val = formValues[id];

        if (val === undefined) return; // No change

        setSaving(true);
        const result = await updateContent(section, key, val);
        setSaving(false);

        if (result.success) {
            toast.success("Saved successfully");
        } else {
            toast.error("Failed to save");
        }
    };

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-amber-500" /></div>;

    // Props for Field component
    const fieldProps = { formValues, getValue, handleChange, handleSave, saving };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Site Content</h1>
                    <p className="text-slate-500">Edit text and contact details</p>
                </div>
            </div>

            <Tabs defaultValue="announcement">
                <TabsList className="mb-4">
                    <TabsTrigger value="announcement">📢 Announcement</TabsTrigger>
                    <TabsTrigger value="general">ℹ️ General Info</TabsTrigger>
                    <TabsTrigger value="hero">🏠 Hero Section</TabsTrigger>
                    <TabsTrigger value="contact">📞 Contact Details</TabsTrigger>
                </TabsList>

                <TabsContent value="announcement" className="space-y-4 pt-4">
                    <div className="bg-slate-50 p-6 rounded-xl border border-blue-100 mb-6">
                        <h3 className="font-semibold text-slate-800 mb-2">Marquee Banner Settings</h3>
                        <p className="text-sm text-slate-500 mb-4">This scrolling text appears at the very top of your website. Use it for special offers, important updates, or welcome messages.</p>
                        <Field
                            section="general"
                            keyName="announcement"
                            label="Announcement Text"
                            type="textarea"
                            placeholder="e.g. Special Offer: 50% Off for Families! Book directly via WhatsApp."
                            {...fieldProps}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="general" className="space-y-4 pt-4">
                    <Field section="general" keyName="hotel_name" label="Hotel Name" placeholder="Hotel Mahadev" {...fieldProps} />
                    <Field section="general" keyName="tagline" label="Tagline" placeholder="Comfort near Kedarnath" {...fieldProps} />
                </TabsContent>

                <TabsContent value="hero" className="space-y-4 pt-4">
                    <Field section="hero" keyName="title" label="Main Title" placeholder="Your Peaceful Halt..." {...fieldProps} />
                    <Field section="hero" keyName="subtitle" label="Subtitle" type="textarea" placeholder="Experience the divine serenity..." {...fieldProps} />
                    <Field section="hero" keyName="cta_text" label="Button Text" placeholder="Book Your Stay" {...fieldProps} />
                </TabsContent>

                <TabsContent value="contact" className="space-y-4 pt-4">
                    <Field section="contact" keyName="phone" label="Phone Number" placeholder="+91 9999999999" {...fieldProps} />
                    <Field section="contact" keyName="whatsapp" label="WhatsApp Number" placeholder="919999999999" {...fieldProps} />
                    <Field section="contact" keyName="email" label="Email Address" placeholder="info@hotelmahadev.com" {...fieldProps} />
                    <Field section="contact" keyName="address" label="Full Address" type="textarea" placeholder="Kedarnath Rd,..." {...fieldProps} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ContentEditor;
