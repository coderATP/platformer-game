import { Forest, Ruins } from "./levels.js";
import { level1_solidMap2D, level2_solidMap2D } from "./mapData.js"
import { lerp } from "./ease.js"

const STATES = {
    LOAD: 0,
    MENU: 1,
    LEVELSELECT: 2,
    PLAY: 3,
    PAUSE: 4,
    GAMEOVER: 5
};


class GameState{
    constructor(game){
        this.game = game;
        this.loadingScreen = document.getElementById("loadingScreen");
        this.menuScreen = document.getElementById("menuScreen");
        this.levelSelectScreen = document.getElementById("levelSelectScreen");
        this.playScreen = document.getElementById("playScreen");
        this.pauseScreen = document.getElementById("pauseScreen");
        this.gameOverScreen = document.getElementById("gameOverScreen");
        this.levelCompleteScreen = document.getElementById("levelCompleteScreen");
        this.playSceneCurtain = document.getElementById("playSceneCurtain");
        this.loading_startBtn = document.getElementById("loading_start");
        this.restartConfirmScreen = document.getElementById("restartConfirmScreen");
        this.optionsScreen = document.getElementById("optionsScreen");
        this.shouldUpdate = true;
        this.shouldRender = true;
        this.opacity = 0;
        
    }
    
    hideAllScreens(){
          this.loadingScreen.style.display = "none";
          this.menuScreen.style.display = "none";
          this.levelSelectScreen.style.display = "none";
          this.playScreen.style.display = "none";
          this.playSceneCurtain.style.display = "none";
          this.pauseScreen.style.display = "none";
          this.levelCompleteScreen.style.display = "none";
          this.gameOverScreen.style.display = "none";
          this.restartConfirmScreen.style.display = "none";
          this.optionsScreen.style.display = "none";
    }
    
    hide(screen){
        screen.style.display = "none";
    }
    
    show(screen, display){
        screen.style.display = display;
    }
    
    update(){
    }
    activate(){ this.active = true; } 
    deactivate() { this.active = false; }
}

export class LoadingState extends GameState{
    
    start(){
        this.game.paused = true;
        this.hideAllScreens();
        this.show(this.loadingScreen, "grid");
    }
    render(ctx, deltaTime){
       
    }
    
    update(ctx, deltaTime){
        super.update();
        //Go to MenuState once all assets are finished loading
        if (this.game.assetManager.loadedAssets === this.game.assetManager.assetsToLoad) {
            this.game.ui.loading_startBtn.innerText = "all assets loaded, press anywhere to start";
            this.game.ui.loading_startBtn.addEventListener('click', (e) => {
               // this.game.toggleFullscreen();
                this.game.gsm.enterState(this.game.STATES.MENU);
            })
        }
    }
}

export class MenuState extends GameState{
    start(){
        this.game.paused = true;
        this.hideAllScreens();
        this.show(this.menuScreen, "grid");
        this.game.audio.playStateSongs.forEach(song=>{
            this.game.audio.stop(song);
        })
        this.game.audio.menuSong.play();
    }
    render(ctx, deltaTime){
        
    }
    
    update(ctx, deltaTime)
    {
        super.update();
        //go to level-select state
        this.game.ui.menu_playBtn.addEventListener('click', ()=>{
            this.game.gsm.enterState(this.game.STATES.LEVELSELECT);
        })
        this.game.ui.menu_optionsBtn.addEventListener('click', ()=>{
            this.game.gsm.enterState(this.game.STATES.OPTIONS);
        })
        this.game.ui.menu_leaderboardBtn.addEventListener('click', () => {
            
        })
        this.game.ui.menu_tutorialBtn.addEventListener('click', () => {

        })
        this.game.ui.menu_exitBtn.addEventListener('click', () => {

        })
    }
}

export class PlayState extends GameState{
    
    start(){
        this.game.paused = false;
        this.hideAllScreens();
        this.show(this.playScreen, "block");
        //toggle pause-button text
        this.game.ui.play_pauseBtn.innerText = "pause";
      
        //select which song to play
        if(this.game.currentLevel.id == "forest"){
            this.game.audio.forestSong.play();
        }
        else if(this.game.currentLevel.id == "ruins"){
            this.game.audio.ruinsSong.play();
        }
         
    }

    
    render(ctx, deltaTime){
        //bg
        this.game.backgroundLayers.forEach(layer=>{layer.render(ctx)})
        //map
        this.game.map.render(ctx);
        //this.game.collisionBlock.render(level1_solidMap2D, ctx);
        this.game.mobileBlocks.forEach(block => { block.render(ctx) });
        this.game.enemies.forEach(enemy=>{ enemy.render(ctx);});
        
        //particle effects
        //this.game.player.dustParticles.forEach(particle=>{particle.render(ctx)})
        //this.game.player.starParticles.forEach(particle=>{particle.render(ctx)})
 
        this.game.player.render(ctx);
    }
    
