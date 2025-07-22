# Spark Path

![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4+-3178c6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## About
A comprehensive platform designed to help startups navigate their journey with AI-powered insights, competitor analysis, and personalized roadmaps. Features include failure prediction, legal checklists, and interactive AI mentoring.

## Features
- AI-powered startup mentoring
- Failure prediction analysis
- Interactive roadmap generation
- Legal compliance checklist
- Competitor analysis
- Dark/Light theme support
- Responsive design
- Real-time insights

## Tech Stack
- React 18+
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- Python (Backend)
- Bun Runtime
- Machine Learning (Random Forest)

## Getting Started

```bash
# Frontend Setup
cd frontend
npm install
npm run dev

# Backend Setup
cd backend
pip install -r requirements.txt
python app.py
```

## Project Structure
```
├── frontend/
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # UI components
│       │   └── ui/       # shadcn/ui components
│       ├── context/      # React context
│       ├── hooks/        # Custom hooks
│       ├── lib/          # Utilities
│       └── pages/        # Page components
└── backend/
    ├── lib/              # Server utilities
    └── app.py           # Server entry
```