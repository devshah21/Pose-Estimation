let capture;
let posenet;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide()
    posenet = ml5.poseNet(capture, modelLoaded);
}

function modelLoaded() {
    console.log('Model Loaded!');
  }

function draw() {
    image(capture, 0, 0, 800, 600);
}

