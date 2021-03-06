<template>
  <div>
    <div class="bread">
      <ul>
        <li id="cart">カート</li>
        <li>注文内容確認</li>
        <li>注文完了</li>
      </ul>
    </div>
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
                <router-link v-bind:to="'/itemDetail/' + cartItem.isbn">
                  <img v-bind:src="cartItem.book.mediumImageUrl" />
                </router-link>
                <div class="itemTitleAndAuthor">
                  <router-link
                    v-bind:to="'/itemDetail/' + cartItem.isbn"
                    class="itemTitle"
                  >
                    <div>
                      {{ cartItem.book.title }}
                    </div>
                  </router-link>
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
              <button
                class="deleteButton"
                type="button"
                v-on:click="deleteCartListItem(index)"
              >
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
    <div class="goOrder" @click="goOrder">
      <button class="goOrderButton" type="button">購入手続きへ進む</button>
    </div>
    <div>
      <router-link to="/" class="returnShopping"
        ><p>お買い物を続ける</p></router-link
      >
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
  }

  /**
   * カートリストに商品が入っていないと購入手続きに進めないようにする.
   */
  goOrder(): void {
    if (this.cartList.length === 0) {
      this.errorMsg = "カートに商品が入っていません";
      return;
    } else {
      this.$router.push("/orderConfirm");
    }
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
#cart {
  color: #0085cd;
  font-weight: bold;
}

.bread {
  width: 450px;
  margin-right: auto;
  margin-left: auto;
}

.bread ul {
  display: flex;
  list-style-type: none;
  justify-content: center;
  background-color: #f3f1e4;
  border-radius: 30px;
}

.bread li {
  padding: 5px;
  font-size: 20px;
}

.bread li:after {
  content: "\025b6";
  margin-left: 10px;
  margin-right: 10px;
  color: gray;
  font-weight: 100;
}

.bread li:last-child:after {
  content: "";
}

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
  border-color: gainsboro;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  text-align: center;
  margin-top: 20px;
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
  text-decoration: none;
  color: black;
}

.totalPrice {
  text-align: center;
  font-size: 25px;
}
.totalPriceColor {
  color: #f11e46;
  font-weight: bold;
}
.goOrder {
  margin-top: 10px;
  text-align: center;
}

.goOrderButton {
  width: 200px;
  height: 45px;
  font-size: 16px;
  color: white;
  background-color: #64bb30;
  border-radius: 4px;
  padding: 10px;
  border: unset;
  margin-bottom: 15px;
}
.goOrderButton:hover {
  background-color: #94ce70;
}

.deleteButton {
  margin-right: 10px;
}
.returnShopping {
  text-align: center;
  text-decoration: none;
  color: #0085cd;
}
.returnShopping:hover {
  text-decoration: underline;
}
</style>
