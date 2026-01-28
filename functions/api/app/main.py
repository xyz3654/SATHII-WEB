from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from app.models import GuidanceRequest, GuidanceResponse
from app.services.llm import get_shathi_guidance
from app.services.logger import log_to_google_sheet
import uvicorn

app = FastAPI(title="Sathi Backend")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "message": "Sathi API is live on Netlify"}

@app.post("/api/guidance")
@app.post("/guidance")
async def seek_guidance(request: GuidanceRequest, background_tasks: BackgroundTasks):
    try:
        response_text = await get_shathi_guidance(
            name=request.name,
            path=request.path,
            language=request.language,
            mode=request.mode,
            message=request.message,
            history=request.history
        )
        
        # Log to Google Sheets in the background
        background_tasks.add_task(
            log_to_google_sheet,
            user_name=request.name,
            language=request.language,
            path=request.path,
            mode=request.mode,
            user_query=request.message,
            ai_response=response_text,
            session_id="session_" + request.name[:3] # Simple session ID for now
        )
        
        return GuidanceResponse(response=response_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
