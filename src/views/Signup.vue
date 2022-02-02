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
// import "firebase/compat/auth";
import { Component, Vue } from "vue-property-decorator";
// import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebase-config";

@Component
export default class Signup extends Vue {
  // メールアドレス
  private email = "";
  // パスワード
  private password = "";
  // 登録のエラーメッセージ
  private errorSignup = "";

  signup(): void {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("成功");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode" + errorCode);
        console.log("errorMessage" + errorMessage);
      });

    // async signup(): Promise<void> {
    //   try {
    //     console.log("email:" + this.email);
    //     console.log("pass:" + this.password);

    //     const auth = getAuth(firebaseApp);
    //     const user = createUserWithEmailAndPassword(
    //       auth,
    //       this.email,
    //       this.password
    //     );
    //     console.log(user);

    //     this.$router.push("/bookList");
    //   } catch (error) {
    //     console.log("エラー発生：" + error);
    //     this.errorSignup = "登録に失敗しました";
    //   }
    // }
  }
}
</script>

<style></style>
