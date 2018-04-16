var config = {
    apiKey: "AIzaSyDGx1Tc_-SX26_VCv54JYHSE3Pzx9Z4KC0",
    authDomain: "presale-aa6e8.firebaseapp.com",
    databaseURL: "https://presale-aa6e8.firebaseio.com",
    projectId: "presale-aa6e8",
    storageBucket: "presale-aa6e8.appspot.com",
    messagingSenderId: "559473303188"
};
firebase.initializeApp(config);

function goEmailStep() {
    window.open("emaildata.html", "_self");
}

function goUserInfoStep() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var passwordConfirm = document.getElementById('passwordc').value
    var phone = document.getElementById('phone').value
    var isTermsAgree = document.getElementById('termOfUse').checked

    if (email === "" || password === "" || passwordConfirm === "" || phone === "") {
        alert("Please fill all the fields");
    }

    else if (password !== passwordConfirm) {
        alert("The passwords are different");
    }

    else if (!isTermsAgree) {
        alert("Please agree with the terms of use");
    }

    else {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            window.open("userdata.html", "_self");
        })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.error(errorCode);
                alert(errorMessage);
            });
    }
}

function goPaymentStep() {
    var name = document.getElementById('name').value
    var surname = document.getElementById('surname').value
    var middleName = document.getElementById('middleName').value
    var c = document.getElementById('country')
    var country = c.options[c.selectedIndex].text
    var address = document.getElementById('address').value

    if (name === "" || surname === "" || middleName === "" || address === "") {
        alert("Please fill all the fields");
    }

    else {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                var email = user.email;

                firebase
                    .firestore()
                    .collection("Users")
                    .add({
                        email: email,
                        uid: uid,
                        name: name,
                        surname: surname,
                        middleName: middleName,
                        country: country,
                        address: address
                    })
                    .then(function (docRef) {
                        console.log("Document written with ID: ", docRef.id);
                        window.open("walletdata.html", "_self");
                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });

            } else {
                // User is signed out.
                // ...
            }
        });
    }
}

function copyOnClick() {
    var copyText = document.getElementById("wallet_address");
    copyText.select();
    document.execCommand("Copy");
    alert("Copied: " + copyText.value);
}

function goTransactionScreen() {
    window.open("transactiondata.html", "_self");
}

function goDoneStep() {
    var addressFrom = document.getElementById('address_from').value
    var addressTo = document.getElementById('address_to').value
    var amount = document.getElementById('amount').value
    var transactionHash = document.getElementById('hash').value

    if (addressFrom === "" || addressTo === "" || amount === "" || transactionHash === "") {
        alert("Please fill all the fields");
    }

    else {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;

                firebase
                    .firestore()
                    .collection("Users")
                    .where('uid', '==', uid)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            firebase
                                .firestore()
                                .collection("Users")
                                .doc(doc.id)
                                .update({
                                    addressFrom: addressFrom,
                                    addressTo: addressTo,
                                    amount: amount,
                                    transactionHash: transactionHash
                                })
                                .then(function () {
                                    window.open("finishdata.html", "_self");
                                })
                                .catch(function (error) {
                                    console.error("Error adding document: ", error);
                                });
                        })
                    });
            } else {
                // User is signed out.
                // ...
            }
        })
    }
}
