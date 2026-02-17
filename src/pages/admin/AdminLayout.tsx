import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Image, BedDouble, UtensilsCrossed, FileText, Settings, Menu, X, LogOut } from "lucide-react";
import logo from "@/assets/logo.svg";
import { useAuth } from "@/hooks/useAuth";

const AdminLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const navItems = [
        { label: "Dashboard", href: "/cms-panel", icon: LayoutDashboard, exact: true },
        { label: "Site Images", href: "/cms-panel/zones", icon: Image },
        { label: "Rooms", href: "/cms-panel/rooms", icon: BedDouble },
        { label: "Restaurant Menu", href: "/cms-panel/restaurant", icon: UtensilsCrossed },
        { label: "Site Content", href: "/cms-panel/content", icon: FileText },
        { label: "Settings", href: "/cms-panel/settings", icon: Settings },
    ];

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        await signOut();
        navigate("/cms-sign");
    };

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans [&_h4]:font-sans [&_h5]:font-sans [&_h6]:font-sans">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between p-4 h-16 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                        <span className="font-bold text-lg">CMS Panel</span>
                    </div>
                    <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-1 flex-1">
                    {navItems.map((item) => {
                        const isActive = item.exact
                            ? location.pathname === item.href
                            : location.pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                    ? "bg-amber-500 text-slate-900 font-medium"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white shadow-sm h-16 flex items-center px-4">
                    <button onClick={toggleSidebar} className="text-slate-600">
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="ml-4 font-semibold text-slate-900">Admin Panel</span>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;
