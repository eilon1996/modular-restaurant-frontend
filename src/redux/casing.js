import * as ActionTypes from './ActionTypes';


// store the header/footer details and the page staracture 
export const Casing = (state  = { isLoading: true,
                                        errMess: null,
                                        casing:null}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CASING:
        return {...state, isLoading: false, errMess: null, casing: action.payload};

        case ActionTypes.CASING_LOADING:
            return {...state, isLoading: true, errMess: null, casing: null}

        case ActionTypes.CASING_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};