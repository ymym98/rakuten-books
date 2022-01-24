<template>
  <header>
    <div class="icon_btn">
      <img class="icon" src="/img/yumi_book.png" />
    </div>
    <my-btn></my-btn>
    <ul class="nav">
      <li class="nav_item"><a href="#"> Home</a></li>
      <li class="nav_item"><a href="#">Service</a></li>
      <li class="nav_item"><a href="#">About</a></li>
      <li class="nav_item"><a href="#">Contact</a></li>
    </ul>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MyBtn from "./MyBtn.vue";

@Component({
  components: {
    MyBtn,
  },
})
export default class Header extends Vue {}
</script>

<style>
@import "../../public/css/header.css";
</style>
