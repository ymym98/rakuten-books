<template>
  <div>
    <ul class="nav">
      <li class="nav_item"><a href="#"> Home</a></li>
      <li class="nav_item"><a href="#">Service</a></li>
      <li class="nav_item"><a href="#">About</a></li>
      <li class="nav_item" @click="logout"><a>Logout</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HeaderMenu extends Vue {
  // ログイン状況の取得
  private loginUser = this.$store.getters.getLoginFlag;

  /**
   * ログアウトする.
   */
  logout(): void {
    if (this.loginUser === true) {
      this.$store.commit("logout");
      this.$router.push("/signin");
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  list-style: none;
  align-items: flex-end;
}
.nav_item {
  width: calc(100% / 4);
}

.nav_item > a {
  display: block;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  color: black;
  font-size: 20px;
}
</style>