    update(ctx, deltaTime){
        super.update();
        if (!this.game.paused) {

            this.game.enemies.forEach(enemy=>{enemy.update(deltaTime)});

            this.game.player.update(deltaTime);
            this.game.camera.update(deltaTime);
            //particles
            //this.game.player.dustParticles.forEach(particle=>{particle.update(deltaTime)});
            this.game.player.starParticles.forEach(particle=>{particle.update(deltaTime)});
            //this.game.collisionBlock.update(deltaTime);

            this.game.mobileBlocks.forEach(block => { block.update(deltaTime) });

            //ON LEVEL COMPLETE
            if(this.game.rectangularCollision(this.game.player, this.game.exitDoor)){
                this.game.gsm.enterState(this.game.STATES.FADEOUT);
            }
                
        }
        //GO TO PAUSE MODE
        //toggle pause-button text
        this.game.ui.play_pauseBtn.addEventListener('mousedown', (e)=>{
            //this.game.audio.play(this.game.audio.buttonSound);
            if(e.target.innerText == "pause" && this.game.input.keypressed){
                e.target.innerText = "play";
                this.game.gsm.enterState(this.game.STATES.PAUSE);
                this.game.input.keypressed = false;
            }
        })
    }
}

export class FadeIn extends GameState{
    
    start(){
        this.game.paused = false;
        this.hideAllScreens();
        this.show(this.playScreen, "block");
        this.show(this.playSceneCurtain, "grid");
        this.playSceneCurtain.style.opacity = 1;
        this.playSceneCurtain.style.zIndex = 10;
        this.opacity = 1;
        this.game.audio.playStateSongs.forEach(song=>{
            this.game.audio.stop(song);
        })
        this.game.audio.stop(this.game.audio.menuSong);
    }
    render(ctx, deltaTime){
       //bg
        this.game.backgroundLayers.forEach(layer=>{layer.render(ctx)})
        this.game.map.render(ctx);
        this.game.mobileBlocks.forEach(block => { block.render(ctx) });
        this.game.enemies.forEach(enemy=>{enemy.render(ctx)});
        this.game.player.render(ctx);
    }
    
    curtainsUp(deltaTime){
        if(this.opacity >= 0){
            this.opacity-= (deltaTime/2000);
            setTimeout(()=>{this.curtainsUp(deltaTime)}, 100);
        }
        this.playSceneCurtain.style.opacity = this.opacity;
    }
    
    update(ctx, deltaTime){
        this.curtainsUp(deltaTime);
        if (this.opacity <= 0) {
            this.game.gsm.enterState(this.game.STATES.PLAY);
        } 
    }
}

export class FadeOut extends GameState{
    
    start(){
        this.game.paused = true;
        this.hideAllScreens();
        this.show(this.playScreen, "block");
        this.show(this.playSceneCurtain, "grid");
        this.playSceneCurtain.style.opacity = 0;
        this.playSceneCurtain.style.zIndex = 10;
        this.opacity = 0;
    }
    render(ctx, deltaTime){
        this.game.map.render(ctx);
        this.game.mobileBlocks.forEach(block => { block.render(ctx) });
        this.game.enemies.forEach(enemy=>{enemy.render(ctx)});
        this.game.player.render(ctx);

    }
    
    curtainsDown(deltaTime){
        if(this.opacity < 1){
            this.opacity+= deltaTime/2000;
            setTimeout(()=>{this.curtainsDown(deltaTime)}, 100);
        }
        this.playSceneCurtain.style.opacity = this.opacity;
    }
    
    update(ctx, deltaTime){
        super.update();
        this.curtainsDown(deltaTime);
        if(this.opacity >= 1) this.game.gsm.enterState(this.game.STATES.LEVELCOMPLETE);
        }
}

export class PauseState extends GameState{
    
    start(){
        this.game.paused = true;
        this.hideAllScreens();
        this.show(this.playScreen, "block");
        this.show(this.pauseScreen, "grid");
    }
    
    render(ctx, deltaTime){
        this.game.map.render(ctx);
        this.game.mobileBlocks.forEach(block => { block.render(ctx) });
        this.game.enemies.forEach(enemy=>{ enemy.render(ctx);});
        this.game.player.render(ctx);
    }
    
    update(ctx, deltaTime){
        super.update()
        //resume
        this.game.ui.pause_resumeBtn.addEventListener("click", ()=>{
            this.game.gsm.enterState(this.game.STATES.PLAY);
        })
        //restart button click
        this.game.ui.pause_restartBtn.addEventListener('click', ()=>{
            this.game.gsm.enterState(this.game.STATES.RESTARTCONFIRM);
        })
        //go to main menu
        this.game.ui.pause_menuBtn.addEventListener('click', ()=>{
            this.game.gsm.enterState(this.game.STATES.LEVELSELECT);
        })
    }
}

