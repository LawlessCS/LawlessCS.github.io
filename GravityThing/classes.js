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
        this.speed = 75;
        this.circlingPlanet = false;
        this.planet = [];
    }

    draw() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    move() {
        if (this.circlingPlanet) {
            this.x = this.planet.x + (this.planet.gravR * -Math.sin(frameCount / 10));
            this.y = this.planet.y + (this.planet.gravR * Math.cos(frameCount / 10));
        }
        else {
            this.x += this.dx;
            this.y += this.dy;
        }
    }

    circlePlanet(planet) {
        this.circlingPlanet = true;
        this.planet = planet;
    }

    launch() {
        console.log("hi");
        this.circlingPlanet = false;
        console.log(this.circlingPlanet);
        this.dx = this.speed * Math.sin(frameCount / 10) - (this.speed * Math.sin((frameCount + 1) / 10));
        this.dy = this.speed * -Math.cos(frameCount / 10) - (this.speed * -Math.cos((frameCount + 1) / 10));
    }
}