<template>
<v-app>
    <v-app-bar
        app
        color="primary"
        dark>
        <v-spacer>
        </v-spacer>

    </v-app-bar>

    <v-main>
        <LandingPage />
    </v-main>
</v-app>
</template>

<script lang="ts">

import LandingPage from './components/LandingPage.vue';

export default ({
    name: 'App',

    components: {
        LandingPage,
    },

    data: () => {
        return {}
    },
});
</script>
