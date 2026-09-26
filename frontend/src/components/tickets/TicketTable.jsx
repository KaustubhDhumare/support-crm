import { ChevronRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

const TicketTable = ({ tickets }) => {
    if (tickets.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
                <p className="text-sm font-medium text-slate-700">
                    No tickets found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                    Try changing your search or filter.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Ticket ID
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Subject
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Customer
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Updated
                            </th>

                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.map((ticket) => (
                            <tr
                                key={ticket._id}
                                className="border-b border-slate-100 transition hover:bg-slate-50"
                            >
                                <td className="px-5 py-4">
                                    <span className="text-sm font-semibold text-teal-700">
                                        {ticket.ticketId}
                                    </span>
                                </td>

                                <td className="max-w-[380px] px-5 py-4">
                                    <p className="truncate text-sm font-semibold text-slate-800">
                                        {ticket.subject}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        {new Date(
                                            ticket.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700">
                                            {ticket.customerName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-slate-800">
                                                {ticket.customerName}
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                {ticket.customerEmail}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge
                                        status={ticket.status}
                                    />
                                </td>

                                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                                    {new Date(
                                        ticket.updatedAt ||
                                            ticket.createdAt
                                    ).toLocaleDateString()}
                                </td>

                                <td className="px-5 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-700">
                                        <ChevronRight size={19} />
                                    </button>
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