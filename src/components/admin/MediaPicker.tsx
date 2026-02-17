import { useState } from "react";
import { useImageZones } from "@/hooks/useImageZones";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader2, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MediaPickerProps {
    onSelect: (url: string) => void;
    currentImage?: string | null;
    trigger?: React.ReactNode;
}

export const MediaPicker = ({ onSelect, currentImage, trigger }: MediaPickerProps) => {
    const { zones, loading } = useImageZones();
    const [open, setOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState<string>("all");

    // Flatten all media from zones to create a gallery
    const allMedia = zones.flatMap(z => z.zone_media || []);

    // De-duplicate media by URL (in case same image is in multiple zones)
    const uniqueMedia = Array.from(new Map(allMedia.map(item => [item.url, item])).values());

    const handleSelect = (url: string) => {
        onSelect(url);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="w-full">
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Select Image
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>Select Media</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                        </div>
                    ) : uniqueMedia.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed rounded-xl">
                            <p className="text-slate-500">No media found in your library.</p>
                            <p className="text-xs text-slate-400 mt-1">Upload images in the "Site Images" section first.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {uniqueMedia.map((media) => (
                                <div
                                    key={media.id}
                                    className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer hover:opacity-90 transition-all ${currentImage === media.url ? 'ring-2 ring-amber-500 ring-offset-2' : 'border-slate-200'
                                        }`}
                                    onClick={() => handleSelect(media.url)}
                                >
                                    {media.type === 'video' ? (
                                        <video src={media.url} className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={media.url} loading="lazy" className="w-full h-full object-cover" alt="" />
                                    )}

                                    {currentImage === media.url && (
                                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                                            <div className="bg-amber-500 text-white rounded-full p-1">
                                                <Check className="h-4 w-4" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
