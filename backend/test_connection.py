import asyncio
import os
import openai
from dotenv import load_dotenv

load_dotenv()

async def test():
    client = openai.AsyncOpenAI(
        api_key=os.getenv("OPENAI_API_KEY"),
        base_url="https://openrouter.ai/api/v1",
        default_headers={
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Sathi - Spiritual Companion",
        }
    )
    
    try:
        response = await client.chat.completions.create(
            model="google/gemini-2.0-flash-001", 
            messages=[{"role": "user", "content": "hi"}],
            temperature=0.7,
            max_tokens=1000
        )
        # Using repr to avoid printing non-ascii directly to console if it exists
        print("SUCCESS:", repr(response.choices[0].message.content))
    except Exception as e:
        print("FAILURE:", type(e).__name__, str(e))

if __name__ == "__main__":
    asyncio.run(test())
