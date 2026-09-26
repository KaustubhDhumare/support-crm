const DashboardStats = ({
    totalTickets,
    openTickets,
    inProgressTickets,
    closedTickets,
}) => {
    const stats = [
        {
            label: "Total Tickets",
            value: totalTickets,
            badge: "All tickets",
        },
        {
            label: "Open Tickets",
            value: openTickets,
            badge: "Needs attention",
        },
        {
            label: "In Progress",
            value: inProgressTickets,
            badge: "Being handled",
        },
        {
            label: "Closed",
            value: closedTickets,
            badge: "Resolved",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-sm text-slate-500">
                            {stat.label}
                        </p>

                        <span className="rounded-full bg-teal-50 px-2 py-1 text-[11px] font-medium text-teal-700">
                            {stat.badge}
                        </span>
                    </div>

                    <p className="mt-5 text-3xl font-semibold tracking-tight text-slate-900">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;