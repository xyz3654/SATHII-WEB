from mangum import Mangum
from app.main import app

# This is the entry point for Netlify Functions
handler = Mangum(app)
