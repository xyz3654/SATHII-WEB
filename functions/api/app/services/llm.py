import openai
import os
from dotenv import load_dotenv
from app.prompts import SYSTEM_PROMPTS, BASE_STRICT_RULES
from typing import List

load_dotenv()

# Use AsyncOpenAI with OpenRouter configuration
client = openai.AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
    default_headers={
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Sathi - Spiritual Companion", # Use standard hyphen
    }
)

async def get_shathi_guidance(name: str, path: str, language: str, mode: str, message: str, history: List[dict] = []):
    path_config = SYSTEM_PROMPTS.get(path.lower(), SYSTEM_PROMPTS["spiritual"])
    
    system_prompt = f"{path_config['intro']}\n\n"
    system_prompt += f"TONE: {path_config['tone']}\n"
    system_prompt += f"SPECIFIC PATH RULES:\n" + "\n".join([f"- {r}" for r in path_config['rules']]) + "\n"
    system_prompt += f"\nGLOBAL BEHAVIOR RULES:\n{BASE_STRICT_RULES}"
    system_prompt += f"\nUser's preferred name: {name}\nSelected Language: {language}\nSelected Mode: {mode}"

    messages = [{"role": "system", "content": system_prompt}]
    
    # Process history to avoid duplicates
    if history:
        # Filter history to only include items that aren't the current message
        # and limit to last 6 turns for context/memory
        clean_history = [m for m in history if m.get('content') != message]
        messages.extend(clean_history[-6:])
    
    messages.append({"role": "user", "content": message})

    try:
        response = await client.chat.completions.create(
            # Using Gemini 2.0 Flash (Stable) which is generally more reliable
            model="google/gemini-2.0-flash-001", 
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )
        return response.choices[0].message.content
    except Exception as e:
        import traceback
        print(f"Error in LLM service (OpenRouter): {type(e).__name__} - {str(e)}")
        traceback.print_exc()
        return "The wisdom is taking a moment to arrive. Please try again in a moment."
