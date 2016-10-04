@echo off
%~d1
cd "%~p1"
START cmd.exe /k "ionic run android -l -c"
