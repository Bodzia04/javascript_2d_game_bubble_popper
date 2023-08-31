const bubbleImage = new Image();
bubbleImage.src = "./images/1.png";

export default class Bubble{
    constructor(canvas, player, ctx){
        this.ctx = ctx;
        this.player = player;
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
        const dx = this.x - this.player.x;
        const dy = this.y - this.player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }

    draw(){
        this.ctx.drawImage(bubbleImage, this.x - 65, this.y - 65, this.radius * 2.6, this.radius * 2.6);
    }
}