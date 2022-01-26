<template>
  <div class="bookItem">
    <ul v-for="book of bookList" v-bind:key="book.isbn">
      <li>
        <img v-bind:src="book.mediumImageUrl" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Book } from "@/types/Book";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BookItem extends Vue {
  // getterで取得したbooks情報を格納する配列
  private bookList = new Array<Book>();

  async created(): Promise<void> {
    await this.$store.dispatch("getBookList");
    this.bookList = this.$store.getters.getBookList;
    console.dir("bookList:" + JSON.stringify(this.bookList));
  }
}
</script>

<style scoped>
.bookItem {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  width: auto;
  list-style: none;
  margin-right: 7px;
  margin-bottom: 26px;
}
img {
  height: 134px;
}
</style>
