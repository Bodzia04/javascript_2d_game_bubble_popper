const backgroundImg = new Image();
backgroundImg.src = 'images/background1.png';

export default class Background{
    constructor(game){
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        this.gameSpeed = game.gameSpeed
        this.x1 = 0;
        this.x2 = game.canvas.width;
        this.y = 0;
        this.width = game.canvas.width;
        this.height = game.canvas.height
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
