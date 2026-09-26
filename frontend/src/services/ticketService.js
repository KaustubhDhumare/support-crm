import api from "./api.js";

const getTickets = async (params = {}) => {
    const response = await api.get("/tickets", {
        params
    });

    return response.data
};

const getTicketById = async (ticketId) => {
    const response = await api.get(`/tickets/${ticketId}`);

    return response.data;
};


const createTicket = async (ticketData) => {
    const response = await api.post("/tickets", ticketData);

    return response.data;
};


const updateTicket = async (ticketId, ticketData) => {
    const response = await api.put(`/tickets/${ticketId}`, ticketData);

    return response.data;
};


const getTicketNotes = async (ticketId) => {
    const response = await api.get(`/tickets/${ticketId}/notes`);

    return response.data;
};


const createNote = async (ticketId, noteText) => {
    const response = await api.post(`/tickets/${ticketId}/notes`, {noteText});

    return response.data;
};


export {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    getTicketNotes,
    createNote,
};

