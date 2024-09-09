import { AssetManager } from "./assetManager.js"
import { GameObject } from "./gameObject.js"

export class Particle extends GameObject{
    constructor(game, x, y){
        super(game, x, y);
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random();
        this.speedBuffer = 100;
        this.free = false;
    }
     
}

export class Dust extends Particle{
    constructor(game, x, y){
        super(game, x, y);
        this.speedX = this.game.randomFloat(-2.5, -0.1)
        this.speedY = this.game.randomFloat(-0.1, -0.7)
        this.speedBuffer = 45;
        this.radius = this.game.randomInt(10, 25);
        this.minRadius = this.game.randomFloat(this.radius*0.3, this.radius*0.7);
        this.color = "rgba(0,0, 0, 0.05)";
       // this.color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
        this.free = true;
    }
    
    render(ctx){
        if(!this.free){
            ctx.save()
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(
                -this.game.camera.viewportX + this.x,
                -this.game.camera.viewportY + this.y,
                this.radius,
                0,
                Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        
    }
    
    update(deltaTime) {
        if (!this.free) {
            this.radius -= 0.1
            this.x += this.speedX * (deltaTime / 1000) * this.speedBuffer;
            this.y += this.speedY * (deltaTime / 1000) * this.speedBuffer;
        }
        //reset particles
        if ( this.radius < this.minRadius) {
            this.reset();
        }
    }
    
    start(x, y) {
        this.x = x;
        this.y = y;

        this.free = false;
    }
    
    reset(){
        if(this.game.input.lastKey === "right") this.speedX = this.game.randomFloat(-2.5, -0.5);
        if(this.game.input.lastKey === "left") this.speedX = this.game.randomFloat(0.5, 2.5);
        this.speedY = this.game.randomFloat(-0.5, 0.5)
        this.radius = this.game.randomFloat(10, 35);
        this.minRadius = this.game.randomFloat(this.radius*0.3, this.radius*0.7);
        
        this.free = true;
    }
    
}
 
 
export class Star extends Particle{
    constructor(game, x, y){
        super(game, x, y)
        this.image = this.game.assetManager.images[8];
        this.imageIndex = this.game.assetManager.images.indexOf(this.image);
        this.dimensions = this.game.assetManager.imageDimensions[this.imageIndex];
        this.imageWidth = this.dimensions[0];
        this.imageHeight = this.dimensions[1]; 
        this.width = this.imageWidth;
        this.height = this.imageHeight;
        
        this.speedX = this.game.randomFloat(-1, 1);
        this.speedY = this.game.randomFloat(0, 1);
        this.speedBuffer = 45;
        this.minWidth = this.game.randomInt(5, this.width*0.5)
        this.minHeight = this.game.randomInt(5, this.width*0.5)
        
        this.free = true;
    }
    render(ctx){
        if(!this.free){
            if ( (this.width < this.minWidth ||
                  this.height < this.minHeight) ){ return; } 
            ctx.drawImage(
            this.image,
            -this.game.camera.viewportX + this.x,
            -this.game.camera.viewportY + this.y,
            this.width,
            this.height
            ); 
        }

    }
    
    start(x, y){
        this.x = x - this.width * 0.5;
        this.y = y + this.height;
         
        this.free = false;
    }
    
    reset(){
        this.speedX = this.game.randomFloat(-1, 1);
        this.speedY = this.game.randomFloat(0, 1);
        this.width = this.imageWidth;
        this.height = this.imageHeight;
        this.minWidth = this.game.randomInt(5, this.width*0.5)
        this.minHeight = this.game.randomInt(5, this.width*0.5)
        
        this.free = true;
    }
    
    update(deltaTime){
        if(!this.free){
            this.width -= Math.random() * 0.1  + 0.1;
            this.height -= Math.random() * 0.1 + 0.1;
            
            this.x+= this.speedX * (deltaTime/1000) * this.speedBuffer;
            this.y+= this.speedY * (deltaTime/1000) * this.speedBuffer;
        }
        //reset particles when player jumps up
        if ( (this.width < this.minWidth ||
             this.height < this.minHeight) && this.game.player.jumpCount > 0){
                 this.reset();
             }
    }
}