import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.db import db_manager

@pytest.mark.asyncio
async def test_get_profile():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/profile")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Dheeraj Sisodiya"
    assert data["title"] == "Java Full Stack Developer"
    assert data["email"] == "dheerajsisodiy1122@gmail.com"
    assert data["linkedin"] == "https://www.linkedin.com/in/dheerajS05"
    assert data["github"] == "https://github.com/Dheeraj-dev-07?tab=repositories"

@pytest.mark.asyncio
async def test_get_experience():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/experience")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 2
    assert data[0]["company"] == "Augment Infotech Pvt"
    assert data[1]["company"] == "HulkHire Tech"

@pytest.mark.asyncio
async def test_get_skills():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/skills")
    assert response.status_code == 200
    data = response.json()
    expected_categories = ["Frontend", "Backend", "DevOps", "Tools", "Concepts", "Soft Skills"]
    assert list(data.keys()) == expected_categories
    assert "Java" in data["Backend"]
    assert "React" in data["Frontend"]

@pytest.mark.asyncio
async def test_get_education():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/education")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 3

@pytest.mark.asyncio
async def test_get_certifications():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/certifications")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 5

@pytest.mark.asyncio
async def test_get_achievements():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/achievements")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert "link" in data[0]

@pytest.mark.asyncio
async def test_get_resume_inline():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/resume")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    assert response.headers["content-disposition"].startswith("inline")
    assert response.content.startswith(b"%PDF")

@pytest.mark.asyncio
async def test_get_resume_download():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/resume?download=true")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    assert response.headers["content-disposition"].startswith("attachment")
    assert response.content.startswith(b"%PDF")

@pytest.mark.asyncio
async def test_seed_version_logic():
    # Verify fallback seed data contains seed_version == 2
    seed_data = db_manager.load_seed_data()
    assert seed_data.get("seed_version") == 2
