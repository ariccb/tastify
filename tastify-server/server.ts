// using this guide: http://www.passportjs.org/packages/passport-spotify/


import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import passport from 'passport'
import SpotifyStrategy from 'passport-spotify'

const app = express()
let users = []
let jsonParser = bodyParser.json()
let port 
// load the HTTP library
let http = require('http')
let client_id = 'e7d9fdcd1f524086a56e980661ff3fe0'
let client_secret = 'b0bc473ea55941afaa3a303e592c1e28'
// load the passport-spotify library

// create an HTTP server to handel responses
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(port);

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
      callbackURL: '/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      console.log(profile)
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

app.get('/auth/spotify/callback', (req, res, next) => {
  passport.authenticate('spotify', { failureRedirect: '/' })
  //next()
},

  function(req, res) {
    // Successful authentication, redirect home.
    console.log('HERE')
    res.redirect('/')
  }
);

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
