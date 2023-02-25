//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDVrF2a3o_Mim5gs1AB42YRf8rtU27RZpg",
    authDomain: "activereactive-f7290.firebaseapp.com",
    projectId: "activereactive-f7290",
    storageBucket: "activereactive-f7290.appspot.com",
    messagingSenderId: "950618301029",
    appId: "1:950618301029:web:ad2cd0d5c76615a78edc8c"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();