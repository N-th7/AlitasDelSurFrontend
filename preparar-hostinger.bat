@echo off
title 📦 Preparar Frontend para Hostinger
color 0A

echo ============================================
echo 📦 PREPARANDO FRONTEND PARA HOSTINGER
echo ============================================
echo.

cd /d "d:\AlitasSoft\frontend\build"

echo 📁 Archivos listos para subir:
dir /B

echo.
echo 💡 INSTRUCCIONES HOSTINGER:
echo.
echo 1️⃣ Comprimir TODO el contenido de esta carpeta:
echo    📂 d:\AlitasSoft\frontend\build\
echo.
echo 2️⃣ Subir a la carpeta raíz de tu dominio en Hostinger:
echo    📂 public_html/ 
echo    (o la carpeta donde esté configurado admin.alitasdelsur.com)
echo.
echo 3️⃣ Extraer el ZIP directamente en public_html/
echo.
echo ✅ CONFIGURACIÓN YA INCLUIDA:
echo    - REACT_APP_PRINT_SERVER_URL=http://192.168.100.7:3001
echo    - Sistema de fallback configurado
echo    - Sin ngrok necesario
echo.

set /p CREATE_ZIP="¿Crear ZIP automáticamente? (y/n): "
if /i "%CREATE_ZIP%"=="y" (
    echo 📦 Creando frontend-hostinger.zip...
    powershell Compress-Archive -Path ".\*" -DestinationPath "..\frontend-hostinger.zip" -Force
    echo ✅ Archivo creado: d:\AlitasSoft\frontend\frontend-hostinger.zip
    echo.
    echo 🌐 ¡Listo para subir a Hostinger!
) else (
    echo 💡 Crea manualmente un ZIP de todos estos archivos
)

pause