let time = 0;
let wave = [];

function setup() {
  createCanvas(1000, 400);
  slider = createSlider(1, 1000, 1);
}

function draw() {
  background(255);
  translate(250, 200);

  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = 100 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(0, 150);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    //fill(255);
    stroke(0);
    line(prevx, prevy, x, y);
    // ellipse(x, y, 8);
  }
  wave.unshift(y);
  line(x, y, 300, wave[0]);
  
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i + 150 * 2, wave[i]);
  }
  endShape();

  if (wave.length == 750)
    wave.pop();

  time += 0.05;
}