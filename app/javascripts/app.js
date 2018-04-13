var config = {
    apiKey: "AIzaSyDGx1Tc_-SX26_VCv54JYHSE3Pzx9Z4KC0",
    authDomain: "presale-aa6e8.firebaseapp.com",
    databaseURL: "https://presale-aa6e8.firebaseio.com",
    projectId: "presale-aa6e8",
    storageBucket: "presale-aa6e8.appspot.com",
    messagingSenderId: "559473303188"
};
firebase.initializeApp(config);

function done() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    firebase
        .firestore()
        .collection("Users")
        .add({
            email: email,
            password: password,
            wallet_address: 1111
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}


function start() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
    });
}

function signup() {

    window.open("email-password.html");
}

function createUser() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        // ...
    });
}

