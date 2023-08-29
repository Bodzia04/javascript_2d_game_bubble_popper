const playerLeft = new Image();
playerLeft.src = 'images/fish-red-swim-left.png';
const playerRight = new Image();
playerRight.src = 'images/fish-red-swim-right.png';

export default class Player{
    constructor(canvas, mouse, ctx){
        this.mouse = mouse;
        this.ctx = ctx;
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
        const dx = this.x - this.mouse.x;
        const dy = this.y - this.mouse.y;
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        if(this.mouse.x != this.x){
            this.x -= dx / 30;
        }
        if(this.mouse.y != this.y){
            this.y -= dy / 30;
        }
    }

    draw(){
        if(this.mouse.click){
            this.ctx.lineWidth = 0.2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.stroke();
        }

        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);

        if(this.x >= this.mouse.x){
            this.ctx.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -64, -45, this.spriteWidth / 4, this.spriteHeight / 4);
        } else {
            this.ctx.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -64, -45, this.spriteWidth / 4, this.spriteHeight / 4);
        }
        this.ctx.restore();
    }
}