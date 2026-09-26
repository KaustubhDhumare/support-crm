import { useEffect, useState } from "react";
import { getTickets } from "../services/ticketService.js";
import DashboardStats from "../components/DashboardStats.jsx";
import TicketTable from "../components/TicketTable.jsx";

const Dashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getTickets();

                setTickets(response.data.tickets);
            } catch (error) {
                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load tickets"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">
                    Loading tickets...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="rounded-lg bg-red-50 px-6 py-4 text-red-600">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Support CRM
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage and track customer support tickets.
                    </p>
                </div>

                <DashboardStats tickets={tickets} />

                <section className="mt-8">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Tickets
                        </h2>

                        <p className="text-sm text-gray-500">
                            Recent customer support tickets
                        </p>
                    </div>

                    <TicketTable tickets={tickets} />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;