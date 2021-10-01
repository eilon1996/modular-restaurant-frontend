import * as ActionTypes from './ActionTypes';
import cookie from 'react-cookies';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const signup = (details) => (dispatch) => {

  return fetch(baseUrl+"signup", {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin"
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.err) {
        throw response.err;
      }
      details.credentials["token"] = response.token;
      // cookie is not being saved. will work with a short string
      cookie.save('auth',response["token"], { path: '/', maxAge: 3600 * 24 * 30 });
      dispatch(add(details.casing, ActionTypes.ADD_CASING));
      dispatch(add(details.credentials, ActionTypes.ADD_CREDENTIALS));
      dispatch(add(details.dishes, ActionTypes.ADD_DISHES));
      dispatch(add(details.staff, ActionTypes.ADD_STAFF));
      dispatch(add(details.thePlace, ActionTypes.ADD_THEPLACE));
      dispatch(add(details.page, ActionTypes.ADD_PAGE));
      return "";
    })
    .catch(error => {
      console.log('signup error: ', error);
      return error;
    });
};

/////////login////////////

export const login = (details) => (dispatch) => {
  // details is an object {username, password}

  return fetch(baseUrl+"login", {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin"
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.err) {
        console.log('login error1: ', response.err);
        throw response.err;
      }

      console.log("credentials", response.user.credentials, "details", details)

      cookie.save('auth',response.user.credentials.token, { path: '/', maxAge: 3600 * 24 * 30 });
      dispatch(add(response.user.casing, ActionTypes.ADD_CASING));
      dispatch(add(details, ActionTypes.ADD_CREDENTIALS));  // use the detail from the login (for admin parpace)
      dispatch(add(response.user.dishes, ActionTypes.ADD_DISHES));
      dispatch(add(response.user.staff, ActionTypes.ADD_STAFF));
      dispatch(add(response.user.thePlace, ActionTypes.ADD_THEPLACE));
      dispatch(add(response.user.page, ActionTypes.ADD_PAGE));
      return "";
    })
    .catch(error => {
      console.log('login error: ', error);
      return error;
    });
};

export const loginToken = () => (dispatch) => {
   // try to login with cookies, will return user 0 if no cookies mached

   const token = cookie.load('auth');
  return fetch(baseUrl+"login-token", {
    method: "POST",
    body: JSON.stringify({token}),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin"
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      if (response.err) {
        throw response.err;
      }
      return response.user;
    })
    .then(myContent => {
      if(myContent.credentials.token)
          cookie.save('auth',myContent.credentials.token, { path: '/', maxAge: 3600 * 24 * 30 });
      dispatch(loading(myContent.casing, ActionTypes.CASING_LOADING));
      dispatch(add(myContent.credentials, ActionTypes.ADD_CREDENTIALS));
      dispatch(add(myContent.dishes, ActionTypes.ADD_DISHES));
      dispatch(add(myContent.staff, ActionTypes.ADD_STAFF));
      dispatch(add(myContent.thePlace, ActionTypes.ADD_THEPLACE));
      dispatch(add(myContent.casing, ActionTypes.ADD_CASING));
      dispatch(add(myContent.page, ActionTypes.ADD_PAGE));
    })
    .catch(error => {
      console.log('login error: ', error);
      return error;
    });
}



///////////patchContent///////////

export const patchContent = (path, content, contentFull, id,type) => (dispatch) => {


  let actionType = ActionTypes.ACTION_TYPES[type]["add"];
  dispatch(add(contentFull, actionType));

  if (id === "0") return; // user 0 dont need to update the server

  return fetch(baseUrl + 'update', {
    method: "POST",
    body: JSON.stringify({path, content}),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .catch(error => {
    });
};


///////////deleteContent///////////

export const deleteContent = (path, contentFull, id,type) => (dispatch) => {

  let actionType = ActionTypes.ACTION_TYPES[type]["add"];
  dispatch(add(contentFull, actionType));

  if (id === "0") return; // user 0 dont need to update the server

  return fetch(baseUrl + 'delete', {
    method: "POST",
    body: JSON.stringify({path}),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .catch(error => {
      console.log('submmit content error', error.message);
    });
};


export const loading = (actionType) => {
  return {
    type: actionType
  }
}

export const failed = ((actionType, errmess) => {
  return ({
    type: actionType,
    payload: errmess
  });
});

export const add = (content, actionType) => {
  return ({
    type: actionType,
    payload: content
  });
}




