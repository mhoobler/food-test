// Initialize Firebase
var config = {
    apiKey: "AIzaSyARqgVy7kM6Bvx4e1gmYD6zb7Mx3a-9g1g",
    authDomain: "food-project-a4fe4.firebaseapp.com",
    databaseURL: "https://food-project-a4fe4.firebaseio.com",
    projectId: "food-project-a4fe4",
    storageBucket: "food-project-a4fe4.appspot.com",
    messagingSenderId: "862584001432"
};
firebase.initializeApp(config);

db = firebase.database();
auth = firebase.auth();

//Set account persistence to Session
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });


// elements to use
var loginBtn = $("#login-btn")
//login event
loginBtn.on("click", e => {
    e.preventDefault();
    //get values for email & password
    var email = $("#email-input").val().trim();
    var password = $("#password-input").val().trim();


    //log in useing firebase function
    var promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    console.log(promise);
    checkUser();
});

//login event
$("#signup-btn").on("click", e => {
    e.preventDefault();
    //get values for email & password
    var email = $("#email-input").val();
    var password = $("#password-input").val();

    //CHECK FOR REAL EMAIL HERE

    //sign up using firebase function
    var promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message))
    console.log(promise);
});

$("#get-user").on("click", () => {
    console.log(auth.currentUser);
    checkUser();
})

$("#signout-btn").on("click", () =>{
    firebase.auth().signOut().then(() => {
        console.log("signed-out");
    }, error => {
        console.log(error);
    });
});

checkUser();