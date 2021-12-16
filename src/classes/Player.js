
import KeyListener from "./KeyboardListener.js";
import Game from "./Game.js";
import Scene from "./Scene.js";
// import {db} from "./firebase.js"
export default class Player  {
    keyboard;
    img;
    yspeed;
    ypos;
    xpos;
    constructor(x, y) {
       
        this.keyboard = new KeyListener();
       
        this.yspeed = 1;
         this.xpos=100
        this.ypos=100
    }
    move() {
       //up
        if(this.keyboard.isKeyDown(38)){
            this.ypos-=10
        }
//down
        if(this.keyboard.isKeyDown(40)){
            this.ypos+=10
        }

        //left
        if(this.keyboard.isKeyDown(37)){
            this.xpos-=10
            console.log("so")
        }
//right
        if(this.keyboard.isKeyDown(39)){
            this.xpos+=10
        }
        
    }

    
   
    
}
//# sourceMappingURL=Player.js.map