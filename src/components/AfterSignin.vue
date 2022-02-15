<template>
  <div>
    <ul>
      <li>
        <div class="name">{{ getLoginUserName + "さん" }}</div>
        <router-link to="/">
          <img class="icon" src="/img/user.png" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AfterSignin extends Vue {
  /**
   * ログインしたユーザーの名前を取得する.
   */
  get getLoginUserName(): string {
    console.log("ユーザー名：" + this.$store.getters.getLoginUserName);
    return this.$store.getters.getLoginUserName;
  }
}
</script>

<style scoped>
ul {
  display: flex;
  margin-top: 20px;
  margin-right: 10px;
}
li {
  list-style: none;
  margin: 2px;
  box-sizing: border-box;
  text-align: center;
}
button {
  height: 38px;
  border: unset;
  color: white;
  border-radius: 4px;
  padding: 10px;
}

.logout {
  background-color: #0085cd;
  width: 90px;
}
.logout:hover {
  background-color: #62a6d5;
}

.icon {
  width: 50px;
  height: 50px;
}
.name {
  width: 150px;
  padding-bottom: 5px;
}
</style>
