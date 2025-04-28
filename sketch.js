let capture;
let graphics;
const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let txt = "一二三四五田雷電龕龘";

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
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      let col = capture.get(x, y); // 獲取 capture 對應位置的顏色
      let g = green(col); // 保留 G 值
      graphics.fill(0, g, 100); // 設定方框顏色，R 為 0，B 為 100
      graphics.noStroke();
      graphics.rect(x + 1, y + 1, 18, 18); // 繪製方框，留出 1px 邊距

      graphics.fill(0); // 設定圓的顏色為黑色
      graphics.ellipse(x + 10, y + 10, 5, 5); // 在方框中間繪製圓

      // 新增文字映射
      let bk = brightness(col); // 計算亮度
      let bkId = int(map(bk, 0, 255, txt.length - 1, 0)); // 映射亮度到文字索引
      graphics.fill(255); // 設定文字顏色為白色
      graphics.textAlign(CENTER, CENTER);
      graphics.textSize(10);
      graphics.text(txt[bkId], x + 10, y + 10); // 繪製文字
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
