from datetime import datetime, timezone
from fastapi import APIRouter, Request, HTTPException, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.models.portfolio import ContactRequestModel, ContactResponseModel
from app.core.db import db_manager
from app.core.logging import logger

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=ContactResponseModel)
@limiter.limit("5/minute")
async def submit_contact(request: Request, payload: ContactRequestModel):
    submission = {
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    
    if db_manager.db is not None:
        try:
            await db_manager.db["contact_submissions"].insert_one(submission)
            logger.info(f"Saved contact submission from {payload.email} to MongoDB")
        except Exception as e:
            logger.error(f"Failed to save contact submission to MongoDB: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database error while saving your message."
            )
    else:
        logger.info(f"Received contact submission (in-memory mode): {submission}")

    return ContactResponseModel(
        success=True,
        message="Thank you for reaching out! Your message has been sent successfully."
    )
