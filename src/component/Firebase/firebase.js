
import app from 'firebase/app';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  };

  /*

const config = {
    apiKey: "AIzaSyAjreIApNZbLGivO_ZK31TB5fud2spBNnw",
    authDomain: "modolar-restrunt.firebaseapp.com",
    databaseURL: "https://modolar-restrunt.firebaseio.com",
    projectId: "modolar-restrunt",
    storageBucket: "modolar-restrunt.appspot.com",
    messagingSenderId: "1023876063736",
    appId: "1:1023876063736:web:cf95f640341e3e6b6ff60d",
    measurementId: "G-H8RZKNZY8J"
};
*/

 
class Firebase {
    constructor() {
      app.initializeApp(config);
    }
  }
   
  export default Firebase;