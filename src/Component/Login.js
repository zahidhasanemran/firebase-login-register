import React, { Component } from 'react';
// import * as firebase from 'firebase';

var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyAutsAhU9IdQDljS-KNjHv3ODdqjGxYCQM",
    authDomain: "fir-login-45db8.firebaseapp.com",
    databaseURL: "https://fir-login-45db8.firebaseio.com",
    projectId: "fir-login-45db8",
    storageBucket: "fir-login-45db8.appspot.com",
    messagingSenderId: "11371233758",
    appId: "1:11371233758:web:7f4ec23e2096bc53e71d4f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            err: ""
        };
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
        this.google = this.google.bind(this);
    }
    
    login = (event) => {
        const email = this.refs.emaill.value;
        const password = this.refs.passwordd.value;
        // console.log(email, password);
    
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);

        promise.then(user => {
            var lout = document.getElementById("logout");
            lout.classList.remove('hide');

            var err = "You are logged in Mr. "+user.user.email;
            this.setState({err})
        })

        promise.catch(er => {
            var err = er.message;
            console.log(err);

            this.setState({err})
            
        })
    };
    register = (event) => {
        const email = this.refs.emaill.value;
        const password = this.refs.passwordd.value;
        console.log(email, password);
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, password);

        promise
        .then(user => {
            var err = "Welcome " + user.user.email;
            firebase.database().ref('/users/' + user.user.uid).set({
                email: user.user.email
            });
            console.log(user);
            this.setState({
                err
            })
            
        });
        promise
        .catch(e => {
            var err = e.message;
            console.log(err);
            
            this.setState(({err}))
        });


    };
    logout(event){
        firebase.auth().signOut();

        var lout = document.getElementById("logout");
        lout.classList.add('hide');

        var err = "Thanks! You are logged out";
        this.setState({err})
    }

    google = () => {
        var provide = new firebase.auth.GoogleAuthProvider();
        var promise = firebase.auth().signInWithPopup(provide);

        promise.then(result => {
            var user = result.user;
            console.log(user);
            firebase.database().ref('users/'+user.uid).set({
                email: user.email,
                name: user.displayName
            })
            var err = 'you are logged in with google mr. '+user.displayName;
            this.setState({err})
        });
        promise.catch(e => {
            var msg = e.message;
            this.setState({err: msg});
        })
    }

    render() {
        return (
            <div>
                <input type="email" id="email" ref="emaill"/> <br/>
                <input type="password" id="password" ref="passwordd"/> <br/>
                <p> {this.state.err} </p>
                <button onClick={this.login}>Login</button>
                <button onClick={this.google}>Login with Google</button>
                <button onClick={this.register}>Register</button>
                <button id="logout" className="hide" onClick={this.logout}>Log Out</button>
            </div>
        );
    }
}

export default Login;