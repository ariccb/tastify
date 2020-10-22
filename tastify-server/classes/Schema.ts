const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PlaylistSchema = new Schema({    
    playlists: {
        href: String,
        items: [
            {
                collaborative: Boolean,
                description: String,
                external_urls: {
                    spotify: String
                },
                href: String,
                id: String,
                images: [],
                name: String,
                owner: {
                    display_name: String,
                    external_urls: {
                        spotify: String
                    },
                    href: String,
                    id: String,
                    type: {type: String},
                    uri: String
                },
                public: true,
                snapshot_id: String,
                tracks: {
                    href: String,
                    total: Number
                },
                type: {type: String},
                uri: String
            },
            {
                collaborative: false,
                external_urls: {
                    spotify: String
                },
                href: String,
                id: String,
                images: [],
                name: String,
                owner: {
                    external_urls: {
                        spotify: String
                    },
                    href: String,
                    id: String,
                    type: {type: String},
                    uri: String
                },
                public: Boolean,
                snapshot_id: String,
                tracks: {
                    href: String,
                    total: Number
                },
                type: {type: String},
                uri: String
            }
        ],
        limit: Number,
        next: String,
        offset: Number,
        previous: String,
        total: Number

    },
})

const UserSchema = new Schema({
    name: String,// The name displayed on the user’s profile.
    id: String,// The Spotify user ID for the user
    uri: String,// The Spotify URI for the user.
    url: String,// The open.spotify URL.
    href: String,// A link to the Spotify Web API endpoint for this user.
    images: [], // The user’s profile image.
    playlists: [PlaylistSchema]

    // this is where i'm going to be saving all of the spotify user info like their playlists, etc. Need to pull it from the server.ts file and send it to this schema
})

const RatingSchema = new Schema({
    User: [UserSchema],
    playlists: [PlaylistSchema],
    rating: { type: Number, min: 1, max: 5 },

})

// Compile model from schema
let Playlist = mongoose.model('Playlist', PlaylistSchema)
let User = mongoose.model('User', UserSchema)
let Rating = mongoose.model('Rating', RatingSchema)

//export the schema
module.exports = {
    Playlist: Playlist,
    User: User,
    Rating: Rating
  }

// learn how to place and remove json objects from the schema 