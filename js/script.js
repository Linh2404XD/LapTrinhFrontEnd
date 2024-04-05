let score = 0;
let heart = 3;
let gameOver = false;

// board
let board;
let boardWidth = 700;
let boardHeight = 700;
let context;

// paddle
const imagePaddle = new Image();
imagePaddle.src = 'paddle.png';
let playerWidth = 140;
let playerHeight = 30;
let player = {
    // vi tri x, y cua thanh dieu khien
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - 35,
    width: playerWidth,
    height: playerHeight,
}

function drawPaddle() {
    context.drawImage(imagePaddle, player.x, player.y, player.width, player.height);
}

// ball
const imageBall = new Image();
imageBall.src = 'ball.png';
let ballWidth = 40;
let ballHeight = 40;
let ballVelocityX = 2.4;
let ballVelocityY = 2;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}

function drawBall() {
    context.drawImage(imageBall, ball.x, ball.y, ball.width, ball.height);

}

// level 1
// blocks
const imageBrick = new Image();
imageBrick.src = 'brick.png';

let blockArray = [];
let blockWidth = 60;
let blockHeight = 30;
let blockColumns = 4;
let blockRows = 3;
let blockCount = 0;


// tọa độ của block tu goc tren ben trai
let blockX = boardWidth / 2 - (blockWidth + 10) * blockColumns / 2;
let blockY = boardHeight / 2 - (blockHeight + 10) * blockRows / 2 - 200;


function createBlocks() {
    // tao block
    blockArray = [];
    for (let i = 0; i < blockRows; i++) {
        for (let j = 0; j < blockColumns; j++) {
            let block = {
                x: blockX + j * (blockWidth + 20),
                y: blockY + i * (blockHeight + 20),
                width: blockWidth,
                height: blockHeight,
                break: false
            }
            blockArray.push(block);

        }
    }
    blockCount = blockArray.length;
}

function drawBlocks() {
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (ball.x + ball.width >= block.x // bong cham vao block tu ben trai
                && ball.x <= block.x + block.width // bong cham vao block tu ben phai
                && ball.y + ball.height >= block.y // bong cham vao block tu phia tren
                && ball.y <= block.y + block.height) { // bong cham vao block tu phia duoi. neu toa do cua
                ball.velocityY *= -1;
                block.break = true;
                score += 10;
                updateScore();
                if (score == blockArray.length * 10) {
                    context.font = "20px sans-serif";
                    context.fillText("YOU WIN: Press 'Space' to play again", boardWidth / 2 - 150, boardHeight / 2 + 100);
                    gameOver = true;
                    return;
                }
            }
            context.drawImage(imageBrick, block.x, block.y, block.width, block.height);
        }
    }
}

function startGame() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") // ve o mo hinh 2d

    startPlay();
}

function startPlay() {
    blockArray = [];
    blockCount = 0;
    ball.velocityX = ballVelocityX;
    ball.velocityY = ballVelocityY;
    requestAnimationFrame(update);
    document.addEventListener("mousemove", movePaddle);
    document.addEventListener("keydown", getKey);
    createBlocks();
    score = 0;

}

function resetGame() {
    gameOver = false;
    player = {
        x: boardWidth / 2 - playerWidth / 2,
        y: boardHeight - 35,
        width: playerWidth,
        height: playerHeight,
    }
    ball = {
        x: boardWidth / 2,
        y: boardHeight / 2,
        width: ballWidth,
        height: ballHeight,
        velocityX: ballVelocityX,
        velocityY: ballVelocityY
    }
    blockArray = [];
    score = 0;
    heart = 3;
    updateHeart();
    createBlocks();
}

// cap nhat trang thai game
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    // xoa thanh dieu khien cu
    context.clearRect(0, 0, boardWidth, boardHeight);
    drawPaddle();


    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    drawBall();
    ballMove();


    drawBlocks();

}
function getKey(event) {
    if (event.code == 'Space' && gameOver == true) {
        resetGame();
    }

}
// Các chức năng cần thực hiện
function movePaddle(event) {
    if (gameOver) {
        if (event.code == "Space") {
            resetGame();
            startGame();

        }
    }
    let mouseX = event.clientX - board.offsetLeft;
    player.x = mouseX - player.width / 2;

    if (player.x < 0) {
        player.x = 0;
    } else if (player.x > boardWidth - player.width) {
        player.x = boardWidth - player.width;
    }

}



function ballMove() {

    // kiem tra xem ball co ra ngoai board hay khong
    if (ball.x <= 0 || ball.x + ball.width >= boardWidth) {
        ball.velocityX *= -1;
    } else if (ball.y <= 0) {
        ball.velocityY *= -1;

    } else if (ball.y + ball.height >= boardHeight) {
        ball.x = boardWidth / 2;
        ball.y = boardHeight / 2;
        ball.velocityX = ballVelocityX;
        ball.velocityY = ballVelocityY;
        heart--;
        updateHeart();
        if (heart == 0) {
            context.font = "20px sans-serif";
            context.fillText("Game Over: Press 'Space' to play again", boardWidth / 2 - 150, boardHeight / 2 + 100);
            gameOver = true;

        }
    }


    // bong cham vao thanh dieu khien dao huong
    if (
        ball.x + ball.width > player.x && // bong cham vao thanh dieu khien tu ben trai
        ball.x - ball.width < player.x + player.width && // bong cham vao thanh dieu khien tu ben phai
        ball.y + ball.width > player.y // bong cham vao thanh dieu khien tu phia tren
    ) {
        ball.velocityY *= -1; // bong di len
    }

}

// cap nhat diem so
function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}

// cap nhat so mang
function updateHeart() {
    const heartElement = document.getElementById('heart');
    heartElement.textContent = heart;
}