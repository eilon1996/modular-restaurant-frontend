import * as ActionTypes from './ActionTypes';

export const MyContent = (state = {
                        isLoading:true, 
                        errMess: null,
                        myContent: null
                            }, action) => {
    switch (action.type) {
    case ActionTypes.ADD_MYCONTENT:
    console.log("myContent.js: type: " +(action.type));
    return {...state, isLoading:false, errMess:null, myContent: action.payload}

    case ActionTypes.MYCONTENT_LOADING:
    console.log("myContent.js: type: " +(action.type));
    // returning a new state (not chaning it) with the values given
    return {...state, isLoading:true, errMess:null, myContent:null}

    case ActionTypes.MYCONTENT_FAILED:
    console.log("myContent.js: type: " +(action.type));
    return {...state, isLoading:false, errMess: action.payload, myContent: null}




    default:
    return state;
    }
};
