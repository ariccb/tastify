<template>
<div class="landingpage">        
    <v-main>
    <v-row class="text-center">
        <v-col
            cols="12"
            class="text-center">
            <v-img
                :src="require('../assets/Rock-on-logo.svg')"
                class="my-3"
                contain
                height="200" />
        </v-col>

        <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">
                Welcome to Tastify
            </h1>
            <v-spacer>
                
            </v-spacer>
            <h3>
                Where you can 'taste-test' your own and other Spotify user's playlists
            </h3>

            <v-btn @click="run_spotify_authenticate">
                

                Login To Spotify

            </v-btn>

        </v-col>
    </v-row>
</v-main>
</div>

</template>

<script lang="ts">
import axios from 'axios'

export default ({
    name: 'LandingPage',
    components: {
        
    },

    data: () => {
        return {
            dialog: false,
           
        }
    },

    methods: {
        run_spotify_authenticate() {
            let href = 'http://localhost:3000/auth/spotify'
            window.location.href = href

        }
    }
})
</script>
