#include <Windows.h>
#include <stdio.h>

DWORD fileExists(CONST WCHAR* fn) {
    DWORD attr = GetFileAttributesW(fn);
    return (attr != INVALID_FILE_ATTRIBUTES && !(attr & FILE_ATTRIBUTE_DIRECTORY));
}

int main() {
    if (!(fileExists(L"game-files\\th17.exe") && fileExists(L"game-files\\th17.dat") && fileExists(L"game-files\\thbgm.dat"))) {
        MessageBoxW(NULL, L"Game files are not in the game directory. Make sure that th17.exe, th17.dat and thbgm.dat are all present there. Read README.md for details.", L"Error", MB_OK);
        return 1;
    }
    return system("thcrap\\bin\\thcrap_loader.exe th17 thcrap\\config\\seasonize.js");
}
