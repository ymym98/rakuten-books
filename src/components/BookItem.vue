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
  padding: 40px 30px 40px 30px;
}

ul {
  width: calc(100% / 6);
  border-bottom: solid 6px #b0a690;
}

li {
  list-style: none;
  margin-top: 40px;
  padding-left: 40px;
}
img {
  height: 134px;
}
</style>
