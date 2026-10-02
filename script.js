// Global variables and events;

import { CalculateScore, GetRandomBoard, RotateBoard } from "./libs/utils.js";
import { renderCounter, renderEnemyBoard, renderPlayerBoard } from "./libs/utils/ui.utils.js";

const counterBannerElement = document.getElementById("counter-banner");
const counterElement = document.getElementById("counter");

// player things
const playerBoardElement = document.getElementById("player-board");
const playerScoreElement = document.getElementById("player-score");
const playerTitleElement = document.getElementById("player-title");

// Enemy things
const enemyBoardElement = document.getElementById("enemy-board");
const enemyScoreElement = document.getElementById("enemy-score");
const enemyTitleElement = document.getElementById("enemy-title");

window.startGameEvent.subscribe("start-initialize_players", () => {
  window.player.playerBoardArray = GetRandomBoard(25);
  window.enemy.enemyBoardArray = GetRandomBoard(25, true);
  window.counter = 6; // expected count + 1 i.e. count + initial render;
  if(window.settings.complexity == "easy") {
    counterBannerElement.style.display="none";
  }
  window.updateBoardEvent.trigger();
});

window.updateBoardEvent.subscribe("update-player&enemy-board", () => {
    const _counter = window.counter;
    const easyGame = window.settings.complexity == "easy";
    window.counter = _counter > 0 ? _counter - 1 : 5;
    let _playerBoardArray = window?.player?.playerBoardArray || [];// RotateBoard(window.playerBoardArray, 2);
    let _enemyBoardArray = window?.enemy?.enemyBoardArray|| [];// RotateBoard(window.enemyBoardArray, 2);
    if(!easyGame && _counter == 0) {
        _playerBoardArray = RotateBoard(_playerBoardArray, 2);
        _enemyBoardArray = RotateBoard(_enemyBoardArray, 2);
    }
    // Player
    playerBoardElement.innerHTML = "";
    renderPlayerBoard(playerBoardElement, _playerBoardArray);
    // calculate player score
    const playerscore = window?.player?.score?.amount || 0;
    const playerChilds = window?.player?.score?.count || 0;
    playerScoreElement.children[0].classList = `transition-all duration-300 block h-full bg-white w-[${playerscore}%]`;
    Array.from(playerTitleElement.children).forEach((element, index) => {
        if (index < playerChilds) {
            element.className = "transition-color text-white";
        }
    });
    window.player.playerBoardArray = _playerBoardArray;
    // Enemy
    enemyBoardElement.innerHTML = "";
    renderEnemyBoard(enemyBoardElement, _enemyBoardArray);
    // Calculate Enemy score
    
    const enemyscore = window?.enemy?.score?.amount || 0;
    const enemyChilds = window?.enemy?.score?.count || 0;
    enemyScoreElement.children[0].classList = `transition-all duration-300 block h-full bg-white w-[${enemyscore}%]`;
    Array.from(enemyTitleElement.children).forEach((element, index) => {
        if (index < enemyChilds) {
            element.className = "transition-color text-white";
        }
    });
    window.enemy.enemyBoardArray = _enemyBoardArray;

    renderCounter(counterElement);
});

window.startGameEvent.trigger();
