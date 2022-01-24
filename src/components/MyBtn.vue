<template>
  <div>
    <button type="button">新規会員登録</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class MyBtn extends Vue {}
</script>

<style scoped>
button {
  width: 124px;
  background-color: #f25371;
  border: unset;
  color: white;
  border-radius: 4px;
  padding: 10px;
}
</style>
