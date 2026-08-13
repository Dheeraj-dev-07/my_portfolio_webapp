import json
import os
from typing import Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.core.config import settings
from app.core.logging import logger

class DatabaseManager:
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None
    fallback_data: Dict[str, Any] = {}

    @classmethod
    def load_seed_data(cls) -> Dict[str, Any]:
        data_dir = os.path.join(os.path.dirname(__file__), "..", "data")
        master_path = os.path.join(data_dir, "portfolio-site-data.json")
        seed_path = os.path.join(data_dir, "seed_data.json")
        
        result = {}
        if os.path.exists(master_path):
            with open(master_path, "r", encoding="utf-8") as f:
                result = json.load(f)
        elif os.path.exists(seed_path):
            with open(seed_path, "r", encoding="utf-8") as f:
                result = json.load(f)

        # Merge individual modular files if present
        for key in ["profile", "skills", "experience", "education", "certifications", "achievements"]:
            file_path = os.path.join(data_dir, f"{key}.json")
            if os.path.exists(file_path):
                with open(file_path, "r", encoding="utf-8") as f:
                    result[key] = json.load(f)
                    
        return result

    @classmethod
    async def connect_db(cls):
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
    async def seed_mongodb(cls):
        if cls.db is None or not cls.fallback_data:
            return
        
        for key in ["profile", "skills", "experience", "education", "certifications", "achievements"]:
            if key in cls.fallback_data:
                collection = cls.db[key]
                count = await collection.count_documents({})
                if count == 0:
                    data = cls.fallback_data[key]
                    if isinstance(data, list):
                        await collection.insert_many(data)
                    else:
                        await collection.insert_one(data)
                    logger.info(f"Seeded MongoDB collection: {key}")

    @classmethod
    async def close_db(cls):
        if cls.client is not None:
            cls.client.close()
            logger.info("Closed MongoDB connection")

    @classmethod
    async def get_data(cls, collection_name: str) -> Any:
        if not cls.fallback_data:
            cls.fallback_data = cls.load_seed_data()
            
        if cls.db is not None:
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
# Initialize fallback data immediately
db_manager.fallback_data = db_manager.load_seed_data()
