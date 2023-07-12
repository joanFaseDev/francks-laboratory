const canvas = document.getElementById('canvas-1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys = [];
const player = {
    x: 200,
    y: 200,
    width: 40, // player's spritesheet / number of columns
    height: 70, // player's spritesheet / number of rows
    frameX: 0, // X coordinate of the frame to crop on the spritesheet
    frameY: 0, // Y coordinate of the frame to crop on the spritesheet
    speed: 9,
    isMoving: false,
};

const playerImage = new Image();
playerImage.src = "./assets/chewie.png"; // width: 160px height: 288px 

const backgroundImage = new Image()
backgroundImage.src = "./assets/tattooine_game_background.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

// 'event' refers to a builtin event object containing information about the particular event being listened
window.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    player.isMoving = true;
});
window.addEventListener('keyup', (event) => {
    delete keys[event.key];
    player.isMoving = false;
});

function movePlayer() {
    if (keys["ArrowUp"] && player.y > 100) {
        player.y -= player.speed;
        player.frameY = 3;
        player.isMoving = true;
    }
    if (keys["ArrowDown"] && player.y < canvas.height - player.height) {
        player.y += player.speed;
        player.frameY = 0;
        player.isMoving = true;
    }
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        player.isMoving = true;
    }
    if(keys["ArrowRight"] && player.x < canvas.width - player.width) {
        player.x += player.speed;
        player.frameY = 2;
        player.isMoving = true;
    }
}

function handlePlayerFrame() {
    if (player.frameX < 3 && player.isMoving) {
        player.frameX++;
    } else {
        player.frameX = 0;
    }
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        // Clear the canvas before drawing on it every new frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); 
        // The third implementation of drawSprite (9 parameters) is crucial to draw sprites from spritesheet.
        drawSprite(playerImage, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(20);