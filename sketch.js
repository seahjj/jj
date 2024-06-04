let d;
let div = 4; // branch 수 입력 가능한 변수
let sym = 360 / div;
let pg;
let angleSlider; // Slider 변수

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    pg = createGraphics(windowWidth, windowHeight);
    pg.angleMode(DEGREES);
  
    // Slider 생성
    angleSlider = createSlider(0, 200, 10); // 최소값 0, 최대값 200, 초기값 60
    angleSlider.position(10, 10); // 위치 설정
    angleSlider.style('width', '200px'); // 슬라이더 크기 설정
    // 매초 슬라이더 값 증가
    setInterval(() => {
        let val = angleSlider.value();
        if (val < 400) {
            angleSlider.value(val + 1);
        }
    }, 300); // 1000ms = 1초
}

function draw() {
    sym = 360 / div; // div 값이 변경될 때마다 sym 값도 업데이트
    //let hu = noise (map(mouseX,0,windowWidth,0,255));
    // 프랙탈을 off-screen 그래픽 버퍼에 그리기
    pg.background(50, 5); // 배경
  //  pg.stroke(mouseY / 20, 30 * mouseY / 50, 30 * mouseY / 100); // 색
 //   pg.stroke(hu,255-hu,255-hu/2); // 색
    pg.stroke(mouseX,mouseY/2,mouseX/2); // 색
    pg.strokeWeight(map(mouseX,0,windowWidth,0,4)); //
  
  //  d = PI / 3;
  //  d = map(mouseX, 0, width, 0, 200); // 펼쳐지는 각도
    d = angleSlider.value(); // 슬라이더 값으로 펼쳐지는 각도 설정 
    for (let i = 0; i < 360; i += sym) {
        pg.push();
        pg.translate(width / 2, height / 2);
        pg.rotate(i);
        branch(180); // 가지 길이
        pg.pop();
    }

    // WebGL 캔버스에 텍스처로 사용
    texture(pg);
    
    let texSize = width / 4;
    let texX = constrain(mouseX - texSize / 2, 0, width - texSize);
    let texY = constrain(mouseY - texSize / 2, 0, height - texSize);
    background(255);
    // 화면을 만화경 효과로 그리기
    noStroke();
    for (let i = 0; i < 360; i += sym) {
      push();
      //rotate(i);
      beginShape();
      let x1 = 0;
      let y1 = 0;
      let x2 = 200*cos(i);
      let y2 = 200*sin(i);
      let x3 = 200*cos(i+sym);
      let y3 = 200*sin(i+sym);
      vertex(x1, y1, texX, texY);
      vertex(x2, y2, texX + texSize, texY);
      vertex(x3, y3, texX + texSize, texY + texSize);
      endShape(CLOSE);
      pop();
    }
  
    for (let i = 0; i < 360; i += sym) {
      push();
      //rotate(i);
      beginShape();
      let x1 = 600*cos(i+sym/2);
      let y1 = 600*sin(i+sym/2);
      let x2 = 200*cos(i);
      let y2 = 200*sin(i);
      let x3 = 200*cos(i+sym);
      let y3 = 200*sin(i+sym);
      vertex(x1, y1, texX, texY);
      vertex(x2, y2, texX + texSize, texY);
      vertex(x3, y3, texX + texSize, texY + texSize);
      endShape(CLOSE);
      pop();
    }
  
    for (let i = 0; i < 360; i += sym) {
      push();
      //rotate(i);
      beginShape();
      let x1 = 200*cos(i);
      let y1 = 200*sin(i);
      let x2 = 600*cos(i-sym/2);
      let y2 = 600*sin(i-sym/2);
      let x3 = 600*cos(i+sym/2);
      let y3 = 600*sin(i+sym/2);
      vertex(x1, y1, texX, texY);
      vertex(x2, y2, texX + texSize, texY);
      vertex(x3, y3, texX + texSize, texY + texSize);
      endShape(CLOSE);
      pop();
    }
}

function branch(br) {
    pg.line(0, 0, 0, -br);
    pg.translate(0, -br);
    if (br > 5) { // 나눠지는 수 작을수록 많아짐
        pg.push();
        pg.rotate(d);
        branch(br * 0.7);
        pg.pop();
        pg.push();
        pg.rotate(-d);
        branch(br * 0.7);
        pg.pop();
    }
}
function mousePressed (){
  if (div<=12){
    div+=1;
  }
}