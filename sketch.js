let capture;

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
}

function draw() {
    image(capture, 0, 0, 800, 600);
}

