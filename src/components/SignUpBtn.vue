<template>
  <div>
    <ul>
      <li>
        <router-link to="/signup"
          ><button type="button" class="singUp">
            新規会員登録
          </button></router-link
        >
      </li>
      <li><button type="button" class="signIn">ログイン</button></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SignUpBtn extends Vue {}
</script>

<style scoped>
ul {
  display: flex;
}
li {
  list-style: none;
  margin: 2px;
  box-sizing: border-box;
}
button {
  height: 38px;
  border: unset;
  color: white;
  border-radius: 4px;
  padding: 10px;
}
.singUp {
  width: 124px;
  background-color: #f25371;
}
.singUp:hover {
  background-color: #f58394;
}
.signIn {
  background-color: #0085cd;
  width: 84px;
}
.signIn:hover {
  background-color: #62a6d5;
}
</style>
