import { lerp } from "./ease.js";

  export class Map{
    constructor(game){
        this.game = game;
        this.x = this.y = 0;
        this.image;
        this.width;
        this.height;
        this.imageIndex;
        this.dimensions;
        
        this.setWorld(this.game.assetManager.images[1]);
    }
    
    setWorld(world){
        this.image = world;
        //set x and y to 0
        this.x = this.y = 0; 
        this.imageIndex = this.game.assetManager.images.indexOf(this.image);
        this.dimensions = this.game.assetManager.imageDimensions[this.imageIndex];
        this.width = this.dimensions[0];
        this.height = this.dimensions[1];
    }
    
    render(ctx){
        ctx.drawImage(this.image, 
            this.game.camera.viewportX,
            this.game.camera.viewportY, 
            this.game.camera.viewportWidth, 
            this.game.camera.viewportHeight,
            
            this.x, 
            this.y, 
            this.game.camera.viewportWidth, 
            this.game.camera.viewportHeight
            )
    }
}

export class Backdrop{
    constructor(game){
        this.game = game;
        this.image;
        this.x = 0;
        this.y = 0;
        this.width;
        this.height;
        this.set(this.game.assetManager.images[2]);
    }

    set(image){
        this.image = image;
        this.imageIndex = this.game.assetManager.images.indexOf(this.image);
        this.dimensions = this.game.assetManager.imageDimensions[this.imageIndex];
        this.width = this.dimensions[0];
        this.height = this.dimensions[1];
    }

    render(ctx){
        ctx.drawImage(
            this.image,
            -this.game.camera.viewportX + this.x,
            -this.game.camera.viewportY + this.y, 
            this.width, 
            this.height)
    }

    update(){
        //lock x and y within world
        this.x = Math.max(0, Math.min(this.x, this.width - this.game.width ));
        this.y = Math.max(0, Math.min(this.y, this.height  - this.game.height ));
    }
}

export class Background extends Backdrop{
    constructor(game){
        super(game);
        this.set(this.game.assetManager.images[0]);
    }
    render(ctx){
        //infinite scrolling (I didnt get parallax effect yet)
        ctx.drawImage(
            this.image,
            -this.game.camera.viewportX + this.x,
            -this.game.camera.viewportY + this.y, 
            this.width, 
            this.height);

            ctx.drawImage(
                this.image,
                -this.game.camera.viewportX + this.x + this.width,
                -this.game.camera.viewportY + this.y, 
                this.width, 
                this.height)
    }

    update(){

        super.update();
    }
}