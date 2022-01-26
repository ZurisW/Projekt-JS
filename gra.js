const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;
const cw = canvas.width;
const ch = canvas.height;

//linia przerywana
const lineWidth = 6;
const lineHeight = 16;

const image = new Image();
image.src = "https://img.freepik.com/darmowe-zdjecie/tlo-pola-zielonej-trawy-dla-sportu-pilki-noznej-i-pilki-noznej-zielony-gazon-tekstury-tlo-zblizenie_64749-2440.jpg?size=626&ext=jpg";

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

let ballSpeedX = 2;
let ballSpeedY = 2;

const paddleHeight = 120;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

//punkty

let playerptk = 0;
let aiptk = 0;


function ball() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    //punkty

    if (ballX <= 0) {
        aiptk++;
        reset()
        wynik()
    }
    if (ballX + ballSize >= cw) {
        playerptk++;
        reset()
        wynik()
    }

    if (ballY <= 0 || ballY + ballSize >= ch) {
        ballSpeedY = -ballSpeedY;
        speedUp()
    }
    if (ballX <= 0 || ballX + ballSize >= cw || (ballX <= playerX + paddleWidth + ballSize / 2 && ballY >= playerY && ballY <= playerY + paddleHeight) ||
        (ballX >= aiX - paddleWidth - ballSize / 2 && ballY >= aiY && ballY <= aiY + paddleHeight)) {
        ballSpeedX = -ballSpeedX;
        speedUp()
    }
}



///paletka1

function player() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

//paletka2

function ai() {
    ctx.fillStyle = 'red';
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}


function table() {

    ctx.drawImage(image, 0, 0, cw, ch);

    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "white";
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
    }
}

table();

function game() {
    table();
    ball();
    player();
    ai();
    aiPosition();
}
setInterval(game, 10);

topCanvas = canvas.offsetTop;

function playerPosition(e) {
    playerY = e.clientY - topCanvas - paddleHeight / 2;

    if (playerY >= ch - paddleHeight) {
        playerY = ch - paddleHeight
    }
    if (playerY <= 0) {
        playerY = 0;
    }
}
canvas.addEventListener("mousemove", playerPosition)

function speedUp() {
    if (ballSpeedX > 0 && ballSpeedX < 8) {
        ballSpeedX += .4;
    } else if (ballSpeedX > 0 && ballSpeedX < -8) {
        ballSpeedX -= .4;
    }

    if (ballSpeedY > 0 && ballSpeedY < 8) {
        ballSpeedY += .2;
    } else if (ballSpeedY > 0 && ballSpeedY < -8) {
        ballSpeedY -= .2;
    }
    console.log(ballSpeedX + ", " + ballSpeedY)
}


/*-------------SZTUCZNA INTELIGENCJA------------*/


function aiPosition() {
    const middlePaddel = aiY + paddleHeight / 2;
    const middleBall = ballY + ballSize / 2;
    if (ballX > 500) {
        if (middlePaddel - middleBall > 200) {
            aiY -= 5;
        } else if (middlePaddel - middleBall > 50) {
            aiY -= 5;
        } else if (middlePaddel - middleBall < -200) {
            aiY += 5;
        } else if (middlePaddel - middleBall < -50) {
            aiY += 5;
        }
    }
    if (ballX <= 500 && ballX > 100) {
        if (middlePaddel - middleBall > 100) {
            aiY -= 2;
        }
        if (middlePaddel - middleBall < -100) {
            aiY += 2;
        }
    }
    if (aiY >= ch - paddleHeight) {
        aiY = ch - paddleHeight;
    }
    if (aiY <= 0) {
        aiY = 0;
    }
}

function reset() {
    playerY = 200;
    aiY = 200;
    ballX = cw / 2 - ballSize / 2;
    ballY = ch / 2 - ballSize / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;

    console.log("Player: " + playerptk + " AI: " + aiptk);
}

function wynik() {
    document.getElementById('player').innerHTML = playerptk;
    document.getElementById('ai').innerHTML = aiptk;
}