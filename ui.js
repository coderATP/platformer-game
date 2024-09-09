export class UI{
    constructor(){
        this.loading_startBtn = document.getElementById("loading_startBtn");
        this.menu_playBtn = document.getElementById("menu_playBtn");
        this.menu_optionsBtn = document.getElementById("menu_optionsBtn");
        this.menu_leaderboardBtn = document.getElementById("menu_leaderboardBtn");
        this.menu_tutorialBtn = document.getElementById("menu_tutorialBtn");
        this.menu_exitBtn = document.getElementById("menu_exitBtn");
        this.menuBtns = [this.menu_playBtn, this.menu_optionsBtn, this.menu_leaderboardBtn, this.menu_tutorialBtn, this.menu_exitBtn];
        
        this.fullscreenBtn = document.getElementById("play_fullscreenBtn");
        this.play_pauseBtn = document.getElementById("play_pauseBtn");
        this.play_specialBtn = document.getElementById("special");

        this.levelComplete_replayBtn = document.getElementById("levelComplete_replayBtn");
        this.levelComplete_nextBtn = document.getElementById("levelComplete_nextBtn");
        this.levelComplete_menuBtn = document.getElementById("levelComplete_menuBtn");
        this.levelCompleteBtns = [this.levelComplete_replayBtn, this.levelComplete_nextBtn, this.levelComplete_menuBtn];

        //level select
        this.levelScreenshot = document.getElementById("forest");
        this.levelDescription = document.getElementById("imageDescription");
        this.levelSelect_back = document.getElementById("levelSelect_back");
        this.levelSelect_enter = document.getElementById("levelSelect_enter");
        this.levelSelectBtns = [this.levelSelect_back,  this.levelSelect_enter];

        //pause
        this.pause_restartBtn = document.getElementById("pause_restartBtn");
        this.pause_resumeBtn = document.getElementById("pause_resumeBtn");
        this.pause_menuBtn = document.getElementById("pause_menuBtn");
        this.pauseBtns = [this.pause_restartBtn, this.pause_resumeBtn, this.pause_menuBtn];
        
        //restart
        this.restart_yesBtn = document.getElementById("restart_yesBtn");
        this.restart_noBtn = document.getElementById("restart_noBtn");

        this.restartBtns = [this.restart_noBtn, this.restart_yesBtn];
        
    }
}