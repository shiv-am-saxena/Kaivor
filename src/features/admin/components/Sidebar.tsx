import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    ChevronDown,
    Menu,
    X,
    UserPlus,
    UserCheck,
    PlusCircle,
    ListFilter,
    Home,
    LogOut,
    User,
    Tag,
    Tags,
    Banknote,
    Layout
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../context/hooks';
import useAuth from '../../auth/hook/useAuth';

interface SubLink {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

interface NavItem {
    label: string;
    href?: string;
    icon: React.ReactNode;
    links?: SubLink[];
}

const navItems: NavItem[] = [
    {
        label: "Home",
        href: "/",
        icon: <Home className="w-5 h-5" />
    },
    {
        label: "Dashboard",
        href: "/admin",
        icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
        label: "Users",
        icon: <Users className="w-5 h-5" />,
        links: [
            { label: "All Users", href: "/admin/users", icon: <Users className="w-4 h-4" /> },
            { label: "Add User", href: "/admin/users/add", icon: <UserPlus className="w-4 h-4" /> },
            { label: "Update User Roles", href: "/admin/users/roles", icon: <UserCheck className="w-4 h-4" /> }
        ]
    },
    {
        label: "Products",
        icon: <Package className="w-5 h-5" />,
        links: [
            { label: "All Products", href: "/admin/products", icon: <ListFilter className="w-4 h-4" /> },
            { label: "Add Product", href: "/admin/products/add", icon: <PlusCircle className="w-4 h-4" /> }
        ]
    },
    {
        label: "Orders",
        icon: <ShoppingCart className="w-5 h-5" />,
        links: [
            { label: "All Orders", href: "/admin/orders", icon: <ListFilter className="w-4 h-4" /> },
            { label: "Add Order", href: "/admin/orders/add", icon: <PlusCircle className="w-4 h-4" /> }
        ]
    },
    {
        label: "Coupons",
        icon: <Tags className="w-5 h-5" />,
        links: [
            { label: "All Coupons", href: "/admin/coupons", icon: <Tag className="w-4 h-4" /> },
            { label: "Add Coupon", href: "/admin/coupons/add", icon: <Tag className="w-4 h-4" /> },
            { label: "Update Coupon", href: "/admin/coupons/update", icon: <Tag className="w-4 h-4" /> },
            { label: "Custom Coupon", href: "/admin/coupons/custom", icon: <Tag className="w-4 h-4" /> }
        ]
    },
    {
        label: "Offers",
        icon: <Banknote className="w-5 h-5" />,
        links: [
            { label: "All Offers", href: "/admin/offers", icon: <Banknote className="w-4 h-4" /> },
            { label: "Add Offer", href: "/admin/offers/add", icon: <Banknote className="w-4 h-4" /> }
        ]
    },
    {
        label: "UI Layout",
        href: "/admin/ui/home",
        icon: <Layout className="w-5 h-5" />,
    },
    {
        label: "Profile",
        href: "/admin/profile",
        icon: <User className="w-5 h-5" />
    }
];

const SidebarContent = () => {
    const user = useAppSelector((state) => state.auth.user);
    const { handleLogout } = useAuth();
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        Users: false,
        Products: false,
        Orders: false
    });

    const toggleGroup = (label: string) => {
        setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-800">
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-lg shadow-sm">
                    K
                </div>
                <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
                    Kaivor Admin
                </span>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-none">
                {navItems.map((item) => {
                    const hasSubLinks = Boolean(item.links && item.links.length > 0);
                    const isOpen = openGroups[item.label];

                    return (
                        <div key={item.label} className="w-full">
                            {hasSubLinks ? (
                                <button
                                    onClick={() => toggleGroup(item.label)}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                    >
                                        <ChevronDown className="w-4 h-4 opacity-60" />
                                    </motion.div>
                                </button>
                            ) : (
                                <NavLink
                                    to={item.href || '#'}
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                                        }`
                                    }
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            )}

                            {/* Submenu Accordion */}
                            {hasSubLinks && (
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            className="overflow-hidden pl-7 space-y-1 mt-1"
                                        >
                                            {item.links?.map((subItem, idx) => (
                                                <NavLink
                                                    key={idx}
                                                    to={subItem.href}
                                                    end
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                                            ? 'bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 font-semibold'
                                                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/60'
                                                        }`
                                                    }
                                                >
                                                    {subItem.icon}
                                                    <span>{subItem.label}</span>
                                                </NavLink>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Profile & Logout Section */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-3 px-2 py-1">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                        <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                            {user?.fullName || "Admin User"}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {user?.email || "admin@kaivor.com"}
                        </span>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

const Sidebar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-md focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Overlay & Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-40 w-64 lg:hidden shadow-xl"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Fixed/Static Sidebar */}
            <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0">
                <SidebarContent />
            </aside>
        </>
    );
};

export default Sidebar;