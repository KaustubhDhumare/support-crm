import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { createTicket } from "../services/ticketService.js";

const CreateTicket = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        subject: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));

        setServerError("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName =
                "Customer name is required";
        }

        if (!formData.customerEmail.trim()) {
            newErrors.customerEmail =
                "Customer email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.customerEmail
            )
        ) {
            newErrors.customerEmail =
                "Enter a valid email address";
        }

        if (!formData.subject.trim()) {
            newErrors.subject =
                "Subject is required";
        }

        if (!formData.description.trim()) {
            newErrors.description =
                "Description is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setServerError("");

            const response = await createTicket({
                customerName: formData.customerName.trim(),
                customerEmail: formData.customerEmail.trim(),
                subject: formData.subject.trim(),
                description: formData.description.trim(),
            });

            const ticket = response.data;

            navigate(`/tickets/${ticket.ticketId}`);
        } catch (error) {
            console.error(error);

            setServerError(
                error.response?.data?.message ||
                    "Unable to create ticket. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[calc(100vh-88px)] bg-[#f5f7f9] p-5 sm:p-8">
            <div className="mx-auto max-w-[1000px]">

                {/* Breadcrumb */}
                <div className="mb-5 flex items-center gap-2 text-sm">
                    <Link
                        to="/tickets"
                        className="flex items-center gap-1 font-medium text-teal-700 hover:text-teal-800"
                    >
                        <ArrowLeft size={16} />

                        Back to tickets
                    </Link>

                    <span className="text-slate-300">
                        /
                    </span>

                    <span className="text-slate-400">
                        New
                    </span>
                </div>

                {/* Page heading */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Create Ticket
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Create a new customer support ticket.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_300px]">

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7"
                    >
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-slate-900">
                                New support ticket
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Tickets are created with an Open status.
                            </p>
                        </div>

                        {/* Server error */}
                        {serverError && (
                            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {serverError}
                            </div>
                        )}

                        {/* Customer information */}
                        <div className="grid gap-5 sm:grid-cols-2">

                            <FormField
                                label="Customer Name"
                                required
                                error={errors.customerName}
                            >
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    placeholder="e.g. Maya Chen"
                                    className={inputClass(
                                        errors.customerName
                                    )}
                                />
                            </FormField>

                            <FormField
                                label="Customer Email"
                                required
                                error={errors.customerEmail}
                            >
                                <input
                                    type="email"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleChange}
                                    placeholder="e.g. maya@example.com"
                                    className={inputClass(
                                        errors.customerEmail
                                    )}
                                />
                            </FormField>

                        </div>

                        {/* Subject */}
                        <div className="mt-5">
                            <FormField
                                label="Subject"
                                required
                                error={errors.subject}
                            >
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Briefly describe the issue"
                                    className={inputClass(
                                        errors.subject
                                    )}
                                />
                            </FormField>
                        </div>

                        {/* Description */}
                        <div className="mt-5">
                            <FormField
                                label="Description"
                                required
                                error={errors.description}
                            >
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe the customer's issue in detail..."
                                    rows={7}
                                    className={`${inputClass(
                                        errors.description
                                    )} resize-none`}
                                />
                            </FormField>
                        </div>

                        {/* Buttons */}
                        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                            <Link
                                to="/tickets"
                                className="flex h-11 items-center justify-center rounded-lg border border-slate-200 px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading && (
                                    <Loader2
                                        size={17}
                                        className="animate-spin"
                                    />
                                )}

                                {loading
                                    ? "Creating..."
                                    : "Create Ticket"}
                            </button>
                        </div>
                    </form>

                    {/* Side information */}
                    <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
                        <h3 className="text-base font-semibold text-slate-900">
                            What happens next?
                        </h3>

                        <div className="mt-5 space-y-5">

                            <InfoItem
                                number="1"
                                title="Ticket is created"
                                description="A unique ticket ID is generated automatically."
                            />

                            <InfoItem
                                number="2"
                                title="Status starts as Open"
                                description="New tickets are created with the default Open status."
                            />

                            <InfoItem
                                number="3"
                                title="Add internal notes"
                                description="You can add internal notes from the ticket details page."
                            />

                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

const FormField = ({
    label,
    required,
    error,
    children,
}) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}

                {required && (
                    <span className="ml-1 text-red-500">
                        *
                    </span>
                )}
            </label>

            {children}

            {error && (
                <p className="mt-1.5 text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

const InfoItem = ({
    number,
    title,
    description,
}) => {
    return (
        <div className="flex gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-xs font-semibold text-teal-700">
                {number}
            </div>

            <div>
                <h4 className="text-sm font-medium text-slate-800">
                    {title}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                    {description}
                </p>
            </div>
        </div>
    );
};

const inputClass = (error) => {
    return `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
        error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
    }`;
};

export default CreateTicket;