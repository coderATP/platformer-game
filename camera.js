export class Camera{
    constructor(game, viewportX, viewportY, viewportWidth, viewportHeight, worldWidth, worldHeight){
        this.game = game;
        
        this.xDeadZone = this.game.width * 0.5;
        this.yDeadZone = this.game.height * 0.5;
        
        this.viewportX = viewportX || 0;
        this.viewportY = viewportY || 0;
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        this.cameraPerson = null;
        
        this.lerp = 0.1 ;
    }
    
    follow(cameraPerson){
        this.cameraPerson = cameraPerson;
    }
    
    update(deltaTime){
        //update viewportX and viewportY (this idea came from Drew Conley, Frank Dvorak and Phaser Community)
        this.viewportX -= (this.viewportX - this.cameraPerson.centreX + this.xDeadZone ) * this.lerp;
        this.viewportY -= (this.viewportY - this.cameraPerson.centreY + this.yDeadZone ) * this.lerp;
 
        //lock viewport within world (credit to Frank for these two 'neat' lines of code)
        this.viewportX = Math.max(0, Math.min(this.viewportX, this.worldWidth - this.viewportWidth));
        this.viewportY = Math.max(0, Math.min(this.viewportY, this.worldHeight - this.viewportHeight));
    }
}