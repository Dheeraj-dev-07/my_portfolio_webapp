# 📘 Comprehensive Project Documentation — Dheeraj Sisodiya Portfolio Website

---

## 📌 Executive Summary

This document provides complete technical and functional documentation for the **Full-Stack Developer Portfolio** built for **Dheeraj Sisodiya** (Java Full Stack Developer). 

The portfolio is engineered with a **Python FastAPI** backend connected to **MongoDB** (with automatic seed data fallback) and a **Next.js 14 (App Router)** frontend styled with **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**.

---

## 🏛 1. Architecture & Monorepo Structure

### High-Level Architecture Diagram

```
 +-------------------------------------------------------------------------+
 |                            BROWSER CLIENT                               |
 |                (Dark/Light Mode, Framer Motion, Responsive)             |
 +------------------------------------+------------------------------------+
                                      |
                                      v
 +-------------------------------------------------------------------------+
 |                          NEXT.JS 14 FRONTEND                            |
 |        App Router (Server Components & Client-side React Hooks)          |
 |    Typed API Client (lib/api.ts) with In-Memory Resiliency Fallback    |
 +------------------------------------+------------------------------------+
                                      |
                               REST HTTP Calls
                                      v
 +-------------------------------------------------------------------------+
 |                         FASTAPI BACKEND SERVICE                         |
 |  Request ID Middleware | Structured JSON Logging | SlowAPI Rate Limiter |
 |          Pydantic v2 Models | Global Exception Handler               |
 +------------------+------------------------------------+-----------------+
                    |                                    |
            Motor Async Driver                          Static PDF Stream
                    |                                    |
                    v                                    v
 +------------------------------------+        +---------------------------+
 |          MONGODB DATABASE          |        |      PDF RESUME STREAM    |
 | (Portfolio Data & Contact Messages)|        |       (/api/resume)       |
 +------------------------------------+        +---------------------------+
```

### Complete File Directory Tree

```
c:/Workplace_1/projects/My_portfolio/
├── docker-compose.yml              # Local orchestration (MongoDB, Backend, Frontend)
├── .gitignore                      # Environment, Python, and Node ignore rules
├── README.md                       # Quickstart instructions
├── PROJECT_DOCUMENTATION.md        # Complete system documentation (this file)
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI pipeline (lint, test, build)
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI app entry point, middlewares & routes
│   │   ├── api/                    # REST API Routers
│   │   │   ├── __init__.py
│   │   │   ├── profile.py          # GET /api/profile
│   │   │   ├── experience.py       # GET /api/experience
│   │   │   ├── skills.py           # GET /api/skills
│   │   │   ├── education.py        # GET /api/education
│   │   │   ├── certifications.py   # GET /api/certifications
│   │   │   ├── achievements.py     # GET /api/achievements
│   │   │   ├── resume.py           # GET /api/resume (PDF stream)
│   │   │   └── contact.py          # POST /api/contact (rate-limited)
│   │   ├── core/
│   │   │   ├── config.py           # BaseSettings configuration
│   │   │   ├── db.py               # Async Motor MongoDB manager & seed fallback
│   │   │   ├── exceptions.py       # Global JSON error handlers
│   │   │   └── logging.py          # JSON structured logging & X-Request-ID middleware
│   │   ├── models/
│   │   │   └── portfolio.py        # Pydantic v2 schemas
│   │   └── data/
│   │       ├── seed_data.json      # Complete candidate resume content JSON
│   │       └── sample_resume.pdf   # PDF resume binary stream
│   ├── tests/                      # Pytest automated test suite
│   │   ├── __init__.py
│   │   ├── test_health.py          # Health check endpoint test
│   │   ├── test_api.py             # Portfolio data endpoint tests
│   │   └── test_contact.py         # Contact form submission & validation tests
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Container definition for backend
│   └── .env.example                # Sample environment variables
└── frontend/
    ├── app/                        # Next.js App Router pages & boundaries
    │   ├── globals.css             # Tailwind directives, glassmorphism & scrollbar
    │   ├── layout.tsx              # Root HTML, SEO metadata, Navbar & Footer wrappers
    │   ├── page.tsx                # Main single-page portfolio layout
    │   ├── loading.tsx             # Global loading state component
    │   ├── error.tsx               # Global error boundary component
    │   ├── not-found.tsx           # 404 page component
    │   ├── robots.ts               # Dynamic robots.txt route
    │   ├── sitemap.ts              # Dynamic sitemap.xml route
    │   ├── experience/
    │   │   └── page.tsx            # Dedicated experience route
    │   ├── certifications/
    │   │   └── page.tsx            # Dedicated certifications route
    │   └── contact/
    │       └── page.tsx            # Dedicated contact route
    ├── components/                 # React UI components
    │   ├── Navbar.tsx              # Sticky glassmorphic navbar with mobile menu
    │   ├── Footer.tsx              # Footer with social links & location
    │   ├── ThemeToggle.tsx         # Dark/Light mode theme switch button
    │   ├── HeroSection.tsx         # Profile summary, status badge & CTAs
    │   ├── SkillsSection.tsx       # Categorized skill badges with category filters
    │   ├── ExperienceCard.tsx      # Timeline & expandable sub-project accordions
    │   ├── EducationCard.tsx       # Degree cards with CGPA badges
    │   ├── CertificationsGrid.tsx  # Certification grid with external link badges
    │   ├── AchievementsSection.tsx # Highlight section for volunteer achievements
    │   └── ContactForm.tsx         # Zod + React Hook Form with toast notifications
    ├── lib/
    │   └── api.ts                  # Typed fetch client with fallback data
    ├── types/
    │   └── index.ts                # TypeScript data interfaces
    ├── tailwind.config.js          # Tailwind styling configuration
    ├── next.config.js              # Security headers configuration
    ├── tsconfig.json               # TypeScript configuration
    ├── package.json                # Node dependencies & scripts
    └── Dockerfile                  # Container definition for frontend
```

