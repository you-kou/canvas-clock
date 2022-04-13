const canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d'),

      CLOCK_RADIUS = canvas.width / 2 - 15,
      HOUR_HAND_TRUNCATION = 35, // 时针与分针的长度差

      ballPainter = {
          paint: function(sprite, context) {
              let x = sprite.left + sprite.width / 2,
                  y = sprite.top + sprite.height / 2,
                  width = sprite.width,
                  height = sprite.height,
                  radius = sprite.width / 2;

              context.save();
              context.beginPath();
              context.arc(x, y, radius, 0, Math.PI * 2, false);
              context.clip();

              context.shadowColor = 'rbg(0,0,0)';
              context.shadowOffsetX = -4;
              context.shadowOffsetY = -4;
              context.shadowBlur = 8;

              context.fillStyle = 'rgb(218,165,32,0.1)';
              context.fill();

              context.lineWidth = 2;
              context.strokeStyle = 'rgb(100,100,195)';
              context.stroke();

              context.restore();
          },
      },

      ball = new Sprite('ball', ballPainter);

/**
 * 绘制网格
 */
function drawGrid(color, stepx, stepy) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for (let i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }
    for (let i = stepy + 0.5; i < context.canvas.height; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }
}

/**
 * 绘制单一指针
 */
function drawHand(loc, isHour) {
    let angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2,
        handRadius = isHour ? CLOCK_RADIUS - HOUR_HAND_TRUNCATION
                            : CLOCK_RADIUS;
        lineEnd = {
            x: canvas.width / 2 + Math.cos(angle) * (handRadius - ball.width / 2),
            y: canvas.height / 2 + Math.sin(angle) * (handRadius - ball.width / 2)
        };

    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(lineEnd.x, lineEnd.y);
    context.stroke();

    ball.left = canvas.width / 2 + Math.cos(angle) * handRadius - ball.width / 2;
    ball.top = canvas.height / 2 + Math.sin(angle) * handRadius - ball.height / 2;
    ball.paint(context);
}

/**
 * 绘制时钟
 */
function drawClock() {
    drawClockFace();
    drawHands();
}

/**
 * 绘制所有指针
 */
function drawHands () {
    let date = new Date(),
        hour = date.getHours();

    ball.width = 20;
    ball.height = 20;
    drawHand(date.getSeconds(), false);

    hour = hour > 12 ? hour - 12 : hour;
    ball.width = 35;
    ball.height = 35;
    drawHand(date.getMinutes(), false);

    ball.width = 50;
    ball.height = 50;
    drawHand(hour * 5 + (date.getMinutes() / 60) * 5);

    ball.width = 10;
    ball.height = 10;
    ball.left = canvas.width / 2 - ball.width / 2;
    ball.top = canvas.height / 2 - ball.height / 2;
    ballPainter.paint(ball, context);
}

/**
 * 绘制钟面
 */
function drawClockFace() {
    context.beginPath();
    context.arc(canvas.width / 2,canvas.height / 2,
            CLOCK_RADIUS, 0, Math.PI * 2, false);

    context.save();
    context.strokestyle = 'rgba (0,0,0,0.2)';
    context.stroke();
    context.restore();
}

/**
 * 动画
 */
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray', 10, 10);
    drawClock();

    window.requestAnimationFrame(animate);
}

// 初始化
context.lineWidth = 0.5;
context.strokeStyle = 'rgba (0,0,0,0.2)';
context.shadowColor = 'rgba (0,0,0,0.5)';
context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.shadowBlur = 4;
context.stroke();

window.requestAnimationFrame(animate);

drawGrid('lightgray', 10, 10);
