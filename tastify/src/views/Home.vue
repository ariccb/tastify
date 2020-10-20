<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/Rock-on-logo.svg">
    <Authenticate msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Authenticate from '../components/Authenticate.vue'

export default {
  name: 'Home',
  components: {
    Authenticate
  }
}
</script>
