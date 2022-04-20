leftWristX = 0;
rightWristX = 0;

noseX = 0;
noseY = 0;

difference = 0;

function setup() {
    canvas = createCanvas(1000, 1000);
    canvas.position(560, 156);

    video = createCapture(VIDEO);
    video.size(550, 500);

    poseNet = ml5.poseNet(video, modelLoaded);
    console.log("Model Loading");
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function gotPoses(result) {
    if (result.length > 0) {

        leftWristX = result[0].pose.leftWrist.x;
        rightWristX = result[0].pose.rightWrist.x;
        console.log("LeftWristX: " + leftWristX + " RightWristX: " + rightWristX);

        noseY = result[0].pose.nose.y;
        noseX = result[0].pose.nose.x;
        console.log("NoseX: " + result[0].pose.nose.x);
        console.log("NoseY: " + result[0].pose.nose.y);

        difference = floor(leftWristX - rightWristX);
        console.log(difference);
    }
}

function draw() {
    background("#808080");
    
    document.getElementById("sqare_side"). innerHTML = "Width and height of square will be " + difference + "px";

    fill("#FF0000");
    stroke("#FF0000");
    square(noseX,noseY, difference);
}