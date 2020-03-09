let video;
let poseNet;

let pose;
let skeleton;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0, video.width, video.height);

    if (pose) {
        fill(255, 0, 0);
        strokeWeight(1);

        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;

        let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

        for (let keyPoint of pose.keypoints) {
            let x = keyPoint.position.x;
            let y = keyPoint.position.y;

            if (keyPoint.score > 0.25) {
                ellipse(x, y, d / 7.5);
            }
        }

        for (let i = 0; i < skeleton.length; i++) {
            let a = skeleton[i][0];
            let b = skeleton[i][1];

            stroke(0, 0, 255);
            strokeWeight(2);
            line(a.position.x, a.position.y, b.position.x, b.position.y);
        }
    }
}

function modelLoaded() {
    console.log("Model loaded");
}

function gotPoses(poses) {
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}
