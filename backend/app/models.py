from pydantic import BaseModel
from typing import Optional, List

class UserProfile(BaseModel):
    name: str
    selected_path: str

class GuidanceRequest(BaseModel):
    name: str
    path: str
    language: str
    mode: str
    message: str
    history: Optional[List[dict]] = []

class GuidanceResponse(BaseModel):
    response: str
