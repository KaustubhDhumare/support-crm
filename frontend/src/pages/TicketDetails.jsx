import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Mail,
    User,
    Clock,
    Edit3,
} from "lucide-react";

import { getTicketById } from "../services/ticketService.js";

const getStatusClass = (status) => {
    switch (status) {
        case "Open":
            return "bg-emerald-50 text-emerald-700";

        case "In Progress":
            return "bg-amber-50 text-amber-700";

        case "Closed":
            return "bg-slate-100 text-slate-600";

        default:
            return "bg-slate-100 text-slate-600";
    }
};

const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const TicketDetails = () => {
    const { ticketId } = useParams();

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getTicketById(ticketId);

                setTicket(response.data);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Unable to load ticket."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [ticketId]);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />

                <div className="rounded-xl border border-slate-200 bg-white p-6">
                    <div className="space-y-4">
                        <div className="h-7 w-2/3 animate-pulse rounded bg-slate-200" />
                        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                        <div className="h-24 animate-pulse rounded bg-slate-100" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <p className="text-sm font-medium text-red-700">
                    {error}
                </p>

                <Link
                    to="/tickets"
                    className="mt-4 inline-flex text-sm font-medium text-red-700 underline"
                >
                    Back to tickets
                </Link>
            </div>
        );
    }

    if (!ticket) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Link
                        to="/tickets"
                        className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft size={16} />
                        Back to tickets
                    </Link>

                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {ticket.subject}
                        </h1>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                                ticket.status
                            )}`}
                        >
                            {ticket.status}
                        </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-400">
                        {ticket.ticketId}
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                    <Edit3 size={16} />
                    Edit Ticket
                </button>
            </div>

            {/* Main grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Ticket information */}
                <div className="space-y-6 lg:col-span-2">
                    <section className="rounded-xl border border-slate-200 bg-white p-6">
                        <div className="mb-5">
                            <h2 className="text-base font-semibold text-slate-900">
                                Ticket Information
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Details provided by the customer.
                            </p>
                        </div>

                        <div className="border-t border-slate-100 pt-5">
                            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                                Description
                            </p>

                            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                                {ticket.description}
                            </p>
                        </div>
                    </section>

                    {/* Dates */}
                    <section className="rounded-xl border border-slate-200 bg-white p-6">
                        <h2 className="mb-5 text-base font-semibold text-slate-900">
                            Activity
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-slate-100 p-2">
                                    <CalendarDays
                                        size={17}
                                        className="text-slate-500"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Created
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {formatDate(ticket.createdAt)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-slate-100 p-2">
                                    <Clock
                                        size={17}
                                        className="text-slate-500"
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Last updated
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {formatDate(ticket.updatedAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Customer */}
                <section className="h-fit rounded-xl border border-slate-200 bg-white p-6">
                    <div className="mb-5">
                        <h2 className="text-base font-semibold text-slate-900">
                            Customer
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Customer information.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-slate-100 p-2">
                                <User
                                    size={18}
                                    className="text-slate-500"
                                />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Name
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-800">
                                    {ticket.customerName}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-slate-100 p-2">
                                <Mail
                                    size={18}
                                    className="text-slate-500"
                                />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-slate-400">
                                    Email
                                </p>

                                <p className="mt-1 truncate text-sm font-medium text-slate-800">
                                    {ticket.customerEmail}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TicketDetails;