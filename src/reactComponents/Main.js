import React,{useEffect,useState} from 'react';
import {db} from "../firebase";
import {useStateValue} from "../Stateprovider";
import "../css/Main.css"
import Game from '../classes/Game.js';

function Main() {
    const[{user},dispatch]=useStateValue();
    // let canvas;
    // let ctx;
    // let test
    
       

    useEffect(()=>{
        if(user){
            console.log(user)
        }
        
    //      canvas=document.getElementById("canvas")
    //      ctx=canvas.getContext("2d")
    //  test= new Test(ctx)

     const game = new Game(document.getElementById('canvas'))
     game.start()
        
        //  test.display()
        
        
        
    },[])
    
    return (
        <div  >
            {user&&<div>{user.email}
                </div>}
                
                <canvas width="400px" height="400px" id="canvas"></canvas>
            
        </div>
    )
}

export default Main
