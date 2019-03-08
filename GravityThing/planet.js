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