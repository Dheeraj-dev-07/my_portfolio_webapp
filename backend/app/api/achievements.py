from typing import List
from fastapi import APIRouter, HTTPException, status
from app.core.db import db_manager
from app.models.portfolio import AchievementItemModel

router = APIRouter(prefix="/achievements", tags=["Achievements"])

@router.get("", response_model=List[AchievementItemModel])
async def get_achievements():
    data = await db_manager.get_data("achievements")
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Achievements data not found"
        )
    return data
