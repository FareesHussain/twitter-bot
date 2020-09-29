require('dotenv').config()
var Twit = require('twit')

var T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

T.get('account/verify_credentials',{
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

function onAuthenticated(err){
    if(err){
        console.log("an Error occured: "+err)
    } else {
        console.log('Authenticated successfully')
    }
}
