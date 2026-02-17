import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface ContentItem {
    id: string;
    section: string;
    key: string;
    value: string;
}

export const useContent = () => {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("site_content")
                .select("*");

            if (error) throw error;
            setContent(data || []);
        } catch (error) {
            console.error("Error fetching content:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateContent = async (section: string, key: string, value: string) => {
        try {
            // Check if exists
            const existing = content.find(c => c.section === section && c.key === key);

            if (existing) {
                const { error } = await supabase
                    .from("site_content")
                    .update({ value })
                    .eq("id", existing.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("site_content")
                    .insert([{ section, key, value }]);
                if (error) throw error;
            }

            // Refresh or optimistic update
            await fetchContent();
            return { success: true };
        } catch (error) {
            console.error("Error updating content:", error);
            return { success: false, error };
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    // Helper to get a specific value
    const getValue = (section: string, key: string, fallback: string = "") => {
        const item = content.find(c => c.section === section && c.key === key);
        return item ? item.value : fallback;
    };

    return {
        content,
        loading,
        updateContent,
        getValue,
        refresh: fetchContent
    };
};
