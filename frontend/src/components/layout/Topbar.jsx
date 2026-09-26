import {
    Menu,
    Search,
} from "lucide-react";

const Topbar = ({ title, subtitle }) => {
    return (
        <header className="flex min-h-[88px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
            <div className="flex items-center gap-4">
                <button className="lg:hidden">
                    <Menu size={22} />
                </button>

                <div>
                    <p className="hidden text-xs text-slate-400 sm:block">
                        Home / {title}
                    </p>

                    <h2 className="text-xl font-semibold text-slate-900">
                        {subtitle || title}
                    </h2>
                </div>
            </div>

            {/* Desktop global search */}
            {/* <div className="hidden w-[380px] lg:block">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
                    <Search
                        size={18}
                        className="text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search tickets..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                </div>
            </div> */}
        </header>
    );
};

export default Topbar;