import { Rectangle } from "./rectangle.js"
import { lerp } from "./ease.js"
//This is our Camera class
//game is a reference to (not a copy of) the Game class - the brain box of this programme...
//we need some properties and helper functions out of the Game class.
//viewport represents the screen/canvas;
//world represents the map
//x and y represent the positions
//width and height represent the dimension
//cameraPerson is the gameObject which the camera is currently following
//deadZone is the zone (min:0, max: half of viewportWidth) where camera does not follow the cameraPerson

export class Camera{
    constructor(game, viewportX, viewportY, viewportWidth, viewportHeight, worldWidth, worldHeight){
        this.game = game;
        
        this.xDeadZone = this.yDeadZone = 0;
        
        this.viewportX = viewportX || 0;
        this.viewportY = viewportY || 0;
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;
        
        this.viewportRect = new Rectangle(viewportX, viewportY, viewportWidth, viewportHeight);
        this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
        
        this.cameraPerson = null;
    }
    
    follow(cameraPerson, xDeadZone, yDeadZone){
        this.cameraPerson = cameraPerson;
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    }
    
    update(deltaTime){
        //update viewportX and viewportY
        const farLeft = -this.viewportWidth + this.cameraPerson.x + this.xDeadZone;
        const farRight = this.cameraPerson.x - this.xDeadZone;
        const farTop = -this.viewportHeight + this.cameraPerson.y + this.yDeadZone;
        const farBottom = this.cameraPerson.y - this.yDeadZone;

        if(this.viewportX < farLeft ) this.viewportX = farLeft;
        else if(this.viewportX > farRight) this.viewportX = farRight;
        if(this.viewportY < farTop ) this.viewportY = farTop;
        else if(this.viewportY > farBottom ) this.viewportY = farBottom;        

        //set viewportRect
        this.viewportRect.set(this.viewportX, this.viewportY);
        
        //lock viewport within world
        this.viewportX = Math.max(0, Math.min(this.viewportX, this.worldWidth - this.viewportWidth));
        this.viewportY = Math.max(0, Math.min(this.viewportY, this.worldHeight - this.viewportHeight));
    }
}