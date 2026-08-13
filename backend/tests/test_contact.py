import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.asyncio
async def test_submit_contact_success():
    payload = {
        "name": "Jane Recruiter",
        "email": "jane@techrecruiter.com",
        "message": "Hello Dheeraj! We loved your profile and would like to discuss an opportunity."
    }
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/contact", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "Thank you" in data["message"]

@pytest.mark.asyncio
async def test_submit_contact_validation_error():
    payload = {
        "name": "J",  # too short
        "email": "invalid-email",
        "message": "Hi"  # too short
    }
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/contact", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == 422
