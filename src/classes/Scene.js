
import Player from "./Player.js";
import Game from "./Game.js";
import Border from "./Border.js";
import Ray from "./Ray.js";
import Particle from "./Particle.js";

export default class Scene {
    canvas;
    ctx;
    player;
   
    game;
    
   
    static SPACE = 300;
    score;
    constructor(canvas, game) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.game = game;
        this.ctx = this.canvas.getContext('2d');
        
        this.score = 0;
        this.borders=[]
        this.widthHall = 60
const level1 =[
        [0, 100, 300, 100],
        [0, 100 + this.widthHall, 300 - this.widthHall, 100 + this.widthHall],
        [300 - this.widthHall, 100 + this.widthHall, 300 , 300],
         [300, 100, 300+this.widthHall, 300],
         [300 , 300, 300 , 300+2*this.widthHall],
         [300+this.widthHall, 300, 300+this.widthHall, 300+this.widthHall],
         [300 , 300+2*this.widthHall, 500 , 300+2*this.widthHall],
         [300+this.widthHall, 300+this.widthHall, 500, 300+this.widthHall],

        
]

for (let i = 0; i < level1.length; i++) {
            const x = level1[i][0]
            const y = level1[i][1]
            const x2 = level1[i][2]
            const y2 = level1[i][3]
            this.borders.push(new Border(x, y, x2, y2, this.ctx))

        }

         this.start={x:110,y:100+0.5*this.widthHall}
       this.end={x:500,y:300+1.5*this.widthHall}
        
        //this.particle=new Particle(this.start.x,this.start.y,this.ctx)
        this.mouse={x:0,y:0};

        this.population=[];
        for(let i=0;i<100;i++){
            this.population[i]=new Particle(this.start.x,this.start.y,this.ctx)
        }
       
      
        
    }
    processInput() {
        
    
              
    }
    
    mouseDown(e){
        
      // this.particle.update(window.event.clientX,window.event.clientY)
       this.mouse.x=window.event.clientX
       this.mouse.y=window.event.clientY
    
    }
   
    update() {
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        //  for(let i=0;i<this.particle.rays.length;i++){
        //      this.particle.rays[i].cast(this.border)
        //  }
         //this.ray.cast(this.border)

         document.onmousemove=this.mouseDown.bind(this)
         
        
for(let particle of this.population){
    particle.move()
     particle.isDead(this.borders)
          

}
        
         
         
         
         
       
    }
    
    render() {

        //this.border.show()
        for(let particle of this.population){
     particle.show()

}
        //this.particle.show()
        // this.writeTextToCanvas("hi",100,100)
        for(let i=0;i<this.borders.length;i++){
            this.borders[i].show()
        }
        //this.particle.look(this.borders);


        //start
        this.ctx.fillStyle="rgb(255,0,0)"
        this.ctx.beginPath()
        this.ctx.arc(this.start.x,this.start.y,10,0,2*Math.PI)
        this.ctx.closePath()
         this.ctx.fill()

        this.ctx.beginPath()
        this.ctx.arc(this.end.x,this.end.y,10,0,2*Math.PI)
        this.ctx.closePath()
        this.ctx.fill()
       
       
    }

   
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
//# sourceMappingURL=Scene.js.map