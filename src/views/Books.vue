<template>
  <div>
    <div v-for="book of bookList" v-bind:key="book.itemUrl">
      <div>
        <img :src="book.mediumImageUrl" />
        <span>
          {{ book.author }}
          {{ book.itemCaption }}
        </span>
      </div>
    </div>
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

<style></style>
