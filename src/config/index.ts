import firebase from "firebase"

const config = {
    apiKey: "AIzaSyBf99jx8FkTMEVvLwiRJm7MtiY9f7K5ndA",
    authDomain: "chatme-50f0e.firebaseapp.com",
    databaseURL: "https://chatme-50f0e.firebaseio.com",
    projectId: "chatme-50f0e",
    storageBucket: "chatme-50f0e.appspot.com",
    messagingSenderId: "548857905780",
    appId: "1:548857905780:web:02a24490d7e3ae40e64721",
    measurementId: "G-RL7PVKY3Q4"
    
}


firebase.initializeApp(config)
firebase.firestore()

export const Firebase = firebase
export const Firestore = firebase.firestore()
export const Storage = firebase.storage()