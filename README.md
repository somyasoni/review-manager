# ReviewAI — AI-Powered Review Manager

A full-stack web app that helps local businesses manage and reply to Google reviews using AI. Built with React, Node.js, and the Anthropic Claude API.

---

## What it does

Local businesses get Google reviews every day but rarely have time to reply to them. Poor response rate hurts their ranking and reputation. ReviewAI solves this by:

- Pulling all reviews into one clean dashboard
- Generating professional, personalized reply drafts instantly using AI
- Letting the owner edit and approve before posting
- Alerting the owner immediately when a negative review comes in
- Showing a sentiment dashboard with rating trends

---

## Screenshots

> Add screenshots here after running the app locally

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Axios |
| Backend | Node.js, Express |
| Database | SQLite (better-sqlite3) |
| AI | Anthropic Claude API |
| Styling | Plain CSS (no framework) |

---

## Project Structure

```
review-manager/
├── client/                   # React frontend
│   └── src/
│       ├── api/              # API helper functions
│       ├── components/       # Sidebar, ReviewCard, ReplyModal
│       └── pages/            # Reviews, Dashboard
└── server/                   # Node.js backend
    ├── routes/               # Express API routes
    ├── services/             # AI reply service
    ├── jobs/                 # Cron job for syncing reviews
    ├── db.js                 # SQLite database setup
    └── index.js              # Entry point
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- An Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com)

### 1. Clone the repository

```bash
git clone https://github.com/somyasoni/review-manager.git
cd review-manager
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```
ANTHROPIC_API_KEY=your_anthropic_key_here
BUSINESS_NAME=Your Business Name
PORT=5000
```

Start the backend:

```bash
npm run dev
```

Server runs at `http://localhost:5000`

### 3. Set up the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

### 4. Load test data

Once both are running, open the app in your browser and click **"Seed test reviews"** to populate sample data.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reviews` | Get all reviews |
| POST | `/api/reviews/seed` | Add sample reviews for testing |
| POST | `/api/reviews/generate-reply` | Generate an AI reply draft |
| POST | `/api/reviews/mark-replied` | Mark a review as replied |
| DELETE | `/api/reviews/reset` | Clear all reviews |

### Example — Generate a reply

```bash
POST /api/reviews/generate-reply

{
  "reviewText": "Food was cold and I waited 40 minutes.",
  "businessName": "Sharma Sweets",
  "author": "Priya Rathore",
  "rating": 1
}
```

Response:
```json
{
  "reply": "Dear Priya, we sincerely apologize for your experience at Sharma Sweets..."
}
```

---

## Features

- **Review dashboard** — view all reviews sorted by date with star ratings
- **Smart filtering** — filter by pending, negative, or replied
- **AI reply generation** — one click generates a professional reply draft
- **Edit before posting** — owner can edit the draft before approving
- **Regenerate** — don't like the draft? generate a new one instantly
- **Mark as replied** — track which reviews have been handled
- **Sentiment dashboard** — see rating breakdown and reply rate at a glance

---

## Roadmap

- [ ] Google Places API integration for real review syncing
- [ ] Deploy to Railway for a live URL
- [ ] Multi-business support
- [ ] WhatsApp alerts for negative reviews
- [ ] Weekly email summary report
- [ ] Reply posting directly to Google

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |
| `BUSINESS_NAME` | Name shown in AI reply context | No (default: "our restaurant") |
| `PORT` | Port for the Express server | No (default: 5000) |

---

## License

MIT — free to use, modify, and sell.

---

## Author

Built by [Somya Soni](https://github.com/somyasoni)
