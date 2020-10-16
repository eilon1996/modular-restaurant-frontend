import * as ActionTypes from './ActionTypes';

export const Content = (state = {
                            isLoading:true, 
                            errMess: null,
                            content: null
                                }, action) => {
    switch (action.type) {
            case ActionTypes.ADD_CONTENT:
                console.log("content.js: type: " +(action.type)+ " payload: "+JSON.stringify(action.payload));
                return {...state, isLoading:false, errMess:null, content: action.payload}
            
            case ActionTypes.CONTENT_LOADING:
                console.log("content.js: type: " +(action.type));
                // returning a new state (not chaning it) with the values given
                return {...state, isLoading:true, errMess:null, content:null}

            case ActionTypes.CONTENT_FAILED:
                console.log("content.js: type: " +(action.type));
                return {...state, isLoading:false, errMess: action.payload, content: null}

                

          
            default:
                return state;
      }
};