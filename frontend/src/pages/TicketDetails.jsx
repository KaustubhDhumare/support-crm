import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CalendarDays,
    Mail,
    User,
    Clock,
    Edit3,
    Ticket,
    Save,
    X,
} from "lucide-react";

import {
    getTicketById,
    updateTicket,
} from "../services/ticketService.js";

const getStatusClass = (status) => {
    switch (status) {
        case "Open":
            return "bg-emerald-50 text-emerald-700 border border-emerald-100";

        case "In Progress":
            return "bg-amber-50 text-amber-700 border border-amber-100";

        case "Closed":
            return "bg-slate-100 text-slate-600 border border-slate-200";

        default:
            return "bg-slate-100 text-slate-600 border border-slate-200";
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
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        subject: "",
        description: "",
        status: "Open",
    });

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getTicketById(ticketId);

                const ticketData = response.data;

                setTicket(ticketData);

                setFormData({
                    customerName: ticketData.customerName,
                    customerEmail: ticketData.customerEmail,
                    subject: ticketData.subject,
                    description: ticketData.description,
                    status: ticketData.status,
                });
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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setFormError("");

        setFormData({
            customerName: ticket.customerName,
            customerEmail: ticket.customerEmail,
            subject: ticket.subject,
            description: ticket.description,
            status: ticket.status,
        });

        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormError("");

        setFormData({
            customerName: ticket.customerName,
            customerEmail: ticket.customerEmail,
            subject: ticket.subject,
            description: ticket.description,
            status: ticket.status,
        });

        setIsEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFormError("");

        const customerName = formData.customerName.trim();
        const customerEmail = formData.customerEmail.trim();
        const subject = formData.subject.trim();
        const description = formData.description.trim();

        if (
            !customerName ||
            !customerEmail ||
            !subject ||
            !description
        ) {
            setFormError("All ticket fields are required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(customerEmail)) {
            setFormError("Please enter a valid email address.");
            return;
        }

        try {
            setSaving(true);

            const response = await updateTicket(ticketId, {
                customerName,
                customerEmail,
                subject,
                description,
                status: formData.status,
            });

            setTicket(response.data);

            setFormData({
                customerName: response.data.customerName,
                customerEmail: response.data.customerEmail,
                subject: response.data.subject,
                description: response.data.description,
                status: response.data.status,
            });

            setIsEditing(false);
        } catch (error) {
            console.error(error);

            setFormError(
                error.response?.data?.message ||
                "Unable to update ticket."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="px-5 py-6 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />

                    <div className="h-9 w-2/3 animate-pulse rounded bg-slate-200" />

                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="h-64 animate-pulse rounded-xl bg-slate-100 lg:col-span-2" />

                        <div className="h-48 animate-pulse rounded-xl bg-slate-100" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-5 py-6 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-7xl">
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
                </div>
            </div>
        );
    }

    if (!ticket) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="px-5 py-6 sm:px-8 lg:px-10">
                <div className="mx-auto max-w-7xl space-y-7">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm">
                        <Link
                            to="/"
                            className="text-slate-400 transition hover:text-slate-600"
                        >
                            Home
                        </Link>

                        <span className="text-slate-300">/</span>

                        <Link
                            to="/tickets"
                            className="text-slate-400 transition hover:text-slate-600"
                        >
                            Tickets
                        </Link>

                        <span className="text-slate-300">/</span>

                        <span className="font-medium text-slate-600">
                            {ticket.ticketId}
                        </span>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                                    <Ticket size={15} />
                                    {ticket.ticketId}
                                </div>

                                <span className="h-1 w-1 rounded-full bg-slate-300" />

                                {isEditing ? (
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                    >
                                        <option value="Open">
                                            Open
                                        </option>

                                        <option value="In Progress">
                                            In Progress
                                        </option>

                                        <option value="Closed">
                                            Closed
                                        </option>
                                    </select>
                                ) : (
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                            ticket.status
                                        )}`}
                                    >
                                        {ticket.status}
                                    </span>
                                )}
                            </div>

                            {isEditing ? (
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xl font-semibold text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 sm:text-2xl"
                                />
                            ) : (
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                                    {ticket.subject}
                                </h1>
                            )}

                            <p className="mt-2 text-sm text-slate-500">
                                {isEditing
                                    ? "Update the ticket information below."
                                    : "Customer support ticket details and activity."}
                            </p>
                        </div>

                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
                            >
                                <Edit3 size={16} />
                                Edit Ticket
                            </button>
                        ) : (
                            <div className="flex shrink-0 gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <Save size={16} />

                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Form error */}
                    {formError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                            <p className="text-sm font-medium text-red-700">
                                {formError}
                            </p>
                        </div>
                    )}

                    {/* Main content */}
                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* Left column */}
                        <div className="space-y-6 lg:col-span-2">

                            {/* Ticket Information */}
                            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Ticket Information
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Details provided by the customer.
                                    </p>
                                </div>

                                <div className="px-5 py-6 sm:px-6">
                                    <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        Description
                                    </label>

                                    {isEditing ? (
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={7}
                                            className="w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm leading-6 text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                        />
                                    ) : (
                                        <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                            {ticket.description}
                                        </p>
                                    )}
                                </div>
                            </section>

                            {/* Activity */}
                            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                                <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                                    <h2 className="text-base font-semibold text-slate-900">
                                        Activity
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Ticket timeline information.
                                    </p>
                                </div>

                                <div className="grid gap-6 px-5 py-6 sm:grid-cols-2 sm:px-6">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-slate-100 p-2.5">
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
                                                {formatDate(
                                                    ticket.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-slate-100 p-2.5">
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
                                                {formatDate(
                                                    ticket.updatedAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Customer */}
                        <section className="h-fit rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-5 py-5">
                                <h2 className="text-base font-semibold text-slate-900">
                                    Customer
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Customer information.
                                </p>
                            </div>

                            <div className="space-y-6 px-5 py-6">

                                {/* Customer Name */}
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-slate-400">
                                        Name
                                    </label>

                                    {isEditing ? (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-slate-100 p-2.5">
                                                <User
                                                    size={18}
                                                    className="text-slate-500"
                                                />
                                            </div>

                                            <input
                                                type="text"
                                                name="customerName"
                                                value={
                                                    formData.customerName
                                                }
                                                onChange={handleChange}
                                                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-slate-100 p-2.5">
                                                <User
                                                    size={18}
                                                    className="text-slate-500"
                                                />
                                            </div>

                                            <p className="text-sm font-medium text-slate-800">
                                                {ticket.customerName}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Customer Email */}
                                <div>
                                    <label className="mb-2 block text-xs font-medium text-slate-400">
                                        Email
                                    </label>

                                    {isEditing ? (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-slate-100 p-2.5">
                                                <Mail
                                                    size={18}
                                                    className="text-slate-500"
                                                />
                                            </div>

                                            <input
                                                type="email"
                                                name="customerEmail"
                                                value={
                                                    formData.customerEmail
                                                }
                                                onChange={handleChange}
                                                className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-lg bg-slate-100 p-2.5">
                                                <Mail
                                                    size={18}
                                                    className="text-slate-500"
                                                />
                                            </div>

                                            <p className="break-all text-sm font-medium text-slate-800">
                                                {ticket.customerEmail}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default TicketDetails;