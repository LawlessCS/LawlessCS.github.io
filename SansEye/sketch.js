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
    image(video, 0, 0);

    if (pose) {
        fill(255, 0, 0);
        strokeWeight(1);

        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;

        sansEye.resize(50, 0);
        image(sansEye, eyeL.x-15, eyeL.y-15);
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
