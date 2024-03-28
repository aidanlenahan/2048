// Define constants
const gridSize = 4;
const initialTileCount = 2;

// Initialize the game board
let board = new Array(gridSize);
for (let i = 0; i < gridSize; i++) {
    board[i] = new Array(gridSize).fill(0);
}

// Add initial tiles to the board
function addInitialTiles() {
    for (let i = 0; i < initialTileCount; i++) {
        addRandomTile();
    }
}

// Add a random tile (2 or 4) to an empty cell
function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4; // 90% chance of 2, 10% chance of 4
    }
}

// Render the game board
function renderBoard() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = ""; // Clear the grid

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const tile = document.createElement("div");
            tile.classList.add("grid-cell");
            tile.textContent = board[row][col] === 0 ? "" : board[row][col];
            tile.style.backgroundColor = getTileColor(board[row][col]);
            gridContainer.appendChild(tile);
        }
    }
}

// Define tile colors based on tile value (customize as needed)
function getTileColor(value) {
    switch (value) {
        case 2: return "#eee4da";
        case 4: return "#ede0c8";
        // Add more cases for other values
        default: return "#cdc1b4";
    }
}

// Handle key presses for tile movement
document.addEventListener("keydown", function (event) {
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
    }
});

// Implement tile movement functions (e.g., moveTilesUp, moveTilesDown, etc.)
// Implement tile movement functions

function moveTilesUp() {
    let moved = false;
    for (let col = 0; col < gridSize; col++) {
        for (let row = 1; row < gridSize; row++) {
            if (board[row][col] !== 0) {
                let newRow = row;
                while (newRow > 0 && board[newRow - 1][col] === 0) {
                    newRow--;
                }

                if (newRow !== row) {
                    board[newRow][col] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }

                if (newRow > 0 && board[newRow - 1][col] === board[newRow][col]) {
                    board[newRow - 1][col] *= 2;
                    board[newRow][col] = 0;
                    score += board[newRow - 1][col];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveTilesDown() {
    let moved = false;
    for (let col = 0; col < gridSize; col++) {
        for (let row = gridSize - 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                let newRow = row;
                while (newRow < gridSize - 1 && board[newRow + 1][col] === 0) {
                    newRow++;
                }

                if (newRow !== row) {
                    board[newRow][col] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }

                if (newRow < gridSize - 1 && board[newRow + 1][col] === board[newRow][col]) {
                    board[newRow + 1][col] *= 2;
                    board[newRow][col] = 0;
                    score += board[newRow + 1][col];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveTilesLeft() {
    let moved = false;
    for (let row = 0; row < gridSize; row++) {
        for (let col = 1; col < gridSize; col++) {
            if (board[row][col] !== 0) {
                let newCol = col;
                while (newCol > 0 && board[row][newCol - 1] === 0) {
                    newCol--;
                }

                if (newCol !== col) {
                    board[row][newCol] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }

                if (newCol > 0 && board[row][newCol - 1] === board[row][newCol]) {
                    board[row][newCol - 1] *= 2;
                    board[row][newCol] = 0;
                    score += board[row][newCol - 1];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveTilesRight() {
    let moved = false;
    for (let row = 0; row < gridSize; row++) {
        for (let col = gridSize - 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                let newCol = col;
                while (newCol < gridSize - 1 && board[row][newCol + 1] === 0) {
                    newCol++;
                }

                if (newCol !== col) {
                    board[row][newCol] = board[row][col];
                    board[row][col] = 0;
                    moved = true;
                }

                if (newCol < gridSize - 1 && board[row][newCol + 1] === board[row][newCol]) {
                    board[row][newCol + 1] *= 2;
                    board[row][newCol] = 0;
                    score += board[row][newCol + 1];
                    moved = true;
                }
            }
        }
    }
    return moved;
}

// Initialize the game
addInitialTiles();
renderBoard();

// Initialize the game
addInitialTiles();
renderBoard();
