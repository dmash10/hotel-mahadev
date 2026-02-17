import { useState } from "react";
import { useRooms, Room } from "@/hooks/useRooms";
import { Copy, Edit, Loader2, Save, X, Check, Users, IndianRupee, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { MediaPicker } from "@/components/admin/MediaPicker";

const RoomEditor = () => {
    const { rooms, loading, updateRoom, createRoom } = useRooms();
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRoom) return;

        const result = await updateRoom(editingRoom.id, editingRoom);

        if (result.success) {
            toast.success("Room updated successfully");
            setIsDialogOpen(false);
        } else {
            toast.error("Failed to update room");
        }
    };

    const toggleAvailability = async (id: string, current: boolean) => {
        const result = await updateRoom(id, { is_available: !current });
        if (result.success) {
            toast.success(current ? "Marked as Full" : "Marked as Available");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Room Management</h1>
                    <p className="text-slate-500">Manage room details, pricing, and availability</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                </div>
            ) : rooms.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">No rooms found. (Seed data script needed)</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {rooms.map((room) => (
                        <div key={room.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{room.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                            <Users className="h-4 w-4" />
                                            <span>Max Guests: {room.max_guests}</span>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${room.is_available
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}>
                                        {room.is_available ? "AVAILABLE" : "SOLD OUT"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-3 bg-slate-50 rounded-lg">
                                        <span className="text-xs text-slate-500 uppercase tracking-wider">Selling Price</span>
                                        <div className="flex items-center text-lg font-bold text-slate-900">
                                            <IndianRupee className="h-4 w-4 mr-1" />
                                            {room.real_price}
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg opacity-60">
                                        <span className="text-xs text-slate-500 uppercase tracking-wider">Original Price</span>
                                        <div className="flex items-center text-lg font-bold text-slate-900 line-through decoration-red-500">
                                            <IndianRupee className="h-4 w-4 mr-1" />
                                            {room.fake_price}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => toggleAvailability(room.id, room.is_available)}
                                    >
                                        {room.is_available ? "Mark Full" : "Mark Available"}
                                    </Button>

                                    <Dialog open={isDialogOpen && editingRoom?.id === room.id} onOpenChange={(open) => {
                                        setIsDialogOpen(open);
                                        if (open) setEditingRoom(room);
                                        else setEditingRoom(null);
                                    }}>
                                        <DialogTrigger asChild>
                                            <Button className="flex-1 bg-slate-900 text-white hover:bg-slate-800">
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit Details
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-xl">
                                            <DialogHeader>
                                                <DialogTitle>Edit Room: {room.name}</DialogTitle>
                                            </DialogHeader>

                                            {editingRoom && (
                                                <form onSubmit={handleSave} className="space-y-4 py-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Room Name</Label>
                                                            <Input
                                                                value={editingRoom.name}
                                                                onChange={e => setEditingRoom({ ...editingRoom, name: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Max Guests</Label>
                                                            <Input
                                                                type="number"
                                                                value={editingRoom.max_guests}
                                                                onChange={e => setEditingRoom({ ...editingRoom, max_guests: parseInt(e.target.value) })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Card Display Image</Label>
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex items-start gap-4">
                                                                <div className="relative w-32 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                                                                    {editingRoom.card_image_url ? (
                                                                        <img
                                                                            src={editingRoom.card_image_url}
                                                                            alt="Card Preview"
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                                                                            <ImageIcon className="h-8 w-8 opacity-40" />
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="flex-1 space-y-2">
                                                                    <div className="flex gap-2">
                                                                        <Input
                                                                            placeholder="Image URL..."
                                                                            value={editingRoom.card_image_url || ''}
                                                                            onChange={e => setEditingRoom({ ...editingRoom, card_image_url: e.target.value })}
                                                                            className="flex-1"
                                                                        />
                                                                        <MediaPicker
                                                                            onSelect={(url) => setEditingRoom({ ...editingRoom, card_image_url: url })}
                                                                            currentImage={editingRoom.card_image_url}
                                                                            trigger={
                                                                                <Button type="button" variant="secondary">
                                                                                    Library
                                                                                </Button>
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <p className="text-xs text-slate-500">
                                                                        This image is specifically used for the room card on the home page and rooms list.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Selling Price (₹)</Label>
                                                            <Input
                                                                type="number"
                                                                value={editingRoom.real_price || 0}
                                                                onChange={e => setEditingRoom({ ...editingRoom, real_price: parseInt(e.target.value) })}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Fake Price (₹)</Label>
                                                            <Input
                                                                type="number"
                                                                value={editingRoom.fake_price || 0}
                                                                onChange={e => setEditingRoom({ ...editingRoom, fake_price: parseInt(e.target.value) })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Description</Label>
                                                        <Textarea
                                                            value={editingRoom.description || ""}
                                                            onChange={e => setEditingRoom({ ...editingRoom, description: e.target.value })}
                                                            rows={3}
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                                        <div className="space-y-0.5">
                                                            <Label>Availability Status</Label>
                                                            <p className="text-sm text-slate-500">Toggle if room is bookable</p>
                                                        </div>
                                                        <Switch
                                                            checked={editingRoom.is_available}
                                                            onCheckedChange={checked => setEditingRoom({ ...editingRoom, is_available: checked })}
                                                        />
                                                    </div>

                                                    <div className="flex justify-end gap-3 pt-4">
                                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                                        <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white">Save Changes</Button>
                                                    </div>
                                                </form>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RoomEditor;
