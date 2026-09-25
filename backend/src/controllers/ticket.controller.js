import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createTicket as createTicketService } from "../services/ticket.service.js";

const createTicket = asyncHandler(async (req, res) => {
  const ticket = await createTicketService(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, ticket, "Ticket created successfully"));
});


export {
    createTicket,

}