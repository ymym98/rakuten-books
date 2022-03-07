<template>
  <div>
    <ul class="nav">
      <li class="nav_item">
        <router-link to="/" class="nav_item_style">
          <img class="icon" src="/img/list.png" />
          <div>商品一覧</div>
        </router-link>
      </li>

      <li class="nav_item">
        <router-link to="/cartList" class="nav_item_style">
          <img class="shoppingCartIcon icon" src="/img/shopping-cart.png" />
          <div>買い物かご</div>
        </router-link>
      </li>

      <li class="nav_item" @click="logout" v-if="loginFlag">
        <router-link to="/" class="nav_item_style">
          <img src="/img/logout.png" class="icon" />
          <div>ログアウト</div>
        </router-link>
      </li>

      <li class="nav_item" v-if="loginFlag">
        <div class="nav_item_style">
          <img class="icon" src="/img/user.png" />
          <div class="name">{{ getLoginUserName + "さん" }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HeaderMenu extends Vue {
  // ログイン状況の取得
  private loginUser = this.loginFlag;

  /**
   * ログアウトする.
   */
  logout(): void {
    if (this.loginUser === true) {
      this.$store.commit("logout");
      this.$router.push("/signin");
    }
  }
  /**
   * ログイン状態の取得をする.
   */
  get loginFlag(): boolean {
    return this.$store.getters.getLoginFlag;
  }
  /**
   * ログインしたユーザーの名前を取得する.
   */
  get getLoginUserName(): string {
    return this.$store.getters.getLoginUserName;
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  list-style: none;
  align-items: flex-end;
  justify-content: flex-end;
}
.nav_item {
  margin: 10px 0px 0 0;
  text-align: center;
  font-size: 13px;
  width: 100px;
}

.nav_item_style {
  text-decoration: none;
  color: black;
  text-align: center;
}

.icon {
  width: 30px;
  height: 30px;
}

.shoppingCartIcon {
  margin-right: 8px;
}
</style>
