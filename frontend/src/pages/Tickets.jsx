import { useEffect, useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getTickets } from "../services/ticketService.js";

const STATUS_OPTIONS = [
    {
        label: "All",
        value: "",
    },
    {
        label: "Open",
        value: "Open",
    },
    {
        label: "In Progress",
        value: "In Progress",
    },
    {
        label: "Closed",
        value: "Closed",
    },
];

const statusStyles = {
    Open: "bg-orange-50 text-orange-700",
    "In Progress": "bg-teal-50 text-teal-700",
    Closed: "bg-slate-100 text-slate-600",
};

const Tickets = () => {
    const [tickets, setTickets] = useState([]);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        limit: 8,
        totalTickets: 0,
        totalPages: 1,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch tickets whenever search, status or page changes
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                setError("");

                const params = {
                    page,
                    limit: 8,
                };

                if (search.trim()) {
                    params.search = search.trim();
                }

                if (status) {
                    params.status = status;
                }

                const response = await getTickets(params);

                setTickets(response.data.tickets);

                setPagination(response.data.pagination);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load tickets."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [search, status, page]);

    // Search
    const handleSearch = (event) => {
        setSearch(event.target.value);
        setPage(1);
    };

    // Status filter
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setPage(1);
    };

    // Previous page
    const handlePrevious = () => {
        if (page > 1) {
            setPage((currentPage) => currentPage - 1);
        }
    };

    // Next page
    const handleNext = () => {
        if (page < pagination.totalPages) {
            setPage((currentPage) => currentPage + 1);
        }
    };

    return (
        <main className="min-h-[calc(100vh-88px)] bg-[#f5f7f9] p-5 sm:p-8">
            <div className="mx-auto max-w-[1200px]">

                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            Tickets
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            {pagination.totalTickets} tickets in queue
                        </p>
                    </div>

                    <Link
                        to="/tickets/new"
                        className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                    >
                        + Create Ticket
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-5">
                    <div className="relative">
                        <Search
                            size={19}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search tickets by customer, ticket ID, email, or description..."
                            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                </div>

                {/* Status filters */}
                <div className="mb-5 flex gap-2 overflow-x-auto">
                    {STATUS_OPTIONS.map((option) => {
                        const isActive = status === option.value;

                        return (
                            <button
                                key={option.label}
                                type="button"
                                onClick={() =>
                                    handleStatusChange(option.value)
                                }
                                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                                    isActive
                                        ? "border-[#0b1b30] bg-[#0b1b30] text-white"
                                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                }`}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="rounded-md bg-red-700 px-3 py-1.5 text-xs font-medium text-white"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Desktop table */}
                <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white md:block">

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50/70 text-left">
                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Ticket ID
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Subject
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Customer
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Updated
                                    </th>

                                    <th className="w-12" />
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <TicketTableSkeleton />
                                ) : tickets.length === 0 ? (
                                    <EmptyState />
                                ) : (
                                    tickets.map((ticket) => (
                                        <TicketRow
                                            key={ticket.ticketId}
                                            ticket={ticket}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {!loading && tickets.length > 0 && (
                        <Pagination
                            pagination={pagination}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                        />
                    )}
                </div>

                {/* Mobile cards */}
                <div className="space-y-3 md:hidden">
                    {loading ? (
                        <MobileSkeleton />
                    ) : tickets.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                            <p className="font-medium text-slate-700">
                                No tickets found
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your search or status filter.
                            </p>
                        </div>
                    ) : (
                        tickets.map((ticket) => (
                            <MobileTicketCard
                                key={ticket.ticketId}
                                ticket={ticket}
                            />
                        ))
                    )}

                    {!loading && tickets.length > 0 && (
                        <Pagination
                            pagination={pagination}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};


/* ----------------------------- */
/* Ticket table row               */
/* ----------------------------- */

const TicketRow = ({ ticket }) => {
    return (
        <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
            <td className="px-5 py-4">
                <Link
                    to={`/tickets/${ticket.ticketId}`}
                    className="font-medium text-teal-700 hover:underline"
                >
                    {ticket.ticketId}
                </Link>
            </td>

            <td className="max-w-[360px] px-5 py-4">
                <Link to={`/tickets/${ticket.ticketId}`}>
                    <p className="truncate font-medium text-slate-800">
                        {ticket.subject}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        {formatDate(ticket.createdAt)}
                    </p>
                </Link>
            </td>

            <td className="px-5 py-4">
                <div>
                    <p className="text-sm font-medium text-slate-800">
                        {ticket.customerName}
                    </p>

                    <p className="text-xs text-slate-400">
                        {ticket.customerEmail}
                    </p>
                </div>
            </td>

            <td className="px-5 py-4">
                <StatusBadge status={ticket.status} />
            </td>

            <td className="px-5 py-4 text-sm text-slate-500">
                {formatDate(ticket.updatedAt)}
            </td>

            <td className="px-5 py-4 text-right">
                <Link
                    to={`/tickets/${ticket.ticketId}`}
                    className="text-lg text-slate-400 hover:text-teal-700"
                >
                    →
                </Link>
            </td>
        </tr>
    );
};


/* ----------------------------- */
/* Mobile ticket card             */
/* ----------------------------- */

const MobileTicketCard = ({ ticket }) => {
    return (
        <Link
            to={`/tickets/${ticket.ticketId}`}
            className="block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-teal-600"
        >
            <div className="flex items-start justify-between gap-3">
                <span className="font-medium text-teal-700">
                    {ticket.ticketId}
                </span>

                <StatusBadge status={ticket.status} />
            </div>

            <h3 className="mt-5 text-lg font-semibold leading-6 text-slate-900">
                {ticket.subject}
            </h3>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700">
                    {ticket.customerName
                        .charAt(0)
                        .toUpperCase()}
                </span>

                <span>
                    {ticket.customerName}
                </span>

                <span>·</span>

                <span>
                    {formatDate(ticket.updatedAt)}
                </span>
            </div>
        </Link>
    );
};


/* ----------------------------- */
/* Status badge                   */
/* ----------------------------- */

const StatusBadge = ({ status }) => {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                statusStyles[status] ||
                "bg-slate-100 text-slate-600"
            }`}
        >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />

            {status}
        </span>
    );
};


/* ----------------------------- */
/* Pagination                     */
/* ----------------------------- */

const Pagination = ({
    pagination,
    onPrevious,
    onNext,
}) => {
    return (
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-slate-500">
                Page {pagination.currentPage} of{" "}
                {pagination.totalPages}
            </span>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={onPrevious}
                    disabled={pagination.currentPage <= 1}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={16} />

                    Previous
                </button>

                <button
                    type="button"
                    onClick={onNext}
                    disabled={
                        pagination.currentPage >=
                        pagination.totalPages
                    }
                    className="flex items-center gap-1 rounded-lg bg-[#0b1b30] px-3 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Next

                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};


/* ----------------------------- */
/* Empty state                    */
/* ----------------------------- */

const EmptyState = () => {
    return (
        <tr>
            <td
                colSpan="6"
                className="px-5 py-16 text-center"
            >
                <p className="font-medium text-slate-700">
                    No tickets found
                </p>

                <p className="mt-1 text-sm text-slate-400">
                    Try changing your search or status filter.
                </p>
            </td>
        </tr>
    );
};


/* ----------------------------- */
/* Loading skeletons              */
/* ----------------------------- */

const TicketTableSkeleton = () => {
    return (
        <>
            {[1, 2, 3, 4, 5].map((item) => (
                <tr
                    key={item}
                    className="border-b border-slate-100"
                >
                    {[1, 2, 3, 4, 5, 6].map(
                        (cell) => (
                            <td
                                key={cell}
                                className="px-5 py-5"
                            >
                                <div className="h-4 animate-pulse rounded bg-slate-100" />
                            </td>
                        )
                    )}
                </tr>
            ))}
        </>
    );
};


const MobileSkeleton = () => {
    return (
        <>
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="h-36 animate-pulse rounded-xl bg-white"
                />
            ))}
        </>
    );
};


/* ----------------------------- */
/* Date formatter                 */
/* ----------------------------- */

const formatDate = (date) => {
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );
};

export default Tickets;