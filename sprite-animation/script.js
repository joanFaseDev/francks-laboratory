// script.js

const canvas = document.querySelector(".canvas");
// Get the rendering context and its drawing functions
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load images
const images = {};
images.player = new Image();
images.player.src = "./assets/cuphead.png";

// const characterAnimations = ["up", "up right", "right", "bottom right", "bottom", "jump"];
const characterAnimations = ["right", "up", "jump", "bottom", "bottom right"];
const characters = [];
const numberOfCharacters = 10;

class Character {
    constructor() {
        this.width = 103.0625; // Spritesheet's width / number of columns
        this.height = 113.125; // Spritesheet's height / number of rows
        this.x = Math.random() * canvas.width; // X position of the Character
        this.y = Math.random() * canvas.height; // Y position of the Character
        this.frameX = 3; // Starting frame on the X's axe of the spritesheet
        this.speed = (Math.random() * 3.5) + 1.5; // Between 1.5 & 5
        this.action = characterAnimations[Math.floor(Math.random() * characterAnimations.length)];
        if (this.action === "right") {
            this.frameY = 3; // Starting frame on the Y's axe of the spritesheet
            this.minFrame = 3;
            this.maxFrame = 13;
        } else if (this.action === "up") {
            this.frameY = 0; 
            this.minFrame = 3;
            this.maxFrame = 15;
        } else if (this.action === "jump") {
            this.frameY = 7;
            this.minFrame = 0;
            this.maxFrame = 9;
        } else if (this.action === "bottom") {
            this.frameY = 6;
            this.minFrame = 3;
            this.maxFrame = 12;
        } else if (this.action === "bottom right") {
            this.frameY = 4;
            this.minFrame = 4;
            this.maxFrame = 15;
        }
    }
    
    draw() {
        drawSprite(
            images.player,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
            );
            // There are 14 frames for the 'move right' animation on the spritesheet (from 0 to 13)
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = this.minFrame;
        }
    }
    
    update() {
        if (this.action === "right") {
            if (this.x > canvas.width + this.width) {
                this.x = 0 - this.width;
                this.y = Math.random() * (canvas.height - this.height);
            } else {
                this.x += this.speed;
            }    
        } else if (this.action === "up") {
            if (this.y < (0 - this.height)) {
                this.y = canvas.height + this.height;
                this.x = Math.random() * canvas.width;
            } else {
                this.y -= this.speed;
            }
        } else if (this.action === "bottom") {
            if (this.y > canvas.height + this.height) {
                this.y = (0 - this.height);
                this.x = Math.random() * canvas.width;
            } else {
                this.y += this.speed;
            }
        } else if (this.action === "bottom right") {
            if (this.y > canvas.height + this.height &&
                this.x > canvas.width + this.width) {
                this.y = (0 - this.height);
                this.x = Math.random() * (canvas.width / 2);
            } else {
                this.y += this.speed;
                this.x += this.speed;
            }
        }
    }
}

for (let i = 0; i < numberOfCharacters; i++) {
    characters.push(new Character());
}

console.log(characters);

// Custom function do draw our sprite using the third implementation of the drawImage methode
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    // // Clear the entire canvas before drawing anything else
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < characters.length; i++) {
        characters[i].draw();    
        characters[i].update();
    }
}

// onload event is fired when the page & all its resources are fully loaded
window.onload = setInterval(animate, 1000 / 30);

// Preven scaling problems from occuring by resizing the canvas every time the windows is resized.
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

