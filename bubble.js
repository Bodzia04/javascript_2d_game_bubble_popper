const bubbleImageAnimate = new Image();
bubbleImageAnimate.src = "/images/bubblу-bursts-animation.png";

export default class Bubble{
    frameX = 0;
    frameY = 0;
    frame = 0;
    spriteWidth = 498;
    spriteHeight = 327;
    radius = 50;
    speed = Math.random() * 5 + 1;
    distance;
    counted = false;
    sound = Math.random() <= 0.5 ? "sound1" : "sound2";

    constructor(canvas, player, ctx, game){
        this.ctx = ctx;
        this.player = player;
        this.game = game;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius * 2;
    }

    update(){
        this.y -= this.speed;
        const dx = this.x - this.player.x;
        const dy = this.y - this.player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw(){
        this.ctx.drawImage(bubbleImageAnimate, this.x - 65, this.y - 65, this.radius * 2.6, this.radius * 2.6);

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        // this.ctx.drawImage(bubbleImageAnimate, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 500, 500);
    }

    animate(){
        debugger
        if(this.game.gameFrame % 5 == 0){
            this.frame++;
            if(this.frame >= 6) this.frame = 0;
            if(this.frame == 2 || this.frame == 5){
                this.frameX = 0;
            } else{
                this.frameX++;
            }
            if(this.frame < 2) this.frameY = 0;
            else if(this.frame < 5) this.frameY = 1;
            else this.frameY = 0;
        }

        this.ctx.drawImage(bubbleImageAnimate, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, -64, -45, this.spriteWidth / 4, this.spriteHeight / 4);
    }
}