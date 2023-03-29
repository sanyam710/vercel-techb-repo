importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTJa2JN_619ZAPNxmSEaQMbInPxFRlWEc",
    authDomain: "techbistro-fa4b9.firebaseapp.com",
    projectId: "techbistro-fa4b9",
    storageBucket: "techbistro-fa4b9.appspot.com",
    messagingSenderId: "562573716555",
    appId: "1:562573716555:web:d70471192a5299f42971ce",
    measurementId: "G-RV1NF18VXY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fcm = firebase.messaging();

fcm.onBackgroundMessage((data) => {
    // console.log(data);
})
