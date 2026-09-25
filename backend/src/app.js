import express from "express";
import cors from "cors";

// Middlewares
import errorHandler from "./middlewares/error.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

// Routes
import ticketRoutes from "./routes/ticket.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req,res) => {
    res.status(200).json({
        success:true,
        message: "Support CRM API is running"
    });
});

app.use("/api/tickets", ticketRoutes);









app.use(notFound);
app.use(errorHandler);

export default app;
