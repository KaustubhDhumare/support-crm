import { useEffect } from "react";
import { getTickets } from "./services/ticketService.js";

function App() {
      useEffect(() => {
        const testApi = async () => {
            try {
                const response = await getTickets();

                console.log("API response:", response);
            } catch (error) {
                console.error("API error:", error);
            }
        };

        testApi();
    }, []);

  return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <h1 className="text-3xl font-bold">
                Support CRM
            </h1>
        </div>
  )
}

export default App
