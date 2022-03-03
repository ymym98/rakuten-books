<template>
  <div>
    <div>
      <div class="bookInfo">
        <div class="bookImg">
          <img v-bind:src="currentBook.largeImageUrl" />
          <div class="bookData">
            <div id="salesDate">発売日：{{ currentBook.salesDate }}</div>
            <div>出版社：{{ currentBook.publisherName }}</div>
          </div>
        </div>
        <div class="bookAbout">
          <h1>{{ currentBook.title }}</h1>
          <div class="bookAuthor">
            <span id="name">著者</span>{{ " " + currentBook.author }}
          </div>
          <div class="bookCaption">{{ currentBook.itemCaption }}</div>
          <div class="shareButton">
            <div class="bookPrice">
              <span>税込</span>
              <span id="price">{{
                currentBook.itemPrice.toLocaleString()
              }}</span>
              <span>円</span>
            </div>
            <!-- <ShareNetwork
              network="twitter"
              :url="currentBook.itemUrl"
              :title="'『' + currentBook.title + '』'"
            >
              <div>
                <v-icon
                  ><img
                    class="twitterIcon"
                    src="/img/icons8-twitter-squared-48.png"
                /></v-icon>
              </div>
            </ShareNetwork> -->
          </div>
          <div class="addCart">
            <div>
              <button type="button" @click="addCartList">カートに入れる</button>
            </div>
            <div>
              <select name="quantity" v-model="quantity">
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Book } from "@/types/Book";
import { OrderItem } from "@/types/OrderItem";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ItemDetail extends Vue {
  // 選択された商品の個数
  private quantity = 1;
  // 選択された商品情報
  private currentBook = new Book(0, "", "", 0, "", "", "", "", "", "", "", "");
  /**
   * 選択した商品の詳細情報を取得.
   */
  async created(): Promise<void> {
    await this.$store.dispatch("getBookList");
    // currentBookのisbnコードとurlのisbnコードが一致するものを探す
    this.currentBook = this.$store.getters.getBookList.find(
      ({ isbn }: { isbn: string }) => isbn === this.$route.params.isbn
    );

    console.log("現在の配列情報：" + JSON.stringify(this.currentBook));
    console.log("isbn:" + JSON.stringify(this.currentBook.isbn));
  }

  /**
   * カートに商品を追加する.
   */
  addCartList(): void {
    // 注文IDはカートリストに入っている商品数+1をする
    const orderId = this.$store.getters.getCartList.length + 1;

    // vuexに情報を保存する
    this.$store.commit(
      "addCartList",
      new OrderItem(
        this.currentBook.isbn,
        orderId,
        this.quantity,
        this.currentBook
      )
    );

    // カートリストに画面遷移
    this.$router.push("/cartList");
  }
}
</script>

<style scoped>
select {
  height: 35px;
  border-radius: 4px;
  margin-left: 10px;
  margin-top: 6px;
}

.shareButton {
  display: flex;
  justify-content: flex-end;
}

.twitterIcon {
  width: 40px;
  height: 40px;
  margin-left: 10px;
}

.addCart {
  text-align: center;
  margin-top: 20px;
  display: flex;
  margin-left: 30px;
}
.addCart button {
  width: 400px;
  height: 50px;
  font-size: 20px;
  color: white;
  background-color: #64bb30;
  border-radius: 4px;
  padding: 10px;
  border: unset;
}
.addCart button:hover {
  background-color: #94ce70;
}

.bookPrice {
  text-align: right;
}
.bookPrice span {
  font-size: 18px;
}
#price {
  color: #f11e46;
  font-size: 27px;
}

.bookData {
  font-size: 13px;
}
#salesDate {
  margin-bottom: 5px;
  margin-top: 5px;
}

.bookAuthor {
  margin-bottom: 15px;
  font-size: 18px;
}
#name {
  font-size: 13px;
}

h1 {
  text-align: left;
  margin-bottom: 20px;
}
.bookCaption {
  margin-bottom: 20px;
}

img {
  height: 360px;
  width: 265px;
}
.bookInfo {
  display: flex;
  justify-content: center;
}
.bookAbout {
  width: 511px;
  height: 244px;
  margin-left: 30px;
}
</style>
