import { lerp } from "./ease.js";
import { HeroDeathLeft, HeroDeathRight, HeroTakeHitWhiteLeft, HeroTakeHitWhiteRight } from "./hero.js";
import { Character } from "./player.js";
import { HeroAttack1Right, HeroAttack1Left, HeroAttack2Left, HeroAttack2Right } from "./hero.js"

export class Enemy extends Character{
    constructor(game){
        super(game);
        this.game = game;
        this.image = this.game.assetManager.images[10];
        this.damage = 1;
        this.lives = 50;
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
        this.state = null;
        
        //attack properties
        this.attackCounter = 0;
        this.attackInterval = 2000;
        this.attackUpdate = false;
        this.enterState(new EnemyIdleRight());
    }
    
    updatehitboxes(){
        this.collisionbox = {
            x: this.x+135,
            y: this.y+118,
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
            this.updateAttack(deltaTime);
            //enemy changes behaviour
            this.state.changeBehaviour(this.game, this, deltaTime);
            //new code for player's behavioural change called here
            //changes state
            this.game.heroStateMachine.currentState.changeBehaviour(this, deltaTime);
        }
        //collision
        //enemy and hero
        if(!this.free && this.game.rectangularCollision(this.game.player.attackbox, this.collisionbox)){
            if( this.game.player.state == "attack1Right" ||
                this.game.player.state == "attack2Right" ||
                this.game.player.state == "attack1Left" ||
                this.game.player.state == "attack2Left"
               ){
                   //enemy takes hit
                   if(this.game.input.keypressed){
                       this.takenHit();
                       this.game.input.keypressed = false;
                   }
                   //enemy dies
                   if(this.lives < 1){
                       this.game.player.score+= this.maxLives;
                       this.reset();
                   }
            }
        }
    }

    start(x, y){
        this.x = x;
        this.y = y;
        this.lives = this.maxLives; 
        this.state = new EnemyIdleRight();
        this.free = false;
    }

    reset(){
        this.x = this.y = 0;
        this.free = true;
     }
     
    takenHit() {
        this.lives -= this.game.player.damage;
    }
    
     enterState(state){
        this.state = state;
        this.state.enter(this);
    }
    
