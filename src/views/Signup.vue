<template>
  <div>
    <div class="registration">新規会員登録</div>
    <div class="errorMsg">{{ errorSignup }}</div>
    <form>
      <div class="registrationForm">
        <div class="msg">メールアドレスを利用して会員登録をする</div>
        <div class="email">
          <div class="errorMsg">{{ errorEmail }}</div>
          <input
            type="email"
            placeholder="メールアドレス（半角/英数）"
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
        <button type="button" @click="signup"><span>登録</span></button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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

  // メールアドレスのエラーメッセージ
  private errorEmail = "";

  // パスワードのエラーメッセージ
  private errorPassword = "";

  // 正しいメールアドレスの形式
  private validEmail =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

  /**
   * 入力されたメールアドレスとパスワードをfirebaseに渡して処理を行う.
   */
  signup(): void {
    // エラーメッセージの初期化
    this.errorEmail = "";
    this.errorPassword = "";

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("成功");
      })
      .catch((error) => {
        this.errorSignup = "会員登録に失敗しました";
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode" + errorCode);
        console.log("errorMessage" + errorMessage);
      });

    // メールアドレスのエラーチェック
    if (this.email === "") {
      this.errorEmail = "メールアドレスを入力してください";
    } else if (this.validEmail.test(this.email)) {
      // パターンにマッチした場合
      this.errorEmail = "";
    } else {
      // パターンにマッチしない場合
      this.errorEmail =
        "メールアドレスの形式で入力してください（例）email@book.jp";
    }

    // パスワードのエラーチェック
    if (this.password === "") {
      this.errorPassword = "パスワードを入力してください";
    } else if (this.password.length < 6) {
      this.errorPassword = "パスワードは6文字以上で入力してください";
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
  background-color: #f25371;
  margin-top: 12px;
}
button:hover {
  background-color: #f58394;
}
</style>
