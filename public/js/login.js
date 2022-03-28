//executes after successful user sign-in:
async function onSignIn(googleUser) {
    //to authenticate with our backend server,send an id token(this changes everytime and is verifiable) to it
    var id_token = googleUser.getAuthResponse().id_token;
    try {
      var response=await axios.post('http://localhost:8000/login',{token:id_token})
      signOut()
      if(response.status==200)
        location.assign('/')
    } catch (error) {
      console.log(error) 
    }
  }
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
