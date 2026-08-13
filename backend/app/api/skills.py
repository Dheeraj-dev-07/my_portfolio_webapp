from typing import Dict, List
from fastapi import APIRouter, HTTPException, status
from app.core.db import db_manager

router = APIRouter(prefix="/skills", tags=["Skills"])

@router.get("", response_model=Dict[str, List[str]])
async def get_skills():
    data = await db_manager.get_data("skills")
    if not data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skills data not found"
        )
    return data
