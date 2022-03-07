<template>
  <div>
    <div class="registration">新規会員登録</div>
    <div class="errorMsg">{{ errorSignup }}</div>
    <form>
      <div class="registrationForm">
        <div class="errorMsg">{{ errorName }}</div>
        <div class="formName">
          <div>
            <label for="lastName"> 氏名（姓）</label>
            <input
              type="text"
              placeholder="姓"
              v-model="lastName"
              class="inputName"
              id="lastName"
            />
          </div>
          <div>
            <label for="firstName"> 氏名（名）</label>
            <input
              type="text"
              placeholder="名"
              v-model="firstName"
              class="inputName"
              id="firstName"
            />
          </div>
        </div>

        <div class="email">
          <div class="errorMsg">{{ errorEmail }}</div>
          <div>
            <label for="inputEmail"> メールアドレス（半角/英数）</label>
            <input
              type="email"
              placeholder="メールアドレス（半角/英数）"
              v-model="email"
              class="inputEmail"
              id="inputEmail"
            />
          </div>
        </div>
        <div class="password">
          <div class="errorMsg">{{ errorPassword }}</div>
          <div>
            <label for="inputPassword">パスワード（半角/英数）</label>
            <input
              type="password"
              placeholder="6文字以上（半角/英数）"
              v-model="password"
              class="inputPassword"
              id="inputPassword"
            />
          </div>

          <div class="errorMsg">{{ errorCheckPassword }}</div>
          <div>
            <label for="inputCheckPassword"
              >確認用パスワード（半角/英数）</label
            >
            <input
              type="password"
              placeholder="確認用パスワード（半角/英数）"
              v-model="checkPassword"
              class="inputPassword"
              id="inputCheckPassword"
            />
          </div>
        </div>
        <div>
          <div class="errorMsg">
            {{ errorZipCode }}
          </div>
          <div>
            <div><label for="inputZipCode">郵便番号</label></div>
            <input
              type="text"
              placeholder="郵便番号"
              v-model="zipCode"
              class="inputZipCode"
              id="inputZipCode"
            />
            <button
              type="button"
              @click="getAddressByZipCode"
              class="searchZipCode"
            >
              検索
            </button>
          </div>
        </div>

        <div>
          <div class="errorMsg">{{ errorSelected }}</div>

          <div><label>所在地（都道府県）</label></div>
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
          <div class="errorMsg">{{ errorMunicipality }}</div>

          <label for="inputMunicipality">所在地（市区町村/番地）</label>
          <input
            type="text"
            placeholder="所在地（市区町村/番地）"
            v-model="municipality"
            class="inputMunicipality"
            id="inputMunicipality"
          />
        </div>
        <div>
          <label for="inputBuildingName">所在地（建物名）</label>
          <input
            type="text"
            placeholder="所在地（建物名）"
            v-model="buildingName"
            class="inputBuildingName"
            id="inputBuildingName"
          />
        </div>
        <div class="btnAdjust">
          <button type="button" @click="signup" class="signupBtn">
            <span>登録</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../config/firebase-config";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";

@Component
export default class Signup extends Vue {
  // 姓
  private lastName = "";
  // 名
  private firstName = "";
  // メールアドレス
  private email = "";
  // パスワード
  private password = "";
  // 確認用パスワード
  private checkPassword = "";
  // 郵便番号
  private zipCode = "";
  // 選択された都道府県
  private selected = "";
  // 市区町村
  private municipality = "";
  // 建物名
  private buildingName = "";
  // 登録のエラーメッセージ
  private errorSignup = "";
  // 氏名のエラーメッセージ
  private errorName = "";
  // メールアドレスのエラーメッセージ
  private errorEmail = "";
  // パスワードのエラーメッセージ
  private errorPassword = "";
  // 確認用パスワードのエラーメッセージ
  private errorCheckPassword = "";
  // 郵便番号のエラーメッセージ
  private errorZipCode = "";
  // 都道府県選択のエラーメッセージ
  private errorSelected = "";
  // 市区町村のエラーメッセージ
  private errorMunicipality = "";
  // 正しいメールアドレスの形式
  private validEmail =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

