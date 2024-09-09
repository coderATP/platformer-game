//import { MenuState } from "./state.js"

export class AssetManager{
    constructor(game){
        this.game = game;
        this.imagePaths = [
               "images/maps/forest-bg.png", //0
               "images/maps/forest-solid.png", //1
               "images/maps/forest-backdrop.png", //2
               "images/maps/forest-complete.png", //3
        
               "images/mobile-platforms/mobilePlatform2.png", //4
               "images/mobile-platforms/mobilePlatform3.png", //5
               "images/mobile-platforms/mobilePlatform4.png", //6
               "images/mobile-platforms/mobilePlatform5.png", //7

               "images/particles/star.png", //8
               
               "images/samuraiMack/HeroSpritesheet.png", //9
               "images/kenji/EnemySpritesheet.png", //10

               "images/maps/ruins.png", //11

            ];
        this.soundPaths = [
            "sounds/coin_collected.wav", 
            "sounds/forest_song.mp3", 
            "sounds/menu_song.mp3", 
            "sounds/ruins_song.mp3",
            "sounds/button_sound.wav",
            "sounds/win_song.wav",
            "sounds/button_hover_sound.wav"
            ];
        this.images = [];
        this.sounds = [];
        
        this.imageDimensions = [
            [2560, 1440],
            [2560, 1440],
            [2560, 1440],
            [2560, 1440],


            [32, 16],
            [48, 16],
            [64, 16],
            [80, 16],

            [32, 32],
            
            [1600, 3600],
            [1600, 3200],

            [5120, 1440],
            ];
        
        this.loadedAssets = 0;
        this.assetsToLoad = this.soundPaths.length + this.imagePaths.length;
        this.loadImages();
        this.loadSounds();
       
        }
    
    loadImages(){
        this.imagePaths.forEach(path=>{ this.images.push( new Image() ) });
        
        this.images.forEach((img, i)=>{
            img.src = this.imagePaths[i];
            img.addEventListener('load', ()=>{
                this.loadedAssets+= 1;
                this.game.ui.loading_startBtn.innerText = this.loadedAssets + " out of " + this.assetsToLoad + " assets loaded...";
            })
        })
        
       this.loadedAssets = 0;
    }
    
    loadSounds(){
        this.soundPaths.forEach(path=>{ this.sounds.push( new Audio() ) });
        this.sounds.forEach((sound, i)=>{
            sound.src = this.soundPaths[i];
            sound.addEventListener('loadstart', ()=>{
                this.loadedAssets+= 1;
                this.game.ui.loading_startBtn.innerText = this.loadedAssets + " out of " + this.assetsToLoad + " assets loaded...";
            })
        })
        
       this.loadedAssets = 0;
    }
};