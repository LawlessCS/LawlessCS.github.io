let canvas;
let ctx;
let frameCount;

let planets = [];
let ship;

function begin() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    frameCount = 0;

    canvas.addEventListener("mousedown", canvasClicked);
    document.addEventListener("keydown", keyPressed);

    generatePlanets(3);
    ship = new Ship(-100, -100);

    setInterval(step, 1000/24);
}

function step() {
    clearCanvas();
    drawPlanets();
    
    ship.draw();
    ship.move();
    
    checkCollision();

    frameCount++;
    ctx.font = "20px Verdana";
    ctx.fillText("Frames: " + frameCount, 50, 550);
	ctx.fillText("You can always click a planet to warp there", 20,40);
	ctx.fillText("Press space to launch", 20, 70);
}

function canvasClicked(evt) {
    planets.forEach(planet => {
        if (Math.hypot(planet.x - evt.offsetX, planet.y - evt.offsetY) < planet.r) {
            ship.circlePlanet(planet);
            return null;
        }
    });
}

function keyPressed(evt) {
    if(evt.keyCode = 32 && ship.circlingPlanet) {
        ship.launch();
    }
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function generatePlanets(numPlanets) {
    //planets.push(new Planet(300, 150, 25));
    //planets.push(new Planet(600, 400, 25));
    //planets.push(new Planet(850, 225, 25));
	
	for(let i = 0; i < 5; i++) {
		let x = Math.floor(Math.random() * canvas.width);
		let y = Math.floor(Math.random() * canvas.height);
		planets.push(new Planet(x, y, 25));
	}
}

function drawPlanets() {
    planets.forEach(planet => {
        planet.draw();
    });
}

function checkCollision() {
    planets.forEach(planet => {
        if(Math.hypot(ship.x - planet.x, ship.y - planet.y) <= planet.gravR + ship.size && ship.planet != planet) {
            ship.circlePlanet(planet);
        }
    });
}