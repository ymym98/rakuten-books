<template>
  <div>
    <div>
      <h1>
        ショッピングカート
        <div class="errorMsg">{{ errorMsg }}</div>
      </h1>
      <table>
        <thead>
          <tr>
            <th class="productName">商品名</th>
            <th class="quantity">数量</th>
            <th class="subPrice">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cartItem, index) of cartList" v-bind:key="cartItem.isbn">
            <td>
              <div class="itemImageAndTitle">
                <img v-bind:src="cartItem.book.mediumImageUrl" />
                <div class="itemTitleAndAuthor">
                  <div class="itemTitle">{{ cartItem.book.title }}</div>
                  <div>{{ cartItem.book.author }}</div>
                </div>
              </div>
            </td>
            <td align="center">
              <!-- 数量 -->
              {{ cartItem.quantity }}
            </td>
            <td align="center">
              <!-- 小計 -->
              {{
                (cartItem.book.itemPrice * cartItem.quantity).toLocaleString() +
                "円"
              }}
            </td>
            <td align="center">
              <button type="button" v-on:click="deleteCartListItem(index)">
                カートから削除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="totalPrice">
        <span>合計</span>
        <span class="totalPriceColor">{{
          getTotalPrice.toLocaleString() + "円"
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { OrderItem } from "@/types/OrderItem";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CartList extends Vue {
  // カートに入れた商品を格納する配列
  private cartList = new Array<OrderItem>();
  // カートリストに商品が入っていないエラーメッセージ
  private errorMsg = "";

  created(): void {
    // vuexからカートリストを取得して格納する
    this.cartList = this.$store.getters.getCartList;
    if (this.cartList.length === 0) {
      this.errorMsg = "カートに商品が入っていません";
    }
    console.log("カートリストの中身：" + JSON.stringify(this.cartList));
  }

  /**
   * カートリストから商品を削除する.
   */
  deleteCartListItem(index: number): void {
    this["$store"].commit("deleteCartListItem", index);
    this.cartList = this.$store.getters.getCartList;
  }

  /**
   * 合計金額を返す.
   */
  get getTotalPrice(): number {
    let totalPrice = 0;
    for (let cartItem of this["$store"].getters.getCartList) {
      totalPrice += cartItem.book.itemPrice * cartItem.quantity;
    }
    return totalPrice;
  }
}
</script>

<style>
.productName {
  width: 600px;
}
.quantity {
  width: 100px;
}
.subPrice {
  width: 150px;
}
table {
  border: solid;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  text-align: center;
}
.errorMsg {
  color: #f11e46;
  font-weight: normal;
  font-size: 25px;
}

.itemImageAndTitle {
  display: flex;
  margin-bottom: 20px;
  margin-left: 10px;
}
.itemTitleAndAuthor {
  margin-left: 10px;
  align-self: center;
}
.itemTitle {
  font-size: 18px;
}
.totalPrice {
  text-align: center;
  font-size: 25px;
}
.totalPriceColor {
  color: #f11e46;
  font-weight: bold;
}
</style>
