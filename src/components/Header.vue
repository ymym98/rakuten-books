<template>
  <header>
    <div class="icon_btn">
      <router-link to="/">
        <img class="icon" src="/img/Yumi_Books.png" />
      </router-link>
    </div>
    <header-menu class="headerMenu"></header-menu>
    <div v-if="loginFlag === false">
      <sign-up-btn class="signUpBtn"></sign-up-btn>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderMenu from "./HeaderMenu.vue";
import SignUpBtn from "./SignUpBtn.vue";

@Component({
  components: {
    SignUpBtn,
    HeaderMenu,
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
  margin-top: 5px;
  width: 100%;
}

.signUpBtn {
  margin-left: auto;
  padding-top: 20px;
  padding-right: 20px;
}
</style>
