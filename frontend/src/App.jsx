import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Sidebar from "./components/layout/Sidebar.jsx";
import Topbar from "./components/layout/Topbar.jsx";
import MobileNav from "./components/layout/MobileNav.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import Tickets from "./pages/Tickets.jsx";
import CreateTicket from "./pages/CreateTicket.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";

const AppLayout = () => {
  const location = useLocation();

  const getPageInfo = () => {
    if (location.pathname === "/tickets") {
      return {
        title: "Tickets",
        subtitle: "Tickets",
      };
    }

    if (location.pathname === "/tickets/new") {
      return {
        title: "Tickets / New",
        subtitle: "Create Ticket",
      };
    }

    return {
      title: "Dashboard",
      subtitle: "Dashboard",
    };
  };

  const pageInfo = getPageInfo();

  return (
    <div className="min-h-screen bg-[#f5f7f9]">
      <div className="flex">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Topbar title={pageInfo.title} subtitle={pageInfo.subtitle} />

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/tickets" element={<Tickets />} />

            <Route path="/tickets/new" element={<CreateTicket />} />

            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/tickets/:ticketId" element={<TicketDetails />} />
          </Routes>
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
