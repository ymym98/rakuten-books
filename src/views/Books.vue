<template>
  <div>
    <ul v-for="book of bookList" v-bind:key="book.itemUrl">
      <li>
        <img :src="book.mediumImageUrl" />
        <span>
          {{ book.author }}
          {{ book.itemCaption }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Book } from "@/types/Book";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Books extends Vue {
  private bookList = new Array<Book>();

  async created(): Promise<void> {
    await this.$store.dispatch("getBookList");
    this.bookList = this.$store.getters.getBookList;
    console.dir("bookList:" + JSON.stringify(this.bookList));
  }
}
</script>

<style scoped>
li {
  margin-top: 30px;
}
</style>
