import os
import sys

# Add the current directory to sys.path so 'app' can be found
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from mangum import Mangum
from app.main import app

# This is the entry point for Netlify Functions
handler = Mangum(app)
