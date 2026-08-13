import os
from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

router = APIRouter(prefix="/resume", tags=["Resume"])

@router.get("")
async def download_resume():
    resume_path = os.path.join(os.path.dirname(__file__), "..", "data", "Dheeraj_Sisodiya_Resume.pdf")
    if not os.path.exists(resume_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume PDF file not found"
        )
    return FileResponse(
        path=resume_path,
        media_type="application/pdf",
        filename="Dheeraj_Sisodiya_Resume.pdf"
    )
