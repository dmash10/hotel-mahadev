import { useState } from "react";
import { useMenu, MenuItem } from "@/hooks/useMenu";
import { Plus, Trash2, Edit2, Loader2, Save, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

const MenuEditor = () => {
    const { menuItems, loading, addItem, updateItem, deleteItem } = useMenu();
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        category: "Main Course",
        description: "",
        price: ""
    });

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await addItem({
            category: newItem.category,
            name: newItem.name,
            description: newItem.description,
            price: newItem.price ? parseInt(newItem.price) : null,
            is_visible: true,
            display_order: menuItems.length + 1
        } as any);

        if (result.success) {
            toast.success("Item added to menu");
            setIsAddOpen(false);
            setNewItem({ name: "", category: "Main Course", description: "", price: "" });
        } else {
            toast.error("Failed to add item");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this item?")) {
            const result = await deleteItem(id);
            if (result.success) toast.success("Item removed");
        }
    };

    const categories = ["Breakfast", "Main Course", "Snacks", "Beverages"];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Restaurant Menu</h1>
                    <p className="text-slate-500">Update food items and prices</p>
                </div>

                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-amber-500 hover:bg-amber-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Menu Item</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select
                                    value={newItem.category}
                                    onValueChange={(val) => setNewItem({ ...newItem, category: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Item Name</Label>
                                <Input
                                    required
                                    value={newItem.name}
                                    onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                    placeholder="e.g. Aloo Paratha"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Price (Optional)</Label>
                                <Input
                                    type="number"
                                    value={newItem.price}
                                    onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                                    placeholder="e.g. 150"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600">Add Item</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                </div>
            ) : (
                <div className="space-y-8">
                    {categories.map(category => {
                        const items = menuItems.filter(i => i.category === category);
                        if (items.length === 0) return null;

                        return (
                            <div key={category} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-900">{category}</h3>
                                    <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                                        {items.length} items
                                    </span>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {items.map(item => (
                                        <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-slate-900">{item.name}</span>
                                                    {!item.is_visible && (
                                                        <span className="text-[10px] uppercase bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">Hidden</span>
                                                    )}
                                                </div>
                                                {item.price && (
                                                    <p className="text-sm text-slate-500">₹{item.price}</p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => updateItem(item.id, { is_visible: !item.is_visible })}
                                                    className={item.is_visible ? "text-green-600" : "text-slate-400"}
                                                    title="Toggle Visibility"
                                                >
                                                    {item.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                    {menuItems.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                            <p className="text-slate-500">No menu items yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuEditor;