---

## 📝 2. Candidate Content & Data Schemas

The candidate data is stored in `backend/app/data/seed_data.json` and mirrored in Pydantic/TypeScript models.

### Candidate Profile
- **Name:** Dheeraj Sisodiya
- **Title:** Java Full Stack Developer
- **Location:** Vijay Nagar, Indore, Central India
- **Phone:** +91-7415484636
- **Email:** dheerajsisodiya2226@gmail.com
- **LinkedIn:** `https://linkedin.com/in/dheeraj-sisodiya`
- **GitHub:** `https://github.com/dheerajsisodiya`
- **Summary:** *"Java Full Stack Developer with hands-on internship experience building secure, production-ready applications using Java, Spring Boot, Spring Security, REST APIs, and MySQL. Skilled in authentication, authorization, and scalable backend design, with growing expertise in DevOps and AI technologies. Seeking to contribute to innovative engineering teams while continuing to grow as a full-stack developer."*

### Skill Categories
1. **Languages & Frameworks:** Java, J2EE, Spring Boot, Spring Security, Spring AI, Python, FastAPI (basic)
2. **Architecture:** MVC, Microservices Architecture, RESTful APIs
3. **Data:** MySQL, JDBC, Hibernate (JPA)
4. **DevOps & Cloud:** Docker, Kubernetes, CI/CD, Terraform, AWS
5. **Tools:** Antigravity IDE, IntelliJ IDEA, VS Code, Git, GitHub, Postman, Jira
6. **Practices:** Object-Oriented Programming, Agile/Scrum
7. **Soft Skills:** Decision Making, Time Management, Cross-functional Collaboration, Adaptability

### Work Experience

#### 1. Augment Infotech — Java Full Stack Developer Intern
- **Location & Period:** Indore, India | Apr 2026 – Jul 2026
- **Core Responsibilities:**
  - Contributing to enterprise-grade full-stack applications using Java, Spring Boot, React.js, MySQL, and REST APIs in an Agile development environment.
  - Developed and maintained backend modules following MVC architecture, implementing secure authentication, authorization, and RESTful APIs using Spring Boot and Spring Security.
  - Collaborated with frontend and backend teams to build scalable, production-ready features, perform bug fixes, and support application deployments.
