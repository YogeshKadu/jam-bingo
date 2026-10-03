// calculations affected functions

import { SOUNDS } from "../Entity/sounds.js";
import { CalculateScore } from "../utils.js";

export function UpdateScore() {
    // player Score
    const _playerBoardArray = window.player.playerBoardArray;
    const playerScore = CalculateScore(_playerBoardArray);
    window.player.score={};
    window.player.score.amount = playerScore;
    window.player.score.count = playerScore/20;

    // Enemy Score
    const _enemyBoardArray = window.enemy.enemyBoardArray;
    const enemyScore = CalculateScore(_enemyBoardArray);
    window.enemy.score.amount = enemyScore;
    window.enemy.score.count = enemyScore/20;
    if(playerScore >= 100 && enemyScore >= 100) {
        window.game.winner = null;
        window.game.isGameDraw = true;
        window.game.isGameOver = true;
        console.log("Game is draw");
        overGameEvent.trigger();
    } else if (playerScore >= 100) {
        window.game.winner = "player";
        window.game.isGameOver = true;
        window.game.isGameDraw = false;
        console.log("Player won");
        overGameEvent.trigger();
    } else if (enemyScore >= 100) {
        window.game.winner = "enemy";
        window.game.isGameOver = true;
        window.game.isGameDraw = false;
        console.log("Enemy won");
        overGameEvent.trigger();
    }
}

function UpdateHighlightedOf(value, isPlayerChoice = false) {
    const { playWith } = window.settings;
    window.player.playerBoardArray.forEach(element => {
        if(element.value == value) {
            element.highlighted = true;
        }
        element.disabled = isPlayerChoice;
    });
    window.enemy.enemyBoardArray.forEach(element => {
        if(element.value == value) {
            element.highlighted = true;
        }
        element.disabled = playWith == "player" ? !isPlayerChoice : true;
    });
}

export function HandleClick(event) {
    const value = Number(event.currentTarget.dataset.value);
    const item = player.playerBoardArray.find(item=>item.value == value);
    if(item.highlighted) {
        audioController.play("WRONG_CLICK");
        return;
    } else {
        audioController.play("CLICK");
    }
    const { playWith } = window.settings;
    UpdateHighlightedOf(value, true);
    // check if player or enemy win !
    if(playWith === "bot"){
        UpdateScore();
        if(!window.game.isGameOver) {
            setTimeout(HandleEnemySelection, 1500);
        }
    }
    window.updateBoardEvent.trigger();
}

export function HandleEnemySelection(event) {
    audioController.play("CLICK");
    const { playWith } = window.settings;
    let value = 100;
    if(playWith == "bot") {
        const available = window.enemy.enemyBoardArray.filter(element => !element.highlighted);
        if(available.length == 0) return;
        const randomIndex = Math.floor(Math.random() * available.length);
        const selected = available[randomIndex];
        value = selected.value;
    } else if(playWith == "player") {
        value = Number(event.currentTarget.dataset.value);
    }
    UpdateHighlightedOf(value);
    window.updateBoardEvent.trigger();
}