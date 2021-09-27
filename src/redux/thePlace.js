import * as ActionTypes from './ActionTypes';

//store the description of the restarunt and photos
export const ThePlace = (state = {
                            isLoading:true, 
                            errMess: null,
                            thePlace: null
                                }, action) => {
    switch (action.type) {
            case ActionTypes.ADD_THEPLACE:
                //console.log("thePlace.js: type: " +(action.type)+ " payload: "+JSON.stringify(action.payload));
                return {...state, isLoading:false, errMess:null, thePlace: action.payload}
            
            case ActionTypes.THEPLACE_LOADING:
                //console.log("thePlace.js: type: " +(action.type));
                // returning a new state (not chaning it) with the values given
                return {...state, isLoading:true, errMess:null, thePlace:null}

            case ActionTypes.THEPLACE_FAILED:
                //console.log("thePlace.js: type: " +(action.type));
                return {...state, isLoading:false, errMess: action.payload, thePlace: null}

                

          
            default:
                return state;
      }
};