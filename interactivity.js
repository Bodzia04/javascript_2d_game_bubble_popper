export default class Interactivity {   
    mouse = {
        x: 0,
        y: 0,
        click: false
    }
    constructor(canvas, canvasPosition){
        this.canvas = canvas;
        this.canvasPosition = canvasPosition;
        this.mouse.x = canvas.width / 2;
        this.mouse.y = canvas.height / 2;
    }

    handleInteractivity(){
        const ctx = this;
        this.canvas.addEventListener('mousedown', function(event){
            ctx.mouse.x = event.x - ctx.canvasPosition.left;
            ctx.mouse.y = event.y - ctx.canvasPosition.top;
            ctx.mouse.click = true;
        });
        this.canvas.addEventListener('mouseup', function(){
            ctx.mouse.click = false;
        });
    }
}