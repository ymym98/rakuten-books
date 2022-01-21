<template>
  <div class="header"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<style scoped>
.header {
  width: 1440px;
  height: 127px;
  background-color: #f3f1e4;
}
</style>
