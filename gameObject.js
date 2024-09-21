export class GameObject{
    constructor(game){
        this.game = game;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.radius = undefined;
        this.centreX;
        this.centreY;
        this.right;
        this.bottom;
        this.speedX = 0;
        this.speedY = 0;
    }
    updateCentre(){
        this.centreX = this.x + this.width * 0.5;
        this.centreY = this.y + this.height * 0.5;
    }
}