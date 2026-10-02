export const defaultSettings = {
    settings: {
        audio: {
            sfx: true
        },
        complexity: "complex", // complex
        playWith: "player"
    },
    player: {
        playerBoardArray: [],
        score: {
            amount: null,
            count: null
        }
    },
    enemy: {
        enemyBoardArray: [],
        score: {
            amount: null,
            count: null
        }
    },
    game: {
        winner: null,
        isGameOver: false,
        isGameDraw: false,
    }
}