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

const handle = "sarcasticdevel1"

const termsToTrack = [
    "#Kotlin",
    "#AndroidDevs",
    "#NowInAndroid",
    "#AndroidNewbie",
    "#thisIsNothingButATestTweet",
    "#KotlinTips"
]

function onAuthenticated(err){
    if(err) console.log("An Error occured: "+err)
    else {
        console.log('Authenticated Successfully')
        // sendTweet() // unComment it for testing purposes
        trackTweets()
    }
}

function trackTweets(){
    var stream = T.stream('statuses/filter', {track:termsToTrack, tweet_mode:'extended'})

    stream.on('tweet', function (tweet) {
        if(!tweet.retweeted_status && tweet.user.screen_name !== handle){
            console.log(tweet.text)
            console.log(tweet.id_str + tweet.name)
            makeRetweet(tweet.id_str)
            //todo add a new function to like the tweets
        }
    })
}

function makeRetweet(tweetId) {
    T.post('statuses/retweet', { id: tweetId })
        .then(result => {
            console.log('Retweeted successfully!');
        }).catch(console.error);
}

function sendTweet() {
    T.post('statuses/update',{ status : 'test tweet 8 to retrack tweet bases on #thisIsNothingButATestTweet' })
}
