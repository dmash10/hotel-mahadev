import { useRef, useState, useMemo } from "react";
import { useImageZones, ImageZone, ZoneMedia } from "@/hooks/useImageZones";
import {
    Upload, Trash2, Plus, ImageIcon, Loader2, Video, Eye, EyeOff,
    LayoutGrid, GripVertical, ZoomIn, Info, CheckCircle2, AlertCircle,
    Home, BedDouble, Images, UtensilsCrossed, MapPin, Mountain, Sparkles, Phone, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Page order configuration with icons
const PAGE_CONFIG: Record<string, { order: number; icon: React.ElementType; color: string }> = {
    'Home': { order: 1, icon: Home, color: 'text-amber-600' },
    'Rooms': { order: 2, icon: BedDouble, color: 'text-blue-600' },
    'Gallery': { order: 3, icon: Images, color: 'text-purple-600' },
    'Restaurant': { order: 4, icon: UtensilsCrossed, color: 'text-orange-600' },
    'Location': { order: 5, icon: MapPin, color: 'text-green-600' },
    'Attractions': { order: 6, icon: Mountain, color: 'text-teal-600' },
    'Amenities': { order: 7, icon: Sparkles, color: 'text-pink-600' },
    'Contact': { order: 8, icon: Phone, color: 'text-slate-600' },
    'Other': { order: 99, icon: LayoutGrid, color: 'text-slate-400' },
};

// Aspect ratio recommendations
const getAspectRatioInfo = (zoneKey: string) => {
    if (zoneKey.includes('hero')) return { ratio: '16:9', hint: 'Wide landscape, min 1920×1080px', badge: 'Hero Banner' };
    if (zoneKey.includes('gallery_strip') || zoneKey.includes('gallery_grid')) return { ratio: 'Mixed', hint: 'Any aspect ratio works', badge: 'Gallery' };
    if (zoneKey.includes('room_') && zoneKey.includes('gallery')) return { ratio: '4:3', hint: 'Landscape preferred, min 1200×900px', badge: 'Room Gallery' };
    if (zoneKey.includes('background') || zoneKey.includes('cta')) return { ratio: '16:9', hint: 'Wide landscape for backgrounds', badge: 'Background' };
    return { ratio: '16:9', hint: 'Landscape recommended', badge: 'Standard' };
};

const ImageZonesEditor = () => {
    const { zones, loading, uploading, addMedia, removeMedia, toggleZone, setPrimaryMedia, refresh } = useImageZones();
    const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
    const [uploadType, setUploadType] = useState<'image' | 'video'>('image');
    const [previewMedia, setPreviewMedia] = useState<ZoneMedia | null>(null);
    const [dragOver, setDragOver] = useState<string | null>(null);

    // File inputs refs
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    // Group zones by page with proper ordering
    const groupedZones = useMemo(() => {
        const groups: Record<string, ImageZone[]> = {};
        zones.forEach(zone => {
            const page = zone.page || 'Other';
            if (!groups[page]) groups[page] = [];
            groups[page].push(zone);
        });
        // Sort zones within each page by order_index (matching website section order)
        Object.keys(groups).forEach(page => {
            groups[page].sort((a, b) => (a.order_index || 50) - (b.order_index || 50));
        });
        return groups;
    }, [zones]);

    // Pages sorted by configured order
    const pages = Object.keys(groupedZones).sort((a, b) => {
        const orderA = PAGE_CONFIG[a]?.order ?? 50;
        const orderB = PAGE_CONFIG[b]?.order ?? 50;
        return orderA - orderB;
    });

    const handleUploadClick = (zoneId: string, type: 'image' | 'video') => {
        setActiveZoneId(zoneId);
        setUploadType(type);
        if (type === 'image' && imageInputRef.current) {
            imageInputRef.current.value = "";
            imageInputRef.current.click();
        } else if (type === 'video' && videoInputRef.current) {
            videoInputRef.current.value = "";
            videoInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !activeZoneId) return;

        // Size check: Images 10MB, Videos 50MB
        const limit = uploadType === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
        if (file.size > limit) {
            toast.error(`File too large. Max ${uploadType === 'image' ? '10MB' : '50MB'}.`);
            return;
        }

        await addMedia(activeZoneId, file, uploadType);
        setActiveZoneId(null);
    };

    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent, zoneId: string) => {
        e.preventDefault();
        setDragOver(zoneId);
    };

    const handleDragLeave = () => {
        setDragOver(null);
    };

    const handleDrop = async (e: React.DragEvent, zoneId: string) => {
        e.preventDefault();
        setDragOver(null);

        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        const file = files[0];
        const isVideo = file.type.startsWith('video/');
        const type = isVideo ? 'video' : 'image';

        // Size check
        const limit = type === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024;
        if (file.size > limit) {
            toast.error(`File too large. Max ${type === 'image' ? '10MB' : '50MB'}.`);
            return;
        }

        await addMedia(zoneId, file, type);
    };

    const handleDelete = async (media: ZoneMedia) => {
        if (confirm("Are you sure you want to delete this item?")) {
            await removeMedia(media.id, media.url);
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center flex-col gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                <p className="text-slate-500">Loading media zones...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-heading">
                        Site Media Manager
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Upload and manage images & videos for all sections of your website.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="gap-2 py-1.5 px-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {zones.filter(z => z.zone_media.length > 0).length} / {zones.length} sections have media
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => refresh()} className="gap-2">
                        <LayoutGrid className="w-4 h-4" />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Quick Tips for Best Results</p>
                    <ul className="list-disc list-inside space-y-0.5 text-amber-700">
                        <li>Use high-quality images (min 1920×1080 for banners)</li>
                        <li>Landscape (16:9) works best for hero sections</li>
                        <li>Images are automatically optimized to WebP format</li>
                        <li>Drag and drop files directly onto any zone</li>
                    </ul>
                </div>
            </div>

            {/* Hidden Inputs */}
            <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
            <input
                type="file"
                ref={videoInputRef}
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
            />

            {/* Page Tabs */}
            <Tabs defaultValue={pages[0]} className="w-full">
                <TabsList className="mb-6 h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
                    {pages.map(page => {
                        const config = PAGE_CONFIG[page] || PAGE_CONFIG['Other'];
                        const PageIcon = config.icon;
                        const zoneCount = groupedZones[page]?.length || 0;
                        const hasMedia = groupedZones[page]?.some(z => z.zone_media.length > 0);

                        return (
                            <TabsTrigger
                                key={page}
                                value={page}
                                className="bg-white border border-slate-200 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:border-slate-900 px-4 py-2.5 gap-2 rounded-lg transition-all"
                            >
                                <PageIcon className={`w-4 h-4 ${config.color} data-[state=active]:text-white`} />
                                {page}
                                <Badge
                                    variant="secondary"
                                    className={`ml-1 h-5 px-1.5 text-xs ${hasMedia ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                                >
                                    {zoneCount}
                                </Badge>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                {pages.map(page => (
                    <TabsContent key={page} value={page} className="space-y-6 animate-in fade-in-50 duration-300">
                        {/* Page Header */}
                        <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                            {(() => {
                                const config = PAGE_CONFIG[page] || PAGE_CONFIG['Other'];
                                const PageIcon = config.icon;
                                return <PageIcon className={`w-6 h-6 ${config.color}`} />;
                            })()}
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">{page} Page</h2>
                                <p className="text-sm text-slate-500">{groupedZones[page]?.length || 0} image zones</p>
                            </div>
                        </div>

                        {/* Zone Cards */}
                        <div className="grid gap-6">
                            {groupedZones[page].map((zone) => {
                                const aspectInfo = getAspectRatioInfo(zone.zone_key);
                                const isDraggedOver = dragOver === zone.id;

                                return (
                                    <Card
                                        key={zone.id}
                                        className={`overflow-hidden border-slate-200 shadow-sm transition-all ${isDraggedOver ? 'ring-2 ring-amber-500 border-amber-500' : ''}`}
                                        onDragOver={(e) => handleDragOver(e, zone.id)}
                                        onDragLeave={handleDragLeave}
                                        onDrop={(e) => handleDrop(e, zone.id)}
                                    >
                                        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 py-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 flex-wrap">
                                                        <CardTitle className="text-lg font-heading">{zone.display_name}</CardTitle>
                                                        <Badge variant="outline" className="bg-white text-slate-600 font-normal border-slate-200">
                                                            {aspectInfo.badge}
                                                        </Badge>
                                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 font-normal border-blue-200">
                                                            {aspectInfo.ratio}
                                                        </Badge>
                                                    </div>
                                                    <CardDescription className="mt-1.5 flex items-center gap-2">
                                                        <span>{zone.description}</span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className="text-slate-400 text-xs">{aspectInfo.hint}</span>
                                                    </CardDescription>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <Badge
                                                        variant="secondary"
                                                        className={`${zone.zone_media.length > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}
                                                    >
                                                        {zone.zone_media.length} item{zone.zone_media.length !== 1 ? 's' : ''}
                                                    </Badge>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => toggleZone(zone.id, !!zone.is_enabled)}
                                                        className={`gap-2 ${!zone.is_enabled ? 'text-slate-400 border-dashed' : 'text-slate-700'}`}
                                                    >
                                                        {zone.is_enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                        {zone.is_enabled ? 'Visible' : 'Hidden'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            {/* Media Grid - Larger thumbnails */}
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                                                {zone.zone_media.map((media, mediaIndex) => (
                                                    <div
                                                        key={media.id}
                                                        className={`group relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all cursor-pointer ${mediaIndex === 0 ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-200'
                                                            }`}
                                                        onClick={() => setPreviewMedia(media)}
                                                    >
                                                        {media.type === 'video' ? (
                                                            <video src={media.url} className="w-full h-full object-cover" muted />
                                                        ) : (
                                                            <img src={media.url} alt="" className="w-full h-full object-cover" />
                                                        )}

                                                        {/* Primary Badge */}
                                                        {mediaIndex === 0 && (
                                                            <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 z-10">
                                                                <Star className="w-3 h-3 fill-current" />
                                                                Primary
                                                            </div>
                                                        )}

                                                        {/* Hover Actions */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                                            <div className="flex items-center justify-between gap-1">
                                                                {/* Set as Primary Button */}
                                                                {mediaIndex !== 0 && (
                                                                    <button
                                                                        className="p-2 bg-amber-500 rounded-lg hover:bg-amber-600 text-white transition-colors"
                                                                        onClick={(e) => { e.stopPropagation(); setPrimaryMedia(zone.id, media.id); }}
                                                                        title="Set as Primary"
                                                                    >
                                                                        <Star className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                                <button
                                                                    className="p-2 bg-white/90 rounded-lg hover:bg-white text-slate-900 transition-colors"
                                                                    onClick={(e) => { e.stopPropagation(); setPreviewMedia(media); }}
                                                                    title="View Full Size"
                                                                >
                                                                    <ZoomIn className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); handleDelete(media); }}
                                                                    className="p-2 bg-red-500 rounded-lg hover:bg-red-600 text-white transition-colors"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Video Badge */}
                                                        {media.type === 'video' && (
                                                            <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                                                                <Video className="w-3 h-3" />
                                                                Video
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                                {/* Upload Buttons */}
                                                <div className="flex flex-col gap-2 min-h-[120px]">
                                                    <button
                                                        className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${isDraggedOver
                                                            ? 'border-amber-500 bg-amber-50'
                                                            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                                                            } ${uploading && activeZoneId === zone.id ? 'opacity-50' : ''}`}
                                                        onClick={() => handleUploadClick(zone.id, 'image')}
                                                        disabled={uploading}
                                                    >
                                                        {uploading && activeZoneId === zone.id && uploadType === 'image' ? (
                                                            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                                                        ) : (
                                                            <>
                                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                                                    <ImageIcon className="w-5 h-5 text-slate-400" />
                                                                </div>
                                                                <span className="text-sm font-medium text-slate-600">Add Image</span>
                                                                <span className="text-xs text-slate-400">or drag & drop</span>
                                                            </>
                                                        )}
                                                    </button>

                                                    {/* Video Upload for Hero zones */}
                                                    {zone.zone_key.includes('hero') && (
                                                        <button
                                                            className="h-12 border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl flex items-center justify-center gap-2 transition-all"
                                                            onClick={() => handleUploadClick(zone.id, 'video')}
                                                            disabled={uploading}
                                                        >
                                                            {uploading && activeZoneId === zone.id && uploadType === 'video' ? (
                                                                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                                                            ) : (
                                                                <>
                                                                    <Video className="w-4 h-4 text-slate-400" />
                                                                    <span className="text-sm text-slate-600">Add Video</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Empty State */}
                                            {zone.zone_media.length === 0 && (
                                                <div className="mt-4 text-center py-8 text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                                                        <LayoutGrid className="w-8 h-8 text-slate-300" />
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-600">No media uploaded yet</p>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {zone.fallback_url
                                                            ? 'Using default fallback image'
                                                            : 'This section will use static placeholder images'
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Preview Dialog */}
            <Dialog open={!!previewMedia} onOpenChange={() => setPreviewMedia(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden">
                    <DialogHeader className="p-4 border-b bg-slate-50">
                        <DialogTitle>Media Preview</DialogTitle>
                        <DialogDescription>
                            {previewMedia?.type === 'video' ? 'Video file' : 'Image file'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-4 bg-slate-900 flex items-center justify-center min-h-[400px]">
                        {previewMedia?.type === 'video' ? (
                            <video
                                src={previewMedia.url}
                                controls
                                autoPlay
                                className="max-w-full max-h-[70vh] rounded-lg"
                            />
                        ) : previewMedia ? (
                            <img
                                src={previewMedia.url}
                                alt=""
                                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                            />
                        ) : null}
                    </div>
                    <div className="p-4 border-t bg-white flex justify-between items-center">
                        <a
                            href={previewMedia?.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Open in new tab
                        </a>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                                if (previewMedia) {
                                    handleDelete(previewMedia);
                                    setPreviewMedia(null);
                                }
                            }}
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ImageZonesEditor;
