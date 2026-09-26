import StatusBadge from "./StatusBadge";

const TicketTable = ({ tickets }) => {
    if (tickets.length === 0) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                <p className="text-gray-500">
                    No tickets found.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Ticket ID
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Customer
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Subject
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                Created
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <tr
                                key={ticket._id}
                                className="hover:bg-gray-50"
                            >
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                    {ticket.ticketId}
                                </td>

                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-gray-900">
                                        {ticket.customerName}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {ticket.customerEmail}
                                    </p>
                                </td>

                                <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-700">
                                    {ticket.subject}
                                </td>

                                <td className="whitespace-nowrap px-6 py-4">
                                    <StatusBadge
                                        status={ticket.status}
                                    />
                                </td>

                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                    {new Date(
                                        ticket.createdAt
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketTable;