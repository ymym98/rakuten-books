<template>
  <div>
    <form>
      新規会員登録
      {{ errorSignup }}
      <div class="email">
        <input type="email" placeholder="メールアドレス" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <button type="button" @click="signup">登録</button>
    </form>
  </div>
</template>

<script lang="ts">
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { firebaseApp, firebaseConfig } from "@/config/firebase-config";
import { Component, Vue } from "vue-property-decorator";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

@Component
export default class Signup extends Vue {
  // メールアドレス
  private email = "";
  // パスワード
  private password = "";
  // 登録のエラーメッセージ
  private errorSignup = "";

  async signup(): Promise<void> {
    try {
      const auth = getAuth(firebaseApp);
      createUserWithEmailAndPassword(auth, this.email, this.password);
      alert("成功！");

      this.$router.push("/bookList");
    } catch (error) {
      console.log("エラー発生：" + error);
      this.errorSignup = "登録に失敗しました";
    }
  }
}
</script>

<style></style>
