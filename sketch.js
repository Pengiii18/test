let capture;
let graphics;
const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#dde5b6'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  graphics = createGraphics(capture.width, capture.height); // 建立與視訊相同大小的圖形
}

function draw() {
  background('#dde5b6'); // 確保背景顏色一致

  // 更新 graphics 的內容
  graphics.push(); // 儲存 graphics 畫布狀態
  graphics.translate(graphics.width, 0); // 調整畫布位置
  graphics.scale(-1, 1); // 翻轉 x 軸
  graphics.background(0); // 設定背景為黑色
  graphics.textAlign(CENTER, CENTER); // 設定文字對齊方式
  graphics.textSize(10); // 設定文字大小
  graphics.fill(255); // 設定文字顏色為白色

  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      let col = capture.get(x, y); // 獲取 capture 對應位置的顏色
      let gray = (red(col) + green(col) + blue(col)) / 3; // 計算灰階值
      let charIndex = int(map(gray, 0, 255, density.length - 1, 0)); // 映射灰階值到字串索引
      let char = density[charIndex]; // 取得對應字元
      graphics.text(char, x + 10, y + 10); // 在單位畫面內顯示字元
    }
  }
  graphics.pop(); // 恢復 graphics 畫布狀態

  push(); // 儲存當前繪圖狀態
  translate(width, 0); // 調整畫布位置
  scale(-1, 1); // 應用鏡像效果
  let x = (width - capture.width) / 2; // 計算影像的水平居中位置
  let y = (height - capture.height) / 2; // 計算影像的垂直居中位置
  image(capture, x, y, capture.width, capture.height); // 繪製攝影機影像
  pop(); // 恢復繪圖狀態

  // 確保 graphics 正確顯示在視訊上方
  let gx = (width - graphics.width) / 2;
  let gy = (height - graphics.height) / 2;
  image(graphics, gx, gy); // 在視訊上方繪製圖形
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
  graphics.resizeCanvas(capture.width, capture.height); // 調整圖形大小
}
