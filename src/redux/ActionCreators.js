
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/externalUrl';
import cookie from 'react-cookies';
import axios from 'axios';

////////////  signup  ////////////

export const signup = (jsonObject) => (dispatch) => {

  return fetch("https://warm-fjord-92793.herokuapp.com/signup", {
  //return fetch("http://localhost:5001/signup", {
    method: "POST",
    body: JSON.stringify(jsonObject),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin"
  })
    .then(response => {
      console.log("response", response);
      return response.json()
    })
    .then(response => {
      if (response.err) {
        throw response.err;
      }
      console.log("response.token", response.token);
      jsonObject["token"] = response.token;
      // cookie is not being saved. will work with a short string
      console.log(response.token);
      cookie.save('auth',response["token"], { path: '/', maxAge: 3600 * 24 * 30 });
      dispatch(addMyContent(jsonObject));
      alert("you signed up succefuly");
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

  return fetch("https://warm-fjord-92793.herokuapp.com/login", {
  //return fetch("http://localhost:5001/login", {
    method: "POST",
    body: JSON.stringify(details),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin"
  })
    .then(response => {
      console.log("response", response);
      return response.json()
    })
    .then(response => {
      if (response.err) {
        throw response.err;
      }
      console.log("response", response); //user details
      dispatch(addMyContent(response.user));
      alert("you logged in succefuly");
      return {user: response.user};
    })
    .catch(error => {
      console.log('login error: ', error);
      return error;
    });
};

export const loginToken = () => (dispatch) => {
   // try to login with cookies, will return user 0 if no cookies mached

   const token = cookie.load('auth');
   return fetch("https://warm-fjord-92793.herokuapp.com/login-token", {
   //return fetch("http://localhost:5001/login-token", {
    method: "POST",
    body: JSON.stringify({token}),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin"
  })
    .then(response => {
      console.log("response", response);
      return response.json()
    })
    .then(response => {
      if (response.err) {
        throw response.err;
      }
      console.log("response", response); //user details
      return response.user;
    })
    .then(myContent => dispatch(addMyContent(myContent)))
    .catch(error => {
      console.log('login error: ', error);
      return error;
    });
}



///////////putContnet///////////

export const putContent = (jsonObject) => (dispatch) => {

  console.log("ActionCreator-putcontent", jsonObject);

  //dispatch(addMyContent(jsonObject)); //need to separate mycontant to several reduceres 
  // prevent rerenders of all fields

  if (jsonObject.id === "0") return; // user 0 dont need to update the server

  return fetch(baseUrl + '/content/' + jsonObject.id + ".json", {
    method: "PATCH",
    body: JSON.stringify(jsonObject),
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
      console.log('submmit content', error.message);
      alert('Your content could not be submited\nError: ' + error.message);
    });
};



/// fetch myContent////

export const fetchMyContent = (id) => (dispatch) => {

  console.log("fetchMyContent, id:", id);
  dispatch(myContentLoading(true));

  if (id === null) {
    id = "0";
  }
  return fetch(baseUrl + 'content/' + id + ".json")
    .then(response => {
      if (response.ok) {
        console.log("ActionCreator-fetchmyContent, response is OK\nresponse: ", response);
        return response;
      } else {
        console.log("ActionCreator-fetchmyContent, response is NOT OK\nresponse: ", response);
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        console.log("ActionCreator-fetchmyContent, NO response \nerror.message: ", error.message);
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(myContent => dispatch(addMyContent(myContent)))
    .catch(error => dispatch(myContentFailed(error.message)));

}

export const myContentLoading = () => {
  console.log("ActionCreator-contentLoading");
  return {
    type: ActionTypes.MYCONTENT_LOADING
  }
}

export const myContentFailed = ((errmess) => {
  return ({
    type: ActionTypes.MYCONTENT_FAILED,
    payload: errmess
  });
});

export const addMyContent = (myContent) => {
  console.log("ActionCreator-addContent, content: ", myContent);
  return ({
    type: ActionTypes.ADD_MYCONTENT,
    payload: myContent
  });
}
