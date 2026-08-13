from typing import List
from fastapi import APIRouter, HTTPException, status
from app.core.db import db_manager
from app.models.portfolio import CertificationItemModel

router = APIRouter(prefix="/certifications", tags=["Certifications"])

@router.get("", response_model=List[CertificationItemModel])
async def get_certifications():
    data = await db_manager.get_data("certifications")
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certifications data not found"
        )
    return data
