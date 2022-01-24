<template>
  <header>
    <img class="icon" src="/img/yumi_book.png" />
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

@Component
export default class Header extends Vue {}
</script>

<style>
@import "../../public/css/header.css";
</style>
