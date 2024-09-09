Platformer Game version 9.0
UPDATES:
1. (re-)building and/or (re-)styling the LEVELSELECTION, PAUSE, and CONFIRM PAUSE/main menu states 
2. LEVELCOMPLETION state now works as expected
3. added two tushy fonts (Mario_World_Pixel_Color and Angry_Birds fonts)
4. player and enemies are now 1.5 times BIGGER!
5. DEVELOPER mode: the y-button is the temporary debug button for touchscreen and key "d" still for keyboard user.
  go to ./index.html file, line 66, col 42 and remove disabled property to activate debug for touchscreen
6. While in the air, player can now switch to the other side.
7. Created the OPTIONS STATE simply to adjust volumes for now.

TO-DO:
1. tweak the camera class until a smooth effect will be created.
2. add multiple background layers and enable parallax scrolling effect.
3. dead player and enemy will now be recovered and respawned where appropriate
4. add interesting and scintillating player abilities such as:
    a. teleport and stealth attacks;
    b. during tough battles, player can create a clone of itself,
       or summon some creatures to help easily ward off enemy attacks.
5. player respawns some distance from where it died (my player shouldn't die yet, 😏.) 
6. change the enemies position as player enters a new level ( when my laptop is charged, I'll set that using Tiled)
7. player's health and energy are restored only when
   none of the active enemies are nearby
   
   
NOTES ON BUG FIXES:
1. Enemies not responding appropriately
   //to fix the bugs in enemy-pool's state design, I had to 
   redefine the enemy-pool-state-machine thus:
    (a) each enemy in the pool enters a new state when certain conditions are met,
    irrespective of the other enemies.
    (b) player now changes its behaviour in the enemy class, because
    some of its states ( ATTACK ) depend on the enemies' relative positions
    (c) the takeHit function needs to be called directly inside the general update() function, and
    not just when a player gets hit/takes damage (or in any of TakeHit states).
 
2. Map not rendered at origin (0, 0) when player just entered "fresh" PlayState (via main menu or restart)
   //bug was simply fixed (inside ./levels.js) by resetting the camera's viewportX and viewportY to 0 on entering each new level