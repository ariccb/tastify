<template>
  <div id="app">
    <div id="nav">
      <v-card class="overflow-hidden">
        <v-app-bar
          absolute
          color="#43a047"
          dark
          shrink-on-scroll
          prominent
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-5"
          scroll-threshold="5"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title
            >Tastify
            <v-card-subtitle v-if="loaded">
              {{ mainUser[0].name }}
            </v-card-subtitle>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon
              >mdi-heart

              <!-- insert spotify account picture -->
            </v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs align-with-title>
              <v-tab>
                <router-link to="/">Login</router-link>
              </v-tab>
              <v-tab>
                <router-link to="/MainPage">Playlists</router-link>
              </v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
        <v-sheet
          id="scrolling-techniques-5"
          class="overflow-y-auto"
          max-height="224"
        >
          <v-container style="height: 224px"></v-container>
        </v-sheet>
      </v-card>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import LandingPage from "./views/LandingPage.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    LandingPage,
  },

  data() {
    return {
      mainUser: [],
      loaded: false
    };
  },

  async mounted() {
    let users = await axios.get("http://localhost:3000/user").then((res) => {
      //   console.log(res.data)
      let user = {
        name: res.data.name,
        id: res.data._id,
        images: res.data.images,
        country: res.data.country,
        url: res.data.url,
        playlists: res.data.playlists[0].items,
      }
      this.mainUser.push(user);
      console.log("um i think this is working on App.vue");
      console.log(user);
      this.loaded = true
    })
  },
}
</script>
