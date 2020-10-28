import mongoose from 'mongoose'
const {Schema} = mongoose

export const PlaylistImageSchema = new mongoose.Schema({
    0: {
        height: Number,
        url: String,
        width: Number,
    },
    

})
export const PlaylistItemsSchema = new mongoose.Schema({
    collaborative: Boolean,
    description: String,
    external_urls: {
        spotify: String
    },
    href: String,
    id: String,
    images: [PlaylistImageSchema],
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
    public: Boolean,
    snapshot_id: String,
    tracks: {
        href: String,
        total: Number
    },
    type: {type: String},
    uri: String,   
})

export const PlaylistSchema = new mongoose.Schema({
    href: String,
    limit: Number,
    next: String,
    offset: Number,
    previous: String,
    total: Number,
    items: [PlaylistItemsSchema],    
})

export const UserSchema = new mongoose.Schema({
    name: String,// The name displayed on the user’s profile.
    accesstoken: String, // save the authenticated access token for the user
    refreshtoken: String, // same as above, but for refresh token
    id: String,// The Spotify user ID for the user
    uri: String,// The Spotify URI for the user.
    url: String,// The open.spotify URL.
    href: String,// A link to the Spotify Web API endpoint for this user.
    country: String, //What country are they signing in from
    images: [], // The user’s profile image.
    playlists: [PlaylistSchema],   

    // this is where i'm going to be saving all of the spotify user info like their playlists, etc. Need to pull it from the server.ts file and send it to this schema
})

// const RatingSchema = new Schema({
//     user: String,
//     playlist: String,
//     rating: { type: Number, min: 1, max: 5 },

// })



// module.exports.db = mongoose;
// // learn how to place and remove json objects from the schema 