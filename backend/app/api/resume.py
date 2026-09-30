import pathlib
from fastapi import APIRouter, HTTPException, Query, status
from fastapi.responses import FileResponse

router = APIRouter(prefix="/resume", tags=["Resume"])

RESUME_PATH = pathlib.Path(__file__).parent.parent / "data" / "Dheeraj_Sisodiya_Resume.pdf"

@router.get("")
async def get_resume(download: bool = Query(False, description="Set to true to force file download")):
    if not RESUME_PATH.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume PDF file not found"
        )
    
    disposition = "attachment" if download else "inline"
    return FileResponse(
        path=RESUME_PATH,
        media_type="application/pdf",
        filename="Dheeraj_Sisodiya_Resume.pdf",
        content_disposition_type=disposition
    )
