const TILE_SIZE = 6;

let rows = 100;
let cols = 150;

let grid;
let next;

let canvas;
let ctx;

window.onload = setup;

function setup() {
  rows = Math.floor(window.innerHeight * 0.95 / TILE_SIZE);
  cols = Math.floor(window.innerWidth * 0.95 / TILE_SIZE);

  // Create canvas with dynamic size
  canvas = document.createElement("canvas");
  canvas.id = "GOL_Canvas";
  canvas.width = cols * TILE_SIZE + 1;
  canvas.height = rows * TILE_SIZE + 1;

  document.body.appendChild(canvas);

  ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Create arrays for grid and next state
  grid = make2DArray(rows, cols);
  next = make2DArray(rows, cols);
  
  // Fill grid with random values (0 or 1)
  grid = grid.map(x=>x.map(y=>Math.floor(Math.random()>0.5)));

  draw();
}

function draw() {
  // Clear canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  // Reset next state array to zeros
  next = next.map(x=>x.map(y=>0));

  // Loop through every tile
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Set state to contents of array at position i, j
      let state = grid[i][j];
      
      if (state == 1) {
        // Calculate canvas x, y pos for drawing
        let x = j * TILE_SIZE;
        let y = i * TILE_SIZE;

        // Draw square to show tile as live
        ctx.fillRect(x + 1, y + 1, TILE_SIZE - 1, TILE_SIZE -1);
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

  requestAnimationFrame(draw);
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
      let newI = (i + y + rows) % rows;
      let newJ = (j + x + cols) % cols;

      count += grid[newI][newJ];
    }
  }

  count -= grid[y][x];

  return count;
}