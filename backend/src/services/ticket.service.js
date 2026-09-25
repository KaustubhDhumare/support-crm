import Ticket from "../models/Ticket.model.js";
import ApiError from "../utils/ApiError.js";

const createTicket = async (ticketData) => {
  const { customerName, customerEmail, subject, description } = ticketData;

  if (!customerName || !customerEmail || !subject || !description) {
    throw new ApiError(400, "All ticket fields are required");
  }

  const ticketId = `TKT-${Date.now()}`;

  const ticket = await Ticket.create({
    ticketId,
    customerName,
    customerEmail,
    subject,
    description
  });

  return ticket;
};



export {
    createTicket,
}
