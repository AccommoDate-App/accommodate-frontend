# AccommoDate — Frontend
 
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)
 
**A classroom accommodation tracker built for teachers who manage IEP and 504 students across multiple class periods.**
 
---
 
## Project Description
 
AccommoDate gives teachers a clean, fast way to view and manage student accommodations before class starts. Instead of digging through paperwork or switching between tabs, a teacher can pull up any class period and instantly see every student's active IEP accommodations — what they need, how often, and why.
 
The frontend is built with React 18, Vite, and Tailwind CSS. It connects to a Node/Express backend with a PostgreSQL database. Teachers can create classes, add students, and log accommodations — all from a minimal, distraction-free interface designed around how a school day actually runs.
 
---
 
## Visual Demo
 
> Screenshots coming soon — app is actively in development.
 
---
 
## Tech Stack
 
- **React 18** — component-based UI
- **Vite** — fast dev server and build tool
- **Tailwind CSS v4** — utility-first styling
- **DM Sans + DM Serif Display** — Google Fonts for body and headings
---
 
## Prerequisites
 
Make sure you have the following installed before running the project:
 
- **Node.js** >= 18
- **npm** >= 9
- The [AccommoDate backend](https://github.com/Accommodate-App/accommodate-backend) running locally on port `4000`
---
 
## Installation
 
```bash
# Clone the repository
git clone https://github.com/Accommodate-App/accommodate-frontend.git
 
# Navigate into the project
cd accommodate-frontend
 
# Install dependencies
npm install
```
 
---
 
## Configuration
 
No `.env` file is required for the frontend at this stage. The app connects to the backend at `http://localhost:4000` by default.
 
Once auth is added in a future phase, a `.env` file will be needed to store the API base URL and token secrets.
 
---
 
## Usage
 
```bash
# Start the development server
npm run dev
```
 
Then open your browser and go to `http://localhost:5173`.
 
Make sure the backend server is also running:
 
```bash
# In the accommodate-backend directory
node server.js
```
 
---
 
## Features
 
- View all classes with student and accommodation counts
- Click into any class to see a full student roster
- Expand each student row to view their active IEP accommodations
- Color-coded accommodation cards by category (Testing, Environment, Behavior)
- Add, edit, and delete classes, students, and accommodations
- Modals handle both create and edit — same form, different behavior based on context
---
 
## Project Structure
 
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── ClassList.jsx
│   ├── ClassModal.jsx
│   ├── StudentList.jsx
│   ├── StudentModal.jsx
│   └── AccommodationModal.jsx
├── App.jsx
├── main.jsx
└── index.css
```
 
---
 
## Roadmap
 
- [x] Phase 1 — Read-only backend (GET routes)
- [x] Phase 2 — Desktop UI (ClassList + StudentList)
- [x] Phase 3 — Full CRUD (classes, students, accommodations)
- [ ] Phase 4 — Auth (JWT login/register, user-scoped data)
- [ ] Phase 5 — School workflow features (CSV import, smart reminders)
- [ ] Phase 6 — Mobile layout
---
 
## License
 
MIT License. See `LICENSE` for details.
 
---
 
## Author
 
Built by **Andrew Enoe** — Marcy Lab School 2022 graduate, former CS teacher, and software engineer.