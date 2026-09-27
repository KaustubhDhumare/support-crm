# Support CRM

A lightweight customer support ticketing system. Agents can create tickets, search/filter/paginate through them, update ticket status, and leave internal notes on a ticket — all through a React dashboard backed by a REST API.

This is a monorepo with two independent apps:

```
support-crm/
├── backend/    # Express + MongoDB REST API
└── frontend/   # React + Vite dashboard
```

Each has its own detailed README:
- [`backend/README.md`](./backend/README.md)
- [`frontend/README.md`](./frontend/README.md)


## Live Demo

- **Frontend:** https://support-crm-rqbl.vercel.app/
- **Backend API:** https://support-crm-vwu2.onrender.com/api
- **API Health Check:** https://support-crm-vwu2.onrender.com/api/health



## Features

- **Dashboard** with ticket stats overview
- **Ticket list** with search, status filter, and pagination
- **Create ticket** with customer name, email, subject, and description
- **Ticket details** view with status updates
- **Notes** — leave internal notes/comments on a ticket, newest first

## Tech Stack

| Layer     | Stack                                                        |
|-----------|---------------------------------------------------------------|
| Frontend  | React 19, React Router 7, Vite 8, Tailwind CSS 4, Axios, lucide-react |
| Backend   | Node.js, Express 5, Mongoose 9                                |
| Database  | MongoDB                                                        |

## Architecture

```
┌─────────────────┐        HTTPS / Axios        ┌──────────────────┐        Mongoose        ┌───────────┐
│   Frontend      │  ─────────────────────────▶ │   Backend        │  ───────────────────▶ │  MongoDB  │
│ React + Vite    │  ◀───────────────────────── │ Express API      │  ◀─────────────────── │           │
│    Vercel       │       JSON responses        │     Render       │                        │   Atlas   │
└─────────────────┘                             └──────────────────┘                        └───────────┘
```

The frontend talks to the backend only through `VITE_API_URL` (an Axios instance in `frontend/src/services/api.js`); the backend exposes a versionless `/api` REST interface documented in its own README.

## Prerequisites

- Node.js 18+
- A MongoDB instance (local install or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- npm

## Quick Start

Clone the repo and set up both apps:

```bash
git clone https://github.com/KaustubhDhumare/support-crm.git
cd support-crm
```

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/support-crm
FRONTEND_URL=http://localhost:5173
```

Run it:

```bash
npm run dev
```

The API starts on `http://localhost:5000`.

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run it:

```bash
npm run dev
```

The app starts on `http://localhost:5173`.

Open `http://localhost:5173` in your browser — you should see the Dashboard, with the frontend calling the backend at the URL configured above.

## API Overview

Full details, request/response shapes, and query parameters are in [`backend/README.md`](./backend/README.md#api-reference). Summary:

| Method | Endpoint                         | Description              |
|--------|------------------------------------|----------------------------|
| GET    | `/api/health`                      | Health check               |
| POST   | `/api/tickets`                     | Create a ticket            |
| GET    | `/api/tickets`                     | List tickets (search/filter/paginate) |
| GET    | `/api/tickets/:ticketId`           | Get a single ticket        |
| PUT    | `/api/tickets/:ticketId`           | Update ticket status       |
| POST   | `/api/tickets/:ticketId/notes`     | Add a note to a ticket     |
| GET    | `/api/tickets/:ticketId/notes`     | List notes for a ticket    |

## Project Structure

```
support-crm/
├── backend/
│   ├── package.json
│   └── src/
│       ├── app.js, server.js
│       ├── config/         # DB connection
│       ├── constants/      # Ticket status enum
│       ├── controllers/    # Request handlers
│       ├── services/       # Business logic + validation
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express routers
│       ├── middlewares/    # Error handling
│       └── utils/          # ApiError, ApiResponse, asyncHandler
│
└── frontend/
    ├── package.json
    ├── index.html, vite.config.js
    └── src/
        ├── main.jsx, App.jsx
        ├── components/     # layout, dashboard, tickets
        ├── pages/          # Dashboard, Tickets, CreateTicket, TicketDetails
        └── services/       # Axios instance + ticket/note API calls
```

## Known Issues / Roadmap

- No authentication or authorization — all API endpoints are currently public.
- No automated tests (unit or integration) on either side yet.
- Minor typo in `backend/src/constants/ticketStatus.js` (`CLOSEDL` key; value is correct).
- `frontend/index.html` still has the default Vite page title.

## License

ISC (per `backend/package.json`). Add a `LICENSE` file if you intend to distribute this project under specific terms.