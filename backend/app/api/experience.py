from typing import List
from fastapi import APIRouter, HTTPException, status
from app.core.db import db_manager
from app.models.portfolio import ExperienceItemModel

router = APIRouter(prefix="/experience", tags=["Experience"])

@router.get("", response_model=List[ExperienceItemModel])
async def get_experience():
    data = await db_manager.get_data("experience")
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Experience data not found"
        )
    return data
