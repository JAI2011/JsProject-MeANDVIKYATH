const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
var groundLevel = 350;
var island1 = 250;

const keys = {};

class Player {
  constructor(x, color, leftKey, rightKey, jumpKey) {
    this.x = x;
    this.y = groundLevel - 50;
    this.width = 40;
    this.height = 50;
    this.color = color;
    this.velX = 0;
    this.velY = 0;
    this.speed = 3;
    this.jumpPower = -10;
    this.onGround = false;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.jumpKey = jumpKey;
  }

  update() {
    if (keys[this.leftKey]) this.velX = -this.speed;
    else if (keys[this.rightKey]) this.velX = this.speed;
    else this.velX = 0;

    if (keys[this.jumpKey] && this.onGround) {
      this.velY = this.jumpPower;
      this.onGround = false;
    }

    this.velY += gravity;

    this.x += this.velX;
    this.y += this.velY;

    if (this.y + this.height > groundLevel) {
      this.y = groundLevel - this.height;
      this.velY = 0;
      this.onGround = true;
    }

    

    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const player1 = new Player(100, "red", "a", "d", "w");
const player2 = new Player(1400, "blue", "ArrowLeft", "ArrowRight", "ArrowUp");

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function drawGround() {
  ctx.fillStyle = "#444";
  ctx.fillRect(0, groundLevel, canvas.width, canvas.height - groundLevel);
}

function drawIsland() {
  ctx.fillStyle = "#8B4513"; 
  ctx.fillRect(400, island1, canvas.width, 20); 
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGround();
  drawIsland();

  player1.update();
  player2.update();

  player1.draw();
  player2.draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();
