export default class Game {
    functions = [];
    canvas = document.getElementById('canvas1');
    ctx = this.canvas.getContext('2d');
    canvasPosition = this.canvas.getBoundingClientRect();
    score = 0; //рахунок
    gameFrame = 0; //гра Рамка
    gameSpeed = 1;
    gameOver = false;
    constructor(){
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.ctx.font = '40px Georgia';
    }

    start(){
        this.animate();
    }
    
    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.callAllFunctions();
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('score: ' + this.score, 10, 50);
        this.gameFrame++;
        if(!this.gameOver) requestAnimationFrame(this.animate);
    }

    addFunction(func){
        if(typeof func !== 'function') return;

        this.functions.push(func);
    }

    callAllFunctions(){
        this.functions.forEach(func => {
            func();
        })
    }
}