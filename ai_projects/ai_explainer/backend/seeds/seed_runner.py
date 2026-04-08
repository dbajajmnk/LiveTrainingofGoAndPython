"""Seed runner entrypoint for MongoDB data."""

from __future__ import annotations

import asyncio

from core.database import client
from seeds.seed_open_ai_mastery import seed_open_ai_mastery


async def run_all() -> None:
    await seed_open_ai_mastery(verbose=True)


def main() -> None:
    try:
        asyncio.run(run_all())
    finally:
        # Ensure clean shutdown for Motor
        client.close()


if __name__ == "__main__":
    main()

