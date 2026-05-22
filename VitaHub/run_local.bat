@echo off
echo ===================================================
echo               VitaHub Local Starter
echo ===================================================
echo.
cd /d "%~dp0"

if not exist "node_modules" (
    echo [1/2] Installing dependencies...
    call npm install
) else (
    echo [1/2] Dependencies already installed.
)

echo.
echo [2/2] Starting local development server...
echo.
call npm run dev