    updateAttack(deltaTime){
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

class EnemyState{
    constructor(){
    }

    animationExecuted(enemy){
        return enemy.frameX === enemy.frames - 1;
    }
}

class EnemyIdleRight extends EnemyState{
    enter(enemy){
        enemy.frameX = 0;
        enemy.currentState = "idleRight";
        enemy.lastDirection = "right";
        enemy.frameY = 8;
        enemy.frames = 4;
        enemy.speedX = 0;
        enemy.speedBufferX = 80;
        enemy.staggerSpeed = 80;
    }

    changeBehaviour(game, enemy, deltaTime){
        const player = game.player;
        
        //when in attack range and the sword actually collides with player
        if(enemy.attackbox.x + enemy.attackbox.width >= player.collisionbox.x &&
            enemy.attackbox.x <= player.collisionbox.x + player.collisionbox.width && 
            enemy.withinAttackRangeY(player)){
                //enemy has the following options:
                //(a) attack every x seconds if enemy is alive
                if(!player.alive) return;
                if(enemy.attackUpdate){
                    const randomNumber = Math.random();
                    if(randomNumber < 0.5){
                        enemy.enterState(new EnemyAttack1Right());
                    }
                    else{
                        enemy.enterState(new EnemyAttack2Right()); 
                    }
                }
         }
        //when player tries to run away, rightwards, enemy chases
        if(enemy.withinBattleZone(player) &&
            enemy.attackbox.x + enemy.attackbox.width < player.collisionbox.x){
                enemy.enterState(new EnemyRunRight());
        }

        //when player tries running to the other side
        else if(enemy.withinBattleZone(player) &&
            enemy.attackbox.x > player.collisionbox.x + player.collisionbox.width){
                enemy.enterState(new EnemyIdleLeft());
        }
    }

}

class EnemyIdleLeft extends EnemyState{
    enter(enemy){
        enemy.frameX = 0;
        enemy.currentState = "idleLeft";
        enemy.lastDirection = "left";
        enemy.frameY = 9;
        enemy.frames = 4;
        enemy.speedX = 0;
        enemy.speedBufferX = 80;
        enemy.staggerSpeed = 80;
    }

    changeBehaviour(game, enemy, deltaTime){
        const player = game.player;
        if(enemy.attackbox.x <= player.collisionbox.x + player.collisionbox.width &&
            enemy.attackbox.x + enemy.attackbox.width >= player.collisionbox.x  && 
            game.rectangularCollision(player.collisionbox, enemy.attackbox)
         ){
            if(!player.alive) return;
            if(enemy.attackUpdate){
                if(Math.random() < 0.5){
                    enemy.enterState(new EnemyAttack1Left());
                }
                else{
                    enemy.enterState(new EnemyAttack2Left());
                }   
            }
        }

        //when player tries to run out of battle zone
        if(enemy.withinBattleZone(player) &&
            enemy.attackbox.x > player.collisionbox.x + player.collisionbox.width){
                enemy.enterState(new EnemyRunLeft(this.game));
        }

        //when player tries running to the other side
        else if(enemy.attackbox.x + enemy.attackbox.width < player.collisionbox.x && 
            enemy.withinBattleZone(player)){
                enemy.enterState(new EnemyIdleRight());
        }
    }
}

export class EnemyRunRight extends EnemyState{
    enter(enemy){
        //this.game.enemy.frameX = 0;
        enemy.currentState = "runRight";
        enemy.lastDirection = "right";
        enemy.frameY = 12;
        enemy.frames = 8;
        enemy.speedX = 1;
        enemy.speedBufferX = 80;
        enemy.staggerSpeed = 80;
    }
    changeBehaviour(game, enemy, deltaTime){
        //this.canAttack(deltaTime);
        const player = game.player;
            //idle when in attack range
            if(enemy.attackbox.x + enemy.attackbox.width >= player.collisionbox.x &&
                enemy.attackbox.x < player.collisionbox.x + player.collisionbox.width){
                    enemy.enterState(new EnemyIdleRight());
            }
            //code for when in run right and player suddenly runs away from battlezone, rightwards
            if(!enemy.withinBattleZone(player) &&
                enemy.attackbox.x + enemy.attackbox.width < player.collisionbox.x){
                    enemy.enterState(new EnemyIdleRight());
            }
    }
}
export class EnemyRunLeft extends EnemyState{
    enter(enemy){
        //enemy.frameX = 0;
        enemy.currentState = "runLeft";
        enemy.lastDirection = "left";
        enemy.frameY = 13;
        enemy.frames = 8;
        enemy.speedX = -1;
        enemy.speedBufferX = 80;
        enemy.staggerSpeed = 80;
    }
    changeBehaviour(game, enemy, deltaTime){
       // this.canAttack(deltaTime);
        const player = game.player;
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

export class EnemyAttack1Right extends EnemyState{
    enter(enemy){
        enemy.frameX = 0;
        enemy.currentState = "attack1Right";
        enemy.lastDirection = "right";
        enemy.frameY = 0;
        enemy.frames = 4;
        enemy.speedX = 0;
        enemy.speedBufferX = 80;
        enemy.staggerSpeed = 80;
    }

    changeBehaviour(game, enemy, deltaTime){
        //this.canAttack(deltaTime);
        const player = game.player;
        if(player.lives > 0){
            if(player.lastDirection ==="left"){
                // player.lives -= enemy.damage;
                game.heroStateMachine.enterState(new HeroTakeHitWhiteLeft(game));
            }
            else{
                // player.lives -= enemy.damage;
                game.heroStateMachine.enterState(new HeroTakeHitWhiteRight(game));
            }
        }
        else{
            if(player.lastDirection ==="left")
                game.heroStateMachine.enterState(new HeroDeathLeft(game));
            else
                game.heroStateMachine.enterState(new HeroDeathRight(game));

        }
        if(this.animationExecuted(enemy)){
            player.lives -= enemy.damage;
            enemy.enterState(new EnemyIdleLeft());
        }
    }
}
export class EnemyAttack1Left extends EnemyState{
    
    enter(enemy){
        enemy.frameX = 0;
        enemy.currentState = "attack1Left";
        enemy.lastDirection = "left";
        enemy.frameY = 1;
        enemy.frames = 4;
        enemy.speedX = 0;
        enemy.speedBufferX = 80;
        enemy.staggerSpeed = 80;
    }
    changeBehaviour(game, enemy, deltaTime){
        //this.canAttack(deltaTime);
        const player = game.player;
        if(player.lives > 0){
            if(player.lastDirection ==="left"){
                // player.lives -= enemy.damage;
                game.heroStateMachine.enterState(new HeroTakeHitWhiteLeft(game));
            }
            else{
                // player.lives -= enemy.damage;
                game.heroStateMachine.enterState(new HeroTakeHitWhiteRight(game));
            }
        }
        else{
            if(player.lastDirection ==="left")
                game.heroStateMachine.enterState(new HeroDeathLeft(game));
            else
                game.heroStateMachine.enterState(new HeroDeathRight(game));

        }
        if(this.animationExecuted(enemy)){
            player.lives -= enemy.damage;
            enemy.enterState(new EnemyIdleLeft(game))
        }
    }
}
export class EnemyAttack2Right extends EnemyState{
    enter(enemy){
        enemy.frameX = 0;
        enemy.currentState = "attack2Right";
        enemy.lastDirection = "right";
        enemy.frameY = 2;
        enemy.frames = 4;
        enemy.speedX = 0;
        enemy.speedBufferX = 80;
        enemy.staggerSpeed = 80;
    }
    changeBehaviour(game, enemy, deltaTime){
        //this.canAttack(deltaTime);
        const player = game.player;

        if(player.lives > 0){
            if(player.lastDirection ==="left"){
                // player.lives -= enemy.damage;
                game.heroStateMachine.enterState(new HeroTakeHitWhiteLeft(game));
            }
            else{
                // player.lives -= enemy.damage;
                game.heroStateMachine.enterState(new HeroTakeHitWhiteRight(game));
            }
        }
        else{
            if(player.lastDirection ==="left")
                game.heroStateMachine.enterState(new HeroDeathLeft(game));
            else
                game.heroStateMachine.enterState(new HeroDeathRight(game));

        }
        if(this.animationExecuted(enemy)){
            player.lives -= enemy.damage;
            enemy.enterState(new EnemyIdleLeft(game))
        }
    }
}
export class EnemyAttack2Left extends EnemyState{
    enter(enemy){
        enemy.frameX = 0;
        enemy.currentState = "attack2Left";
        enemy.lastDirection = "left";
        enemy.frameY = 3;
        enemy.frames = 4;
        enemy.speedX = 0;
        enemy.speedBufferX = 80;
        enemy.staggerSpeed = 80;
    }
    changeBehaviour(game, enemy, deltaTime){
        //this.canAttack(deltaTime);
        const player = game.player;

        if(player.lives > 0){
            if(player.lastDirection ==="left"){
                // player.lives -= enemy.damage;
                game.heroStateMachine.enterState(new HeroTakeHitWhiteLeft(game));
            }
            else{
                // player.lives -= enemy.damage;
                game.heroStateMachine.enterState(new HeroTakeHitWhiteRight(game));
            }
        }
        else{
            if(player.lastDirection ==="left")
                game.heroStateMachine.enterState(new HeroDeathLeft(game));
            else
                game.heroStateMachine.enterState(new HeroDeathRight(game));

        }
        if(this.animationExecuted(enemy)){
            player.lives -= enemy.damage;
            enemy.enterState(new EnemyIdleLeft(this.game))
        }
    }
}
export class EnemyDeathRight extends EnemyState {
    enter(enemy) {
        enemy.frameX = 0;
        enemy.currentState = "deathRight";
        enemy.lastDirection = "right";
        enemy.frameY = 4;
        enemy.frames = 5;
        enemy.speedX = 0;
        enemy.staggerSpeed = 160;
    }
    changeBehaviour(game, enemy, deltaTime) {
        const player = game.player;
        
        if (this.animationExecuted(enemy)) {
            enemy.reset();
        }
    }
}
export class EnemyDeathLeft extends EnemyState {
    enter(enemy) {
        enemy.frameX = 0;
        enemy.currentState = "deathLeft";
        enemy.lastDirection = "left";
        enemy.frameY = 5;
        enemy.frames = 5;
        enemy.speedX = 0;
        enemy.staggerSpeed = 160;
    }
    changeBehaviour(game, enemy, deltaTime) {
        const player = game.player;
        if (this.animationExecuted(enemy)) {
            enemy.reset();
        }
    }
}



export class EnemyTakeHitRight extends EnemyState{

    enter(enemy){
        enemy.frameX = 0;
        enemy.currentState = "takeHitRight";
        enemy.lastDirection = "right";
        enemy.frameY = 14;
        enemy.frames = 3;
        enemy.speedX = 0;
        enemy.staggerSpeed = 140;
    }
    changeBehaviour(game, enemy, deltaTime){
        const player = game.player;
        if(enemy.lives <=0){
            enemy.enterState(new EnemyDeathRight());
        }
        else{
            if(this.animationExecuted(enemy)){
                enemy.enterState(new EnemyIdleRight())
            }            
        }
    }
}
export class EnemyTakeHitLeft extends EnemyState{
    enter(enemy){
        enemy.frameX = 0;
        enemy.currentState = "takeHitLeft";
        enemy.lastDirection = "left";
        enemy.frameY = 15;
        enemy.frames = 3;
        enemy.speedX = 0;
        enemy.staggerSpeed = 140;
    }
    changeBehaviour(game, enemy, deltaTime){
        const player = game.player;
        if(enemy.lives <= 0){
            enemy.enterState(new EnemyDeathLeft());
        }
        else{
            if(this.animationExecuted(enemy)){
                enemy.enterState(new EnemyIdleLeft());
            }            
        }
    }
}
