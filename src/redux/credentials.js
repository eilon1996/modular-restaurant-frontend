import * as ActionTypes from './ActionTypes';


//store the ID, password, token, and maybe personal info in the future
export const Credentials = (state = {
                            isLoading:true, 
                            errMess: null,
                            credentials: null
                                }, action) => {
    switch (action.type) {
            case ActionTypes.ADD_CREDENTIALS:
                console.log("credentials.js: type: " +(action.type)+ " payload: "+JSON.stringify(action.payload));
                return {...state, isLoading:false, errMess:null, credentials: action.payload}
            
            case ActionTypes.CREDENTIALS_LOADING:
                console.log("credentials.js: type: " +(action.type));
                // returning a new state (not chaning it) with the values given
                return {...state, isLoading:true, errMess:null, credentials:null}

            case ActionTypes.CREDENTIALS_FAILED:
                console.log("credentials.js: type: " +(action.type));
                return {...state, isLoading:false, errMess: action.payload, credentials: null}

                

          
            default:
                return state;
      }
};