import asyncio
import sys
import os

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.db import db_manager
from app.core.logging import logger

async def main():
    logger.info("Connecting to DB for manual reseed...")
    await db_manager.connect_db()
    if db_manager.db:
        logger.info("Forcing reseed of portfolio collections...")
        await db_manager.seed_mongodb(force=True)
        logger.info("Reseed completed successfully.")
    else:
        logger.warning("MongoDB not connected. Seed data loaded in-memory only.")
    await db_manager.close_db()

if __name__ == "__main__":
    asyncio.run(main())
