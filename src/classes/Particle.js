import Ray from "./Ray";
import Scene from "./Scene.js"
import Vector from "./Vector.js"
import NeuralNetwork from "./nn.js";
import Hfun from "./hfun.js"
export default class Particle{

    constructor(x,y,ctx){
        this.ctx=ctx
        
         this.pos={x:x,y:y};
         this.rays=[]
         this.radius=10
         this.speed=5
         this.vel={x:0,y:0}
         this.acc={x:0,y:0}
         this.mouse={x:0,y:0}
         this.angleView=15
         this.maxspeed=1;
         this.sight=50;
         this.dead=false

         for(let i=0;i<360;i+=45){
             this.rays.push( new Ray(this.pos,i,this.ctx))
         }
         this.brain=new NeuralNetwork(this.rays.length,this.rays.length,1)
        

    }

    getAngleDeg(ax,ay,bx,by) {
  var angleRad = Math.atan((ay-by)/(ax-bx));
  var angleDeg = angleRad * 180 / Math.PI;
  
  return(angleDeg);
}

    applyForce(force){
   
        this.acc=Vector.add(this.acc,force)
    }

    move(){

        if(!this.dead){
        this.pos=Vector.add(this.pos,this.vel)
        // this.vel.x+=this.acc.x
        //  this.vel.y+=this.acc.y
        this.vel=Vector.add(this.vel,this.acc)
        this.vel=Vector.limit(this.vel,this.maxspeed)
         this.acc={x:0,y:0}
        }
        
        
            

         
    

    }

    isDead(borders){
        const inputs=[];
       
        for (let j= 0; j < this.rays.length; j++) {
            let closest={x:null,y:null}
             let record=this.sight
            for (let i = 0; i < borders.length; i++) {
                let pt = this.rays[j].cast(borders[i]);
                if (pt) {
                    const a=pt.x-this.pos.x
                    const b=pt.y-this.pos.y
                    const d=Math.sqrt((a*a)+(b*b))
                    if(d<=record&&d<=this.sight){
                        //wall is in a radius of this.sight of the particle
                        record=d
                        closest.x=pt.x
                        closest.y=pt.y
                    }else{
                        //wall is more then this.sight away or not even close
                    }
                }
            }
            if(record<15){
                this.dead=true
            }
            
            inputs[j]=Hfun.map(record,0,50,1,0)
            
        }
        const output=this.brain.predict(inputs)
        const angle=Hfun.map(output[0],0,1,0,2*Math.PI);

       
        let degrees = (angle* 180) / Math.PI - 90; // rotate
        while (degrees >= 360) degrees -= 360;
        while (degrees < 0) degrees += 360;

        
        let desired={x:Math.cos((angle / 360) * 2 * Math.PI),y:Math.sin((angle / 360) * 2 * Math.PI)}
        desired=Vector.setMag(desired,this.maxspeed)
        const steering=Vector.sub(desired,this.vel)
        this.applyForce(steering)
        //console.log(output)

    }
    show(){
        this.ctx.fillStyle="rgba(255,0,0,0.1)"
         this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        this.ctx.closePath()
        //this.ctx.stroke();
        this.ctx.fill()

        

        // for(let i=0;i<this.rays.length;i++){
        //     this.rays[i].show()
        // }
       

    }
    look(borders){

        for(let ray of this.rays){
            let closest={x:null,y:null}
             let record=Infinity

             
            
            for(let border of borders){
               
                const p=ray.cast(border)
               
                if(p){
                    
                    //reken distance tussen particle en point op border
                       
                    
                    const a=p.x-this.pos.x
                    const b=p.y-this.pos.y
                    const d=Math.sqrt((a*a)+(b*b))
                   
                    
                    
                    if(d<=record&&d<=this.sight){
                         //this.writeTextToCanvas(Math.round(d),p.x,p.y+30)
                          
                        //console.log("record: "+ record, "newD: " + Math.round(d))
                        record=d
                        closest.x=p.x
                        closest.y=p.y
                    }
                }
                
            }
            
            if(closest.x != null){
                // this.ctx.fillStyle = "#FF0000";
                // this.ctx.fillRect(closest.x, closest.y, 10, 10);
                        
             
                this.ctx.beginPath();
            this.ctx.moveTo(this.pos.x, this.pos.y);
            this.ctx.lineTo(closest.x, closest.y);
            this.ctx.stroke();

       

            }
            
          
        }

    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'red', alignment = 'center') {
       
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}