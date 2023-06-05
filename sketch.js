function setup() {
    createCanvas(800, 500);
    console.log('setup function');
}

function draw() {
    fill(255);
    ellipse(mouseX, mouseY, 50, 50);
}

