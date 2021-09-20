const ROWS = 100;
const COLS = 150;
const TILE_SIZE = 8;

let grid;
let next;

function setup() {
  // Create canvas with dynamic size
  createCanvas(COLS * TILE_SIZE + 1, ROWS * TILE_SIZE + 1);

  // Create arrays for grid and next state
  grid = make2DArray(ROWS, COLS);
  next = make2DArray(ROWS, COLS);
  
  // Fill grid with random values (0 or 1)
  grid = grid.map(x=>x.map(y=>Math.floor(Math.random()*2)));

  // Set up brush
  fill(255);
  strokeWeight(0);
  stroke(0);
}

function draw() {
  // Clear canvas
  background(0);  

  // Reset next state array to zeros
  next = next.map(x=>x.map(_=>0));

  // Loop through every tile
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      // Set state to contents of array at position i, j
      let state = grid[i][j];
      
      if (state == 1) {
        // Calculate canvas x, y pos for drawing
        let x = j * TILE_SIZE;
        let y = i * TILE_SIZE;

        // Draw square to show tile as live
        rect(x + 1, y + 1, TILE_SIZE - 1, TILE_SIZE - 1);
      }      

      // Count number of neighbours of tile at i, j
      let neighbours = countNeighbours(grid, i, j);

      // If tile is dead and has 3 neighbours --> tile becomes live
      // If tile is live and has less than 2 or more than 3 neighbours --> tile dies
      // Otherwise, tile remains the same
      if (state == 0 && neighbours == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  // Set grid to calculated next state
  grid = next;
}

// Create 'rows' number of 'cols' length arrays
function make2DArray(rows, cols) {
  return Array(rows).fill().map(()=>
    Array(cols).fill()
  );
}

// Count number of live cells around cell[y][x]
function countNeighbours(grid, y, x) {
  let count = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let newI = (i + y + ROWS) % ROWS;
      let newJ = (j + x + COLS) % COLS;

      count += grid[newI][newJ];
    }
  }

  count -= grid[y][x];

  return count;
}