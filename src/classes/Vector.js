export default class Vector{

    static add(a,b){

        return {x:a.x+b.x,y:a.y+b.y}

    }

    static limit(a,lim){

        let lengthV=Math.sqrt(a.x*a.x+a.y*a.y)
        if(lengthV<=lim){
            return a
        }else{
            let newx=a.x/lengthV;
            let newy=a.y/lengthV;
            return {x:newx*lim,y:newy*lim}
        }

    }

    static setMag(a,mag){
        let lengthV=Math.sqrt(a.x*a.x+a.y*a.y)
        
            let newx=a.x/lengthV;
            let newy=a.y/lengthV;
            return {x:newx*mag,y:newy*mag}
        

    }

    static sub(a,b){
        return {x:a.x-b.x,y:a.y-b.y}
    }

    
}