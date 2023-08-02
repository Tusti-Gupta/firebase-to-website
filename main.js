//Importing important functios sused in the code later from other js files (provided by firebase)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, deleteUser } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

//The firebase configuration links to connect them to the app
const firebaseConfig = {
  apiKey: "AIzaSyDG3SuYwBs1zl-xpqgJ4oPhU_Io9GxsM70",
  authDomain: "fir-into-website.firebaseapp.com",
  databaseURL: "https://fir-into-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-into-website",
  storageBucket: "fir-into-website.appspot.com",
  messagingSenderId: "1075534634590",
  appId: "1:1075534634590:web:2e8b026baffd0ce8f1decf",
  measurementId: "G-GZE48SDLQN"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

//Connecting to html file so that respective functions are called when corresponding button in html file is clicked
window.writeUserDataList = writeUserDataList;
window.writeUserDataComplexList = writeUserDataComplexList;
window.readSimpleData = readSimpleData;
window.readComplexData = readComplexData;
window.authSignUp = authSignUp;
window.authSignIn = authSignIn;
window.authSignOut = authSignOut;
window.authResetPassword = authResetPassword;
window.authDeleteAccount = authDeleteAccount;

//For saving lists (I haven't figured out a way to save simple data like username: hello)
function writeUserDataList() {
    const db = getDatabase();
    set(ref(db, 'user list'), {
      user: "name"
    });
  }

//For saving complex lists
function writeUserDataComplexList() {
    const db = getDatabase();
    set(ref(db, 'user complex list/user1234'), {
      username: "name"
    });
  }

//Reading simple list
function readSimpleData() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `user list`)).then((snapshot) => {
    console.log(snapshot.val());
  });
}
 
//Reading complex list
function readComplexData() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `user complex list/user1234/`)).then((snapshot) => {
    console.log(snapshot.val());
  });
}

//Initializing email and password variable
var email, password;

//Signing up using email and password
function authSignUp() {
  email = document.getElementById("emailInput").value;
  password = document.getElementById("passwordInput").value;
  createUserWithEmailAndPassword(auth, email, password)
  //Getting uid
  .then((userCredential) => { 
    console.log("Successfully signed up!");
    const user = userCredential.user;
    console.log("Your user Id is : " + user.uid);
  })
  //For any errors. Note that console.error can also be used here
  .catch((error) => {
    console.log("Error : " + error.code.replace("auth/", ""));
  });
} 

//Signing in with email and password
function authSignIn() {
  email = document.getElementById("emailInput").value;
  password = document.getElementById("passwordInput").value;
  signInWithEmailAndPassword(auth, email, password)
  //Getting uid
  .then((userCredential) => { 
    console.log("Successfully signed in!");
    const user = userCredential.user;
    console.log("Your user Id is : " + user.uid);
  })
  //For any errors. Note that console.error can also be used here
  .catch((error) => {
    console.log("Error : " + error.code.replace("auth/", ""));
  });
}

//Signing out
function authSignOut() {
  signOut(auth).then(() => {
    console.log("Successfully signed out!");
  }).catch((error) => {
    //For any errors. Note that console.error can also be used here
    console.log("Error : " + error.code.replace("auth/", ""));
  });
}

//Sending reset password link to email
function authResetPassword() {
  email = document.getElementById("emailInput").value;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("Password Reset Link sent! Pls check your email")
  })
  .catch((error) => {
    //For any errors. Note that console.error can also be used here
    console.log("Error : " + error.code.replace("auth/", ""));
  });
}

//Deleting Account. Note that you have to sign in before deleting the account
function authDeleteAccount() {
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    console.log("User successfullt deleted!");
  }).catch((error) => {
    //For any errors. Note that console.error can also be used here
    console.log("Error : " + error.code);
  });
}