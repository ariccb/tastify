<template>
<v-container>
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
                Welcome to Rate My Music Taste
            </h1>

            <v-btn @click="run_authenticate">
                
                Login To Spotify

            </v-btn>

        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import Authenticate from './Authenticate.vue'
import axios from 'axios'

export default ({
    name: 'LandingPage',
    components: {
        Authenticate,
    },

    data: () => {
        return {
            dialog: false
        }
    },

    methods: {
        run_authenticate(){
            let href = 'http://localhost:3000/auth/spotify'
            window.location.href = href

        }
    }
})
</script>
