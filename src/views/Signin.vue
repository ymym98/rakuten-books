<template>
  <div>
    <div class="registration">ログイン</div>
    <div class="errorMsg">{{ errorSignin }}</div>
    <form>
      <div class="registrationForm">
        <div class="msg">会員IDとパスワードを入力してください</div>
        <div class="email">
          <div class="errorMsg">{{ errorEmail }}</div>
          <input
            type="email"
            placeholder="会員ID（メールアドレス）"
            v-model="email"
          />
        </div>
        <div class="password">
          <div class="errorMsg">{{ errorPassword }}</div>
          <input
            type="password"
            placeholder="パスワード（半角/英数）"
            v-model="password"
          />
        </div>
        <button type="button" @click="signin"><span>ログイン</span></button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/config/firebase-config";

@Component
export default class Signin extends Vue {
  // メールアドレス
  private email = "";

  // パスワード
  private password = "";

  // ログインに失敗した際のエラーメッセージ
  private errorSignin = "";

  // メールアドレスのエラーメッセージ
  private errorEmail = "";

  // パスワードのエラーメッセージ
  private errorPassword = "";

  /**
   * signInWithEmailAndPasswordに入力されたメールアドレスとパスワードを渡してログインの処理を行う.
   */
  signin(): void {
    this.errorEmail = "";
    this.errorPassword = "";
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("ユーザー情報：" + JSON.stringify(user));
        this.$router.push("/booklist");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // 入力欄が空の状態でログインボタンを押したらメールアドレスとパスワードのエラーメッセージのみ表示させる
        if (this.email === "" || this.password === "") {
          this.errorSignin = "";
        } else {
          this.errorSignin =
            "入力した会員ID(メールアドレス)またはパスワードが間違っています。";
        }
        console.log("errorCode" + errorCode);
        console.log("errorMessage" + errorMessage);
      });

    // メールアドレスのエラーチェック
    if (this.email === "") {
      this.errorEmail = "メールアドレスを入力してください";
    }
    // パスワードのエラーチェック
    if (this.password === "") {
      this.errorPassword = "パスワードを入力してください";
    }
  }
}
</script>

<style scoped>
/* .registrationForm {
  margin-top: auto;
} */

.errorMsg {
  color: red;
  text-align: center;
}

.registration {
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}
.msg {
  padding-top: 10px;
  padding-bottom: 20px;
}
form {
  background-color: #f8f7ef;
  width: 569px;
  height: 268.984px;
  padding: 30px 40px 30px 40px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
input {
  width: 400px;
  height: 38px;
  margin-bottom: 15px;
}
button {
  height: 38px;
  border: unset;
  color: white;
  border-radius: 4px;
  width: 100px;
  background-color: #f25371;
  margin-top: 12px;
}
button:hover {
  background-color: #f58394;
}
</style>
