from fastapi import APIRouter, HTTPException, status
from app.core.db import db_manager
from app.models.portfolio import ProfileModel

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("", response_model=ProfileModel)
async def get_profile():
    data = await db_manager.get_data("profile")
    if not data:
        raise HTTPException(
            status_code=status.HTTP_444_NOT_FOUND if hasattr(status, 'HTTP_444_NOT_FOUND') else 404,
            detail="Profile data not found"
        )
    return data
