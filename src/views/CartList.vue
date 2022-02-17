<template>
  <div>
    <div>カートリスト</div>
    <div v-for="cartItem of cartList" :key="cartItem.orderId">
      {{ cartItem.orderId }}
      {{ cartItem.book.author }}
      {{ cartItem.book.title }}
    </div>
  </div>
</template>

<script lang="ts">
import { OrderItem } from "@/types/OrderItem";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CartList extends Vue {
  private orderItemList = new Array<OrderItem>();

  created(): void {
    this.orderItemList = this.$store.getters.getCartList;
    // console.log("カートリストの中身：" + JSON.stringify(this.orderItemList));
  }

  /**
   * vuexからカートリストの中身を取得する.
   */
  get cartList(): Array<OrderItem> {
    const list = this["$store"].getters.getCartList;
    const cartList = new Array<OrderItem>();
    for (const item of list) {
      cartList.push(item);
    }
    console.log("カートリストの中身：" + JSON.stringify(cartList));

    return cartList;
  }
}
</script>

<style></style>
