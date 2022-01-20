<template>
  <div>
    {{ bookList }}
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
