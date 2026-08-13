from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.logging import logger, RequestIDMiddleware
from app.core.exceptions import (
    http_exception_handler,
    validation_exception_handler,
    generic_exception_handler
)
from app.core.db import db_manager
from app.api import (
    profile,
    experience,
    skills,
    education,
    certifications,
    achievements,
    resume,
    contact
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing application & database connections...")
    await db_manager.connect_db()
    yield
    logger.info("Shutting down application...")
    await db_manager.close_db()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Attach SlowAPI limiter state
app.state.limiter = contact.limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Custom Middlewares
app.add_middleware(RequestIDMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception Handlers
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Health Check Endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "database": "connected" if db_manager.db else "fallback_mode"
    }

# Include API Routers
api_prefix = settings.API_PREFIX
app.include_router(profile.router, prefix=api_prefix)
app.include_router(experience.router, prefix=api_prefix)
app.include_router(skills.router, prefix=api_prefix)
app.include_router(education.router, prefix=api_prefix)
app.include_router(certifications.router, prefix=api_prefix)
app.include_router(achievements.router, prefix=api_prefix)
app.include_router(resume.router, prefix=api_prefix)
app.include_router(contact.router, prefix=api_prefix)
