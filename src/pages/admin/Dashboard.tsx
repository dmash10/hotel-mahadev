import { Link } from "react-router-dom";
import { useImageZones } from "@/hooks/useImageZones";
import { useRooms } from "@/hooks/useRooms";
import { useMenu } from "@/hooks/useMenu";
import {
    LayoutDashboard,
    Image as ImageIcon,
    BedDouble,
    UtensilsCrossed,
    FileText,
    Settings,
    ArrowRight,
    TrendingUp,
    Users,
    Eye
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const StatCard = ({ title, value, subtext, icon: Icon, color, link }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color}`}>
            <Icon className="w-24 h-24" />
        </div>
        <div className="relative z-10">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-10 text-[${color.replace("text-", "")}]`}>
                <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
            </div>
            <p className="text-slate-500 font-medium text-sm mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{value}</h3>
            {subtext && <p className="text-xs text-slate-400">{subtext}</p>}

            {link && (
                <Link to={link} className="inline-flex items-center text-sm font-medium text-slate-600 mt-4 hover:text-amber-600 transition-colors">
                    Manage <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            )}
        </div>
    </div>
);

const QuickAction = ({ icon: Icon, label, desc, to, color }: any) => (
    <Link to={to} className="flex items-center p-4 bg-white rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all group shadow-sm">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${color} bg-opacity-10 group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h4 className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">{label}</h4>
            <p className="text-sm text-slate-500">{desc}</p>
        </div>
        <ArrowRight className="w-5 h-5 ml-auto text-slate-300 group-hover:text-amber-500 transition-colors opacity-0 group-hover:opacity-100" />
    </Link>
);

const Dashboard = () => {
    const { user } = useAuth();
    const { zones } = useImageZones();
    const { rooms } = useRooms();
    const { menuItems } = useMenu();

    // Calculate stats
    // Count all media across all zones
    const totalImages = zones.reduce((acc, zone) => acc + (zone.zone_media?.length || 0), 0);
    // Approximation for 'gallery' if needed, or just total
    const galleryImages = totalImages;

    const availableRooms = rooms.filter(r => r.is_available).length;
    const totalRooms = rooms.length;

    const activeMenuItems = menuItems.filter(i => i.is_visible).length;
    const totalMenuItems = menuItems.length;

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-xl p-8 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-purple-600/20 z-0"></div>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2 font-sans">Welcome Back, Admin</h1>
                    <p className="text-slate-300 max-w-xl">
                        Here's what's happening on your hotel website today. You can manage everything from here.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-6">
                        <Link to="/" target="_blank" className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium">
                            <Eye className="w-4 h-4 mr-2" /> View Live Site
                        </Link>
                        <Link to="/cms-panel/settings" className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-amber-500/20">
                            <Settings className="w-4 h-4 mr-2" /> Site Settings
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Guests Rooms"
                    value={`${availableRooms} / ${totalRooms}`}
                    subtext="Available to Book"
                    icon={BedDouble}
                    color="text-emerald-600 bg-emerald-600"
                    link="/cms-panel/rooms"
                />
                <StatCard
                    title="Menu Items"
                    value={`${activeMenuItems} / ${totalMenuItems}`}
                    subtext="Active on Menu"
                    icon={UtensilsCrossed}
                    color="text-amber-600 bg-amber-600"
                    link="/cms-panel/restaurant"
                />
                <StatCard
                    title="Gallery Media"
                    value={totalImages}
                    subtext={`${galleryImages} in Main Gallery`}
                    icon={ImageIcon}
                    color="text-blue-600 bg-blue-600"
                    link="/cms-panel/zones"
                />
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickAction
                        icon={ImageIcon}
                        label="Upload Photos"
                        desc="Add new images to gallery"
                        to="/cms-panel/zones"
                        color="text-blue-500 bg-blue-500"
                    />
                    <QuickAction
                        icon={BedDouble}
                        label="Update Room Rates"
                        desc="Change room prices daily"
                        to="/cms-panel/rooms"
                        color="text-emerald-500 bg-emerald-500"
                    />
                    <QuickAction
                        icon={FileText}
                        label="Edit Announcement"
                        desc="Update top bar text"
                        to="/cms-panel/content"
                        color="text-purple-500 bg-purple-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
