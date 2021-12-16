export const initialState={
    user:null,profile:[]
    
    
}


const reducer=(state,action)=>{
    // console.log(action)
    switch(action.type){
        
            case 'SET_USER':
             return{
                ...state,user:action.user
                 }
                
               
                  
                
                
                case 'SET_PROFILE':
                    return{
                      ...state,profile:action.profile
                    }
                   
                   
                    default:return state;     
                
    }
}
export default reducer