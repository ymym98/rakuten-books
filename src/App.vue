<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import VueSocialSharing from "vue-social-sharing";

Vue.use(VueSocialSharing);

@Component({
  components: { Header },
})
export default class App extends Vue {}
</script>
