<template>
  <div>
    <div class="bookshelf">
      <book-item class="itemShelf"> </book-item>
    </div>
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
.bookshelf {
  box-sizing: border-box;
  background-color: #f8f7ef;
  width: 76%;
  margin: 0px auto;
  line-height: 1;
  margin-bottom: 60px;
}
</style>
