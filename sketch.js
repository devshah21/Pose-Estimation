let capture;
let posenet;
let noseX, noseY;
let reyeX, reyeY;
let leyeX, leyeY;
let singlePose, skeleton;
let chestX, chestY;
let rightShoulderX, rightShoulderY;
let leftShoulderX, leftShoulderY;
let faceX, faceY;

function setup() {
  createCanvas(800, 800);
  capture = createCapture(VIDEO);
  capture.hide();
  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on("pose", receivedPoses);
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;

    // Extract keypoints for the top of the chest, shoulders, and face
    chestX = singlePose.keypoints[5].position.x;
    chestY = singlePose.keypoints[5].position.y;
    rightShoulderX = singlePose.keypoints[6].position.x;
    rightShoulderY = singlePose.keypoints[6].position.y;
    leftShoulderX = singlePose.keypoints[5].position.x;
    leftShoulderY = singlePose.keypoints[5].position.y;
    faceX = singlePose.keypoints[0].position.x;
    faceY = singlePose.keypoints[0].position.y;
  }
}

function modelLoaded() {
  console.log("Model has loaded");
}

function draw() {
  image(capture, 0, 0);
  fill(255, 0, 0);

  if (singlePose) {
    // Draw keypoints
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      ellipse(
        singlePose.keypoints[i].position.x,
        singlePose.keypoints[i].position.y,
        20
      );
    }

    // Draw skeleton
    stroke(255, 255, 255);
    strokeWeight(5);
    for (let j = 0; j < skeleton.length; j++) {
      line(
        skeleton[j][0].position.x,
        skeleton[j][0].position.y,
        skeleton[j][1].position.x,
        skeleton[j][1].position.y
      );
    }

    // Check sitting posture and provide feedback
    const shoulderWidth = leftShoulderX - rightShoulderY;
    const faceOffset = abs(faceX - chestX);
    console.log(faceX, chestX)
    console.log(faceOffset)

    if (shoulderWidth > 125) {
      // Shoulder width too narrow, potentially slouching
      fill(255, 0, 0);
      textSize(24);
      text("Check your sitting posture; your shoulders are too narrow", 10, 30);
    } else if (faceOffset < 145) {
      // Face is too far from the chest, potentially leaning forward
      fill(255, 0, 0);
      textSize(24);
      text("Check your sitting posture; your face is too far from chest.", 10, 30);
    } else {
      // Good sitting posture
      fill(0, 255, 0);
      textSize(24);
      text("Your sitting posture looks good", 10, 30);
    }
  }
}
