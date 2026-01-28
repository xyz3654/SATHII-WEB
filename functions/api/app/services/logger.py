import httpx
import os
import datetime
from typing import Optional

GOOGLE_SHEET_URL = os.getenv("GOOGLE_SHEET_URL")

async def log_to_google_sheet(
    user_name: str,
    language: str,
    path: str,
    mode: str,
    user_query: str,
    ai_response: str,
    session_id: str = "N/A"
):
    if not GOOGLE_SHEET_URL:
        print("Logging skipped: GOOGLE_SHEET_URL not set.")
        return

    data = {
        "timestamp": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user_name": user_name,
        "language": language,
        "selected_path": path,
        "mode": mode,
        "user_query": user_query,
        "ai_response": ai_response,
        "session_id": session_id
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(GOOGLE_SHEET_URL, json=data)
            if response.status_code == 200:
                print("Successfully logged to Google Sheet.")
            else:
                print(f"Failed to log to Google Sheet: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error logging to Google Sheet: {str(e)}")
