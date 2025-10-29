// Constants
const gridSize = 4;
const initialTileCount = 2;

// Game state
let board = [];
let score = 0;

// Initialize game
function initGame() {
    board = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    score = 0;
    updateScore();
    addInitialTiles();
    renderBoard();
}

// Add initial tiles
function addInitialTiles() {
    for (let i = 0; i < initialTileCount; i++) {
        addRandomTile();
    }
}

// Add random tile (2 or 4)
function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) emptyCells.push({ row, col });
        }
    }

    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Render board
function renderBoard() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const tile = document.createElement("div");
            tile.classList.add("grid-cell");
            const value = board[row][col];
            tile.textContent = value === 0 ? "" : value;
            tile.style.backgroundColor = getTileColor(value);

            // Smooth animation for merging
            if (tile.textContent !== "" && tile.classList) {
                tile.classList.add("appear");
                setTimeout(() => tile.classList.remove("appear"), 150);
            }

            gridContainer.appendChild(tile);
        }
    }
}

// Tile colors
function getTileColor(value) {
    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        case 8: return "#f2b179";
        case 16: return "#f59563";
        case 32: return "#f67c5f";
        case 64: return "#f65e3b";
        case 128: return "#edcf72";
        case 256: return "#edcc61";
        case 512: return "#edc850";
        case 1024: return "#edc53f";
        case 2048: return "#edc22e";
        default: return "#cdc1b4";
    }
}

// Update score display
function updateScore() {
    document.getElementById("score-value").textContent = score;
}

// Key controls
document.addEventListener("keydown", (event) => {
    let moved = false;
    switch (event.key) {
        case "ArrowUp":
            moved = moveTilesUp();
            break;
        case "ArrowDown":
            moved = moveTilesDown();
            break;
        case "ArrowLeft":
            moved = moveTilesLeft();
            break;
        case "ArrowRight":
            moved = moveTilesRight();
            break;
    }

    if (moved) {
        addRandomTile();
        renderBoard();
        if (!canMove()) {
            setTimeout(() => alert("Game Over! Final Score: " + score), 100);
        }
    }
});

// Movement utilities
function compress(row) {
    return row.filter(x => x !== 0).concat(Array(gridSize - row.filter(x => x !== 0).length).fill(0));
}

function combine(row) {
    for (let i = 0; i < gridSize - 1; i++) {
        if (row[i] !== 0 && row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i]; // scoring logic: add combined tile value
            row[i + 1] = 0;
        }
    }
    return row;
}

// Move left
function moveTilesLeft() {
    let moved = false;
    for (let row = 0; row < gridSize; row++) {
        const original = [...board[row]];
        let newRow = compress(board[row]);
        newRow = combine(newRow);
        newRow = compress(newRow);
        board[row] = newRow;
        if (JSON.stringify(original) !== JSON.stringify(newRow)) moved = true;
    }
    updateScore();
    return moved;
}

// Move right
function moveTilesRight() {
    let moved = false;
    for (let row = 0; row < gridSize; row++) {
        const original = [...board[row]];
        let newRow = compress(board[row].slice().reverse());
        newRow = combine(newRow);
        newRow = compress(newRow);
        newRow.reverse();
        board[row] = newRow;
        if (JSON.stringify(original) !== JSON.stringify(newRow)) moved = true;
    }
    updateScore();
    return moved;
}

// Move up
function moveTilesUp() {
    let moved = false;
    for (let col = 0; col < gridSize; col++) {
        const column = [];
        for (let row = 0; row < gridSize; row++) column.push(board[row][col]);
        const original = [...column];
        let newCol = compress(column);
        newCol = combine(newCol);
        newCol = compress(newCol);
        for (let row = 0; row < gridSize; row++) board[row][col] = newCol[row];
        if (JSON.stringify(original) !== JSON.stringify(newCol)) moved = true;
    }
    updateScore();
    return moved;
}

// Move down
function moveTilesDown() {
    let moved = false;
    for (let col = 0; col < gridSize; col++) {
        const column = [];
        for (let row = 0; row < gridSize; row++) column.push(board[row][col]);
        const original = [...column];
        let newCol = compress(column.reverse());
        newCol = combine(newCol);
        newCol = compress(newCol);
        newCol.reverse();
        for (let row = 0; row < gridSize; row++) board[row][col] = newCol[row];
        if (JSON.stringify(original) !== JSON.stringify(newCol)) moved = true;
    }
    updateScore();
    return moved;
}

// Check for moves left
function canMove() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) return true;
            if (col < gridSize - 1 && board[row][col] === board[row][col + 1]) return true;
            if (row < gridSize - 1 && board[row][col] === board[row + 1][col]) return true;
        }
    }
    return false;
}

// Restart button
document.getElementById("restart-button").addEventListener("click", () => {
    initGame();
});

// Start game
initGame();
