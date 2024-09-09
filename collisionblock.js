import { Rectangle } from "./rectangle.js"


export class CollisionBlock{
    constructor(game){
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.color = "rgba(0,0,255, 1)";
        this.collisionbox = {
            x: this.x, 
            y: this.y, 
            width: this.width, 
            height: this.height - 25
        }
    }
    //cross-platform
    create(map2D){
        const blocks = [];
        const rows = map2D.length;
        for(let row = 0; row < rows; ++row){
                
            const columns = map2D[row].length;
            for(let col = 0; col < columns; ++col){
                    
                const data = map2D[row][col];
                this.y = row;
                this.x = col;
                if(data === 999){
                    blocks.push(new Rectangle(
                        (this.x * this.game.tileSize),
                        (this.y * this.game.tileSize),
                        this.game.tileSize, 
                        this.game.tileSize)
                        );
                    }
                }
            }
            return blocks;
    }
    //(JS) Javascript-only
    jsCreate(map2D){
        const blocks = [];
        map2D.forEach((row, y)=>{
            row.forEach((data, x)=>{
                this.x = x;
                this.y = y;
                if(data === 999){
                    blocks.push(new Rectangle(
                        (this.x * this.game.tileSize),
                        (this.y * this.game.tileSize),
                        this.game.tileSize,
                        this.game.tileSize)
                        )
                }
            })
        })
        
        return blocks;
        }
    updateHitbox(){
        this.collisionbox = {
            x: this.x, 
            y: this.y, 
            width: this.width, 
            height: this.height - 25
        }
    }    

    render(map2D, ctx){
        map2D.forEach((row, y)=>{
            row.forEach((data, x)=>{
                this.x = x;
                this.y = y;
                if(data === 999){
                    //render blocks
                    ctx.fillStyle = this.color;
                    ctx.fillRect(
                        -this.game.camera.viewportX + this.x  * this.game.tileSize,
                        -this.game.camera.viewportY + this.y * this.game.tileSize, 
                        this.game.tileSize, 
                        this.game.tileSize)
                }
            })
        })
    }
    update(deltaTime){
        this.updateHitbox();
    }
        
}


class MovingCollisionBlock{
    constructor(game, image, x, y){
        this.game = game;
        this.image = image;
        this.imageIndex = this.game.assetManager.images.indexOf(this.image);
        this.dimensions = this.game.assetManager.imageDimensions[this.imageIndex];
        this.imageWidth = this.dimensions[0];
        this.imageHeight = this.dimensions[1]; 
        this.width = this.imageWidth * 2.5;
        this.height = this.imageHeight * 2.5;
        this.x = x * this.game.tileSize;
        this.y = y * this.game.tileSize;
        this.speedX = 0;
        this.speedY = 0;
        this.speedBufferX = this.speedBufferY = 80;
        
        this.minX = this.x;
        this.minY = this.y;
        this.maxX = undefined;
        this.maxY = undefined;
        
        this.collisionbox = {
            x: this.x, 
            y: this.y, 
            width: this.width, 
            height: this.height - 25
        }
    }
    
    updateHitbox(){
        this.collisionbox = {
            x: this.x, 
            y: this.y, 
            width: this.width, 
            height: this.height - 25
        }
    }
    render(ctx){
        ctx.drawImage(
            this.image,
            -this.game.camera.viewportX + this.x, 
            -this.game.camera.viewportY + this.y, 
            this.width,
            this.height
            );
        /*ctx.fillStyle = "gold"
        ctx.fillRect(            
            -this.game.camera.viewportX + this.collisionbox.x, 
            -this.game.camera.viewportY + this.collisionbox.y, 
            this.collisionbox.width,
            this.collisionbox.height
            );
        */   
    }
    
    update(deltaTime){
        //update x and y
       this.updateHitbox();
       this.x += this.speedX * (deltaTime/1000) * this.speedBufferX;
       this.y += this.speedY * (deltaTime/1000) * this.speedBufferY;
       
       //lock x and y
       if (this.x + this.width > this.maxX || this.x < this.minX) {
           this.speedX *= -1;
       }
       if (this.y + this.height > this.maxY || this.y < this.minY) {
           this.speedY *= -1;
       }
    }
}

export class HorizontallyMovingCollisionBlock extends MovingCollisionBlock{
    constructor(game, image, x, y, maxX){
        super(game, image, x, y);
        this.maxX = maxX * this.game.tileSize;
        this.speedX = 1;
    }
}

export class VerticallyMovingCollisionBlock extends MovingCollisionBlock{
    constructor(game, image, x, y, maxY){
        super(game, image, x, y);
        this.maxY = maxY * this.game.tileSize;
        this.speedY = 1;
    }
}