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

        this.playStateSongs.forEach(song=>{
            song.volume = 1;
        })
        this.menuSong.volume = 1;

        //menu button hover
        this.game.ui.menuBtns.forEach(btn=>{
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
        })
        //level select hover
        this.game.ui.levelSelectBtns.forEach(btn=>{
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
        })
        //pause state button hover
        this.game.ui.pauseBtns.forEach(btn=>{
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
        })
        //restart state button hover
        this.game.ui.restartBtns.forEach(btn=>{
            btn.addEventListener("mouseover", ()=>{
                this.play(this.buttonHoverSound);
            })
        })
        //level complete state button hover
        this.game.ui.levelCompleteBtns.forEach(btn=>{
            btn.addEventListener("mouseover", ()=>{
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