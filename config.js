import  firebase from 'firebase';
require("@firebase/firestore")
const firebaseConfig = {
   apiKey: "AIzaSyCeIIIY5PS2TSN2B6ZN83c7g01lMhvFNY4",
    authDomain: "story-hub-56d3f.firebaseapp.com",
    projectId: "story-hub-56d3f",
    storageBucket: "story-hub-56d3f.appspot.com",
    messagingSenderId: "473593782086",
    appId: "1:473593782086:web:685509b9b2ab68f033cf47"
};

if( !firebase.apps.length){
    firebase.initializeApp(firebaseConfig)}


export default firebase.firestore();