export class RestartConfirmState extends GameState{
    
    start(){
        this.game.paused = true;
        this.hideAllScreens();
        this.show(this.playScreen, "block");
        //this.show(this.pauseScreen, "grid");
        this.show(this.restartConfirmScreen, "grid");
    }
    
    render(ctx, deltaTime){
        this.game.map.render(ctx);
        this.game.mobileBlocks.forEach(block => { block.render(ctx) });
        this.game.enemies.forEach(enemy=>{ enemy.render(ctx);});
        this.game.player.render(ctx);
    }
    
    
    update(ctx, deltaTime){
        super.update()
        //back to pause (no button clicked)
        this.game.ui.restart_noBtn.addEventListener("click", ()=>{
            this.game.gsm.enterState(this.game.STATES.PAUSE);
        })
        //restart (yes button clicked)
        this.game.ui.restart_yesBtn.addEventListener("click", ()=>{
            this.game.currentLevel.restart();
            this.game.gsm.enterState(this.game.STATES.PLAY);
        })
    }
}

export class LevelSelectState extends GameState{
    constructor(game){
        super(game);
        this.imageIndex = 0;
        this.numberOfLevels = 4;
    }
    start(){
        this.hideAllScreens();
        this.show(this.levelSelectScreen, "grid");
    }
    
    renderScreenshot(){
        const canvas = document.querySelector("#levelScreenshot_canvas");
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.game.ui.levelScreenshot, 0, 0, canvas.width, canvas.height);
    }
    
    setSelectedLevel() {
        if (this.imageIndex == 0) {
            this.game.currentLevel = this.game.levels[0];
            this.game.currentLevel.reset();
        }
        else if (this.imageIndex == 1) {
            this.game.currentLevel = this.game.levels[1];
            this.game.currentLevel.reset(); 
        }
        else if (this.imageIndex == 2) {
            this.game.currentLevel = this.game.levels[1];
            this.game.currentLevel.reset();
        }
        else if (this.imageIndex == 3) {
            this.game.currentLevel = this.game.levels[1];
            this.game.currentLevel.reset();
        }
    }
    
    navigateLevels(){
        const input = this.game.input;
        const images = [
                        this.game.assetManager.images[3],
                        this.game.assetManager.images[11],
                        this.game.assetManager.images[2],
                        this.game.assetManager.images[2]
            ];
        
        const imageDescriptions = [ "forest","ruins", "crypt", "cemetry" ];
                                   
        switch(input.keys[0]){
            //navigation with the circles, easy
            //forest circle
            case "levelSelect_forest":
                this.imageIndex = 0;
            break;
            //ruins circle
            case "levelSelect_ruins":
                this.imageIndex = 1;
            break;
            //crypt circle
            case "levelSelect_crypt":
                this.imageIndex = 2;
            break;
            //cemetry circle
            case "levelSelect_cemetry":
                this.imageIndex = 3;
            break;
            
            //navigation with the arrows, intermediate
            //"next" arrow
            case "levelSelect_next":
                //this.game.audio.play(this.game.audio.buttonSound);
                if(this.imageIndex < this.numberOfLevels - 1  && input.keypressed){
                    this.imageIndex++;
                    input.keypressed = false;
                }
                else if(this.imageIndex >= this.numberOfLevels - 1 && input.keypressed){
                    this.imageIndex = 0;
                    input.keypressed = false;
                }
            break;
            //"previous" arrow
            case "levelSelect_previous":
                //this.game.audio.play(this.game.audio.buttonSound);
                if(this.imageIndex  > 0 && input.keypressed){
                    this.imageIndex--;
                    input.keypressed = false;
                }
                else if(this.imageIndex <= 0 && input.keypressed){
                    this.imageIndex = this.numberOfLevels - 1;
                    input.keypressed = false;
                }
            break;
        }
        
        //BASED ON INAGE THE SET IMAGE-INDEX VALUE WE WILL NOW SET:
        // (A) THE SCREENSHOT PROPERTIES
        // (B) THE IMAGE FILEPATH
        this.game.ui.levelScreenshot = images[this.imageIndex];
        // (C) THE IMAGE ID 
        this.game.ui.levelScreenshot.id = imageDescriptions[this.imageIndex];
        //(D) THE IMAGE INFORMATION / DESCRIPTION 
        this.game.ui.levelDescription.innerText = imageDescriptions[this.imageIndex];
        //(E) CURRENT LEVEL TO THE SELECTED LEVEL BASED ON IMAGE-INDEX VALUE
        this.setSelectedLevel();
    }
    
    render(ctx, deltaTime){
        this.renderScreenshot();
    }
    
    
    update(ctx, deltaTime){
        //NAVIGATE THROUGH THE LEVELS USING ARROWS/CIRCLES
        this.navigateLevels();
        //GO TO SELECTED LEVEL WHEN "ENTER" KEY IS PRESSED
        if (this.game.input.keys[0] == "levelSelect_enter") {
                this.setSelectedLevel();
                this.game.gsm.enterState(new FadeIn(this.game));
        }
        //UPDATE ANY CODE INSIDE THE INTERFACE
        super.update();
        
        //GO BACK TO MENU
        //set current level to selected level first
        this.game.ui.levelSelect_back.addEventListener('click', ()=>{
            this.setSelectedLevel();
            this.game.gsm.enterState(this.game.STATES.MENU);
        })
        //go to options...coming soon
        
    }
}

