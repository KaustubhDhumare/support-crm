# Support CRM — Backend

REST API for the Support CRM app. Built with Express 5, Mongoose 9, and MongoDB. Handles ticket creation, listing/search/pagination, status updates, and per-ticket notes.

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express 5
- **Database:** MongoDB via Mongoose 9
- **Other:** cors, dotenv, nodemon (dev)

## Project Structure

```
backend/
└── src/
    ├── app.js                 # Express app setup, middleware, route mounting
    ├── server.js               # Entry point — connects DB and starts the server
    ├── config/
    │   └── db.js                # MongoDB connection
    ├── constants/
    │   └── ticketStatus.js      # Ticket status enum (Open / In Progress / Closed)
    ├── controllers/
    │   ├── ticket.controller.js
    │   └── note.controller.js
    ├── services/
    │   ├── ticket.service.js    # Business logic + validation for tickets
    │   └── note.service.js      # Business logic + validation for notes
    ├── models/
    │   ├── Ticket.model.js
    │   └── Note.model.js
    ├── routes/
    │   ├── ticket.routes.js
    │   └── note.routes.js
    ├── middlewares/
    │   ├── error.middleware.js  # Centralized error handler
    │   └── notFound.middleware.js
    └── utils/
        ├── ApiError.js
        ├── ApiResponse.js
        └── asyncHandler.js
```

## Prerequisites

- Node.js 18+
- A MongoDB instance (local or Atlas)

## Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in `backend/` with:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/support-crm
   FRONTEND_URL=http://localhost:5173
   ```

3. Run the server:

   ```bash
   npm run dev     # nodemon, auto-reload
   # or
   npm start       # plain node
   ```

The API will be available at `http://localhost:5000` (or your configured `PORT`).

## API Reference

Base path: `/api`

All successful responses are wrapped as `{ success, statusCode, data, message }` (see `ApiResponse`). Errors are wrapped as `{ success: false, statusCode, message }` (see `ApiError` / `error.middleware.js`).

### Health

| Method | Endpoint      | Description        |
|--------|---------------|---------------------|
| GET    | `/api/health` | API health check    |

### Tickets

| Method | Endpoint                | Description                                  |
|--------|--------------------------|-----------------------------------------------|
| POST   | `/api/tickets`           | Create a ticket                               |
| GET    | `/api/tickets`           | List tickets (search, filter, paginate)       |
| GET    | `/api/tickets/:ticketId` | Get a single ticket by its `ticketId`         |
| PUT    | `/api/tickets/:ticketId` | Update a ticket's status                      |

**Create ticket** — `POST /api/tickets`

```json
{
  "customerName": "Jane Doe",
  "customerEmail": "jane@example.com",
  "subject": "Cannot log in",
  "description": "Getting a 500 error on login."
}
```

`ticketId` is auto-generated (`TKT-<timestamp>`); all four fields above are required, and `customerEmail` must be a valid email.

**List tickets** — `GET /api/tickets?search=jane&status=Open&page=1&limit=10`

Query params (all optional):
- `search` — matches `customerName`, `ticketId`, `customerEmail`, or `description` (case-insensitive)
- `status` — filters by status (case-insensitive)
- `page` — default `1`
- `limit` — default `10`, max `100`

Response includes `tickets` and a `pagination` object (`currentPage`, `limit`, `totalTickets`, `totalPages`).

**Update ticket** — `PUT /api/tickets/:ticketId`

```json
{ "status": "In Progress" }
```

Valid statuses (see `constants/ticketStatus.js`): `Open`, `In Progress`, `Closed`.

### Notes

| Method | Endpoint                             | Description                    |
|--------|----------------------------------------|---------------------------------|
| POST   | `/api/tickets/:ticketId/notes`         | Add a note to a ticket          |
| GET    | `/api/tickets/:ticketId/notes`         | List notes for a ticket (newest first) |

**Create note** — `POST /api/tickets/:ticketId/notes`

```json
{ "noteText": "Followed up with customer via email." }
```

## Data Models

**Ticket**
- `ticketId` (String, unique, auto-generated)
- `customerName`, `customerEmail`, `subject`, `description` (String, required)
- `status` (enum: Open / In Progress / Closed, default `Open`)
- `createdAt`, `updatedAt` (timestamps)

**Note**
- `ticketId` (ObjectId ref → Ticket, required)
- `noteText` (String, required)
- `createdAt` (timestamp only)

## Known Issues / Notes for Improvement

- `constants/ticketStatus.js` has a typo in the enum key `CLOSEDL` (value is correct: `"Closed"`), which is harmless but worth cleaning up.
- No authentication/authorization is implemented — all endpoints are public.
- No automated tests are currently included.
