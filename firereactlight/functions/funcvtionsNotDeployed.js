exports.addUserRole = functions.auth.user()
.onCreate(event => {
  var userData = event.data;
  return admin.auth().setCustomUserClaims(userData.uid, {admin: true})
  .then(() => {
    // Set the refresh time to the current UTC timestamp.
    // This will be captured on the client to force a token refresh
    console.log("Successfully added role to user");
  })
  .catch(error => {
    console.log("ERROR adding role to user", error);
  });
});
