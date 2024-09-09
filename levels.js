import { level1_immobile_liquidMap2D, level1_solidMap2D, level2_solidMap2D, level2_immobile_liquidMap2D } from "./mapData.js";
import { HorizontallyMovingCollisionBlock, VerticallyMovingCollisionBlock } from "./collisionblock.js";
import { Rectangle } from "./rectangle.js";

export class Forest{
    constructor(game){
        this.game = game;
        this.id = "forest";
        this.game.solidBlocks = this.game.collisionBlock.create(level1_solidMap2D);
        this.game.immobile_liquidBlocks = this.game.collisionBlock.create(level1_immobile_liquidMap2D);
        this.game.mobileBlocks = [
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[5], 21, 20, 36),
            new HorizontallyMovingCollisionBlock(this.game, this.game.assetManager.images[5], 40, 20, 50), 
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[6], 20, 4, 20),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[6], 59, 1, 15),
            new VerticallyMovingCollisionBlock(this.game, this.game.assetManager.images[4], 39, 20, 30),
         ];
        this.game.exitDoor = new Rectangle(2520, 0, this.game.tileSize, this.game.tileSize);
        this.game.exitDoor.id = "toRuins";
        this.game.map.setWorld(this.game.assetManager.images[1]);
        this.game.background.set(this.game.assetManager.images[0]);
        this.game.backdrop.set(this.game.assetManager.images[2]);
        this.game.camera.worldWidth = this.game.map.width;
        this.game.camera.worldHeight = this.game.map.height;
        
        this.game.player.x = 0;
        this.game.player.y = 200;
        this.game.camera.viewportX = 0;
        this.game.camera.viewportY = 0;
       // this.game.camera.follow(this.game.player);
        this.game.numberOfBasicEnemies = 2;
        //deactivates all the enemies in the pool
        this.game.enemies.forEach(enemy=>{enemy.reset();})
        //activates only the numberOfBasicEnemies
        for(let i = 0; i < this.game.gameTotalBasicEnemies; ++i){
            if(i < this.game.numberOfBasicEnemies){
                this.game.enemies[i].start(200+i* 200, 0);
            }
        }
        this.game.numberOfBosses = 1;

    }
}

export class Ruins{
    constructor(game){
        this.game = game;
        this.id = "ruins";
        this.game.solidBlocks = this.game.collisionBlock.create(level2_solidMap2D);
        this.game.immobile_liquidBlocks = this.game.collisionBlock.create(level2_immobile_liquidMap2D);
        this.game.mobileBlocks  = [
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
        this.game.exitDoor = new Rectangle(5080, 0, this.game.tileSize, this.game.tileSize);
        this.game.exitDoor.id = "toForest";

        this.game.map.setWorld(this.game.assetManager.images[11]);
        this.game.background.set(this.game.assetManager.images[11]);
        this.game.backdrop.set(this.game.assetManager.images[11]);
        this.game.camera.worldWidth = this.game.map.width;
        this.game.camera.worldHeight = this.game.map.height;
        
        this.game.player.x = 0;
        this.game.player.y = 200;
        this.game.camera.viewportX = 0;
        this.game.camera.viewportY = 0;
        
        //deactivates all the enemies in the pool
        this.game.enemies.forEach(enemy=>{enemy.reset();})
        //activates only the numberOfBasicEnemies
        this.game.numberOfBasicEnemies = 15;
        for(let i = 0; i < this.game.gameTotalBasicEnemies; ++i){
            if(i < this.game.numberOfBasicEnemies){
                this.game.enemies[i].start(200+i* 200, 0);
            }
        }
        this.game.numberOfBosses = 1;
    }
}