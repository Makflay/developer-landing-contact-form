# Developer Landing Page

Responsive landing page with contact form and backend email integration.

The project includes:

- modern frontend setup with Vite + TypeScript
- Express backend API
- form validation
- email sending via Nodemailer
- responsive UI architecture

# Tech Stack

## Frontend

- SCSS
- TypeScript
- Vite

## Backend

- Node.js
- Express
- TypeScript
- Nodemailer

---

# Features

- Responsive landing page
- Semantic HTML structure
- SCSS architecture
- Contact form with validation
- Loading / success / error states
- Backend API integration
- Email sending with Nodemailer
- Email copy for the user
- Environment variables support

---

# Project Structure

```txt
project/
│
├── frontend/
├── backend/
├── .env.example
└── README.md
```

---

# How to Start

Clone the repository:

```bash
git clone https://github.com/Makflay/developer-landing-contact-form.git
cd developer-landing-contact-form
```

## Install dependencies

### Terminal 1 — Frontend

```bash
cd frontend
npm install
```

### Terminal 2 — Backend

```bash
cd backend
npm install
```

## Create `.env` file from `.env.example`

```bash
cp .env.example .env
```

Then update environment variables with your credentials.

## Run development servers

### Terminal 1 — Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

### Terminal 2 — Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Available Scripts

Frontend:

```bash
npm run dev
npm run build
```

Backend:

```bash
npm run dev
npm start
```

---

# API

## POST `/api/contact`

Request body:

```json
{
  "name": "John Doe",
  "phone": "+123456789",
  "email": "john@example.com",
  "comment": "Hello!"
}
```

Success response:

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

Error response:

```json
{
  "success": false,
  "message": "All fields are required"
}
```

---

# AI Usage

During development, AI-assisted tools were used for:

- layout generation
- refactoring
- debugging
- frontend structure optimization

Tools used:

- Codex
- VS Code

AI tools were used as development assistants, while architecture, implementation decisions, testing, and final verification were done manually.

---

# Notes

This project was created as a test assignment and focuses on:

- frontend architecture
- API integration
- form handling
- responsive layout
- clean project structure
