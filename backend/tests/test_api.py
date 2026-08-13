import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_get_profile():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/profile")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Dheeraj Sisodiya"
    assert data["title"] == "Java Full Stack Developer"
    assert "email" in data

@pytest.mark.asyncio
async def test_get_experience():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/experience")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 2
    assert data[0]["company"] == "Augment Infotech"

@pytest.mark.asyncio
async def test_get_skills():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/skills")
    assert response.status_code == 200
    data = response.json()
    assert "Languages & Frameworks" in data
    assert "Java" in data["Languages & Frameworks"]

@pytest.mark.asyncio
async def test_get_education():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/education")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 3

@pytest.mark.asyncio
async def test_get_certifications():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/certifications")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 7

@pytest.mark.asyncio
async def test_get_achievements():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/achievements")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1

@pytest.mark.asyncio
async def test_download_resume():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/resume")
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
