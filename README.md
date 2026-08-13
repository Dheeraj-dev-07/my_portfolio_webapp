# Dheeraj Sisodiya — Java Full Stack Developer Portfolio

Full-stack portfolio web application for **Dheeraj Sisodiya**, Java Full Stack Developer. Built with Python FastAPI backend, MongoDB, Next.js 14+ frontend with App Router, TypeScript, Tailwind CSS, and Framer Motion.

---

## 🛠 Tech Stack

- **Backend:** Python 3.11+, FastAPI, Pydantic v2, Motor (Async MongoDB), Pytest, Uvicorn
- **Frontend:** Next.js (App Router, TypeScript), Tailwind CSS, Framer Motion, Lucide Icons, React Hook Form, Zod
- **Database:** MongoDB
- **DevOps:** Docker, Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+ & npm
- Docker & Docker Compose (optional, for containerized run)

### Running with Docker Compose (Recommended)

```bash
docker-compose up --build
```
- Backend API: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Frontend Website: `http://localhost:3000`

### Running Locally

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

- **Backend Tests:** `cd backend && pytest --cov=app`
- **Frontend Tests:** `cd frontend && npm test`
