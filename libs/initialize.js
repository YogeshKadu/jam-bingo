import GameEvent from "./Entity/GameEvent.js";
import { defaultSettings } from "./utils/settings.js";

window.resetGameEvent = new GameEvent();
window.startGameEvent = new GameEvent();
window.updateBoardEvent = new GameEvent();
window.pauseGameEvent = new GameEvent();
window.resumeGameEvent = new GameEvent();
// window.resumeGameEvent = new GameEvent();


const inGameHomeButton = document.getElementById("home");
const inGameHelpButton = document.getElementById("help");
const inGameMuteButton = document.getElementById("mute");
const inGameRestartButton = document.getElementById("restart");
const inGameHelpDialogElement = document.getElementById("help-dialog");
const inGameCloseModalButton = document.getElementById("data-close-modal");
const inGameEnemyName = document.getElementById("playerName");
// start buttons
const playBotButton = document.getElementById("play-bot");
const playEnemyButton = document.getElementById("play-enemy");
const easyGameButton = document.getElementById("easy-game");
const complexGameButton = document.getElementById("complex-game");
// sections
const mainSection = document.getElementById("main-menu");
const gameBoardSection =document.getElementById("game-board");

const InitializeSettings = () => {
    window.settings = { ...JSON.parse(JSON.stringify(defaultSettings.settings))};
    window.player = { ...JSON.parse(JSON.stringify(defaultSettings.player))};
    window.enemy = { ...JSON.parse(JSON.stringify(defaultSettings.enemy))};
    window.game = { ...JSON.parse(JSON.stringify(defaultSettings.game))};
}
InitializeSettings();



//#region init functions
const HandleGameStart = () => {
    const { playWith } = window.settings;
    console.log("started Game");
    const isOk = confirm("Are you sure you want to restart the game ?");
    if(isOk) {
        HandlePlay(playWith);
    }
}
const HandleAudioToggle = () => {
    const { sfx = true } = window?.settings?.audio || {};
    window.settings.audio.sfx = !sfx; // assuming initially its active;
    const icons = inGameMuteButton.querySelectorAll('svg');
    console.log(sfx, window.settings.audio.sfx,'\n',icons);
    if(sfx) {
        icons[0].classList.add('hidden');
        icons[1].classList.remove('hidden');
    } else {
        icons[0].classList.remove('hidden');
        icons[1].classList.add('hidden');
    }
}
const HandleOpenHelpDialog = () => {
    inGameHelpDialogElement.showModal();
}
const HandleCloseHelpDialog = () => {
    inGameHelpDialogElement.close();
}
const HandlePlay = (playWith) => {
    mainSection.classList.add("hidden");
    gameBoardSection.classList.remove("hidden");
    inGameEnemyName.textContent = playWith != "bot" ? "ENEMY" : "bot";
    window.settings.playWith = playWith;
    window.game = { ...defaultSettings.game,  };
    window.startGameEvent.trigger();
}
const BackToHome = () => {
    // InitializeSettings();
    window.game = {...JSON.parse(JSON.stringify(defaultSettings.game))};
    if(window.settings.complexity == "easy") {
        HandlePlayEasyGame();
    }else {
        HandlePlayComplexGame();
    }
    mainSection.classList.remove("hidden");
    gameBoardSection.classList.add("hidden");
}
const HandlePlayEasyGame = () => {
    window.settings.complexity = "easy";
    easyGameButton.children[0].classList.remove("border-2");
    easyGameButton.children[0].classList.add("bg-white");
    complexGameButton.children[0].classList.remove("bg-white");
    complexGameButton.children[0].classList.add("border-2");
}
const HandlePlayComplexGame = () => {
    window.settings.complexity = "complex";
    easyGameButton.children[0].classList.remove("bg-white");
    easyGameButton.children[0].classList.add("border-2");
    complexGameButton.children[0].classList.remove("border-2");
    complexGameButton.children[0].classList.add("bg-white");
}
//#endregion

if(inGameRestartButton) 
    inGameRestartButton.addEventListener("click", () => HandleGameStart());
if(inGameMuteButton)
    inGameMuteButton.addEventListener("click", () => HandleAudioToggle());
if(inGameHelpButton)
    inGameHelpButton.addEventListener("click", () => HandleOpenHelpDialog());
if(inGameCloseModalButton)
    inGameCloseModalButton.addEventListener("click", () => HandleCloseHelpDialog());
if(inGameHomeButton)
    inGameHomeButton.addEventListener("click", () => BackToHome());

if(playBotButton)
    playBotButton.addEventListener("click", () => HandlePlay("bot"));
if(playEnemyButton)
    playEnemyButton.addEventListener("click", () => HandlePlay("player"));
if(easyGameButton)
    easyGameButton.addEventListener("click", () => HandlePlayEasyGame());
if(complexGameButton)
    complexGameButton.addEventListener("click", () => HandlePlayComplexGame());