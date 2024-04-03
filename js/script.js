let score = 0;
let heart = 3;

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

}

// ball
const imageBall = new Image();
imageBall.src = 'ball.png';
let ballWidth = 25;
let ballHeight = 25;
let ballVelocityX = 2.4;
let ballVelocityY = 1.5;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}

function drawBall() {
    ball.x = ball.velocityX + ball.x;
    ball.y = ball.velocityY + ball.y;
    context.drawImage(imageBall, ball.x, ball.y, ball.width, ball.height);

}

// level 1
// blocks
const imageBrick = new Image();
imageBrick.src = 'brick.png';

let blockArray = [];
let blockWidth = 60;
let blockHeight = 30;
let blockColumns = 8;
let blockRows = 3;
let blockCount = 0;


// tọa độ của block tu goc tren ben trai
let blockX = 45;
let blockY = 45;

function newGame() {
    resetGame();
    updateHeart();
    updateScore();

}

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") // ve o mo hinh 2d

}

// cap nhat trang thai game
function update() {

    requestAnimationFrame(update);
    // xoa thanh dieu khien cu
    context.clearRect(0, 0, boardWidth, boardHeight);

    // ve thanh dieu khien moi
    context.drawImage(imagePaddle, player.x, player.y, player.width, player.height);

    // ve ball
    drawBall();
    ballMove();

    // ve block
    blockEvent();

}

function blockEvent() {
    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (ball.x + ball.width > block.x // bong cham vao block tu ben trai
                && ball.x - ball.width < block.x + block.width // bong cham vao block tu ben phai
                && ball.y + ball.width > block.y // bong cham vao block tu phia duoi
                && ball.y < block.y + block.height) {  // bong cham vao block tu phia tren
                ball.velocityX *= -1;
                ball.velocityY *= -1;
                block.break = true;
                score += 10;
                updateScore();

            }
            context.drawImage(imageBrick, block.x, block.y, block.width, block.height);
        }
        if (score == blockArray.length * 10) {
            alert("YOU WIN!");
            score = 0;
            updateScore();
        }
    }
}

// Di chuot de di chuyen thanh dieu khien
function movePlayer(event) {
    let mouseX = event.clientX - board.offsetLeft; //  board.offsetLeft: khoang cach den le trai cua board
    player.x = mouseX - player.width / 2;

    // kiem tra xem thanh dieu khien co ra ngoai board hay khong
    if (player.x < 0) {
        player.x = 0;
    } else if (player.x > boardWidth - player.width) {
        player.x = boardWidth - player.width;
    }

}

function ballMove() {

    // kiem tra xem ball co ra ngoai board hay khong
    if (ball.x + ballWidth > boardWidth || ball.x - ball.width < 0) {
        ball.velocityX = -ball.velocityX;
    } else if (ball.y - ball.width < 0) {
        ball.velocityY = -ball.velocityY;
    } else if (ball.y + ball.width > boardHeight) {
        newBall();
        heart--;
        updateHeart();
        if (heart < 0) {
            alert("GAME OVER!");
            heart = 3;
            score = 0;
            updateHeart();
            updateScore();
            createBlocks();

        }


    }

    // bong cham vao thanh dieu khien dao huong
    // ball.x + ball.width > player.x: bong cham vao thanh dieu khien tu ben trai
    // ball.x - ball.width < player.x + player.width: bong cham vao thanh dieu khien tu ben phai
    // ball.y + ball.width > player.y: bong cham vao thanh dieu khien tu phia tren
    if (
        ball.x + ball.width > player.x &&
        ball.x - ball.width < player.x + player.width &&
        ball.y + ball.width > player.y
    ) {
        ball.velocityY = -ball.velocityY; // bong di len
    }

}

function newBall() {
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    ball.velocityX = 2;
    ball.velocityY = 1.5;
}

function createBlocks() {
    for (let i = 0; i < blockRows; i++) {
        for (let j = 0; j < blockColumns; j++) {
            blockArray[blockCount] = {
                x: blockX + j * (blockWidth + 20),
                y: blockY + i * (blockHeight + 20),
                width: blockWidth,
                height: blockHeight,
                break: false
            }
            blockCount++;
        }
    }
}

function resetGame() {
    ball.x = boardWidth / 2;
    ball.y = boardHeight / 2;
    blockArray = [];
    blockCount = 0;
    requestAnimationFrame(update);

    document.addEventListener("mousemove", movePlayer);
    createBlocks();
    score = 0;
    updateScore();

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