export class GameObject{
    constructor(game){
        this.game = game;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.radius = undefined;
        this.right;
        this.bottom;
        this.speedX = 0;
        this.speedY = 0;
    }
}