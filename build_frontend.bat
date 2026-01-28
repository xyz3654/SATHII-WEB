@echo off
echo ===================================================
echo   SATHII FRONTEND BUILDER
echo ===================================================
echo.
echo 1. Make sure you have pasted the NEW tunnel URL into frontend/.env.production
echo 2. Press any key to start building...
pause
cd frontend
call npm run build -- --outDir ../dist1 --emptyOutDir
echo.
echo ===================================================
echo   BUILD COMPLETE!
echo ===================================================
echo.
echo Now upload the 'dist1' folder to Netlify.
pause
