import * as ActionTypes from './ActionTypes';

export const Dishes = (state = {
                            isLoading:true, 
                            errMess: null,
                            dishes: []
                                }, action) => {
    
    switch (action.type) {
            case ActionTypes.ADD_DISHES:
                //console.log("dishes.js: type: " +(action.type)+ " payload: "+JSON.stringify(action.payload));
                return {...state, isLoading:false, errMess:null, dishes: action.payload}
            
            case ActionTypes.DISHES_LOADING:
                //console.log("dishes.js: type: " +(action.type));
                return {...state, isLoading:true, errMess:null, dishes:[]}

            case ActionTypes.DISHES_FAILED:
                //console.log("dishes.js: type: " +(action.type));
                return {...state, isLoading:false, errMess: action.payload, dishes: []}

                

          
            default:
                return state;
      }
};