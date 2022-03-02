<template>
  <div>
    <h2>購入履歴</h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class OrderHistory extends Vue {}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 40px;
}
</style>
