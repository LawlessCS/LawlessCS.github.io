let video;
let poseNet;

let pose;

let sansEye;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

    sansEye = loadImage("sans_eye.png");
}

function draw() {
    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0);
    pop();

    if (pose) {
        fill(255, 0, 0);
        strokeWeight(1);

        let eyeR = pose.rightEye;

        sansEye.resize(50, 0);
        image(sansEye, video.width / 2 - (eyeR.x - video.width / 2) - 12, eyeR.y-12);
    }
}

function modelLoaded() {
    console.log("Model loaded");
}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}
