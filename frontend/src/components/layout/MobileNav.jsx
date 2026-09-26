import {
    Grid2X2,
    PlusCircle,
    Ticket,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const MobileNav = () => {
    const items = [
        {
            label: "Home",
            path: "/",
            icon: Grid2X2,
        },
        {
            label: "Tickets",
            path: "/tickets",
            icon: Ticket,
        },
        {
            label: "New",
            path: "/tickets/new",
            icon: PlusCircle,
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-[72px] items-center justify-around border-t border-slate-200 bg-white lg:hidden">
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 text-xs ${
                                isActive
                                    ? "text-teal-700"
                                    : "text-slate-500"
                            }`
                        }
                    >
                        <Icon size={22} />

                        <span>{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default MobileNav;