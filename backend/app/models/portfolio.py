from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

class ProfileModel(BaseModel):
    name: str = Field(..., json_schema_extra={"example": "Dheeraj Sisodiya"})
    title: str = Field(..., json_schema_extra={"example": "Java Full Stack Developer"})
    location: str = Field(..., json_schema_extra={"example": "Vijay Nagar, Indore, Central India"})
    phone: str = Field(..., json_schema_extra={"example": "+91-7415484636"})
    email: EmailStr = Field(..., json_schema_extra={"example": "dheerajsisodiya2226@gmail.com"})
    linkedin: str = Field(..., json_schema_extra={"example": "https://linkedin.com/in/dheeraj-sisodiya"})
    github: str = Field(..., json_schema_extra={"example": "https://github.com/dheerajsisodiya"})
    summary: str = Field(..., json_schema_extra={"example": "Java Full Stack Developer..."})

class SubProjectModel(BaseModel):
    name: str
    tech_stack: List[str]
    highlights: List[str]

class ExperienceItemModel(BaseModel):
    company: str
    role: str
    location: str
    period: str
    responsibilities: List[str] = []
    sub_projects: List[SubProjectModel] = []

class EducationItemModel(BaseModel):
    degree: str
    institution: str
    period: str
    score: Optional[str] = ""

class CertificationItemModel(BaseModel):
    title: str
    issuer: str
    url: str

class AchievementItemModel(BaseModel):
    title: str
    description: str
    url: Optional[str] = None


class ContactRequestModel(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)

class ContactResponseModel(BaseModel):
    success: bool
    message: str
