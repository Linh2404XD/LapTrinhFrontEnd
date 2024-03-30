// board
let board;
let boardWidth = 500;
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
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY
}


window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d") // ve o mo hinh 2d

    //ve thanh dieu khien
    context.fillStyle = "skyblue";
    context.fillRect(player.x, player.y, player.width, player.height);


    requestAnimationFrame(update);
    document.addEventListener("mousemove", movePlayer);
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
        ball.velocityX = -ball.velocityX; // bong di ngang
    }

}
