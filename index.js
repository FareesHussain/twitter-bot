require('dotenv').config()
var Twit = require('twit')
const express = require('express');

var TwitterClient = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

TwitterClient.get('account/verify_credentials',{
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated)

const handle = "sarcasticdevel1"

const termsToTrack = [
    "#100daysofcodechallenge",
    "#Kotlin",
    "#AndroidDev",
    "#NowInAndroid",
    "#AndroidNewbie",
    "#KotlinTips",
    "#thisIsNothingButATestTweet"
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
    var stream = TwitterClient.stream('statuses/filter', {track:termsToTrack, tweet_mode:'extended'})

    stream.on('tweet', function (tweet) {
        if(!tweet.retweeted_status && tweet.user.screen_name !== handle){
            console.log(tweet.text)
            console.log(tweet.id_str)
            makeRetweet(tweet.id_str)
            likeTweet(tweet.id_str)
        }
    })
}

function makeRetweet(tweetId) {
    TwitterClient.post('statuses/retweet', { id: tweetId })
        .then(result => {
            console.log('by nodejs ----> Retweeted successfully!');
        }).catch(console.error);
}

function likeTweet(tweetId) {
    TwitterClient.post('favorites/create', { id: tweetId })
        .then(result => {
            console.log('by nodejs ----> Liked tweet successfully!');
        }).catch(console.error);
}

function sendTweet() {
    TwitterClient.post('statuses/update',{ status : 'test tweet 8 to retrack tweet bases on #thisIsNothingButATestTweet' })
}

app.use("/", () => {
    res.send("Hello World")
});

app.listen(5000, () => {
    console.log('Server started on 5000');
})