
  export class Map{
    constructor(game){
        this.game = game;
        this.x = this.y = 0;
        this.image;
        this.width;
        this.height;
        this.imageIndex;
        this.dimensions;
        
        this.set(this.game.assetManager.images[3]);
    }
    
    set(world){
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

//BACKGROUND LAYERS WITH PARALLAX SCROLLING
export class BackgroundLayer{
    constructor(game, speedModifier){
        this.game = game;
        this.speedModifier = speedModifier || 1;
        this.x = this.y = 0;
        this.image;
        this.width;
        this.height;
        this.imageIndex;
        this.dimensions;
        this.speedX = this.speedY = 0;
        this.set(this.game.assetManager.images[3]);
    }
    
    set(world){
        this.image = world;
        //set x and y to 0
        //this.x = this.y = 0; 
        //this.imageIndex = this.game.assetManager.images.indexOf(this.image);
        //this.dimensions = this.game.assetManager.imageDimensions[this.imageIndex];
        //this.width = this.dimensions[0];
        //this.height = this.dimensions[1];
    }
    
    render(ctx){
        ctx.drawImage(
            this.image,
            this.game.camera.viewportX * (this.speedModifier),
            this.game.camera.viewportY * (this.speedModifier),
            this.game.camera.viewportWidth,
            this.game.camera.viewportHeight,
            
            this.x,
            this.y,
            this.game.camera.viewportWidth,
            this.game.camera.viewportHeight
        )
    }
}