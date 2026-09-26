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
    description,
  });

  return ticket;
};

const getTickets = async ({ search, status, page = 1, limit = 10 }) => {
  const query = {};

  if (search) {
    query.$or = [
      { customerName: { $regex: search, $options: "i" } },
      { ticketId: { $regex: search, $options: "i" } },
      { customerEmail: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const [tickets, totalTickets] = await Promise.all([
    Ticket.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
  ]);

  const totalPages = Math.ceil(totalTickets / limit);

  return {
    tickets,
    pagination: {
      currentPage: page,
      limit,
      totalTickets,
      totalPages,
    },
  };
};


const getTicketById = async (ticketId) => {
  const ticket = await Ticket.findOne({ticketId});

  if(!ticket){
    throw new ApiError(404, "Ticket not found");
  }

  return ticket;
};


const updateTicket = async (ticketId, updateData) =>{
  const allowedFields = [
    "customerName",
    "customerEmail",
    "subject",
    "description",
    "status"
  ];

  const updates = {};

  for (const field of allowedFields){
    if(updateData[field] !== undefined){
      updates[field] = updateData[field];
    }
  }

  if(Object.keys(updates).length === 0){
    throw new ApiError(400, "No valid fields provided for update")
  }

  const ticket = await Ticket.findOneAndUpdate(
    {ticketId},
    {$set: updates},
    {
      new: true,
      runValidators: true
    }
  );

  if(!ticket){
    throw new ApiError(404, "Ticket not found");
  }

  return ticket
}

export { createTicket, getTickets, getTicketById, updateTicket,  };
