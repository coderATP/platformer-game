Platformer Game version 11.0

UPDATES:
1. Camera class tweaked to obtain smooth effect.
2. Added multiple background layers and enabled parallax scrolling effect.

TO-DO:
1. add interesting and scintillating player abilities such as:
    a. teleport and stealth attacks;
    b. during tough battles, player can create a clone of itself,
       or summon some creatures to help easily ward off enemy attacks.
2. player respawns some distance from where it died (my player shouldn't die yet, 😏.) 
3. player's health and energy are restored only when
   none of the active enemies are nearby
   
NOTES ON CAMERA UPDATE
./gameObject.js - introduction of updateCentre() method, which is being updated for characters every animation frame.