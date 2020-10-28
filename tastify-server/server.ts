// using this guide: http://www.passportjs.org/packages/passport-spotify/


import express from 'express'
import axios from 'axios'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport, { use } from 'passport'
import SpotifyStrategy from 'passport-spotify'
import { } from 'dotenv/config'
import { UserSchema } from './classes/Schema'
import { resolveModuleName } from 'typescript'
// import SpotifyUser from './classes/UserSpotify'

const app = express()
app.use(passport.initialize())
let jsonParser = bodyParser.json()
let port
// load the HTTP library
let http = require('http')
let client_id = 'e7d9fdcd1f524086a56e980661ff3fe0'
let client_secret = 'b0bc473ea55941afaa3a303e592c1e28'
let spotifyID
// load the passport-spotify library

app.use(cors(
  {
    origin: [
      'http://localhost:8080',
      'http://localhost:8080/*',
      'http://localhost:3000',
      'http://localhost:3000/*'

    ]
  }
))

let connection = mongoose.connect('mongodb://localhost:27017/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

connection.then((db) => {
  // const Playlist = db.model('Playlist', PlaylistSchema)
  const User = db.model('User', UserSchema)


  passport.use(
    new SpotifyStrategy.Strategy(
      {
        clientID: client_id,
        clientSecret: client_secret,
        callbackURL: 'http://localhost:3000/auth/spotify/callback/'
      },
      function (accessToken, refreshToken, expires_in, profile, done) {
        //@ts-ignore

        // below is the code that was working to get the playlists from spotify -
        // but i think that should be outside of this passport auth function
        //@ts-ignore
        spotifyID = profile.id
        console.log(spotifyID)

        //findoneandupdate()

        
        axios.get('https://api.spotify.com/v1/me/playlists',
          {
            headers:
              { Authorization: 'Bearer ' + accessToken },
          }).then((val) => {
            // val accesses the current user's playlists as objects
            console.log(val)      
            
            let query = { 'id': spotifyID }
            let update = {
              //@ts-ignore
              name: profile.displayName,
              accesstoken: accessToken,
              refreshtoken: refreshToken,
              //@ts-ignore
              id: profile.id,
              //@ts-ignore
              url: profile.profileUrl,
              //@ts-ignore
              country: profile.country,
              //@ts-ignore
              images: profile.photos,
              playlists: val.data
            }
            console.log(val.data)

            User.findOneAndUpdate(query, update, { upsert: true }, function (err, doc) {
              if (err) {
                console.log(err)
              }
            })

          }).catch((res) => {
            console.log(res.response)
          })

        

        console.log(profile)


        //@ts-ignore
        done(null, profile)
      })
  )

  // app.post('/user/:userid', jsonParser, (req, res) =>{
  //   User.findOne({'id': req.params.userid}, 'images name', function(err, user) { //look up express variables
  //     res.send(user)
  //   })        
  // })

  app.get('/user', jsonParser, (req, res) => {
    User.findOne({ 'id': spotifyID }, 'images name id country url playlists', function (err, user) { //look up express variables
      console.log(spotifyID)
      res.send(user)
    })
  })

})



app.get('/', (req, res) => {
  res.redirect('http://localhost:8080')
})



// @ts-ignore
app.get('/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private', 'playlist-read-private', 'playlist-read-collaborative', 'user-top-read', 'user-library-read', 'streaming', 'app-remote-control'],
  showDialog: true
}), function (req, res) {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
});

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('Successful Authentication!')
    // need to assign a data variable "successful-login" and have a app.get request on the client side to tell if it did or not, THEN route to /about (or mainpage)
    res.redirect('/')

  }
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})




if (port == undefined) {
  port = 3000
}
app.listen(port)
console.log('listening on port ' + port)
