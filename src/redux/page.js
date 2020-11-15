import * as ActionTypes from './ActionTypes';


// store the header/footer details and the page staracture 
export const Page = (state  = { isLoading: true,
                                        errMess: null,
                                        page:null}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PAGE:
        return {...state, isLoading: false, errMess: null, page: action.payload};

        case ActionTypes.PAGE_LOADING:
            return {...state, isLoading: true, errMess: null, page: null}

        case ActionTypes.PAGE_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};