- **Sub-Projects:**
  - **LeadFlow CRM (Lead Management System)** — *Java, Spring Boot, Spring Security, React.js*
    - Developed the Authentication and Authorization module with secure login and role-based access control.
    - Designed RESTful APIs following MVC architecture and integrated them with the React frontend.
    - Collaborated on production-ready authentication workflows and improved application security.
  - **Property Management System (PMS)** — *React.js, JavaScript, REST APIs*
    - Worked with the frontend team on a live enterprise PMS to develop and maintain user-facing modules.
    - Built responsive UI components, integrated REST APIs, and resolved frontend issues to improve usability and performance.
    - Supported feature development, testing, and cross-functional collaboration for timely production releases.

#### 2. HulkHire Tech — Java Developer Trainee
- **Location & Period:** Hyderabad, India | 4 Aug 2025 – 27 Sep 2025
- **Sub-Projects:**
  - **Stripe Payment Integration System** — *Java, Spring Boot, Microservices, Stripe API*
    - Developed a secure and scalable Stripe Payment Integration System using Java Spring Boot in a microservices architecture.
    - Implemented modular payment-processing and stripe-provider services; integrated Stripe PSP APIs (Create Session, Retrieve Session, Expire Session).
    - Implemented security using Stripe Basic Authentication and HmacSHA256 for secure webhook notification processing.
    - Developed payment status tracking for reliable payment processing and transaction consistency.
    - Designed custom error codes and applied Spring exception handling for robust error management.
    - Processed Stripe webhook events, followed RESTful API standards, and collaborated end-to-end on the integration workflow.

### Education
1. **B.Tech, Computer Science and Engineering** — Sri Aurobindo Institute of Technology, Indore (RGPV) — 2022–2026 — *CGPA: 6.6/10*
2. **Class 12th (PCM)** — Madhya Pradesh Board — 2022
3. **Class 10th** — Madhya Pradesh Board — 2020

### Certifications
1. Neo4j Certified Professional (*Neo4j*)
2. Walmart USA — Advanced Software Engineering (*Walmart / Forage*)
3. Infosys Springboard — Java Foundation (*Infosys Springboard*)
4. HulkHire Tech — Internship Completion Letter (*HulkHire Tech*)
5. Google Cloud — Cloud Computing Foundation (*Google Cloud*)
6. CII — Volunteer Participation Certificate (*Confederation of Indian Industry*)
7. TCS — National Qualifier Test (*Tata Consultancy Services*)

### Achievements
- **TieCon MP 2025 Volunteer:** Managed registration process for investors and delegates, ensuring smooth event coordination.

---

## ⚡ 3. Backend Implementation & API Endpoints

### Configuration (`app/core/config.py`)
Uses `pydantic-settings` to load settings from environment variables or defaults:
- `PROJECT_NAME`: "Dheeraj Sisodiya Portfolio API"
- `MONGODB_URL`: Default `"mongodb://localhost:27017"`
- `DATABASE_NAME`: `"portfolio_db"`
- `CORS_ORIGINS`: Allowed origins (`http://localhost:3000`, `http://127.0.0.1:3000`)

### Database Connection & Seeding Logic (`app/core/db.py`)
- `DatabaseManager`: Uses `motor.motor_asyncio.AsyncIOMotorClient` with a 2000ms server selection timeout.
- **Auto-Seeding:** On startup, if connected to MongoDB, `seed_mongodb()` checks if collections (`profile`, `skills`, `experience`, `education`, `certifications`, `achievements`) are empty. If empty, it populates them from `seed_data.json`.
- **In-Memory Fallback:** If MongoDB is offline, requests automatically fall back to serving data directly from `load_seed_data()`, guaranteeing 100% API availability.

### Request Logging & Error Handling (`app/core/logging.py` & `exceptions.py`)
- **Request ID Middleware:** Generates a unique UUID `X-Request-ID` header for every incoming HTTP request.
- **JSON Formatter:** Formats all application logs in structured JSON format (`timestamp`, `level`, `message`, `module`, `request_id`).
- **Standard Error Response Shape:**
  ```json
  {
    "error": {
      "code": 404,
      "message": "Resource not found"
    }
  }
  ```

### Complete Endpoint Reference

