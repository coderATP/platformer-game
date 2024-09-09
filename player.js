
import { GameObject } from "./gameObject.js"
import { Star, Dust} from "./particle.js"
import { lerp } from "./ease.js"



export class Character extends GameObject{
    constructor(game){
        super(game);
        this.image = undefined;
        this.width = 200;
        this.height = 200;
        this.x = this.y = 0;
        this.color = "rgba(255, 255, 255, 0.6)"
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        
        this.speedX =  this.speedY = 0;
        this.speedBufferX = 256;
        this.speedBufferY = 256;
        
        this.gravity = 0.2;
        
        //jump counter
        this.jumpCount = 0;
        this.maxJumps = 2;
        
        //onPlatform

        //particle effects
        this.starParticles = [];
        this.dustParticles = [];
        this.numberOfStarParticles = 10;
        this.numberOfDustParticles = 150;
        this.createPoolOfStars();
        this.createPoolOfDust();
        this.landed = false;

        //frames cropping
        this.frames = undefined;
        this.frameX = 0;
        this.frameY = 0;

        //frames speed
        this.staggerCount = 0;
        this.staggerSpeed = 80;
        this.spriteUpdate = false;
        
        //collisionbox
        this.collisionbox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
         //attackbox
         this.attackbox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
        //last direction
        this.lastDirection = "right";

        //utils, present state
        this.state = undefined;

        //hit, damage, replenish, death...
        this.hit = false;
    }
    
    withinAttackRangeY(opponent){
        return(
               Math.floor(opponent.attackbox.y + opponent.attackbox.height) >= Math.floor(this.collisionbox.y) &&
               Math.floor(opponent.attackbox.y) <= Math.floor(this.collisionbox.y + this.collisionbox.height));
    }
    withinCollisionboxRangeX(opponent){
        return(
               Math.floor(this.collisionbox.x) >= Math.floor(opponent.collisionbox.x) &&
               Math.floor(this.collisionbox.x) <= Math.floor(opponent.collisionbox.x + opponent.collisionbox.width));
    }
    withinCollisionboxRangeY(opponent){
        return(
               Math.floor(this.collisionbox.y) >= Math.floor(opponent.collisionbox.y) &&
               Math.floor(this.collisionbox.y) <= Math.floor(opponent.collisionbox.y + opponent.collisionbox.height));
    }
    withinBattleZone(opponent){
        return  (
            (Math.abs(this.collisionbox.x - opponent.collisionbox.x) < this.game.battleZone &&
             Math.abs(this.collisionbox.y - opponent.collisionbox.y) < this.game.battleZone)
        );
    }
    setSprite(frameY, frames){
        this.frameX = 0;
        this.frameY = frameY;
        this.frames = frames;
    }
    animate(deltaTime){
        if(this.staggerCount < this.staggerSpeed){
            this.staggerCount+= deltaTime;
        }
        else{
            if(this.frameX < this.frames-1) this.frameX++;
            else this.frameX = 0;

            this.staggerCount = 0;
        }
    }
    animationExecuted(){
        return this.frameX === this.frames - 1;
    }

    render(ctx){
        if(this.game.debug){
            //player box
            ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
            ctx.fillRect(
                -this.game.camera.viewportX + this.x,
                -this.game.camera.viewportY + this.y,
                this.width,
                this.height);
            
            //attack box
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.fillRect(
                -this.game.camera.viewportX + this.attackbox.x,
                -this.game.camera.viewportY + this.attackbox.y,
                this.attackbox.width,
                this.attackbox.height);
        }
       
        ctx.drawImage(this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            -this.game.camera.viewportX + this.x,
            -this.game.camera.viewportY + this.y,
            this.width * 1.5,
            this.height * 1.5
            );
        //collisionbox
        if(this.game.debug){
            ctx.fillStyle = this.color;
            ctx.fillRect(
                -this.game.camera.viewportX + this.collisionbox.x,
                -this.game.camera.viewportY + this.collisionbox.y,
                this.collisionbox.width,
                this.collisionbox.height);
        }
      
    }
    