  /**
   * 会員登録処理を行う.
   */
  async signup(): Promise<void> {
    // エラーメッセージの初期化
    this.errorSignup = "";
    this.errorName = "";
    this.errorEmail = "";
    this.errorPassword = "";
    this.errorCheckPassword = "";
    this.errorZipCode = "";
    this.errorSelected = "";
    this.errorMunicipality = "";

    // エラーがあったら処理を止める
    if (this.hasErrors()) {
      return;
    }
    try {
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, this.email, this.password);
      // ユーザー情報をfirestoreに送る
      await setDoc(doc(db, "users", this.email), {
        name: this.lastName + this.firstName,
        email: this.email,
        password: this.password,
        zipCode: this.zipCode,
        address: this.selected + this.municipality + this.buildingName,
      });

      alert("会員登録が完了しました。\nログイン画面からログインしてください。");
      this.$router.push("/signin");
    } catch (error) {
      this.errorSignup = "会員登録に失敗しました";
      console.log("エラー発生：" + error);
    }
  }

  /**
   * 入力値のエラーチェックをする.
   */
  hasErrors(): boolean {
    // false←エラーなし, true←エラーあり
    let hasError = false;

    // 氏名のエラーチェック
    if (this.lastName === "" || this.firstName === "") {
      this.errorName = "姓または名を入力してください";
      hasError = true;
    }
    // メールアドレスのエラーチェック
    if (this.email === "") {
      this.errorEmail = "メールアドレスを入力してください";
      hasError = true;
    } else if (!this.email.includes("@")) {
      this.errorEmail =
        "メールアドレスの形式で入力してください（例）email@book.jp";
      hasError = true;
    }
    // パスワードのエラーチェック
    if (this.password === "") {
      this.errorPassword = "パスワードを入力してください";
      hasError = true;
    } else if (this.password.length < 6) {
      this.errorPassword = "パスワードは6文字以上で入力してください";
      hasError = true;
    }
    // 確認用パスワードのエラーチェック
    if (this.checkPassword === "") {
      this.errorCheckPassword = "確認用パスワードを入力してください";
      hasError = true;
    } else if (this.checkPassword !== this.password) {
      this.errorCheckPassword = "パスワードが一致しません";
      hasError = true;
    }
    // 郵便番号のエラーチェック
    if (this.zipCode === "") {
      this.errorZipCode = "郵便番号を入力してください";
      hasError = true;
    } else if (!this.zipCode.match(/^[0-9]{3}-?[0-9]{4}$/)) {
      this.errorZipCode = "郵便番号が正しくありません";
      hasError = true;
    }
    // 都道府県選択のエラーチェック
    if (this.selected === "") {
      this.errorSelected = "都道府県を選択してください";
      hasError = true;
    }
    // 市区町村のエラーチェック
    if (this.municipality === "") {
      this.errorMunicipality = "市区町村/番地を入力してください";
      hasError = true;
    }
    return hasError;
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
  width: 300px;
  margin-right: auto;
  margin-left: auto;
}

.errorMsg {
  color: red;
}

.registration {
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}

form {
  background-color: #f8f7ef;
  padding: 20px 40px 30px 40px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
}
input {
  height: 38px;
  margin-bottom: 15px;
}
.formName {
  display: flex;
}
.inputName {
  width: 150px;
}
#lastName {
  margin-right: 10px;
}
.inputEmail {
  width: 296px;
}
.inputPassword {
  width: 200px;
}
.inputZipCode {
  width: 80px;
}
.searchZipCode {
  border-radius: 4px;
  border: 1px solid gray;
  height: 30px;
  padding: 5px;
  font-size: 13px;
  margin-left: 5px;
  background-color: lightgray;
}
.searchZipCode:hover {
  background-color: rgb(224, 224, 224);
}

select {
  width: 100px;
  height: 25px;
  font-size: 17px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.inputMunicipality {
  /* margin-top: 15px; */
  width: 300px;
}
.inputBuildingName {
  width: 300px;
}

.btnAdjust {
  text-align: center;
}
.signupBtn {
  height: 38px;
  border: unset;
  color: white;
  border-radius: 4px;
  width: 100px;
  background-color: #f25371;
  margin-top: 12px;
}

.signupBtn:hover {
  background-color: #f58394;
}
</style>
