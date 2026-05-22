Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "               VitaHub Local Starter" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "[1/2] Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "[1/2] Dependencies already installed!" -ForegroundColor Green
}

Write-Host ""
Write-Host "[2/2] Starting local development server..." -ForegroundColor Yellow
Write-Host ""
npm run dev