    createPoolOfStars(){
        for(let i = 0; i < this.numberOfStarParticles; ++i ){
            this.starParticles.push(new Star(this.game, this.x, this.y));
        } 
    }
    renderStars(){
        //render star particles upon Player landing
        for (let i = 0; i < this.starParticles.length; ++i) {
            const particle = this.starParticles[i];
            if (particle.free) {
                particle.start(this.collisionbox.x, this.collisionbox.y);
            }
        }
    }
    createPoolOfDust(){
        for(let i = 0; i < this.numberOfDustParticles; ++i ){
            this.dustParticles.push(new Dust(this.game, this.x, this.y));
        } 
    }
    renderDustParticles() {
        //render dust particles upon Player landing
        for (let i = 0; i < this.dustParticles.length; ++i) {
            const particle = this.dustParticles[i];
            if (particle.free) {
                particle.start(this.collisionbox.x + this.collisionbox.width * 0.5, this.collisionbox.y + this.collisionbox.height);
            }
        }
    }

    update(deltaTime){
        //player state behaviour
        this.animate(deltaTime);
        this.x += this.speedX * (deltaTime/1000) * this.speedBufferX;
        this.checkForHorizontalCollision(deltaTime);
        this.applyGravity(deltaTime);
        this.checkForVerticalCollision(deltaTime);
        
        //lock x and y within world
        const offsetRight= (this.x+this.width) - (this.collisionbox.x+this.collisionbox.width);
        const offsetLeft = this.collisionbox.x - this.x;
        const offsetTop = this.collisionbox.y - this.y;
        const offsetBottom= (this.y+this.height) - (this.collisionbox.y+this.collisionbox.height);
        this.x = Math.max(-offsetLeft, Math.min(this.x, this.game.map.width - this.width + offsetRight));
        this.y = Math.max(-offsetTop, Math.min(this.y, this.game.map.height  - this.height + offsetBottom));
    }
    
