🧠 Realtime Coding Contest UI

A modern, real-time coding contest frontend built with React, TypeScript, and Vite.
This UI allows participants to join live contests, view problems, write code, submit solutions, and track live rankings — fully integrable with a containerized backend judge system (e.g., Spring Boot or Node.js).

🚀 Features

💻 Built-in Code Editor (supports syntax highlighting & execution)

🧩 Problem Viewer (with sample test cases)

⏱️ Live Timer for contests

🏆 Leaderboard with live updates

📊 User Stats & Submission Panel

🧠 Join & Participate in contests dynamically

🎨 Beautiful modern UI (Tailwind + Shadcn)

🛠️ Tech Stack
Layer	Technologies
Frontend Framework	React 18 + TypeScript
Build Tool	Vite
Styling	Tailwind CSS
UI Components	Shadcn/UI
State Management	React Context / Hooks
Editor	CodeMirror / Monaco Editor
Communication	REST API + WebSocket
Package Manager	npm / yarn / pnpm
📂 Folder Structure
src/
 ┣ components/
 ┃ ┣ CodeEditor.tsx
 ┃ ┣ ContestDashboard.tsx
 ┃ ┣ JoinContestPage.tsx
 ┃ ┣ LeaderboardPage.tsx
 ┃ ┣ ProblemView.tsx
 ┃ ┣ SubmissionStatus.tsx
 ┃ ┗ ui/ (Reusable Shadcn UI components)
 ┣ App.tsx
 ┣ main.tsx
 ┣ index.css
 ┗ Attributions.md

⚙️ Setup & Installation

Clone the repository

git clone https://github.com/yourusername/Realtimecodingcontestui.git
cd Realtimecodingcontestui-main


Install dependencies

npm install


Run development server

npm run dev


Build for production

npm run build


Preview production build

npm run preview

🔗 Backend Integration Guide

This frontend connects to a backend code-judging API (e.g., built with Spring Boot, Node.js, or Flask) responsible for problem storage, user submissions, and live results.

Below is the recommended API contract for smooth integration:

🧩 1. Contest APIs
GET /api/contests

Fetch all active contests.

[
  {
    "id": 1,
    "name": "Shodh-a-Code Contest",
    "startTime": "2025-10-29T14:00:00Z",
    "endTime": "2025-10-29T16:00:00Z",
    "status": "ONGOING"
  }
]

GET /api/contests/{contestId}

Fetch contest details with problem list.

{
  "id": 1,
  "name": "Shodh-a-Code Contest",
  "problems": [
    { "id": 101, "title": "Two Sum", "difficulty": "Easy" },
    { "id": 102, "title": "Valid Parentheses", "difficulty": "Medium" }
  ]
}

🧠 2. Problem APIs
GET /api/problems/{problemId}

Fetch a single problem statement and test cases.

{
  "id": 101,
  "title": "Two Sum",
  "description": "Find indices of two numbers that add up to target.",
  "sampleInput": "nums = [2,7,11,15], target = 9",
  "sampleOutput": "[0,1]"
}

🧪 3. Submission APIs
POST /api/submissions

Submit user code for judging.

Request:

{
  "userId": "u123",
  "problemId": 101,
  "language": "java",
  "code": "class Solution { public int[] twoSum(...) { ... } }"
}


Response:

{
  "submissionId": "s567",
  "status": "QUEUED",
  "message": "Submission received successfully."
}

GET /api/submissions/{submissionId}

Fetch the status/result of a specific submission.

{
  "submissionId": "s567",
  "status": "ACCEPTED",
  "runtime": "0.45s",
  "memory": "12MB"
}

📊 4. Leaderboard APIs
GET /api/leaderboard/{contestId}

Fetch real-time leaderboard data.

[
  { "rank": 1, "username": "urja", "score": 300, "solved": 3 },
  { "rank": 2, "username": "gautam", "score": 250, "solved": 2 }
]


Optionally, integrate WebSocket /ws/leaderboard for live updates during contests.

🔒 5. Authentication APIs (Optional)

If you include user login/signup functionality:

POST /api/auth/signup

POST /api/auth/login

GET /api/users/{id}

Use JWT or session tokens for authorization headers:

Authorization: Bearer <token>

🧱 Example .env Setup
VITE_API_BASE_URL=https://backend.shodhacode.com/api
VITE_WS_URL=wss://backend.shodhacode.com/ws


In code:

const API_URL = import.meta.env.VITE_API_BASE_URL;
