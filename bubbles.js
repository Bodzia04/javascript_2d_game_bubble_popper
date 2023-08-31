import Bubble from './bubble.js';

const bubblePop1 = document.createElement('audio');
bubblePop1.src = "sound/scr_sound_Plop.ogg";
const bubblePop2 = document.createElement("audio");
bubblePop2.src = "sound/scr_sound_bubbles-single1.wav";

export default class Bubbles{
    bubblesArray = [];
    constructor(canvas, player, gameFrame, ctx){
        this.canvas = canvas;
        this.player = player;
        this.gameFrame = gameFrame;
        this.ctx = ctx;
    }

    handleBubbles(){
        if(this.gameFrame % 50 == 0){
            this.bubblesArray.push(new Bubble(this.canvas, this.player, this.ctx));
        }
        for(let i = 0; i < this.bubblesArray.length; i++){
            this.bubblesArray[i].update();
            this.bubblesArray[i].draw();
    
            if(this.bubblesArray[i].y < 0 - this.bubblesArray[i].radius * 2){
                this.bubblesArray.splice(i,1);
                i--;
            } else if(this.bubblesArray[i].distance < this.bubblesArray[i].radius + this.player){
                    if(this.bubblesArray[i].sound === "sound1"){
                        bubblePop1.play();
                    } else if(this.bubblesArray[i].sound === "sound2"){
                        bubblePop2.play();
                    }
                    score++;
                    this.bubblesArray[i].counted = true;
                    this.bubblesArray.splice(i,1)
                    i--;
                }
            }
        }
    }

