# LaunchPad — MERN practice application

A simple static-style DevOps learning website built with React, Express, and MongoDB. It includes frontend and backend tests. No Docker or CI/CD configuration is included.

## Requirements
- Node.js 20+
- MongoDB running locally (only needed for the backend API)

## Run the frontend
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal.

## Run frontend tests
```bash
cd frontend
npm test
```

## Run the backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Backend runs at `http://localhost:5000`.

## Run backend tests
```bash
cd backend
npm install
npm test
```
The backend tests use an in-memory Express app and do not require MongoDB.

## API endpoints
- `GET /api/health` — application status
- `GET /api/projects` — list of demo DevOps labs

The website can show built-in sample data if the API is not running, so the frontend remains useful as a standalone static-style page.
