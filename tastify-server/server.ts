// using this guide: http://www.passportjs.org/packages/passport-spotify/


import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from 'passport'
import SpotifyStrategy from 'passport-spotify'

const app = express()
app.use(passport.initialize())
let users = []
let jsonParser = bodyParser.json()
let port 
// load the HTTP library
let http = require('http')
let client_id = 'e7d9fdcd1f524086a56e980661ff3fe0'
let client_secret = 'b0bc473ea55941afaa3a303e592c1e28'
// load the passport-spotify library

app.use(cors(
  {origin: [
  'http://localhost:8080',
  'http://localhost:8080/*',
  'http://localhost:3000',  
  'http://localhost:3000/*'

]}
))

passport.use(
  new SpotifyStrategy.Strategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: 'http://localhost:3000/auth/spotify/callback/'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      console.log(profile)          
      //@ts-ignore
      done(null, profile)
    })
    
  )

app.get('/', (req, res)=>{
  res.redirect('http://localhost:8080')
}) 

// @ts-ignore
app.get('/auth/spotify', passport.authenticate('spotify',{
  scope: ['user-read-email', 'user-read-private','playlist-read-private','user-top-read','user-library-read','streaming','app-remote-control'], 
  showDialog: true
}), function(req, res) {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
});

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
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

 


 if (port == undefined)
 {
     port = 3000
 }
app.listen(port)
console.log('listening on port ' + port)
