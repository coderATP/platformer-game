export class AudioControl{
    constructor(game){
        this.game = game;
        this.buttonSound = this.game.assetManager.sounds[4];
        this.coinSound = this.game.assetManager.sounds[0];
        this.forestSong = this.game.assetManager.sounds[1];
        this.menuSong = this.game.assetManager.sounds[2];
        this.ruinsSong = this.game.assetManager.sounds[3];
        this.playStateSongs = [this.forestSong, this.ruinsSong]
        this.winSong = this.game.assetManager.sounds[5];
        this.buttonHoverSound = this.game.assetManager.sounds[6];
        
        //ARRAY OF ALL SONGS
        this.songs = [this.menuSong, ...this.playStateSongs, this.winSong];
        //ARRAY OF ALL SOUNDS
        this.sounds = [this.buttonSound, this.buttonHoverSound, this.coinSound];
        
        //loading state buttons?
        this.game.ui.loadingBtns.forEach(btn=>{
            //hover
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
            //click
            btn.addEventListener("click", ()=>{
                this.play(this.buttonSound);
            })
        })
        
        //menu state buttons
        this.game.ui.menuBtns.forEach(btn=>{
            //hover
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
            //click
            btn.addEventListener("click", ()=>{
                this.play(this.buttonSound);
            })
        })
        
        //level-select state buttons
        this.game.ui.levelSelectBtns.forEach(btn=>{
            //hover
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
            //click
            btn.addEventListener("click", () => {
                this.play(this.buttonSound);
            })
        })
        //pause state buttons
        this.game.ui.pauseBtns.forEach(btn=>{
            //hover
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
            //click
            btn.addEventListener("click", () => {
                this.play(this.buttonSound);
            })
        })
        //restart state buttons
        this.game.ui.restartBtns.forEach(btn=>{
            //hover
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
            //click
            btn.addEventListener("click", () => {
                this.play(this.buttonSound);
            })
        })
        //level complete state buttons
        this.game.ui.levelCompleteBtns.forEach(btn=>{
            //hover
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
            //click
            btn.addEventListener("click", () => {
                this.play(this.buttonSound);
            })
        })
        //options state buttons
        this.game.ui.optionsBtns.forEach(btn=>{
            //hover
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
            //click
            btn.addEventListener("click", () => {
                this.play(this.buttonSound);
            })
        })
        //volume controller
        this.game.ui.volume_controllers.forEach(controller=>{
            controller.addEventListener('change', ()=>{
                this.play(this.buttonHoverSound);
            })
        })
    }
    play(audio){
        audio.currentTime = 0;
        audio.play();
    }
    pause(audio){
        audio.pause();
    }
    stop(audio){
        audio.currentTime = 0;
        audio.pause();
    }
}