export const DashboardStats = ({ tickets }) => {
  const total = tickets.length;
  const open = tickets.filter((ticket) => ticket.status === "Open").length;

  const inProgress = tickets.filter(
    (ticket) => ticket.status === "In Progress",
  ).length;

  const closed = tickets.filter((ticket) => ticket.status === "Closed").length;

  const stats = [
    {
      label: "Total Tickets",
      value: total,
    },
    {
      label: "Open",
      value: open,
    },
    {
      label: "In Progress",
      value: inProgress,
    },
    {
      label: "Closed",
      value: closed,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">{stat.label}</p>

          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
