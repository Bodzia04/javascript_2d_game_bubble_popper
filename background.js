const backgroundImg = new Image();
backgroundImg.src = 'images/background1.png';

export default class Background{
    constructor(canvas, ctx, gameSpeed){
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameSpeed = gameSpeed
        this.x1 = 0;
        this.x2 = canvas.width;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height
    }

    handleBackground(){
        this.x1 -= this.gameSpeed;
        if(this.x1 < -this.width) this.x1 = this.width;

        this.x2 -= this.gameSpeed;
        if(this.x2 < -this.width) this.x2 = this.width;

        this.ctx.drawImage(backgroundImg, this.x1, this.y, this.width, this.height);
        this.ctx.drawImage(backgroundImg, this.x2, this.y, this.width, this.height);
    }
}
