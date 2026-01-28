@echo off
echo ===================================================
echo   SATHII TUNNEL GENERATOR
echo ===================================================
echo.
echo This window will generate a PUBLIC URL for your backend.
echo.
echo 1. Wait for a URL to appear below (it will look like https://some-name.loca.lt)
echo 2. COPY that URL.
echo 3. KEEP THIS WINDOW OPEN! If you close it, the site will stop working.
echo.
echo Starting tunnel...
call npx localtunnel --port 8000
pause
