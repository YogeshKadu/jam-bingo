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

window.settings = { ...defaultSettings.settings };
window.player = { ...defaultSettings.player };
window.enemy = { ...defaultSettings.enemy };
window.game = { ...defaultSettings.game };



//#region init functions
const HandleGameStart = () => {
    console.log("started Game");
    const isOk = confirm("Are you sure you want to restart the game ?");
    if(isOk)
        window.startGameEvent.trigger();
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
//#endregion

if(inGameRestartButton) 
    inGameRestartButton.addEventListener("click", () => HandleGameStart());

if(inGameMuteButton)
    inGameMuteButton.addEventListener("click", () => HandleAudioToggle());

if(inGameHelpButton)
    inGameHelpButton.addEventListener("click", () => HandleOpenHelpDialog());
if(inGameCloseModalButton)
    inGameCloseModalButton.addEventListener("click", () => HandleCloseHelpDialog());

