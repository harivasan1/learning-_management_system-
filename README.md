# Learning Management System (EduLearn)

This repository contains a small Learning Management System (LMS) example with a Node.js/Express backend and a static HTML/CSS/JS frontend.

Quick start (development)

1. Install server dependencies:

   cd lms-full-st/server
   npm install

2. Create a `.env` from the provided example and adjust values:

   cp .env.example .env

3. Start the dev server:

   npm run dev

4. Open the app in your browser:

   http://localhost:5000

Project layout

lms-project/
│
├── server/        # Backend (Express + Mongoose)
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/     # helper functions and utilities
│
├── client/        # Frontend (static files served by Express)
│   ├── public/
│   └── views/
│
├── README.md
└── .gitignore

Notes

- Keep sensitive values out of version control by using `.env` and adding it to `.gitignore`.
- Use the `lms-full-st/server/.env.example` file as a starting point.

If you want, I can expand this README with more setup steps, or add contribution guidelines and a basic CI workflow.