| HTTP Method | Route | Description | Response Model | Rate Limit |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/health` | System health & DB connection status | `JSON` | None |
| `GET` | `/api/profile` | Candidate profile & bio | `ProfileModel` | None |
| `GET` | `/api/experience` | Work experience & sub-projects | `List[ExperienceItemModel]` | None |
| `GET` | `/api/skills` | Categorized technical skills | `Dict[str, List[str]]` | None |
| `GET` | `/api/education` | Academic history | `List[EducationItemModel]` | None |
| `GET` | `/api/certifications` | Certifications & credentials | `List[CertificationItemModel]` | None |
| `GET` | `/api/achievements` | Key achievements & leadership | `List[AchievementItemModel]` | None |
| `GET` | `/api/resume` | Binary stream of PDF resume | `FileResponse` (PDF) | None |
| `POST` | `/api/contact` | Submit message to MongoDB | `ContactResponseModel` | **5 / minute** |

---

## 🎨 4. Frontend Architecture & Components

### Styling & Theme Setup
- **Tailwind CSS (`tailwind.config.js` & `globals.css`)**: Dark mode supported via class strategy (`.dark`).
- **Custom Utilities**:
  - `.glass-card`: Semi-transparent blurred card backdrop (`bg-white/70 dark:bg-slate-900/60 backdrop-blur-md`).
  - `.glass-nav`: Glassmorphic sticky top navigation bar.
- **Typography & Icons**: Inter font styling with `lucide-react` vector icons.

### Key UI Components

1. **`ThemeToggle.tsx`**:
   - Manages light/dark theme state. Syncs with `localStorage` (`theme`) and updates `document.documentElement.classList`.

2. **`Navbar.tsx`**:
   - Sticky navbar featuring candidate logo (`Dheeraj.dev`), desktop links (`About`, `Skills`, `Experience`, `Education`, `Certifications`, `Contact`), mobile navigation drawer, and theme toggle.

3. **`HeroSection.tsx`**:
   - Renders candidate name with gradient text effect, tagline ("Java Full Stack Developer"), location, contact info, summary quote, CTA buttons ("Download Resume", "Get in Touch"), and social icons.
   - Uses `framer-motion` entrance animations.

4. **`SkillsSection.tsx`**:
   - Groups technical skills by category tabs (*All Skills, Languages & Frameworks, Architecture, Data, DevOps & Cloud, Tools, Practices, Soft Skills*).

5. **`ExperienceCard.tsx`**:
   - Vertical timeline layout with sub-project accordions.
   - Enables users to toggle expanded/collapsed states for sub-projects (*LeadFlow CRM, PMS, Stripe Payment Integration System*).

6. **`CertificationsGrid.tsx`**:
   - Responsive card grid highlighting external certification links with "View Certificate" badges.

7. **`ContactForm.tsx`**:
   - Client-side form handling using **React Hook Form** + **Zod**:
     - `name`: min 2 characters
     - `email`: valid email format
     - `message`: min 10 characters
   - Submits data to `POST /api/contact` and displays animated success/error status alerts.

---

## 🧪 5. Testing & Quality Assurance

### Backend Pytest Suite (`backend/tests/`)
- `test_health.py`: Verifies `/health` status.
- `test_api.py`: Validates all portfolio GET endpoints (`/profile`, `/experience`, `/skills`, `/education`, `/certifications`, `/achievements`, `/resume`).
- `test_contact.py`: Tests valid submission success and 422 validation failure payloads.

**Running Backend Tests:**
```bash
cd backend
.\venv\Scripts\activate
python -m pytest --cov=app
```
**Results:** 10 Passed, 0 Failed (100% endpoint coverage).

---

## 🐳 6. DevOps, Docker & CI/CD

### Docker Compose (`docker-compose.yml`)
Runs three services locally:
1. `mongodb`: MongoDB 6.0 instance on port `27017`.
2. `backend`: FastAPI Python container on port `8000`.
3. `frontend`: Next.js Node container on port `3000`.

### GitHub Actions Workflow (`.github/workflows/ci.yml`)
- Triggers on `push` or `pull_request` to `main`.
- **Backend Job**: Installs dependencies and runs `pytest --cov=app`.
- **Frontend Job**: Installs dependencies and runs `npm run build`.

---

## 🚀 7. Running the Application Locally

### Quick Start with Docker
```bash
docker-compose up --build
```
- Access Frontend: `http://localhost:3000`
- Access Backend Docs: `http://localhost:8000/docs`

### Manual Execution

#### Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
- Access Frontend: `http://localhost:3000`
