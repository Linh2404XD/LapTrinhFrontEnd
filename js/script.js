let score = 0;
let heart = 3;

// board
let board;
let boardWidth = 700;
let boardHeight = 700;
let context;

// player
let playerWidth = 100;
let playerHeight = 10;
let player = {
    // vi tri x, y cua thanh dieu khien
    x: boardWidth / 2 - playerWidth / 2,
    y: boardHeight - 20,
    width: playerWidth,
    height: playerHeight,
}

// ball
let ballWidth = 14;
let ballHeight = 14;
let ballVelocityX = 2;
let ballVelocityY = 1.5;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}

// level 1
// blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 20;
let blockColumns = 8;
let blockRows = 3;
let blockCount = 0;

// tọa độ của block tu goc tren ben trai
let blockX = boardWidth / 2 - (blockWidth + 10) * blockColumns / 2
let blockY = 45;


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
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, playerWidth, playerHeight);

    // ve qua bong
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);


    ballMove();

    // ve block
    context.fillStyle = "red";

    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i];
        if (!block.break) {
            if (ball.x + ball.width > block.x
                && ball.x - ball.width < block.x + block.width
                && ball.y + ball.width > block.y
                && ball.y - ball.width < block.y + block.height) {
                block.break = true;
                score += 10;
                updateScore();
                ball.velocityX = -ball.velocityX;
            }
            context.fillRect(block.x, block.y, block.width, block.height);
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
        ball.velocityX = -ball.velocityX; // bong cham vao ben phai doi len
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
                x: blockX + j * (blockWidth + 10),
                y: blockY + i * (blockHeight + 10),
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
    ball.velocityX = 2;
    ball.velocityY = 1.5;
    blockArray = [];
    blockCount = 0;
    requestAnimationFrame(update);
    document.addEventListener("mousemove", movePlayer);
    createBlocks();
}


// bat dau game
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