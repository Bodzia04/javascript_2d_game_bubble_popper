const enemyImage = new Image();
enemyImage.src = './images/enemy-fish-yellow.png';

export default class Enemy {
    constructor(game, player){
        this.gameFrame = game.gameFrame;
        this.canvas = game.canvas;
        this.player = player;
        this.ctx = game.ctx;
        this.gameOver = game.gameOver;
        this.score = game.score;
        this.x = this.canvas.width + 300;
        this.y = Math.random() * (this.canvas.height - 150) + 90;
        this.radius = 60;
        this.speed = Math.random() * 2 + 2;
        this.frame = 0; //рамка
        this.frameX = 0
        this.frameY = 0;
        this.spriteWidth = 418;
        this.spriteHeight = 397;
    }
    draw(){
        this.ctx.drawImage(enemyImage, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - 60, this.y - 70, this.spriteWidth / 3, this.spriteHeight / 3);
    }
    update(gameFrame){
        this.x -= this.speed;
        if(this.x < 0 - this.radius * 2){
            this.x = this.canvas.width + 200;
            this.y = Math.random() * (this.canvas.height - 150) + 90;
            this.speed = Math.random() * 2 + 2;
        }
        if(gameFrame % 5 == 0){
            this.frame++;
            if(this.frame >= 12) this.frame = 0;
            if(this.frame == 3 || this.frame == 7 || this.frame == 11){
                this.frameX = 0;
            } else{
                this.frameX++;
            }
            if(this.frame < 3) this.frameY = 0
            else if(this.frame < 7) this.frameY = 1;
            else if(this.frame < 11) this.frameY = 2;
            else this.frameY = 0;
        }
        const dx = this.x - this.player.x;
        const dy = this.y - this.player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < this.radius + this.player.radius){
            this.handleGameOver();
        }

    }
    handleEnemies(){
        this.update(this.gameFrame);
        this.draw();
    }
    handleGameOver(){
        this.ctx.fillStyle = 'white';
        this.ctx.fillText("GAME OVER, you reached score " + this.score, 110, 250)
        this.gameOver = true;
    }
}