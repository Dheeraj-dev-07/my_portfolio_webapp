import json
import os
from typing import Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings
from app.core.logging import logger

PORTFOLIO_COLLECTIONS = ["profile", "skills", "experience", "education", "certifications", "achievements"]

class DatabaseManager:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None
    fallback_data: Dict[str, Any] = {}

    @classmethod
    def load_seed_data(cls) -> Dict[str, Any]:
        seed_path = os.path.join(os.path.dirname(__file__), "..", "data", "seed_data.json")
        if os.path.exists(seed_path):
            with open(seed_path, "r", encoding="utf-8") as f:
                return json.load(f)
        return {}

    @classmethod
    async def connect_db(cls):
        if not cls.fallback_data:
            cls.fallback_data = cls.load_seed_data()
        try:
            cls.client = AsyncIOMotorClient(
                settings.MONGODB_URL,
                serverSelectionTimeoutMS=2000
            )
            cls.db = cls.client[settings.DATABASE_NAME]
            await cls.client.admin.command('ping')
            logger.info("Connected successfully to MongoDB")
            await cls.seed_mongodb()
        except Exception as e:
            logger.warning(f"MongoDB connection failed: {e}. Falling back to in-memory seed data.")
            cls.client = None
            cls.db = None

    @classmethod
    async def seed_mongodb(cls, force: bool = False):
        if not cls.db or not cls.fallback_data:
            return
        
        current_version = cls.fallback_data.get("seed_version", 1)
        meta_col = cls.db["meta"]
        meta_doc = await meta_col.find_one({"key": "seed_version"})
        stored_version = meta_doc.get("version") if meta_doc else None

        if force or stored_version != current_version:
            logger.info(f"Reseeding MongoDB collections (stored version: {stored_version}, current version: {current_version}, force: {force})")
            for key in PORTFOLIO_COLLECTIONS:
                if key in cls.fallback_data:
                    collection = cls.db[key]
                    await collection.delete_many({})
                    data = cls.fallback_data[key]
                    if isinstance(data, list):
                        if data:
                            await collection.insert_many(data)
                    else:
                        await collection.insert_one(data)
                    logger.info(f"Seeded MongoDB collection: {key}")
            await meta_col.update_one(
                {"key": "seed_version"},
                {"$set": {"key": "seed_version", "version": current_version}},
                upsert=True
            )
        else:
            logger.info(f"MongoDB data is up to date (seed_version: {current_version})")

    @classmethod
    async def close_db(cls):
        if cls.client:
            cls.client.close()
            logger.info("Closed MongoDB connection")

    @classmethod
    async def get_data(cls, collection_name: str) -> Any:
        if not cls.fallback_data:
            cls.fallback_data = cls.load_seed_data()
            
        if cls.db:
            try:
                collection = cls.db[collection_name]
                if collection_name in ["profile", "skills"]:
                    doc = await collection.find_one({}, {"_id": 0})
                    if doc:
                        return doc
                else:
                    cursor = collection.find({}, {"_id": 0})
                    items = await cursor.to_list(length=100)
                    if items:
                        return items
            except Exception as e:
                logger.error(f"Error fetching from MongoDB for {collection_name}: {e}")
        
        return cls.fallback_data.get(collection_name)

db_manager = DatabaseManager()
db_manager.fallback_data = db_manager.load_seed_data()
