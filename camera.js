export class Camera{
    constructor(game){
        this.game = game;
        
        this.xDeadZone = this.game.width * 0.5;
        this.yDeadZone = this.game.height * 0.5;
        
        this.viewportX = 0;
        this.viewportY = 0;
        this.viewportWidth = this.game.width;
        this.viewportHeight = this.game.height;
        this.worldWidth = this.game.map.width;
        this.worldHeight = this.game.map.height;

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