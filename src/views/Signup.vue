<template>
  <div>
    <div class="registration">新規会員登録</div>
    <div class="errorMsg">{{ errorSignup }}</div>
    <form>
      <div class="registrationForm">
        <div class="msg">メールアドレスを利用して会員登録をする</div>
        <div>
          <input type="text" placeholder="氏名" v-model="name" />
        </div>

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
          <div class="errorMsg">{{ errorPassword }}</div>
          <input
            type="password"
            placeholder="確認用パスワード（半角/英数）"
            v-model="passwordCheck"
          />
        </div>
        <div>
          <input type="text" placeholder="郵便番号" v-model="zipCode" />
          <button type="button" @click="getAddressByZipCode">
            住所自動検索
          </button>
        </div>
        <div>
          <span>所在地（都道府県）</span>

          <select name="pref" v-model="selected">
            <option value="" selected>都道府県</option>
            <option value="北海道">北海道</option>
            <option value="青森県">青森県</option>
            <option value="岩手県">岩手県</option>
            <option value="宮城県">宮城県</option>
            <option value="秋田県">秋田県</option>
            <option value="山形県">山形県</option>
            <option value="福島県">福島県</option>
            <option value="茨城県">茨城県</option>
            <option value="栃木県">栃木県</option>
            <option value="群馬県">群馬県</option>
            <option value="埼玉県">埼玉県</option>
            <option value="千葉県">千葉県</option>
            <option value="東京都">東京都</option>
            <option value="神奈川県">神奈川県</option>
            <option value="新潟県">新潟県</option>
            <option value="富山県">富山県</option>
            <option value="石川県">石川県</option>
            <option value="福井県">福井県</option>
            <option value="山梨県">山梨県</option>
            <option value="長野県">長野県</option>
            <option value="岐阜県">岐阜県</option>
            <option value="静岡県">静岡県</option>
            <option value="愛知県">愛知県</option>
            <option value="三重県">三重県</option>
            <option value="滋賀県">滋賀県</option>
            <option value="京都府">京都府</option>
            <option value="大阪府">大阪府</option>
            <option value="兵庫県">兵庫県</option>
            <option value="奈良県">奈良県</option>
            <option value="和歌山県">和歌山県</option>
            <option value="鳥取県">鳥取県</option>
            <option value="島根県">島根県</option>
            <option value="岡山県">岡山県</option>
            <option value="広島県">広島県</option>
            <option value="山口県">山口県</option>
            <option value="徳島県">徳島県</option>
            <option value="香川県">香川県</option>
            <option value="愛媛県">愛媛県</option>
            <option value="高知県">高知県</option>
            <option value="福岡県">福岡県</option>
            <option value="佐賀県">佐賀県</option>
            <option value="長崎県">長崎県</option>
            <option value="熊本県">熊本県</option>
            <option value="大分県">大分県</option>
            <option value="宮崎県">宮崎県</option>
            <option value="鹿児島県">鹿児島県</option>
            <option value="沖縄県">沖縄県</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="所在地（市区町村/番地）"
            v-model="municipality"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="所在地（建物名）"
            v-model="buildingName"
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
import axios from "axios";

@Component
export default class Signup extends Vue {
  // 名前
  private name = "";
  // メールアドレス
  private email = "";
  // パスワード
  private password = "";
  // 確認用パスワード
  private passwordCheck = "";
  // 登録のエラーメッセージ
  private errorSignup = "";
  // メールアドレスのエラーメッセージ
  private errorEmail = "";
  // パスワードのエラーメッセージ
  private errorPassword = "";
  // 郵便番号
  private zipCode = "";
  // 選択された都道府県
  private selected = "";
  // 市区町村
  private municipality = "";
  // 建物名
  private buildingName = "";
  // 正しいメールアドレスの形式
  private validEmail =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

  /**
   * createUserWithEmailAndPasswordに入力されたメールアドレスとパスワードを渡して会員登録処理を行う.
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

  /**
   * APIから郵便番号で住所の自動検索をする.
   */
  async getAddressByZipCode(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axiosJsonpAdapter = require("axios-jsonp");
    const response = await axios.get("https://zipcoda.net/api", {
      adapter: axiosJsonpAdapter,
      params: {
        zipcode: this.zipCode,
      },
    });
    console.dir(JSON.stringify(response));
    // 都道府県を自動で選択
    this.selected = response.data.items[0].pref;
    // 市区町村を自動で入力
    this.municipality = response.data.items[0].address;
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
  /* background-color: #f8f7ef; */
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
