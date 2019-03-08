class Planet {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.gravR = 75;
        this.circlingPlanet = false;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        for (let i = 0; i < 40; i += 2) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.gravR, i / 20 * Math.PI, (i + 1) / 20 * Math.PI);
            ctx.stroke();
        }
    }
}

class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.size = 25;
        this.speed = 50;
        this.circlingPlanet = false;
        this.planet = [];
        this.counter = 0;
        this.clockwise = true;
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    move() {
        if (this.circlingPlanet) {
            this.x = this.planet.x + (this.planet.gravR * -Math.sin(this.counter));
            this.y = this.planet.y + (this.planet.gravR * Math.cos(this.counter));
            this.counter += (this.clockwise) ? 0.1 : -0.1;
        }
        else {
            this.x += this.dx;
            this.y += this.dy;
        }
    }

    circlePlanet(planet) {
        this.circlingPlanet = true;
        this.planet = planet;

        this.setOrbitLocation(planet);
        this.setOrbitDirection(planet);
    }

    setOrbitLocation(planet) {
        if (this.x >= planet.x && this.y >= planet.y) {
            console.log("bottom right");
            this.counter = (2 * Math.PI) - Math.atan((this.x - planet.x) / (this.y - planet.y));
        }
        else if (this.x <= planet.x && this.y >= planet.y) {
            console.log("bottom left");
            this.counter = (2 * Math.PI) + Math.atan((planet.x - this.x) / (this.y - planet.y));
        }
        else if (this.x <= planet.x && this.y <= planet.y) {
            console.log("top left");
            this.counter = Math.PI - Math.atan((planet.x - this.x) / (planet.y - this.y));
        }
        else if (this.x >= planet.x && this.y <= planet.y) {
            console.log("top right");
            this.counter = Math.PI + Math.atan((this.x - planet.x) / (planet.y - this.y));
        }
        else {
            console.log("unknown case");
        }
    }

    setOrbitDirection(planet) {
        if (Math.abs(this.dx) >= Math.abs(this.dy)) {
            this.clockwise = (this.y <= planet.y);
        }
        else {

            this.clockwise = (this.x >= planet.x);
        }
    }

    launch() {
        this.circlingPlanet = false;
        this.dy = this.speed * -Math.cos(this.counter) - (this.speed * -Math.cos((this.counter + 0.1)));
        this.dx = this.speed * Math.sin(this.counter) - (this.speed * Math.sin((this.counter + 0.1)));
        if (!this.clockwise) {
            this.dx *= -1;
            this.dy *= -1;
        }
    }
}