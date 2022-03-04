<template>
  <div>
    <div class="bread">
      <ul>
        <li>カート</li>
        <li>注文内容確認</li>
        <li id="breadOrderComplete">注文完了</li>
      </ul>
    </div>
    <h2>【 ご注文完了 】</h2>
    <div class="completeMsg">ご注文ありがとうございました</div>
    <div class="msg"><p>商品が届くまでもう少々お待ちください</p></div>
    <div class="btn">
      <router-link to="/">
        <button type="button">商品一覧ページにもどる</button>
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
#breadOrderComplete {
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

h2 {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 30px;
}
.completeMsg {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}
.btn {
  text-align: center;
}
.msg {
  text-align: center;
  margin: 20px 0 0 0;
  font-size: 20px;
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
