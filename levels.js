import { level1_immobile_liquidMap2D, level1_solidMap2D, level2_solidMap2D, level2_immobile_liquidMap2D } from "./mapData.js";
import { HorizontallyMovingCollisionBlock, VerticallyMovingCollisionBlock } from "./collisionblock.js";
import { Rectangle } from "./rectangle.js";
import { HeroFallRight } from "./hero.js";

export class Forest{
    constructor(game){
        this.game = game;
        this.id = "forest";
        this.game.exitDoor = new Rectangle(2520, 0, this.game.tileSize, this.game.tileSize);
 
        this.resetCollisionBlocks();
        this.resetMap();
        this.resetCamera();
        this.resetPlayerPos();
        this.resetEnemyPos();
        this.game.numberOfBasicEnemies = 10;
        this.game.numberOfBosses = 1;
    }
    //reset all parameters to default values
    reset(){
        this.resetMap();
        this.resetCamera();
        this.resetCollisionBlocks();
        this.resetPlayerPos();
        this.resetEnemyPos();
        this.game.player.score = 0;
        this.game.exitDoor = new Rectangle(2520, 0, this.game.tileSize, this.game.tileSize);
        this.id = "forest";
    }
    //reset only parameters needed to restart a level
    restart(){
        this.resetPlayerPos();
        this.resetEnemyPos();
        this.game.player.score = 0;
    }
    resetMap(){
        //this.game.background.setWorld(this.game.assetManager.images[3]);
       // this.game.backdrop.setWorld(this.game.assetManager.images[3]);
        this.game.map.setWorld(this.game.assetManager.images[3]);
    }
    resetCollisionBlocks(){
        this.game.solidBlocks = this.game.collisionBlock.create(level1_solidMap2D);
        this.game.immobile_liquidBlocks = this.game.collisionBlock.create(level1_immobile_liquidMap2D);
        this.game.mobileBlocks = [
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[5], 21, 20, 36),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[5], 40, 20, 50),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[6], 20, 4, 20),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[6], 59, 1, 15),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 39, 20, 30),
         ];
    }
    resetPlayerPos(){
        this.game.player.x = 0;
        this.game.player.y = 5 * this.game.tileSize;
    }
    resetEnemyPos(){
        //deactivate all the enemies in the pool first
        this.game.enemies.forEach(enemy => { enemy.reset(); });
        this.game.enemies[0].start(6*this.game.tileSize, 29*this.game.tileSize);
        this.game.enemies[1].start(3*this.game.tileSize, 40*this.game.tileSize);
        this.game.enemies[2].start(19*this.game.tileSize, 25*this.game.tileSize);
        this.game.enemies[3].start(24*this.game.tileSize, 34*this.game.tileSize);
        this.game.enemies[4].start(33*this.game.tileSize, 1*this.game.tileSize);
        this.game.enemies[5].start(33*this.game.tileSize, 24*this.game.tileSize);
        this.game.enemies[6].start(48*this.game.tileSize, 13*this.game.tileSize);
        this.game.enemies[7].start(41*this.game.tileSize, 26*this.game.tileSize);
        this.game.enemies[8].start(45*this.game.tileSize, 33*this.game.tileSize);
        this.game.enemies[9].start(59*this.game.tileSize, 34*this.game.tileSize);
}
    
    resetCamera() {
        this.game.camera.worldWidth = this.game.map.width;
        this.game.camera.worldHeight = this.game.map.height ;
    }
}

export class Ruins{
    constructor(game){
        this.game = game;
        this.id = "ruins";
        this.game.exitDoor = new Rectangle(5080, 0, this.game.tileSize, this.game.tileSize);
       
        this.resetCollisionBlocks();
        this.resetMap();
        this.resetCamera();
        this.resetPlayerPos();
        this.resetEnemyPos();
        //activates only the numberOfBasicEnemies
        this.game.numberOfBasicEnemies = 15;
        this.game.numberOfBosses = 1;
    }
    
    //reset all parameters to default values
    reset(){
        this.resetMap();
        this.resetCamera();
        this.resetCollisionBlocks();
        this.resetPlayerPos();
        this.resetEnemyPos();
        this.game.player.score = 0;
        this.game.exitDoor = new Rectangle(5080, 0, this.game.tileSize, this.game.tileSize);
        this.id = "ruins";
    }
    //reset only parameters needed to restart a level
    restart(){
        this.resetPlayerPos();
        this.resetEnemyPos();
        this.game.player.score = 0;
    }
    resetCollisionBlocks(){
        this.game.solidBlocks = this.game.collisionBlock.create(level2_solidMap2D);
        this.game.immobile_liquidBlocks = this.game.collisionBlock.create(level2_immobile_liquidMap2D);
        this.game.mobileBlocks = [
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 2, 28, 24),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 25, 16, 32),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 43, 33, 48),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 49, 27, 74),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 45, 10, 53),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 45, 3, 53),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 103, 29, 112),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 112, 16, 122),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 24, 2, 15),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 8, 2, 12),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 18, 26, 32),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 67, 27, 32),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 86, 28, 32),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 105, 18, 32),

         ];
    }
    resetMap(){
        this.game.map.setWorld(this.game.assetManager.images[11]);
        //this.game.background.setWorld(this.game.assetManager.images[11]);
        //this.game.backdrop.setWorld(this.game.assetManager.images[11]); 
    }
    resetPlayerPos(){
        this.game.player.x = 0;
        this.game.player.y = 9 * this.game.tileSize;;
    }
    resetEnemyPos(){
        //deactivate all the enemies in the pool first
        this.game.enemies.forEach(enemy => { enemy.reset(); });
        this.game.enemies[0].start(0*this.game.tileSize, 29*this.game.tileSize);
        this.game.enemies[1].start(10*this.game.tileSize, 36*this.game.tileSize);
        this.game.enemies[2].start(9*this.game.tileSize, 19*this.game.tileSize);
        this.game.enemies[3].start(24*this.game.tileSize, 34*this.game.tileSize);
        this.game.enemies[4].start(36*this.game.tileSize, 12*this.game.tileSize);
        this.game.enemies[5].start(33*this.game.tileSize, 28*this.game.tileSize);
        this.game.enemies[6].start(51*this.game.tileSize, 13*this.game.tileSize);
        this.game.enemies[7].start(47*this.game.tileSize, 26*this.game.tileSize);
        this.game.enemies[8].start(62*this.game.tileSize, 33*this.game.tileSize);
        this.game.enemies[9].start(69*this.game.tileSize, 5*this.game.tileSize);
        this.game.enemies[10].start(89*this.game.tileSize, 5*this.game.tileSize);
        this.game.enemies[11].start(97*this.game.tileSize, 28*this.game.tileSize);
        this.game.enemies[12].start(115*this.game.tileSize, 22*this.game.tileSize);
        this.game.enemies[13].start(120*this.game.tileSize, 19*this.game.tileSize);
        this.game.enemies[14].start(120*this.game.tileSize, 3*this.game.tileSize);
    }
    resetCamera(){
        this.game.camera.worldWidth = this.game.map.width;
        this.game.camera.worldHeight = this.game.map.height;
    }
}