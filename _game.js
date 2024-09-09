import { AssetManager } from "./assetManager.js"
import { Camera } from "./camera.js"
import { LoadingState, GSM, LevelCompleteState } from "./state.js"
import { Input } from "./input.js"
import { Backdrop, Background, Map } from "./map.js"
import { Hero, HeroStateMachine } from "./hero.js"
import { UI } from "./ui.js"
import { level1_solidMap2D, level1_immobile_liquidMap2D, level2_solidMap2D, level2_immobile_liquidMap2D } from "./mapData.js";
import { CollisionBlock, HorizontallyMovingCollisionBlock, VerticallyMovingCollisionBlock } from "./collisionblock.js"
import { Rectangle } from "./rectangle.js"
import { drawCharacterStatus, drawEnemyhealthbar, drawPlayerenergybar, drawPlayerhealthbar, drawPlayerScore, drawHeroStatus } from "./utils.js"
import { lerp } from "./ease.js"
import { Forest, Ruins } from "./levels.js"
import { Enemy } from "./enemypool.js"
import { AudioControl } from "./audio.js"

export class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.tileSize = 40;
        this.rows = Math.ceil(this.height/this.tileSize);
        this.columns = Math.ceil(this.width/this.tileSize);
        
        //UI, INPUT AND ASSETMANAGER INSTANCES
        this.ui = new UI();
        this.ui.fullscreenBtn.addEventListener('click', ()=>{
            this.toggleFullscreen();
        });
        this.input = new Input(this);
        this.assetManager = new AssetManager(this);

        //MAP, PLAYER AND CAMERA
        this.map = new Map(this);
        this.backdrop = new Backdrop(this);
        this.background = new Background(this);
        this.player = new Hero(this);
        this.enemy = new Enemy(this);
        this.enemy.start(400, 0);
        
        this.camera = new Camera(this, 0, 0, this.width, this.height, this.map.width, this.map.height);
        this.camera.follow(this.player, this.width*0.5, this.height*0.5);

        //collisionBlock instance
        this.collisionBlock = new CollisionBlock(this);
        //collisonblocks data
        this.solidBlocks = undefined;
        this.immobile_liquidBlocks = undefined;
        this.mobileBlocks = undefined;
        this.exitDoor = undefined;
        //PAUSE AND PLAY
        this.paused = false;
        //DEBUG MODE
        this.debug = false;
        //BATTLE ZONE DIMENSION
        //this is temporary; later, each enemy type will have different battle zone ranges
        this.battleZone = 250; //a square battle zone, 300 width x 300 height
        //ENEMY POOLS
        this.gameTotalBasicEnemies = 20;
        this.numberOfBasicEnemies = undefined;
        this.numberOfBosses = undefined;
        this.enemies = [];
        this.bosses = [];
        
        //LEVELS
        //create all enemies for the entire game duration created here:
        this.createEnemyPool();
        //the currentLevel sets all the undefined member variables pertaining to each level
        this.currentLevel = new Forest(this);
        //STATE MACHINES
        //game states
        this.gsm = new GSM(this);
        //hero and enemy state machines
        this.heroStateMachine = new HeroStateMachine(this);
        
        //AUDIO INPUT
        this.audio = new AudioControl(this);
                
        //TOGGLE FULLSCREEN AND DEBUG MODES
        this.ui.fullscreenBtn.addEventListener('click', ()=>{
            this.toggleFullscreen();
        });
        this.ui.play_specialBtn.addEventListener('mouseup', () => {
            this.debug = !this.debug;
        });
    }
    
    render(ctx, deltaTime){
        ctx.clearRect(0,0, this.width, this.height);
        this.gsm.renderState(ctx, deltaTime);
        
        //temp
        this.enemies.forEach(enemy=>{
            if(!enemy.free){
                drawEnemyhealthbar(this, ctx, enemy);
            } 
        })

        drawCharacterStatus(ctx, this.enemies[0]);
        drawPlayerhealthbar(ctx, this.player);
        drawPlayerenergybar(ctx, this.player);
        drawPlayerScore(ctx, this.player);
        
        drawHeroStatus(ctx, this.player);
    }
    
    createEnemyPool(){
        for(let i = 0; i < this.gameTotalBasicEnemies; ++i){
            this.enemies.unshift(new Enemy(this));
        }
    }

    getOneFreeEnemy(){
        for(let i = 0; i < this.enemies.length; ++i){
            const enemy = this.enemies[i];
            if(enemy.free) return enemy;
        }
    }

    update(deltaTime){
        this.gsm.updateState(deltaTime);
    }

    rectangularCollision(a, b){
        return (
            a.x + a.width >= b.x &&
            a.x <= b.x + b.width &&
            a.y + a.height >= b.y &&
            a.y <= b.y + b.height
            );
    }
    
    randomFloat(min, max){
        return Math.random() * (max - min) + min;
    }
    
    randomInt(min, max){
        return Math.floor (Math.random() * (max-min) + min);
    }
    
    toggleFullscreen(){
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        }else if(document.exitFullscreen){
            document.exitFullscreen();
        }
    }
    
}