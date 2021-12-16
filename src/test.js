import Keylistener from "./KeyboardListener.js"
export default class Test{

    xpos
    ypos
    ctx
    keyboard

    constructor(ctx){
        console.log("hiiii")
        this.xpos=100
        this.ypos=100
        this.ctx=ctx
        this.keyboard=new Keylistener()

    }

    display(){
        this.ctx.fillText("hoi",this.xpos,this.ypos)

        

    }

    move(){
        console.log("yo")


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