// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);




  exports.deleteUser = functions.database.ref('/users/{userId}')
  .onDelete(event => {
    var userData = event.data._data;
    admin.auth().deleteUser(userData.uid)
    .then(function() {
      console.log("Successfully deleted user");
    })
    .catch(function(error) {
      console.log("Error deleting user:", error);
    });
  });






