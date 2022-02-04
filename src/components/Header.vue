<template>
  <header>
    <div class="icon_btn">
      <router-link to="/bookList">
        <img class="icon" src="/img/yumi_book.png" />
      </router-link>
    </div>
    <header-menu class="headerMenu"></header-menu>
    <sign-up-btn class="signUpBtn"></sign-up-btn>
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
export default class Header extends Vue {}
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
