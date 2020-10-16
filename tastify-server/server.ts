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
let http = require('http') //what's this doing again? ask emmanuel
let server=http.createServer(function(req, res){
  res.end('test')
})

let client_id = 'e7d9fdcd1f524086a56e980661ff3fe0'
let client_secret = 'b0bc473ea55941afaa3a303e592c1e28'
// load the passport-spotify library

var authCallbackPath = '/auth/spotify/callback/'

// create an HTTP server to handel responses
http.createServer((req, res) => { //not sure what this stuff is doing - ask emmanuel
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello World");
  res.end();
}).listen(port); // is this using 'undefined' port? (our if statement to make sure port is assigned to 3000 is at the bottom of the script)

app.use(cors(
  {origin: [
  'http://localhost:8080',
  'http://localhost:8080/*',
  'http://localhost:3000',  
  'http://localhost:3000/*'

]}
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new SpotifyStrategy.Strategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: 'http://localhost:' + port + authCallbackPath //we used to just call '/auth/spotify/callback' here, now added http://localhost:3000 to it
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      console.log(profile)
      return done
    })
    
  )
// Initialize Passport!
app.use(passport.initialize())

app.get('/', (req, res)=>{    // not sure what this part is doing! Emmanuel??
  res.redirect('http://localhost:8080')
}) 

// @ts-ignore
app.get('/auth/spotify', passport.authenticate('spotify',{
    scope: ['user-read-email', 'user-read-private','playlist-read-private','user-top-read','user-library-read','streaming','app-remote-control'], 
    showDialog: true
  })
)

app.get(
  authCallbackPath, 
  passport.authenticate('spotify', { failureRedirect: 'http://www.google.com' }), //redirecting to google.com on failure to authenticate to make it obvious
  (req, res) => {
    console.log('Successful Authentication, redirecting back home')
    res.redirect('/')
  }
)

 if (port == undefined)
 {
     port = 3000
 }

server.on('listening', function(){
  console.log('ok, server is running')
})

server.listen(port, () => {
  console.log('listening on port ' + port)
})


// app.listen(port, () => {
//   console.log('listening on port ' + port)
// })
