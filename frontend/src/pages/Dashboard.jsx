import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Clock3,
  CircleCheck,
  CircleDot,
  Ticket,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getTickets } from "../services/ticketService";

import DashboardStats from "../components/dashboard/DashboardStats";
import StatusBadge from "../components/tickets/StatusBadge";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTickets({
          page: 1,
          limit: 8,
        });

        setTickets(response.data.tickets);
      } catch (error) {
        console.error(error);

        setError(error.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const counts = useMemo(() => {
    return {
      open: tickets.filter((ticket) => ticket.status === "Open").length,

      inProgress: tickets.filter(
        (ticket) => ticket.status === "In Progress"
      ).length,

      closed: tickets.filter((ticket) => ticket.status === "Closed").length,
    };
  }, [tickets]);

  // Create the donut chart dynamically from ticket counts
  const chartStyle = useMemo(() => {
    const total = tickets.length;

    if (total === 0) {
      return {
        background: "conic-gradient(#e2e8f0 0deg 360deg)",
      };
    }

    const openDegrees = (counts.open / total) * 360;
    const inProgressDegrees = (counts.inProgress / total) * 360;

    const inProgressStart = openDegrees;
    const inProgressEnd = openDegrees + inProgressDegrees;

    return {
      background: `
        conic-gradient(
          #f97316 0deg ${openDegrees}deg,
          #0d9488 ${inProgressStart}deg ${inProgressEnd}deg,
          #e2e8f0 ${inProgressEnd}deg 360deg
        )
      `,
    };
  }, [tickets.length, counts]);

  if (loading) {
    return (
      <div className="p-8 text-sm text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-sm text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f7f9]">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Good morning, Ava
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your support queue.
          </p>
        </div>

        {/* Stats */}
        <DashboardStats
          totalTickets={tickets.length}
          openTickets={counts.open}
          inProgressTickets={counts.inProgress}
          closedTickets={counts.closed}
        />

        {/* Overview */}
        <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">

          {/* Ticket overview */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Ticket Overview
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Current ticket distribution
                </p>
              </div>

              <Clock3 size={19} className="text-slate-400" />
            </div>

            {/* Donut Chart */}
            <div className="mt-8 flex items-center justify-center">
              <div
                className="relative flex h-40 w-40 items-center justify-center rounded-full"
                style={chartStyle}
              >
                {/* Inner circle creates donut effect */}
                <div className="flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white"> 
                  <div className="text-center">
                    <p className="text-3xl font-semibold text-slate-900">
                      {tickets.length}
                    </p>

                    <p className="text-xs text-slate-900">
                      tickets
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-7 space-y-4">

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleDot
                    size={13}
                    className="text-orange-500"
                  />

                  <span className="text-sm text-slate-600">
                    Open
                  </span>
                </div>

                <span className="text-sm font-semibold">
                  {counts.open}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleDot
                    size={13}
                    className="text-teal-600"
                  />

                  <span className="text-sm text-slate-900">
                    In Progress
                  </span>
                </div>

                <span className="text-sm font-semibold">
                  {counts.inProgress}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleCheck
                    size={13}
                    className="text-slate-900"
                  />

                  <span className="text-sm text-slate-900">
                    Closed
                  </span>
                </div>

                <span className="text-sm font-semibold">
                  {counts.closed}
                </span>
              </div>

            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Recent Tickets
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Latest customer requests
                </p>
              </div>

              <Link
                to="/tickets"
                className="flex items-center gap-1 text-sm font-medium text-teal-700"
              >
                All tickets
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-5 space-y-1">
              {tickets.slice(0, 5).map((ticket) => (
                <div
                  key={ticket._id}
                  className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <Ticket size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {ticket.subject}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {ticket.ticketId} · {ticket.customerName}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={ticket.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent table */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">
                Recent Tickets
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest tickets in your queue
              </p>
            </div>

            <Link
              to="/tickets"
              className="flex items-center gap-1 text-sm font-medium text-teal-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {tickets.slice(0, 5).map((ticket) => (
              <div
                key={ticket._id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-teal-700">
                    {ticket.ticketId}
                  </p>

                  <p className="mt-1 font-medium text-slate-800">
                    {ticket.subject}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {ticket.customerName} · {ticket.customerEmail}
                  </p>
                </div>

                <StatusBadge status={ticket.status} />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;