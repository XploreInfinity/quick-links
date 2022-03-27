const {OAuth2Client} = require('google-auth-library');
const client_id='153898328644-hj503vp8cbsu5j381l0kgb7va8ogg3e5.apps.googleusercontent.com'
const client = new OAuth2Client(client_id); //initialise OAuthClient
const verifyToken=async (token)=>{
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client_id,
    });
    const payload = ticket.getPayload();
    //Ensure aud claim contains our app's client ID. If it does, then the token is both valid and intended for us,otherwise, it is a malicious request:
    if(payload['aud']==client_id){
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        console.log(userid)
        console.log(payload)
        return {status:200,payload:payload,userInDB:false}
    }
    else{
        return {status:400}
    }    
}
module.exports=verifyToken