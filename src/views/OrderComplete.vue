<template>
  <div>
    <h2>ご注文完了</h2>
    <div class="completeMsg">ご注文ありがとうございました</div>
    <div class="btn">
      <router-link to="/">
        <button type="button">商品一覧ページにもどる</button>
      </router-link>
    </div>
    <div class="btn">
      <router-link to="/orderHistory">
        <button type="button">注文履歴を確認する</button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class OrderComplete extends Vue {}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 40px;
}
.completeMsg {
  font-size: 40px;
  font-weight: bold;
  /* color: #583822; */
  text-align: center;
}
.btn {
  text-align: center;
}
button {
  width: 200px;
  height: 45px;
  font-size: 16px;
  color: white;
  background-color: #64bb30;
  border-radius: 4px;
  padding: 10px;
  border: unset;
  margin-top: 30px;
}
button:hover {
  background-color: #94ce70;
}
</style>
