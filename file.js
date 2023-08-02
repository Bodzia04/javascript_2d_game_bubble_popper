//Canvas setup
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0; //рахунок
let gameFrame = 0; //гра Рамка
ctx.font = '50px Georgia';

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
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.fillRect(this.x, this.y, this.radius, 10);
    }
}

const player = new Player();
//Bubbles
const bubblesArrey = [];

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
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
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
    }
    //Duct tape for fixing inexplicable flashes of bubbles
    for(let i = 0; i < bubblesArrey.length; i++){
        if(bubblesArrey[i].y < 0 - bubblesArrey[i].radius * 2){
            bubblesArrey.splice(i,1);
        }
        if(bubblesArrey[i].distance < bubblesArrey[i].radius + player.radius){
            if(bubblesArrey[i].sound === "sound1"){
                bubblePop1.play();
            } else if(bubblesArrey[i].sound === "sound2"){
                bubblePop2.play();
            }
            score++;
            bubblesArrey[i].counted = true;
            bubblesArrey.splice(i,1)
        }
    }
}
//Animation loop
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBubbles();
    player.update();
    player.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

