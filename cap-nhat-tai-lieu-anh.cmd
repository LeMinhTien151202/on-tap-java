@echo off
chcp 65001 >nul
cd /d "%~dp0"
python tools\build_image_notes.py
if errorlevel 1 (
  echo.
  echo Khong the cap nhat danh muc anh. Hay kiem tra Python va ten thu muc.
  pause
  exit /b 1
)
echo.
echo Da cap nhat danh muc. Tai lai trang web de xem anh moi.
pause
