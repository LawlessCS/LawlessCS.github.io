class Circle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.r = 0;
        this.color = color;
        this.growing = true;
    }

    draw(fill) {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        if (fill)
            ctx.fill();
        else
            ctx.stroke();
    }

    grow() {
        if (this.growing)
            this.r += 0.5;
    }

    hitEdge(width, height) {
        return (this.x - this.r < 0 || this.x + this.r > width || this.y - this.r < 0 || this.y + this.r > height);
    }
}