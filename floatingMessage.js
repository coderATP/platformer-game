export class FloatingMessage{
    constructor(game, value, sx, sy, dx, dy){
        this.game = game;
        this.value = value;
        this.sx = sx;
        this.sy = sy;
        this.dx = dx;
        this.dy = dy;
        this.timer = 0;
        this.markedForDeletion = false;
    }
    
    render(ctx){
        ctx.font = "15px Arial";
        ctx.fillStyle = "gold"; 
        ctx.fillText(this.value, -this.game.camera.viewportX+this.sx, -this.game.camera.viewportY+this.sy);
        ctx.fillStyle = "green"; 
        ctx.fillText(this.value, -this.game.camera.viewportX+this.sx+2, -this.game.camera.viewportY+this.sy+2);
   
    }
    
    update(){
        this.timer++;
        this.sx+= (this.dx - this.sx) * 0.03;
        this.sy+= (this.dy - this.sy) * 0.03;
        if(this.timer > 100) this.markedForDeletion = true;
    }
}