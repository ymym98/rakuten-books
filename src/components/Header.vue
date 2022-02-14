<template>
  <header>
    <div class="icon_btn">
      <router-link to="/">
        <img class="icon" src="/img/yumi_book.png" />
      </router-link>
    </div>
    <header-menu class="headerMenu"></header-menu>
    <div v-if="loginFlag"><after-signin></after-signin></div>
    <div v-else><sign-up-btn class="signUpBtn"></sign-up-btn></div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AfterSignin from "./AfterSignin.vue";
import HeaderMenu from "./HeaderMenu.vue";
import SignUpBtn from "./SignUpBtn.vue";

@Component({
  components: {
    SignUpBtn,
    HeaderMenu,
    AfterSignin,
  },
})
export default class Header extends Vue {
  /**
   * ログイン状態の取得をする.
   */
  get loginFlag(): boolean {
    return this.$store.getters.getLoginFlag;
  }
}
</script>

<style scoped>
@import "../../public/css/header.css";

.headerMenu {
  padding-top: 30px;
  width: 100%;
}

.signUpBtn {
  margin-left: auto;
  padding-top: 40px;
  padding-right: 20px;
}
</style>
