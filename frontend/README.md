# Support CRM — Frontend

React + Vite single-page app for the Support CRM. Provides a dashboard, ticket list with search/filter, ticket creation, and a ticket detail view with notes.

## Tech Stack

- **React 19** with **React Router 7**
- **Vite 8** (build tool / dev server)
- **Tailwind CSS 4** (via `@tailwindcss/vite`)
- **Axios** for API calls
- **lucide-react** for icons

## Project Structure

```
frontend/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx                     # React root / entry point
    ├── App.jsx                       # Router + layout shell
    ├── index.css                     # Global styles / Tailwind entry
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx
    │   │   ├── Topbar.jsx
    │   │   └── MobileNav.jsx
    │   ├── dashboard/
    │   │   └── DashboardStats.jsx
    │   └── tickets/
    │       ├── StatusBadge.jsx
    │       └── TicketTable.jsx
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Tickets.jsx
    │   ├── CreateTicket.jsx
    │   └── TicketDetails.jsx
    └── services/
        ├── api.js                    # Axios instance (base URL from env)
        └── ticketService.js          # Ticket/note API calls
```

## Routes

| Path                 | Page             |
|-----------------------|------------------|
| `/`                   | Dashboard        |
| `/tickets`            | Ticket list      |
| `/tickets/new`        | Create ticket    |
| `/tickets/:ticketId`  | Ticket details   |
| `*`                   | Redirects to `/` |

## Prerequisites

- Node.js 18+
- The [backend API](../backend/README.md) running and reachable

## Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Create a `.env` file in `frontend/` pointing to your backend:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

   By default, Vite serves at `http://localhost:5173`.

## Available Scripts

| Script            | Description                          |
|-------------------|----------------------------------------|
| `npm run dev`     | Start the Vite dev server              |
| `npm run build`   | Production build (output to `dist/`)   |
| `npm run preview` | Preview the production build locally   |
| `npm run lint`    | Run ESLint                             |

## API Integration

All API calls go through `src/services/api.js` (an Axios instance configured with `VITE_API_URL`) and `src/services/ticketService.js`, which exposes:

- `getTickets(params)` — list/search/filter/paginate tickets
- `getTicketById(ticketId)` — fetch one ticket
- `createTicket(ticketData)` — create a ticket
- `updateTicket(ticketId, ticketData)` — update ticket status
- `getTicketNotes(ticketId)` — list notes for a ticket
- `createNote(ticketId, noteText)` — add a note to a ticket

These map directly to the endpoints documented in the [backend README](../backend/README.md#api-reference).

## Notes for Improvement

- The `<title>` in `index.html` is still the default `"frontend"` — consider renaming it (e.g. "Support CRM").
- No automated tests are currently included.
