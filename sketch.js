let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    // 創建包含圓形位置的物件，並加入 shapes 陣列
    let shape = {
      circleX: random(width),
      circleY: random(height),
      squareScale: 1.0,
      starScale: 1.0,
    };
    shapes.push(shape);
  }
}

function draw() {
  background(220);

  for (let i = 0; i < shapes.length; i++) {
    moveAndScaleShapes(shapes[i]);
    drawShapes(shapes[i]);
  }
}

function moveAndScaleShapes(shape) {
  // 移動圓形位置
  shape.circleX += random(-1, 1);
  shape.circleY += random(-1, 1);

  // 縮放正方形大小
  shape.squareScale = sin(frameCount * 0.02) * 2 + 1;

  // 縮放星星大小
  shape.starScale = cos(frameCount * 0.02) * 0.5 + 1;
}

function drawShapes(shape) {
  // 繪製紅色星星圍繞著縮放的正方形
  fill(255, 0, 0);
  noStroke();
  for (let angle = 0; angle < 360; angle += 72) {
    let starXPos = shape.circleX + cos(radians(angle)) * (60 / 2) * shape.squareScale;
    let starYPos = shape.circleY + sin(radians(angle)) * (60 / 2) * shape.squareScale;
    drawStar(starXPos, starYPos, 60 * shape.starScale, 30, 15);
  }

  // 繪製藍色正方形圍繞著移動和縮放的圓形
  fill(0, 0, 255);
  rectMode(CENTER);
  rect(shape.circleX, shape.circleY, 50 * shape.squareScale, 50 * shape.squareScale);

  // 繪製黃色圓形
  fill(255, 255, 0);
  ellipse(shape.circleX, shape.circleY, 50, 50);
}

function drawStar(x, y, radius1, radius2, npoints) {
  // 繪製星星的函數
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// 自動調整畫布大小以填滿整個視窗
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




