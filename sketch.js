let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#dde5b6'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  graphics = createGraphics(capture.width, capture.height); // 建立與視訊相同大小的圖形
  graphics.fill(0, 0, 255, 150); // 設定填充顏色（藍色，透明度 150）
  graphics.noStroke();
  graphics.rect(0, 0, graphics.width, graphics.height / 4); // 繪製藍色矩形
}

function draw() {
  background('#dde5b6'); // 確保背景顏色一致
  push(); // 儲存當前繪圖狀態
  scale(-1, -1); // 翻轉 x 和 y 軸
  translate(-width, -height); // 調整畫布位置
  let x = (width - capture.width) / 2; // 計算影像的水平居中位置
  let y = (height - capture.height) / 2; // 計算影像的垂直居中位置
  image(capture, x, y, capture.width, capture.height); // 繪製攝影機影像
  pop(); // 恢復繪圖狀態

  // 確保 graphics 正確顯示
  let gx = (width - graphics.width) / 2;
  let gy = (height - graphics.height) / 2;
  image(graphics, gx, gy); // 在視訊上方繪製圖形
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 調整影像大小
  graphics.resizeCanvas(capture.width, capture.height); // 調整圖形大小
}
