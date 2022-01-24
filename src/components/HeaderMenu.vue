<template>
  <div>
    <ul class="nav">
      <li class="nav_item"><a href="#"> Home</a></li>
      <li class="nav_item"><a href="#">Service</a></li>
      <li class="nav_item"><a href="#">About</a></li>
      <li class="nav_item"><a href="#">Contact</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HeaderMenu extends Vue {}
</script>

<style scoped>
.nav {
  display: flex;
  list-style: none;

  align-items: flex-end;
}
.nav_item {
  width: calc(100% / 4);
}

.nav_item > a {
  display: block;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  color: black;
  font-size: 20px;
}
</style>
