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
        <div>
          <router-link to="/signup"
            >はじめてご利用になる方はこちら
          </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { db } from "@/config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

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
   * ログイン情報を送る.
   */
  async signin(): Promise<void> {
    // エラーメッセージを初期化
    this.errorEmail = "";
    this.errorPassword = "";
    try {
      // Firebase authでログインを承認する
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password);
      // ドキュメントを取得する.
      const docRef = doc(db, "users", this.email);
      const docSnap = await getDoc(docRef);
      this.$store.commit("login", this.email);
      this.$store.commit("loginUserName", docSnap.data()?.name);
      alert("ログイン成功");
      this.$router.push("/");
    } catch (error) {
      console.log(error);
      this.errorSignin = "ログインできませんでした";
    }
  }
}
</script>

<style scoped>
.registrationForm {
  margin-top: auto;
}

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
  background-color: #0085cd;
  margin-top: 12px;
}
button:hover {
  background-color: #62a6d5;
}
</style>
