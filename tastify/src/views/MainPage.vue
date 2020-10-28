<template>
  <div>
    <v-container
      v-for="align in alignments"
      :key="align"
      class="grey lighten-5 mb-6"
    >
      <v-row :align="align" no-gutters style="height: 150px">
        <v-col v-for="n in 3" :key="n">
          <v-card class="pa-2" outlined tile> <div > {{ mainUser[0].playlists[0].name }}</div> </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div id="app">
      <v-app id="inspire">
        <div class="text-center">
          <v-bottom-sheet inset>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark v-bind="attrs" v-on="on">
                Open Player
              </v-btn>
            </template>
            <v-card tile>
              <v-progress-linear
                :value="50"
                class="my-0"
                height="3"
              ></v-progress-linear>

              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>The Walker</v-list-item-title>
                    <v-list-item-subtitle
                      >Fitz & The Trantrums</v-list-item-subtitle
                    >
                  </v-list-item-content>

                  <v-spacer></v-spacer>

                  <v-list-item-icon>
                    <v-btn icon>
                      <v-icon>mdi-rewind</v-icon>
                    </v-btn>
                  </v-list-item-icon>

                  <v-list-item-icon
                    :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }"
                  >
                    <v-btn icon>
                      <v-icon>mdi-pause</v-icon>
                    </v-btn>
                  </v-list-item-icon>

                  <v-list-item-icon
                    class="ml-0"
                    :class="{ 'mr-3': $vuetify.breakpoint.mdAndUp }"
                  >
                    <v-btn icon>
                      <v-icon>mdi-fast-forward</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card>
          </v-bottom-sheet>
        </div>
      </v-app>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "MainPage",
  components: {},

  data() {
    return {
      dialog: false,
      alignments: ["start", "center", "end"],
      mainUser: [],
    };
  },
  methods: {},

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
      this.mainUser.push(user)
    })
  },
}
</script>
