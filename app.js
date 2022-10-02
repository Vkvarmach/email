import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

import { getDatabase, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDghAAvMSGvON4Lmd-jop0VyjOiAC5t8lM",
    authDomain: "smart-mobility-ios.firebaseapp.com",
    databaseURL: "https://smart-mobility-ios-default-rtdb .firebaseio.com",
    projectId: "smart-mobility-ios",
    storageBucket: "smart-mobility-ios.appspot.com",
    messagingSenderId: "727144855934",
    appId: "1:727144855934:web:2ca21a0d262114a85ddb2f",
    measurementId: "G-5SNWQ6NS22"
  };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);




const querySnapshot = await getDocs(collection(database, "users"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

//reference to contactinfo colections
let contactInfo = firebase.database().ref("infos");
//listen for a submit
document.querySelector(".contact-form").addEventListener("submit",submitForm);

function submitForm(e){
    e.preventDefault();
    //get input values
   let name = document.querySelector(".name").value; 
   let email = document.querySelector(".email").value;
   let message = document.querySelector(".message").value; 
   
   saveContactinfo(name,email,message);

   document.querySelector(".contact-form").reset();

   sendEmail(name,email,message);
}

//Save info to Firebase
function saveContactinfo(name,email,message){
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        message: message,
    });
    retrieveInfos();
}

//retrive info
function retrieveInfos(){
    let ref = firebase.database().ref("infos");
    ref.on("value",gotData);
}

function gotData(data){
    let info = data.val();
    let keys = Object.keys(info);

    for(let i=0; i < keys.length; i++){
        let infoData = keys[i];
        let name  = info[infoData].name;
        let email = info[infoData].email;
        let message = info[infoData].message;
        console.log(name,email,message);

        let infoResults = document.querySelector(".infoResults");

        infoResults.innerHTML += `<div>
            <p><strong>Name: </strong>${name} <br/>
            <a><strong>Email: </strong>${email}</a><br/>
            <a><strong>message: </strong>${message}</a>
            </p>
        </div>`
    }
}

retrieveInfos();



//send email info
function sendEmail(name,email,message){
    Email.send({

    Host: "smtp.gmail.com",
    Username: "Chunchuvijaykumar96@gmail.com",
    Password: "hkikbhbdhdgsqcjq",
    To:"vijaythevarma@gmail.com",
    From: "Chunchuvijaykumar96@gmail.com",
    Subject:`${name}  sent you a message`,
    Body: `${name} <br/> Email: ${email} <br/> Message: ${message}` ,  
  }).then((message) => alert("mail sent successfully"));
}