import Ray from "./Ray";
import Scene from "./Scene.js"
export default class Particle{

    constructor(x,y,ctx){
        this.ctx=ctx
         this.pos={x:x,y:y};
         this.rays=[]
         this.radius=10
         this.speed=5
         this.dir={x:0,y:0}
         this.mouse={x:0,y:0}
         this.angleView=15

        //  for(let i=0;i<360;i+=10){
        //      this.rays.push( new Ray(this.pos,(i/360)*2*Math.PI,this.ctx))
        //  }
        

    }

    getAngleDeg(ax,ay,bx,by) {
  var angleRad = Math.atan((ay-by)/(ax-bx));
  var angleDeg = angleRad * 180 / Math.PI;
  
  return(angleDeg);
}

    move(mx,my,borders){

        let walk=true
        
        if(this.rays.length>0){
        for(let i=0;i<borders.length;i++){
        let pt=this.rays[15].cast(borders[i])
        if(pt){
        let a=pt.x-this.pos.x
        let b=pt.y-this.pos.y
        let d=Math.sqrt(a*a+b*b)
        if(d<5){
            walk=false

        }
        }
        }
    }

       

             this.dir={x:mx-this.pos.x,y:my-this.pos.y}

        const a=this.pos.x-this.pos.x+this.dir.x
        const b=this.pos.y-this.pos.y+this.dir.y
        const d=Math.sqrt((a*a)+(b*b))

         const radians=Math.atan2(a,b)
         let degrees = (radians * 180) / Math.PI - 90; // rotate
         
  
           while (degrees >= 360) degrees -= 360;
           while (degrees < 0) degrees += 360;

          this.angleView=degrees 

           
          
           this.rays=[]
         
           for(let i=degrees-15;i<degrees;i++){
               this.rays.push(new Ray(this.pos,i,this.ctx))

           }
           for(let i=degrees;i<degrees+15;i++){
               this.rays.push(new Ray(this.pos,i,this.ctx))

           }
          
        

        this.dir.x=(this.dir.x/d)*this.speed
        this.dir.y=(this.dir.y/d)*this.speed

         if(d>20 &&walk){
       
    
        this.pos.x+=this.dir.x
        this.pos.y+=this.dir.y
         }




      
     
          

          
       
        

       

     


    }
    show(){
         this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        this.ctx.stroke();

        //this.writeTextToCanvas(`${this.angle}`,this.pos.x,this.pos.y+20)

        // this.ctx.fillStyle = "#FF0000";
        //  this.ctx.beginPath();
        //     this.ctx.moveTo(this.pos.x, this.pos.y);
        //     this.ctx.lineTo(this.pos.x+(this.dir.x)*this.speed, this.pos.y+(this.dir.y)*this.speed);
        //     this.ctx.stroke();

        for(let i=0;i<this.rays.length;i++){
            this.rays[i].show()
        }
        // const a=this.pos.x-this.pos.x+this.dir.x
        // const b=this.pos.y-this.pos.y+this.dir.y
        // const radians=Math.atan2(a,b)
        //  let degrees = (radians * 180) / Math.PI - 90; // rotate
  
        //    while (degrees >= 360) degrees -= 360;
        //    while (degrees < 0) degrees += 360;
  
        //this.writeTextToCanvas(`${degrees} `,this.pos.x,this.pos.y+50)

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
                   
                    
                    
                    if(d<=record){
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