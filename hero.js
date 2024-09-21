import { Character } from "./character.js";

export class Hero extends Character{
    constructor(game){
        super(game);
        this.image = this.game.assetManager.images[9];
        this.alive = true;
        this.staggerSpeed = 25;
        this.lives = 8;
        this.maxLives = 10;
        this.healthbarPadding = 5;
        this.energy = 50;
        this.maxEnergy = 250;
        this.damage = 10;
        this.healthCounter = 0;
        this.healthInterval = 5000;
        this.healthUpdate = true;
        this.hit = false;
        //scoreboard
        this.score = 0;
        this.state = "idleLeft"
    }
    
    reset(){
        this.x = this.y = 0;
    }
    autoReplenishEnergy(){
        if( (this.energy < this.maxEnergy) ){
            this.energy+= 0.1;
        }
    }
    depleteEnergy(){
    }
    autoReplenishHealth(deltaTime){
        if(this.healthCounter < this.healthInterval){
            this.healthCounter+= deltaTime;
            this.healthUpdate = false;
        }
        else{
            this.healthCounter = 0;
            this.healthUpdate = true;

            if(this.lives < this.maxLives){
                this.lives+= 1;
            }
        }
    }
    updatehitboxes(){
        this.collisionbox = {
            x: this.x+135,
            y: this.y+115,
            width: this.width-170,
            height: this.height-130
        }
        //adjust attack box for proper collision detection
        if(this.lastDirection=="right"){
            this.attackbox = {
                x: this.collisionbox.x+this.collisionbox.width,
                y: this.collisionbox.y,
                width: this.collisionbox.width+50,
                height: this.height-180
            }
        }
        else{
            this.attackbox = {
                x: this.collisionbox.x-this.collisionbox.width-50,
                y: this.collisionbox.y,
                width: this.collisionbox.width+50,
                height: this.game.player.attackbox.height
            }
        }        
    }

    update(deltaTime){
        //hero's state-changing no longer called here
        //this.game.heroStateMachine.currentState.changeBehaviour(enemy, deltaTime);
        this.autoReplenishEnergy();
        this.autoReplenishHealth(deltaTime);
        
        this.game.player.handleInputSideways();
        this.game.player.handleDoubleJump();

        super.update(deltaTime);
    }
}

class HeroState{
    constructor(game){
        this.game  = game;
    }
    animationExecuted(){
        return this.game.player.frameX === this.game.player.frames - 1;
    }
}

export class HeroAttack1Right extends HeroState{
    enter(){
        this.game.player.setSprite(0, 6);
        this.game.input.keypressed = false;
        this.game.player.staggerSpeed = 80;
        this.game.player.state = "attack1Right"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
            if(this.animationExecuted()){
                this.game.heroStateMachine.enterState(new HeroIdleRight(this.game));
            }
    }
}

export class HeroAttack1Left extends HeroState{
    enter(){
        this.game.player.setSprite(1, 6);
        this.game.input.keypressed = false;
        this.game.player.staggerSpeed = 80;
        this.game.player.state = "attack1Left"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
            if(this.animationExecuted()){
                this.game.heroStateMachine.enterState(new HeroIdleLeft(this.game));
            }
    }
}

export class HeroAttack2Right extends HeroState{
    enter(){
        this.game.player.setSprite(2, 6);
        this.game.input.keypressed = false;
        this.game.player.staggerSpeed = 80;
        this.game.player.state = "attaxk2Right"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        
            if(this.animationExecuted()){
                this.game.heroStateMachine.enterState(new HeroIdleRight(this.game));
            }
    }
}

export class HeroAttack2Left extends HeroState{
    enter(){
        this.game.player.setSprite(3, 6);
        this.game.input.keypressed = false;
        this.game.player.staggerSpeed = 80;
        this.game.player.state = "attack2Left"
    }

    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
            if(this.animationExecuted()){
                this.game.heroStateMachine.enterState(new HeroIdleLeft(this.game));
            }
    }
}

