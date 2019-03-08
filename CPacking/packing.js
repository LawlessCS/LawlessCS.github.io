let canvas;
let ctx;
let circles = [];

function begin() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    clearCanvas();

    requestAnimationFrame(step);
}



function step() {
    let running = true;
    clearCanvas();

    for (let i = 0; i < 10; i++) {
        let attempts = 0;
        let c = newCircle();
        if (c != null)
            circles.push(c);
        else {
            i--;
            attempts++;
        }
        if (attempts >= 15) {
            running = false;
            break;
        }
    }

    circles.forEach(circle => {
        if (circle.growing) {
            if (circle.hitEdge(canvas.width, canvas.height))
                circle.growing = false;
            else {
                circles.forEach(other => {
                    if (circle != other) {
                        let d = Math.hypot(circle.x - other.x, circle.y - other.y);
                        if (d - 2 <= circle.r + other.r)
                            circle.growing = false;
                    }
                });
            }
        }
        circle.grow();
        circle.draw(circle.x % 2 == 0);
    });
    if (running)
        requestAnimationFrame(step);
    else {
        console.log("Finished with " + circles.length + " circles");
        var img = canvas.toDataURL("image/png");
        document.write('<img src="' + img + '"/>');
    }
}

function newCircle() {
    let x = Math.floor(Math.random() * (canvas.width - 2) + 1);
    let y = Math.floor(Math.random() * (canvas.height - 2) + 1);
    let c = new Circle(x, y, getRandomColor());


    let valid = true;
    circles.forEach(circle => {
        if (Math.hypot(c.x - circle.x, c.y - circle.y) <= circle.r + c.r)
            valid = false;
    });

    return (valid) ? c : null;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}