from typing import List
from fastapi import APIRouter, HTTPException, status
from app.core.db import db_manager
from app.models.portfolio import EducationItemModel

router = APIRouter(prefix="/education", tags=["Education"])

@router.get("", response_model=List[EducationItemModel])
async def get_education():
    data = await db_manager.get_data("education")
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Education data not found"
        )
    return data
