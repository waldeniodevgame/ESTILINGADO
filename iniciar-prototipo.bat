@echo off
setlocal
cd /d "%~dp0"
if not exist "tools\gordon-server.mjs" (
  echo Servidor da build Gordon nao encontrado.
  pause
  exit /b 1
)
start "GORDON build server" powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Set-Location -LiteralPath %~dp0; node tools/gordon-server.mjs"
timeout /t 2 /nobreak >nul
start "GORDON TESTE26" http://localhost:4175/
echo.
echo Build Gordon iniciada em http://localhost:4175/
echo Feche a janela do servidor quando terminar.
pause