export class HeroDeathRight extends HeroState{
    enter(){
        this.game.enemy.alive = false;
        this.game.player.setSprite(4, 4);
        this.game.player.staggerSpeed = 220;
        this.game.player.state = "deathRight"
    }
    changeBehaviour(enemy, deltaTime){

    }
}
export class HeroDeathLeft extends HeroState{
    enter(){
        this.game.enemy.alive = false;
        this.game.player.setSprite(5, 4);
        this.game.player.staggerSpeed = 220;
        this.game.player.state = "deathLeft"
    }
    changeBehaviour(enemy, deltaTime){

    }
}
export class HeroFallRight extends HeroState{
    enter(){
        this.game.player.setSprite(6, 2);
        this.game.player.staggerSpeed = 160;
        this.game.player.state = "fallRight"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        //switches to other side
        if (this.game.input.keys[0] == "left" || this.game.input.keys[0] == "ArrowLeft") {
            this.game.heroStateMachine.enterState(new HeroFallLeft(this.game));
        }
        //player goes idle
        if(player.speedY === 0) this.game.heroStateMachine.enterState(new HeroIdleRight(this.game));
        //player attacks while falling
        if((this.game.input.keys[0] === "Shift" || this.game.input.keys[0] === "slash") && this.game.input.keypressed){
            if(Math.random() < 0.5){
                this.game.heroStateMachine.enterState(new HeroAttack1Right(this.game));
            }
            else{
                this.game.heroStateMachine.enterState(new HeroAttack2Right(this.game));
            }
        }
    }
}
class HeroFallLeft extends HeroState{
    enter(){
        this.game.player.setSprite(7, 2);
        this.game.player.staggerSpeed = 160;
        this.game.player.state = "fallLeft"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        //switches to other side
        if(this.game.input.keys[0] == "right" || this.game.input.keys[0] == "ArrowRight"){
            this.game.heroStateMachine.enterState(new HeroFallRight(this.game));
         }
        //player goes idle
        if(player.speedY === 0) this.game.heroStateMachine.enterState(new HeroIdleLeft(this.game));
        //player attacks while falling
        if((this.game.input.keys[0] === "Shift" || this.game.input.keys[0] === "slash") && this.game.input.keypressed){
            if(Math.random() < 0.5){
                this.game.heroStateMachine.enterState(new HeroAttack1Left(this.game));
            }
            else{
                this.game.heroStateMachine.enterState(new HeroAttack2Left(this.game));
            }
        }
    }
}
class HeroIdleRight extends HeroState{
    enter(){
        this.game.player.setSprite(8, 8);
        this.game.player.staggerSpeed = 80;
        this.game.player.state = "idleRight"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        
        //player switches to the other side
        if(player.speedX < 0) this.game.heroStateMachine.enterState(new HeroIdleLeft(this.game));
        //payer runs
        if(player.speedX > 0) this.game.heroStateMachine.enterState(new HeroRunRight(this.game));
        //player jumps
        if(player.speedY < 0) this.game.heroStateMachine.enterState(new HeroJumpRight(this.game));
        //player attacks
        if((this.game.input.keys[0] === "Shift" || this.game.input.keys[0] === "slash") && this.game.input.keypressed){
            if(Math.random() < 0.5){
                this.game.heroStateMachine.enterState(new HeroAttack1Right(this.game));
            }
            else{
                this.game.heroStateMachine.enterState(new HeroAttack2Right(this.game));
            }
        }
    }
}
class HeroIdleLeft extends HeroState{
    enter(){
        this.game.player.setSprite(9, 8);
        this.game.player.staggerSpeed = 80;
        this.game.player.state = "idleLeft"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        
        //player switches to the other side
        if(player.speedX > 0) this.game.heroStateMachine.enterState(new HeroIdleRight(this.game));
        //player runs
        if(player.speedX < 0) this.game.heroStateMachine.enterState(new HeroRunLeft(this.game));
        //player jumps
        if(player.speedY < 0) this.game.heroStateMachine.enterState(new HeroJumpLeft(this.game));
        //player attacks
        if((this.game.input.keys[0] === "Shift" || this.game.input.keys[0] === "slash") && this.game.input.keypressed){
            if(Math.random() < 0.5){
                this.game.heroStateMachine.enterState(new HeroAttack1Left(this.game));
            }
            else{
                this.game.heroStateMachine.enterState(new HeroAttack2Left(this.game));
            }
        }
    }
}
class HeroJumpRight extends HeroState{
    enter(){
        this.game.player.setSprite(10, 2);
        this.game.player.staggerSpeed = 160;
        this.game.player.state = "jumpRight"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        //switches to other side
        if(this.game.input.keys[0] == "left" || this.game.input.keys[0] == "ArrowLeft"){
            this.game.heroStateMachine.enterState(new HeroJumpLeft(this.game));
        }
        //player falls
        if(Math.floor(player.speedY) === 0) this.game.heroStateMachine.enterState(new HeroFallRight(this.game));
        //player attacks while jumping
        if((this.game.input.keys[0] === "Shift" || this.game.input.keys[0] === "slash") && this.game.input.keypressed){
            if(Math.random() < 0.5){
                this.game.heroStateMachine.enterState(new HeroAttack1Right(this.game));
            }
            else{
                this.game.heroStateMachine.enterState(new HeroAttack2Right(this.game));
            }
        }
    }
}
class HeroJumpLeft extends HeroState{
    enter(){
        this.game.player.setSprite(11, 2);
        this.game.player.staggerSpeed = 160;
        this.game.player.state = "jumpLeft"
    }

    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        //switches to other side
        if(this.game.input.keys[0] == "right" || this.game.input.keys[0] == "ArrowRight"){
            this.game.heroStateMachine.enterState(new HeroJumpRight(this.game));
        }
        //player falls
        if(Math.floor(player.speedY) === 0) this.game.heroStateMachine.enterState(new HeroFallLeft(this.game));
        //player attacks while jumping
        if((this.game.input.keys[0] === "Shift" || this.game.input.keys[0] === "slash") && this.game.input.keypressed){
            if(Math.random() < 0.5){
                this.game.heroStateMachine.enterState(new HeroAttack1Left(this.game));
            }
            else{
                this.game.heroStateMachine.enterState(new HeroAttack2Left(this.game));
            }
        }
    }
}
class HeroRunRight extends HeroState{
    enter(){
        this.game.player.setSprite(12, 8);
        this.game.player.staggerSpeed = 25;
        this.game.player.state = "runRight"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        
        //player goes back to idle
        if(player.speedX === 0) this.game.heroStateMachine.enterState(new HeroIdleRight(this.game));
    }
    
}
class HeroRunLeft extends HeroState{
    enter(){
        this.game.player.setSprite(13, 8);
        this.game.player.staggerSpeed = 25;
        this.game.player.state = "runLeft"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        
        //player goes back to idle
        if(player.speedX === 0) this.game.heroStateMachine.enterState(new HeroIdleLeft(this.game));
    }
}
export class HeroTakeHitWhiteRight extends HeroState{
    enter(){
        this.game.player.setSprite(16, 4);
        this.game.player.staggerSpeed = 160;
        this.game.player.state = "takeHitWhiteRight"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        
       
        //player dies
        if(player.lives <=0){
            this.game.heroStateMachine.enterState(new HeroDeathRight(this.game));
        }
        else{
            //player goes back to idle
            if(this.animationExecuted()){
                this.game.heroStateMachine.enterState(new HeroIdleRight(this.game));
            }
        }
    }
}
export class HeroTakeHitWhiteLeft extends HeroState{
    enter(){
        this.game.player.setSprite(17, 4);
        this.game.player.staggerSpeed = 160;
        this.game.player.state = "takeHitWhiteLeft"
    }
    changeBehaviour(enemy, deltaTime){
        const player = this.game.player;
        
        //player dies
        if(player.lives <=0){
            this.game.heroStateMachine.enterState(new HeroDeathLeft(this.game));
        }
        //player goes back to idle
        else{
            if (this.animationExecuted()){
                this.game.heroStateMachine.enterState(new HeroIdleLeft(this.game));
            }
        }
        
    }
}

export class HeroStateMachine{
    constructor(game){
        this.game = game;
        this.currentState = new HeroIdleRight(game);
        this.currentState.enter();
    }

    enterState(state){
        this.currentState = state;
        this.currentState.enter();
    }
}