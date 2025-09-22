@echo off
echo ============================================
echo 🚀 OrgChart Project - Start Script (Windows)
echo ============================================

REM Jalankan Backend
echo [1/2] Menjalankan Backend...
cd backend
if not exist node_modules (
  echo >> Install dependencies backend...
  npm install
)
start cmd /k "npm run dev"
cd ..

REM Jalankan Frontend
echo [2/2] Menjalankan Frontend...
cd frontend
if not exist node_modules (
  echo >> Install dependencies frontend...
  npm install
)
start cmd /k "npm run dev"
cd ..

echo ============================================
echo ✅ Backend jalan di: http://localhost:5000
echo ✅ Frontend jalan di: http://localhost:3000
echo ============================================
pause
