const StatusBadge = ({ status }) => {
    const styles = {
        Open: "bg-orange-50 text-orange-700",
        "In Progress": "bg-teal-50 text-teal-700",
        Closed: "bg-slate-100 text-slate-600",
    };

    const dotStyles = {
        Open: "bg-orange-500",
        "In Progress": "bg-teal-500",
        Closed: "bg-slate-400",
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                styles[status] || "bg-slate-100 text-slate-600"
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    dotStyles[status] || "bg-slate-400"
                }`}
            />

            {status}
        </span>
    );
};

export default StatusBadge;