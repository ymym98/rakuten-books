<template>
  <div>
    <book-item></book-item>
  </div>
</template>

<script lang="ts">
import BookItem from "@/components/BookItem.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { BookItem },
})
export default class Books extends Vue {}
</script>

<style scoped>
li {
  margin-top: 30px;
}
</style>
