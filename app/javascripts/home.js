var config = {
    apiKey: "AIzaSyDGx1Tc_-SX26_VCv54JYHSE3Pzx9Z4KC0",
    authDomain: "presale-aa6e8.firebaseapp.com",
    databaseURL: "https://presale-aa6e8.firebaseio.com",
    projectId: "presale-aa6e8",
    storageBucket: "presale-aa6e8.appspot.com",
    messagingSenderId: "559473303188"
};
firebase.initializeApp(config);

var Web3 = require('web3')

var parsedVCoin = JSON.parse('' +
    '[\n' +
    '    {\n' +
    '      "constant": true,\n' +
    '      "inputs": [],\n' +
    '      "name": "name",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "name": "",\n' +
    '          "type": "string"\n' +
    '        }\n' +
    '      ],\n' +
    '      "payable": false,\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "constant": true,\n' +
    '      "inputs": [],\n' +
    '      "name": "totalSupply",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "payable": false,\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "constant": true,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "name": "",\n' +
    '          "type": "address"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "balanceOf",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "name": "",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "payable": false,\n' +
    '      "stateMutability": "view",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "name": "initialSupply",\n' +
    '          "type": "uint256"\n' +
    '        },\n' +
    '        {\n' +
    '          "name": "tokenName",\n' +
    '          "type": "string"\n' +
    '        }\n' +
    '      ],\n' +
    '      "payable": false,\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "constructor"\n' +
    '    },\n' +
    '    {\n' +
    '      "anonymous": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "name": "from",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": true,\n' +
    '          "name": "to",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "indexed": false,\n' +
    '          "name": "value",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "Transfer",\n' +
    '      "type": "event"\n' +
    '    },\n' +
    '    {\n' +
    '      "constant": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "name": "_to",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "name": "_value",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "transfer",\n' +
    '      "outputs": [],\n' +
    '      "payable": false,\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    },\n' +
    '    {\n' +
    '      "constant": false,\n' +
    '      "inputs": [\n' +
    '        {\n' +
    '          "name": "_from",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "name": "_to",\n' +
    '          "type": "address"\n' +
    '        },\n' +
    '        {\n' +
    '          "name": "_value",\n' +
    '          "type": "uint256"\n' +
    '        }\n' +
    '      ],\n' +
    '      "name": "transferFrom",\n' +
    '      "outputs": [\n' +
    '        {\n' +
    '          "name": "success",\n' +
    '          "type": "bool"\n' +
    '        }\n' +
    '      ],\n' +
    '      "payable": false,\n' +
    '      "stateMutability": "nonpayable",\n' +
    '      "type": "function"\n' +
    '    }\n' +
    '  ]')

var VCoinContract = web3.eth.contract(parsedVCoin)

var VCoin = VCoinContract.at('0xefa2aa85cb164571f05041d1667a41ae94860fd7')

console.log(VCoin)

$(document).ready(function () {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider)
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    }
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var uid = user.uid;

        firebase
            .firestore()
            .collection("Users")
            .where('uid', '==', uid)
            .get()
            .then(function (querySnapshot) {
                console.log(uid)
                querySnapshot.forEach(function (doc) {
                    firebase
                        .firestore()
                        .collection("Users")
                        .doc(doc.id)
                        .onSnapshot(function (doc) {
                            $(email).html(doc.get('email'));
                            $(username).html(doc.get('name'));
                            $(vcoinAddress).html('0x84e7F3bFc78f2Fc5d4Fe47AfdFC94A8cd3CD1CFd');

                            VCoin.balanceOf('0x84e7F3bFc78f2Fc5d4Fe47AfdFC94A8cd3CD1CFd', function (error, result) {
                                if (!error) {
                                    $(vcoinBalance).html(result.toString());
                                    console.log(result)
                                }
                                else {
                                    console.error(error)
                                }
                            })

                        });
                })
            });
    } else {
        console.error("User is signed out");
        // User is signed out.
        // ...
    }
});