    applyGravity (deltaTime){
        this.speedY += this.gravity;
        this.y += this.speedY * (deltaTime/1000) * this.speedBufferY; 
    } 
    checkForHorizontalCollision(deltaTime){
        this.game.player.updatehitboxes();
        this.game.enemy.updatehitboxes();
        this.game.enemies.forEach(enemy=>{enemy.updatehitboxes();});
        //player and solid blocks
        for(let i = 0; i  < this.game.solidBlocks.length; ++i){
            let block = this.game.solidBlocks[i];
            if(this.game.rectangularCollision(this.collisionbox, block)){
                
                if(this.speedX > 0){
                    this.speedX = 0;
                    const offset = (this.x+this.width) - (this.collisionbox.x+this.collisionbox.width)

                    this.x = block.x - this.width + offset - 0.01;
                    break;
                }
                else if(this.speedX < 0){
                    this.speedX = 0;
                    const offset = this.collisionbox.x - this.x;

                    this.x = block.x + block.width - offset + 0.01;
                    break;
                }
            }
        }//end
        
        //player and mobile blocks
        for(let i = 0; i  < this.game.mobileBlocks.length; ++i){
            let block = this.game.mobileBlocks[i];
            if(this.game.rectangularCollision(this.collisionbox, block)){
                if(this.speedX > 0){
                    return;
                }
                else if(this.speedX < 0){
                    return;
                }
            }
        }//end
    }
    checkForVerticalCollision(deltaTime){
        this.game.player.updatehitboxes();
        this.game.enemy.updatehitboxes();
        this.game.enemies.forEach(enemy=>{ enemy.updatehitboxes(); })
         //player and blocks one can zoom through
         //immobile
         for(let i = 0; i  < this.game.immobile_liquidBlocks.length; ++i){
            let block = this.game.immobile_liquidBlocks[i];
            if(this.game.rectangularCollision(this.collisionbox, block)){
                if(this.speedY > 0){
                    this.renderStars(); 
                    //if keydown was pressed, zoom down through by doing nothing
                    if(this.game.input.keys[0] === "down" || this.game.input.keys[0] === "ArrowDown"){
                        return;
                    }
                    //collisionbox offset
                    const offset = (this.y+this.height) - (this.collisionbox.y+this.collisionbox.height)
                    this.speedY = 0;
                    this.y = block.y - this.height + offset - 0.01;
                    
                    break;
                }
                //zoom up through the platform by doing nothing
                else if(this.speedY < 0){
                    return;
                }
            }
        }//end
        
        //mobile
        for(let i = 0; i  < this.game.mobileBlocks.length; ++i){
            let block = this.game.mobileBlocks[i];
            if(this.game.rectangularCollision(this.collisionbox, block)){
                if(this.speedY > 0){
                    this.renderStars();
                    //when player is on top of platform, 
                    //make player move horizontally along with block at the same speed
                    this.x += block.speedX * (deltaTime/1000) * block.speedBufferX; 
                    
                    //if keydown was pressed, zoom down through by doing nothing
                    if(this.game.input.keys[0] === "down" || this.game.input.keys[0] === "ArrowDown"){
                        return;
                    }
                    
                    //account also for block's speed of movement
                    this.speedY = 0;
                    const blockSpeedY = block.speedY * (deltaTime/1000) * block.speedBufferY;
                    //collisionbox offset
                    const offset = (this.y+this.height) - (this.collisionbox.y+this.collisionbox.height)

                    this.y = block.y - this.height + offset - 0.01 + blockSpeedY;
                    break;
                }
                //zoom up through the platform by doing nothing
                if(this.speedY < 0){
                    return;
                }
            }
            
        }//end
        
        //solid
        for(let i = 0; i  < this.game.solidBlocks.length; ++i){
            let block = this.game.solidBlocks[i];
            if(this.game.rectangularCollision(this.collisionbox, block)){

                if(this.speedY > 0){
                    //render star particles upon Player landing
                    this.renderStars();

                    //old code
                    this.speedY = 0;
                    //collisionbox offset
                    const offset = (this.y+this.height) - (this.collisionbox.y+this.collisionbox.height)

                    this.y = block.y - this.height + offset - 0.01;
                    break;
                }
                else if(this.speedY < 0){
                    this.speedY = 0;
                    //offset
                    const offset = this.collisionbox.y - this.y;
                    this.y = block.y + block.height - offset + 0.01;
                    break;
                }
                
            }
        }//end
         
    } 
    handleInputSideways(){
        //SINGLE KEYPRESSES
        //left
        if(this.game.input.keys[0] == "left" || this.game.input.keys[0] == "ArrowLeft"){
            this.lastDirection = "left";
            this.speedX = -1
            if(this.onPlatform()) this.renderDustParticles()
        }
        
        //right
        else if( this.game.input.keys[0] == "right" || this.game.input.keys[0] == "ArrowRight"){
            this.lastDirection = "right";
            this.speedX = 1
            //render dust particles on left or right keypresses
            if(this.onPlatform()) this.renderDustParticles();
        }
        //DOUBLE KEYPRESSES
                //jump-and-dash
        //left
        else if((this.game.input.keys[1] == "left" || this.game.input.keys[1] == "ArrowLeft") &&
            ((this.game.input.keys[0] === "up" || this.game.input.keys[0] == "ArrowUp"))){
            this.lastDirection = "left";
            this.speedX = -2
        }
        //right
        else if((this.game.input.keys[1] == "right" || this.game.input.keys[1] == "ArrowRight") &&
            ((this.game.input.keys[0] === "up" || this.game.input.keys[0] == "ArrowUp"))){
            this.lastDirection = "right";
            this.speedX = 2
        }
        //old code jumps instantly to zero
        else this.speedX = 0;
        //new code eases the transition back to zero
        //else this.speedX = lerp(this.speedX, 0, 0.1);
        
    }
    handleDoubleJump(){
        if ((this.game.input.keys[0] === "up" || this.game.input.keys[0] == "ArrowUp") && this.game.input.keypressed && this.jumpCount  < this.maxJumps) {
            this.speedY = -4;
            this.jumpCount++;
            this.game.input.keypressed = false;
        }
        this.resetJumpCounter();
    } 
    onPlatform(){
        return this.speedY === 0;
    } 
    resetJumpCounter(){
        if(this.onPlatform()) this.jumpCount = 0;
    }
}


export class Enemy extends Character{
    constructor(game){
        super(game);
        this.image = this.game.assetManager.images[10];
    }
}