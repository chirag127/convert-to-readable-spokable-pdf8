# Quick Start Server Script for Windows PowerShell
# This script starts a local development server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Spokable PDF - Local Development" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Python is installed
$pythonInstalled = Get-Command python -ErrorAction SilentlyContinue

if ($pythonInstalled) {
    Write-Host "✓ Python detected" -ForegroundColor Green
    Write-Host "Starting server on http://localhost:8000" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""

    # Start Python HTTP server
    python -m http.server 8000
} else {
    Write-Host "✗ Python not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Python or use one of these alternatives:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install Python" -ForegroundColor Cyan
    Write-Host "  Download from: https://www.python.org/downloads/" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2: Use Node.js http-server" -ForegroundColor Cyan
    Write-Host "  npm install -g http-server" -ForegroundColor Gray
    Write-Host "  http-server" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 3: Use PHP" -ForegroundColor Cyan
    Write-Host "  php -S localhost:8000" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 4: Use VS Code Live Server extension" -ForegroundColor Cyan
    Write-Host ""

    Read-Host "Press Enter to exit"
}
