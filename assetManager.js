//import { MenuState } from "./state.js"

export class AssetManager{
    constructor(game){
        this.game = game;
        this.imagePaths = [
            "images/maps/backgroundx3.png", //0
            "images/maps/cloudsx3.png", //1
            "images/maps/bushesx3.png", //2
            "images/maps/foregroundx3.png", //3
        
            "images/mobile-platforms/mobilePlatform2.png", //4
            "images/mobile-platforms/mobilePlatform3.png", //5
            "images/mobile-platforms/mobilePlatform4.png", //6
            "images/mobile-platforms/mobilePlatform5.png", //7

            "images/particles/star.png", //8
            
            "images/samuraiMack/HeroSpritesheet.png", //9
            "images/kenji/EnemySpritesheet.png", //10

            "images/maps/ruins-backgroundx3.png", //11
            "images/maps/ruins-foregroundx3.png", //12
            "images/screenshots/forest.jpg", //13
            "images/screenshots/ruins.jpg", //14

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
            [5760, 3264],
            [5760, 3264],
            [5760, 3264],
            [5760, 3264],

            [32, 16],
            [48, 16],
            [64, 16],
            [80, 16],

            [32, 32],
            
            [1600, 3600],
            [1600, 3200],

            [6144, 1728],
            [6144, 1728],
            
            [1600, 720],
            [1600, 720],

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