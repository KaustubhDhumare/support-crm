import {
    Headphones,
    LayoutDashboard,
    PlusCircle,
    Ticket,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const navigation = [
        {
            label: "Dashboard",
            path: "/",
            icon: LayoutDashboard,
        },
        {
            label: "Tickets",
            path: "/tickets",
            icon: Ticket,
        },
        {
            label: "Create Ticket",
            path: "/tickets/new",
            icon: PlusCircle,
        },
    ];

    return (
        <aside className="hidden min-h-screen w-[264px] shrink-0 bg-[#0b1b30] text-white lg:flex lg:flex-col">
            {/* Logo */}
            <div className="flex h-[88px] items-center gap-3 border-b border-white/10 px-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600">
                    <Headphones size={22} />
                </div>

                <div>
                    <h1 className="text-base font-semibold">
                        SupportHub
                    </h1>

                    <p className="text-xs text-slate-400">
                        Support CRM
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-3 py-6">
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Workspace
                </p>

                <div className="space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-[#19345d] text-white"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`
                                }
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={1.8}
                                />

                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </div>

            {/* Simple footer */}
            <div className="border-t border-white/10 px-5 py-5">
                <p className="text-xs leading-5 text-slate-500">
                    Support ticket management system
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;