export class LevelCompleteState extends GameState{

    start(){
        this.hideAllScreens();
        this.show(this.levelCompleteScreen, "grid");
        this.game.audio.playStateSongs.forEach(song=>{
            this.game.audio.stop(song);
        })
        this.game.audio.winSong.play();
    }
    
    render(ctx, deltaTime){
    }
    
    
    update(ctx, deltaTime){
        super.update();
        //end-of-level-summary
        this.scoreSection = document.getElementById("score");
        this.scoreSection.innerText = "Score:  " + this.game.player.score;
        
        //REPLAY THE SAME LEVEL
        //restart only the necessary parameters to boost game performance
        this.game.ui.levelComplete_replayBtn.addEventListener("click", ()=>{
            this.game.currentLevel.restart();
            this.game.gsm.enterState(this.game.STATES.PLAY);
        })
        
        //GO TO THE NEXT LEVEL
        //change the current level
        //and reset ALL the parameters to that of the new level
        if(this.game.input.keys[0] == "levelComplete_nextBtn" && this.game.input.keypressed){
            if (this.game.currentLevel.id === "forest") {
                this.game.currentLevel = this.game.levels[1];
                this.game.currentLevel.reset();  
                this.game.gsm.enterState(this.game.STATES.FADEIN);
                this.game.input.keypressed = false;
            }
        }
      
        if(this.game.input.keys[0] == "levelComplete_nextBtn" && this.game.input.keypressed){
            if (this.game.currentLevel.id === "ruins") {
                this.game.currentLevel = this.game.levels[0];
                this.game.currentLevel.reset();

                this.game.gsm.enterState(this.game.STATES.FADEIN);
                this.game.input.keypressed = false;
            }
        }
        //GO TO MENU
        //update to next level before exiting
        //so that "continue" on the main menu can take us straight to the next level 
        this.game.ui.levelComplete_menuBtn.addEventListener("click", ()=>{
            if (this.game.currentLevel.id === "forest") {
                this.game.currentLevel = this.game.levels[1];
                this.game.currentLevel.reset();
                this.game.gsm.enterState(this.game.STATES.MENU);
            }
            else if (this.game.currentLevel.id === "ruins") {
                this.game.currentLevel = this.game.levels[0];
                this.game.currentLevel.reset();
                this.game.gsm.enterState(this.game.STATES.MENU);
            }
        })
    }
}

export class GameOverState extends GameState{
    
    start(){
        this.hideAllScreens();
        this.show(this.playScreen, "block");
        this.show(this.pauseScreen, "grid");
        this.game.player.score = 0;
    }
    
    render(ctx, deltaTime){
    }
    
    update(ctx, deltaTime){
        super.update()
        //resume
        
        //go to options
        
        //go to main menu
    }
}

export class OptionsState extends GameState{
    start(){
        this.hideAllScreens();
        this.show(this.optionsScreen, "flex");
    }

    render(ctx){
        
    }

    update(ctx, deltaTime){
        this.game.ui.volume_controllers.forEach(controller=>{
            controller.addEventListener('change', (e)=>{
                if(e.target.id == "options_sfx"){
                    this.game.audio.sounds.forEach(sound=>{
                        sound.volume = e.target.value * 0.1;
                    })
                }
                else if(e.target.id == "options_music"){
                    this.game.audio.songs.forEach(song=>{
                        song.volume = e.target.value * 0.1;
                    })
                }
            })
        }) 
        //BACK TO MENU
        this.game.ui.options_menuBtn.addEventListener('click', ()=>{
            this.game.gsm.enterState(new MenuState(this.game));
        })
    }
}

//GAME STATES MANAGER
export class GSM{
    constructor(game){
        this.game = game;
        this.currentState = new LoadingState(game);
        this.currentState.start();
    }
    
    enterState(state){
        this.currentState = null;
        this.currentState = state;
        this.currentState.start();
    }
    
    updateState(ctx,deltaTime){
        this.currentState.update(ctx, deltaTime);
    }
    
    renderState(ctx, deltaTime){
        this.currentState.render(ctx, deltaTime);
    }
}