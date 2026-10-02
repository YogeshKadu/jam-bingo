import { HandleClick, HandleEnemySelection } from "./js.utils.js";

// UI affecting functions
export function renderPlayerBoard(board, array){
    const { isGameOver=false } = window?.game || {};
    array.forEach(element => {
        const button = document.createElement("button");
        button.classList = `rounded-md aspect-square font-black text-3xl transition-all ease-out active:scale-95 ${element.highlighted ? '!bg-cyan-400 border-b-4 border-cyan-800 !text-cyan-900' :'bg-neutral-500 text-white'} disabled:bg-neutral-700 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed`
        button.textContent = element.label;
        button.dataset.id=element.id;
        button.dataset.value=element.value;
        button.addEventListener("click", (event) => HandleClick(event));
        if(isGameOver) {
            button.disabled = true;
        } else {
            button.disabled = element?.disabled || false;
        }
        board.appendChild(button);
    });
}
export function renderEnemyBoard(board, array){
    const { playWith = "bot" } = window.settings || {};
    const { isGameOver=false } = window?.game || {};

    array.forEach(element => {
        const button = document.createElement("button");
        button.classList = `rounded-md aspect-square font-black text-3xl transition-all ease-out active:scale-95 ${element.highlighted ? '!bg-pink-400 border-b-4 border-pink-800 !text-pink-900' :'bg-neutral-500 text-white'} disabled:bg-neutral-700 disabled:text-neutral-500 cursor-pointer disabled:cursor-not-allowed`
        if(playWith == "player" || element.highlighted) {
            button.textContent = element.label;
        }
        button.dataset.id=element.id;
        button.dataset.value=element.value;
        button.addEventListener("click", (event) => HandleEnemySelection(event));
        if(isGameOver) {
            button.disabled = true;
        } else {
            button.disabled = playWith == "bot" ? true : element.disabled || false;
        }
        board.appendChild(button);
    });
}

export function renderCounter(element) {
    element.textContent = window.counter;
}