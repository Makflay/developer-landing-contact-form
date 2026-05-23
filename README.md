# Developer Landing Page

Responsive landing page with contact form and backend email integration.

The project includes:

- modern frontend setup with Vite + TypeScript
- Express backend API
- form validation
- email sending via Nodemailer
- responsive UI architecture

# Stack

## Frontend:

- HTML
- SCSS
- TypeScript
- Vite

## Backend:

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

# Installation

## Frontend

```bash
cd frontend
npm install
```

## Backend

```bash
cd backend
npm install
```

---

# Run Development Servers

## Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Backend

```bash
cd backend
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000

SMTP_HOST=smtp.yandex.ru
SMTP_PORT=587
SMTP_USER=your_email@yandex.ru

# Use Yandex app password, not your account password
SMTP_PASS=your_app_password

CONTACT_RECEIVER_EMAIL=your_email@yandex.ru
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
