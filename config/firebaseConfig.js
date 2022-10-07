const firebase = require("firebase/app");
var gcloud = require('gcloud');
require("firebase/storage");

var firebaseConfig = {
  apiKey: "AIzaSyDTu6lBk42wumXXZHknnxrvDsyGdajjAsk",
  authDomain: "mamantulahc.firebaseapp.com",
  databaseURL: "https://mamantulahc.firebaseio.com",
  projectId: "mamantulahc",
  storageBucket: "mamantulahc.appspot.com",
  messagingSenderId: "252597823558",
  appId: "1:252597823558:web:a7865fe9ab94d3b4698247",
  measurementId: "G-F8CRF8VE1E",
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = gcloud.storage(firebaseConfig);

module.exports = storage;
