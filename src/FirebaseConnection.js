import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBmeZpCSeaJRGK8KhCLf4FDh3xkXsv4Oys",
    authDomain: "devsapp-91450.firebaseapp.com",
    databaseURL: "https://devsapp-91450.firebaseio.com",
    projectId: "devsapp-91450",
    storageBucket: "devsapp-91450.appspot.com",
    messagingSenderId: "953604089655"
};
firebase.initializeApp(config);

export default database = firebase.database();