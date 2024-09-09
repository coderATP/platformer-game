import { lerp } from "./ease.js";
import { HeroDeathLeft, HeroDeathRight, HeroTakeHitWhiteLeft, HeroTakeHitWhiteRight } from "./hero.js";
import { Character } from "./player.js";

export class Enemy extends Character{
    constructor(game){
        super(game);
        this.game = game;
        this.image = this.game.assetManager.images[10];
        this.damage = 1;
        this.lives = 50;
        this.state = new EnemyIdleLeft(this.game);
        this.maxLives = this.lives;
        this.currentState = "idleLeft";
        this.lastDirection = "left";
        this.frameX = 0;
        this.frameY = 9;
        this.frames = 4;
        this.speedX = 0;
        this.speedBufferX = 80;
        this.hitCount = 0;
        this.free = true;
    }
    

    updatehitboxes(){
        this.collisionbox = {
            x: this.x+90,
            y: this.y+80,
            width: this.width-180,
            height: this.height-152
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

    render(ctx){
        if( (!this.free) ){
            super.render(ctx);
        };
    }

    animationExecuted(){
        return this.frameX === this.frames - 1;
    }

    update(deltaTime){
        if( (!this.free))  {
            super.update(deltaTime);
            this.state.changeBehaviour(deltaTime);
        }
        if(this.lives <= 0 && !this.free){
            //this.reset();
        }
    }

    start(x, y){
        this.x = x;
        this.y = y;
        this.state = new EnemyIdleLeft(this.game);
        this.free = false;
    }

    reset(){
        this.free = true;
     }
     restart(){
        this.enterState (new EnemyIdleLeft(this.game) );
        this.lives = this.maxLives;
        this.x = 100;
        this.y = 200;
        this.free = false;
     }

     enterState(state){
        this.state = state;
        this.state.enter();
    }

}

class EnemyState{
    constructor(game){
        this.game = game;
        this.attackCounter = 0;
        this.attackInterval = 2000;
        this.attackUpdate = false;
    }

    animationExecuted(enemy){
        return enemy.frameX === enemy.frames - 1;
    }

    canAttack(deltaTime){
        if(this.attackCounter < this.attackInterval){
            this.attackCounter+= deltaTime;
            this.attackUpdate = false;
        }
        else{
            this.attackCounter = 0;
            this.attackUpdate = true;
        }
    }
}
export class EnemyAttack1Right extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "attack1Right";
        this.game.enemy.lastDirection = "right";
        this.game.enemy.frameY = 0;
        this.game.enemy.frames = 4;
        this.game.enemy.speedX = 0;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 80;
    }

    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        if(player.lives > 0){
            if(player.lastDirection ==="left"){
                // player.lives -= enemy.damage;
                this.game.heroStateMachine.enterState(new HeroTakeHitWhiteLeft(this.game));
            }
            else{
                // player.lives -= enemy.damage;
                this.game.heroStateMachine.enterState(new HeroTakeHitWhiteRight(this.game));
            }
        }
        else{
            if(player.lastDirection ==="left")
                this.game.heroStateMachine.enterState(new HeroDeathLeft(this.game));
            else
                this.game.heroStateMachine.enterState(new HeroDeathRight(this.game));

        }
        if(this.animationExecuted(enemy)){
            player.lives -= enemy.damage;
            enemy.enterState(new EnemyIdleLeft(this.game))
        }
    }
}
export class EnemyAttack1Left extends EnemyState{
    
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "attack1Left";
        this.game.enemy.lastDirection = "left";
        this.game.enemy.frameY = 1;
        this.game.enemy.frames = 4;
        this.game.enemy.speedX = 0;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 80;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        if(player.lives > 0){
            if(player.lastDirection ==="left"){
                // player.lives -= enemy.damage;
                this.game.heroStateMachine.enterState(new HeroTakeHitWhiteLeft(this.game));
            }
            else{
                // player.lives -= enemy.damage;
                this.game.heroStateMachine.enterState(new HeroTakeHitWhiteRight(this.game));
            }
        }
        else{
            if(player.lastDirection ==="left")
                this.game.heroStateMachine.enterState(new HeroDeathLeft(this.game));
            else
                this.game.heroStateMachine.enterState(new HeroDeathRight(this.game));

        }
        if(this.animationExecuted(enemy)){
            player.lives -= enemy.damage;
            enemy.enterState(new EnemyIdleLeft(this.game))
        }
    }
}
export class EnemyAttack2Right extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "attack2Right";
        this.game.enemy.lastDirection = "right";
        this.game.enemy.frameY = 2;
        this.game.enemy.frames = 4;
        this.game.enemy.speedX = 0;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 80;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        if(player.lives > 0){
            if(player.lastDirection ==="left"){
                // player.lives -= enemy.damage;
                this.game.heroStateMachine.enterState(new HeroTakeHitWhiteLeft(this.game));
            }
            else{
                // player.lives -= enemy.damage;
                this.game.heroStateMachine.enterState(new HeroTakeHitWhiteRight(this.game));
            }
        }
        else{
            if(player.lastDirection ==="left")
                this.game.heroStateMachine.enterState(new HeroDeathLeft(this.game));
            else
                this.game.heroStateMachine.enterState(new HeroDeathRight(this.game));

        }
        if(this.animationExecuted(enemy)){
            player.lives -= enemy.damage;
            enemy.enterState(new EnemyIdleLeft(this.game))
        }
    }
}
export class EnemyAttack2Left extends EnemyState{
    
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "attack2Left";
        this.game.enemy.lastDirection = "left";
        this.game.enemy.frameY = 3;
        this.game.enemy.frames = 4;
        this.game.enemy.speedX = 0;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 80;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        if(player.lives > 0){
            if(player.lastDirection ==="left"){
                // player.lives -= enemy.damage;
                this.game.heroStateMachine.enterState(new HeroTakeHitWhiteLeft(this.game));
            }
            else{
                // player.lives -= enemy.damage;
                this.game.heroStateMachine.enterState(new HeroTakeHitWhiteRight(this.game));
            }
        }
        else{
            if(player.lastDirection ==="left")
                this.game.heroStateMachine.enterState(new HeroDeathLeft(this.game));
            else
                this.game.heroStateMachine.enterState(new HeroDeathRight(this.game));

        }
        if(this.animationExecuted(enemy)){
            player.lives -= enemy.damage;
            enemy.enterState(new EnemyIdleLeft(this.game))
        }
    }
}
export class EnemyDeathRight extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "deathRight";
        this.game.enemy.lastDirection = "right";
        this.game.enemy.frameY = 4;
        this.game.enemy.frames = 5;
        this.game.enemy.speedX = 0;
        this.game.enemy.staggerSpeed = 160;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
            if(this.animationExecuted(enemy)){
                player.score += enemy.maxLives;
                enemy.reset();
            }  
    }
}
export class EnemyDeathLeft extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "deathLeft";
        this.game.enemy.lastDirection = "left";
        this.game.enemy.frameY = 5;
        this.game.enemy.frames = 5;
        this.game.enemy.speedX = 0;
        this.game.enemy.staggerSpeed = 160;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
            if(this.animationExecuted(enemy)){
                player.score += enemy.maxLives;
                enemy.reset();
            }   
    }
}
export class EnemyFallRight extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "fallRight";
        this.game.enemy.lastDirection = "right";
        this.game.enemy.frameY = 6;
        this.game.enemy.frames = 2;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 160;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        if(enemy.speedY === 0){
            enemy.enterState(new EnemyIdleRight(this.game));        }     
    }
}
export class EnemyFallLeft extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "fallLeft";
        this.game.enemy.lastDirection = "left";
        this.game.enemy.frameY = 7;
        this.game.enemy.frames = 2;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 160;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        if(enemy.speedY === 0){
            enemy.enterState(new EnemyIdleLeft(this.game));
        }     
    }
}
export class EnemyIdleRight extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "idleRight";
        this.game.enemy.lastDirection = "right";
        this.game.enemy.frameY = 8;
        this.game.enemy.frames = 4;
        this.game.enemy.speedX = 0;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 80;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        //when in attack range and the sword actually collides with player
        if(enemy.attackbox.x + enemy.attackbox.width >= player.collisionbox.x &&
            enemy.attackbox.x <= player.collisionbox.x + player.collisionbox.width && 
            enemy.withinAttackRangeY(player)){
                //enemy has the following options:
                //(a) attack every x seconds if enemy is alive
                if(!player.alive) return;
                if(this.attackUpdate){
                    const randomNumber = Math.random();
                    if(randomNumber < 0.5){
                        enemy.enterState(new EnemyAttack1Right(this.game));
                    }
                    else{
                        enemy.enterState(new EnemyAttack2Right(this.game)); 
                    }
                }
        }
        //when player tries to run away, rightwards, enemy chases
        else if(enemy.withinBattleZone(player) &&
            enemy.attackbox.x + enemy.attackbox.width < player.collisionbox.x + player.collisionbox.width){
                enemy.enterState(new EnemyRunRight(this.game));
        }
        //when player tries running to the other side
        else if(enemy.withinBattleZone(player) &&
            enemy.attackbox.x > player.collisionbox.x + player.collisionbox.width){
                enemy.enterState(new EnemyIdleLeft(this.game))
        }

    }
}
export class EnemyIdleLeft extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "idleLeft";
        this.game.enemy.lastDirection = "left";
        this.game.enemy.frameY = 9;
        this.game.enemy.frames = 4;
        this.game.enemy.speedX = 0;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 80;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
            //when player tries to run out of battle zone
            if(enemy.withinBattleZone(player) &&
                enemy.attackbox.x > player.collisionbox.x + player.collisionbox.width){
                    enemy.enterState(new EnemyRunLeft(this.game));
            }

            //when in attack range
            else if(enemy.attackbox.x <= player.collisionbox.x + player.collisionbox.width &&
                enemy.attackbox.x + enemy.attackbox.width >= player.collisionbox.x  && 
                this.game.rectangularCollision(player.collisionbox, enemy.attackbox)
            ){
                if(!player.alive) return;
                if(this.attackUpdate){
                    if(Math.random() < 0.5){
                        enemy.enterState(new EnemyAttack1Left(this.game));
                    }
                    else{
                        enemy.enterState(new EnemyAttack2Left(this.game));
                    }   
                }
            }

            //when player tries running to the other side
            else if(enemy.attackbox.x + enemy.attackbox.width < player.collisionbox.x && 
                enemy.withinBattleZone(player)){
                    enemy.enterState(new EnemyIdleRight(this.game));
            }
    }
}
export class EnemyJumpRight extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "jumpRight";
        this.game.enemy.lastDirection = "right";
        this.game.enemy.frameY = 10;
        this.game.enemy.frames = 2;
        this.game.enemy.speedX = -2;
        this.game.enemy.speedY = -3;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 160;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
            if(enemy.speedY === 0){
                enemy.enterState(new EnemyFallRight(this.game));
            }  
    }
}
export class EnemyJumpLeft extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "jumpleft";
        this.game.enemy.lastDirection = "left";
        this.game.enemy.frameY = 10;
        this.game.enemy.frames = 2;
        this.game.enemy.speedX = 2;
        this.game.enemy.speedY = -3;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 160;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
            if(enemy.speedY === 0){
                enemy.enterState(new EnemyFallLeft(this.game));
            }  
    }
}
export class EnemyRunRight extends EnemyState{
    enter(){
        //this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "runRight";
        this.game.enemy.lastDirection = "right";
        this.game.enemy.frameY = 12;
        this.game.enemy.frames = 8;
        this.game.enemy.speedX = 1;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 80;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
            //idle when in attack range
            if(enemy.attackbox.x + enemy.attackbox.width >= player.collisionbox.x &&
                enemy.attackbox.x < player.collisionbox.x + player.collisionbox.width){
                    enemy.enterState(new EnemyIdleRight(this.game));
            }
            //code for when in run right and player suddenly runs away from battlezone, rightwards
            if(!enemy.withinBattleZone(player) &&
                enemy.attackbox.x + enemy.attackbox.width < player.collisionbox.x){
                    enemy.enterState(new EnemyIdleRight(this.game));
            }
    }
}
export class EnemyRunLeft extends EnemyState{
    enter(){
        //this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "runLeft";
        this.game.enemy.lastDirection = "left";
        this.game.enemy.frameY = 13;
        this.game.enemy.frames = 8;
        this.game.enemy.speedX = -1;
        this.game.enemy.speedBufferX = 80;
        this.game.enemy.staggerSpeed = 80;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        //while running and player suddenly runs away from battlezone, leftwards
        if(!enemy.withinBattleZone(player) &&
            enemy.attackbox.x > player.collisionbox.x + player.collisionbox.width){
                enemy.enterState(new EnemyIdleLeft(this.game));
        }
        
        //when it reaches attack range
        if(enemy.attackbox.x <= player.collisionbox.x + player.collisionbox.width &&
            enemy.attackbox.x + enemy.attackbox.width >= player.collisionbox.x){
                enemy.enterState(new EnemyIdleLeft(this.game));
        }
    }
}
export class EnemyTakeHitRight extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "takeHitRight";
        this.game.enemy.lastDirection = "right";
        this.game.enemy.frameY = 14;
        this.game.enemy.frames = 3;
        this.game.enemy.speedX = 0;
        this.game.enemy.staggerSpeed = 140;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        if(enemy.lives <=0){
            enemy.enterState(new EnemyDeathRight(this.game));
        }
        else{
            if(this.animationExecuted(enemy)){
                enemy.hitCount ++;
                enemy.lives -= player.damage;
                enemy.enterState(new EnemyIdleRight(this.game))
            }            
        }
    }
}
export class EnemyTakeHitLeft extends EnemyState{
    enter(){
        this.game.enemy.frameX = 0;
        this.game.enemy.currentState = "takeHitLeft";
        this.game.enemy.lastDirection = "left";
        this.game.enemy.frameY = 15;
        this.game.enemy.frames = 3;
        this.game.enemy.speedX = 0;
        this.game.enemy.staggerSpeed = 140;
    }
    changeBehaviour(deltaTime){
        this.canAttack(deltaTime);
        const player = this.game.player;
        const enemy = this.game.enemy;
        if(enemy.lives <= 0){
            enemy.enterState(new EnemyDeathLeft(this.game));
        }
        else{
            if(this.animationExecuted(enemy)){
                enemy.lives -= player.damage;
                enemy.hitCount ++;
                enemy.enterState(new EnemyIdleLeft(this.game))
            }            
        }
    }
}
