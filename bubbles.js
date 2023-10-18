import Bubble from './bubble.js';

const bubblePop1 = document.createElement('audio');
bubblePop1.src = "sound/scr_sound_Plop.ogg";
const bubblePop2 = document.createElement("audio");
bubblePop2.src = "sound/scr_sound_bubbles-single1.wav";

export default class Bubbles{
    bubblesArray = [];
    constructor(game, player){
        this.gameFrame = game.gameFrame;
        this.canvas = game.canvas;
        this.player = player;
        this.ctx = game.ctx;
        this.score = game.score;
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
            } else if(this.bubblesArray[i].distance < this.bubblesArray[i].radius + this.player.radius){
                    if(this.bubblesArray[i].sound === "sound1"){
                        bubblePop1.play();
                    } else if(this.bubblesArray[i].sound === "sound2"){
                        bubblePop2.play();
                    }
                    this.score++;
                    this.bubblesArray[i].counted = true;
                    this.bubblesArray.splice(i,1)
                    i--;
                }
            }
        }
    }

