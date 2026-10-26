@echo off
setlocal
cd /d "%~dp0"
if not exist "tools\prototype-server.mjs" (
  echo Servidor do prototipo nao encontrado.
  pause
  exit /b 1
)
start "GORDON prototype server" powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "Set-Location -LiteralPath '%~dp0'; node tools/prototype-server.mjs"
timeout /t 2 /nobreak >nul
start "GORDON v0.5" http://localhost:4174/v0.5.html
echo.
echo Servidor GORDON iniciado em http://localhost:4174/
echo Catalogo: http://localhost:4174/
echo Protótipo V0.5: http://localhost:4174/v0.5.html
echo Feche a janela do servidor quando terminar.
pause
