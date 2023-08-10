//Canvas setup
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0; //рахунок
let gameFrame = 0; //гра Рамка
ctx.font = '50px Georgia';
let gameSpeed = 1;

//Mouse interactivity
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}
canvas.addEventListener('mousedown', function(event){
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
    mouse.click = true;
});

canvas.addEventListener('mouseup', function(){
    mouse.click = false;
});

//Player
const playerLeft = new Image();
playerLeft.src = 'images/fish-red-swim-left.png';
const playerRight = new Image();
playerRight.src = 'images/fish-red-swim-right.png';

class Player{
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
    }

    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        if(mouse.x != this.x){
            this.x -= dx / 30;
        }
        if(mouse.y != this.y){
            this.y -= dy / 30;
        }
    }

    draw(){
        if(mouse.click){
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if(this.x >= mouse.x){
            ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -64, -45, this.spriteWidth / 4, this.spriteHeight / 4);
        } else {
            ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -64, -45, this.spriteWidth / 4, this.spriteHeight / 4);
        }
        ctx.restore();
    }
}

const player = new Player();
//Bubbles
const bubblesArrey = [];
const bubbleImage = new Image();
bubbleImage.src = "./images/1.png";

class Bubbles{
    constructor(){
        this.radius = 50;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius * 2;
        this.speed = Math.random() * 5 + 1;
        this.distance;
        this.counted = false;
        this.sound = Math.random() <= 0.5 ? "sound1" : "sound2";
    }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw(){
        ctx.drawImage(bubbleImage, this.x - 65, this.y - 65, this.radius * 2.6, this.radius * 2.6);
    }
}

const bubblePop1 = document.createElement('audio');
bubblePop1.src = "sound/scr_sound_Plop.ogg";
const bubblePop2 = document.createElement("audio");
bubblePop2.src = "sound/scr_sound_bubbles-single1.wav";

function handleBubbles(){
    if(gameFrame % 50 == 0){
        bubblesArrey.push(new Bubbles());
        console.log(bubblesArrey.length); 
    }
    for(let i = 0; i < bubblesArrey.length; i++){
        bubblesArrey[i].update();
        bubblesArrey[i].draw();

        if(bubblesArrey[i].y < 0 - bubblesArrey[i].radius * 2){
            bubblesArrey.splice(i,1);
            i--;
        } else if(bubblesArrey[i].distance < bubblesArrey[i].radius + player.radius){
                if(bubblesArrey[i].sound === "sound1"){
                    bubblePop1.play();
                } else if(bubblesArrey[i].sound === "sound2"){
                    bubblePop2.play();
                }
                score++;
                bubblesArrey[i].counted = true;
                bubblesArrey.splice(i,1)
                i--;
            }
        }
    }

    for(let i = 0; i < bubblesArrey.length; i++){

    }

    //Repeating backgrounds
    const background = new Image();
    background.src = 'images/background1.png';

    const BG = {
        x1: 0,
        x2: canvas.width,
        y: 0,
        width: canvas.width,
        height: canvas.height
    }

    function handleBackground(){
        BG.x1 -= gameSpeed;
        if(BG.x1 < -BG.width){
            BG.x1 = BG.width;
        } 
        
        BG.x2 -= gameSpeed;
        if(BG.x2 < -BG.width) BG.x2 = BG.width;
        ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
        ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
    }

//Enemies
const enemyImage = new Image();
enemyImage.src = './images/enemy-fish-yellow.png';

class Enemy {
    constructor(){
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0; //рамка
        this.frameX = 0
        this.frameY = 0;
        this.spriteWidth = 418;
        this.spriteHeight = 397;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    update(){
        this.x -= this.speed;
        if(this.x < 0 - this.radius * 2){
            debugger
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }
    }
}
const enemy1 = new Enemy();
console.log('constructor enemy', enemy1);
function handleEnemies(){
    enemy1.update();
    enemy1.draw();
}

//Animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleBubbles();
    player.update();
    player.draw();
    handleEnemies();
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
    canvasPosition = canvas.getBoundingClientRect();
})


//FIXME:
// 1. чому в режимі спокую голова рибкі опускаїться.
// 2. Бульбашка лопає за надто ранно. Коли торкає живота рибки.
// 3. знайти баг чому картинка хвилі не докінця з'єднуїться.


// for perspectiv:
//1. різний розмір бульбашок.
//2. контроль клавішами.
//3. вийшовши з води бульбашка лопає.



