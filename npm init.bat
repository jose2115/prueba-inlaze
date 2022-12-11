@echo off
setlocal EnableDelayedExpansion
SET /P s= Initialize npm project? Y-N  
IF /I "!s!"=="y" (
		goto initproject
) ELSE (
		goto installbase
)
:initproject
ECHO ---------------------------------------------------
ECHO ----------- Setting new backend proyect -----------
ECHO ---------------------------------------------------
cmd /C "npm init & timeout /t 1 /nobreak>nul"
:installbase
SET /P s= Install base dependencies? Y-N  
IF /i "!s!"=="n" (goto installdev)
ECHO ---------------------------------------------------
ECHO ---------- Installing Base Dependencies -----------
ECHO ---------------------------------------------------
cmd /C "npm i @babel/plugin-transform-runtime @babel/runtime bcrypt capitalize cookie-parser cors debug dotenv ejs express express-validation express-validator formidable helmet jsonwebtoken jszip morgan multer remove-accents sequelize sequelize-cli uuid winston & timeout /t 1 /nobreak>nul"
:installdev
SET /P s= Install dev dependencies? Y-N  
IF /i "!s!"=="n" (goto optdependecies)
ECHO ---------------------------------------------------
ECHO ---------- Installing Dev Dependencies ------------
ECHO ---------------------------------------------------
cmd /C "npm i --save-dev @babel/cli @babel/core @babel/node @babel/preset-env babel-loader eslint-config-prettier nodemon standard & timeout /t 1 /nobreak>nul"
:optdependecies
SET /P s= Install optional dependencies? Y-N  
IF /i "!s!"=="n" (goto ormdependencies)
ECHO ---------------------------------------------------
ECHO ----------- Dependencias opcionales ---------------
ECHO ---------------------------------------------------
set dependencies= html-pdf nodemailer xls-to-json-lc xlsx-to-json-lc
for %%s in (%dependencies%) do (
	SET /P q= Install dependency: %%s Y/N? 
	IF /i "!q!"=="y" (cmd /C "npm i %%s & timeout /t 1 /nobreak>nul")	
)
:ormdependencies
SET /P s= Install dialect dependencies? Y-N  
IF /i "!s!"=="n" (goto end)
ECHO ---------------------------------------------------
ECHO ---- Instalando dialecto para el ORM sequelize ----
ECHO ---------------------------------------------------
SET /P N= Choose a dialect to work with sequelize: postgresql(1) - mysql(2) - mariadb(3) - sqlite(4) - tedius(5) 
goto case-%N%
:case-1
cmd /C "npm i pg pg-hstore & timeout /t 1 /nobreak>nul"
goto end
:case-2
cmd /C "npm i mysql2 & timeout /t 1 /nobreak>nul"
goto end
:case-3
cmd /C "npm i mariadb & timeout /t 1 /nobreak>nul"
goto end
:case-4
cmd /C "npm i sqlite3 & timeout /t 1 /nobreak>nul"
goto end
:case-5
cmd /C "npm i tedious & timeout /t 1 /nobreak>nul"
goto end

:end
ECHO ---------------------------------------------------
ECHO -------- Backend inicializado con exito -----------
ECHO ---------------------------------------------------
pause
