<template>
  <div>
    <div class="registration">注文内容確認</div>
    <ul class="orderConfirm">
      <li class="item">商品</li>
      <li v-for="item of this.cartList" v-bind:key="item.book.isbn">
        <img v-bind:src="item.book.smallImageUrl" />
        <div class="titleAndPrice">
          <div>{{ item.book.title }}</div>
          <div>
            {{
              item.book.itemPrice.toLocaleString() +
              "円 &nbsp;" +
              "&nbsp;数量：" +
              item.quantity
            }}
          </div>
        </div>
      </li>
      <div class="totalPrice">
        合計
        <span class="colorAdjust">{{ getTotalPrice.toLocaleString() }}</span> 円
      </div>
    </ul>

    <ul class="orderConfirm">
      <li class="item">お届け先情報</li>
      <li>
        {{ name + "&nbsp;様" }}
      </li>
      <li>
        {{ "〒" + zipCode }}
      </li>
      <li>{{ address }}{{ buildingName }}</li>
      <li>
        {{ email }}
      </li>
    </ul>

    <ul class="orderConfirm">
      <li class="item">
        お支払い方法選択<br />
        <span class="colorAdjust"> &nbsp;&nbsp;{{ errorPaymentMethod }}</span>
      </li>
      <li>
        <div>
          <input
            type="radio"
            name="paymentMethod"
            value="0"
            id="card"
            v-model="paymentMethod"
          />
          <label for="card">&nbsp;クレジットカード</label>
        </div>
      </li>

      <!-- クレジットカードを選択したら表示する -->
      <li v-if="paymentMethod === '0'">
        <div>
          <div>
            カード番号&nbsp;&nbsp;&nbsp;&nbsp;<input
              type="text"
              class="cardInfo"
              v-model="cardNumber"
            />
          </div>
          <div>
            カード名義人&nbsp;<input
              type="text"
              class="cardInfo"
              v-model="cardName"
            />
          </div>
          <div>
            有効期限
            <!-- 月の選択 -->
            <select class="cardInfo" v-model="cardMonth">
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
              <option value="5">05</option>
              <option value="6">06</option>
              <option value="7">07</option>
              <option value="8">08</option>
              <option value="9">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <!-- 年の選択 -->
            <select class="cardInfo" v-model="cardYear">
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </div>
        </div>
      </li>

      <li>
        <div>
          <input
            type="radio"
            name="paymentMethod"
            value="1"
            id="cash"
            v-model="paymentMethod"
          />
          <label for="cash">&nbsp;代金引換</label>
        </div>
      </li>
    </ul>
    <div class="orderDone">
      <button type="button" class="orderCompleted" @click="orderConfirm">
        ご注文を確定
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { db } from "../config/firebase-config";
import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { OrderItem } from "@/types/OrderItem";
import firebase from "firebase/compat";
const firestoreDb = firebase.firestore();

@Component
export default class OrderConfirm extends Vue {
  // カートリスト
  private cartList = new Array<OrderItem>();
  // 名前
  private name = "";
  // メールアドレス
  private email = "";
  // 郵便番号
  private zipCode = "";
  // 市区町村
  private address = "";
  // 建物名
  private buildingName = "";
  // 支払い方法(0:クレジットカード、1:代金引換)
  private paymentMethod = -1;
  // クレジットカード番号
  private cardNumber = "";
  // クレジットカード名義人
  private cardName = "";
  // クレジットカードの有効期限(月)
  private cardMonth = "";
  // クレジットカードの有効期限(年)
  private cardYear = "";
  // 支払い方法を選択していない際のエラーメッセージ
  private errorPaymentMethod = "";

  created(): void {
    this.cartList = this.$store.getters.getCartList;
    // console.log("カートリスト:" + JSON.stringify(this.cartList));
    this.autoInput();
  }

  /**
   * 注文を確定する.
   */
  async orderConfirm(): Promise<void> {
    let customerEmail = this.$store.getters.getLoginEmail;

    // orderIdを付与する
    let orderId = 0;

    // usersコレクションの中のordersコレクションのを取得し、sizeプロパティで要素の数を取得
    await firestoreDb
      .collection("users")
      .doc(customerEmail)
      .collection("orders")
      .get()
      .then((snap) => {
        orderId = snap.size;
      });

    // 購入者情報を送信する
    if (Number(this.paymentMethod) === 0) {
      // クレジットカードで支払いの場合
      await setDoc(doc(db, "users", customerEmail, "orders", String(orderId)), {
        name: this.name,
        email: this.email,
        zipCode: this.zipCode,
        address: this.address + this.buildingName,
        paymentMethod: this.paymentMethod,
        totalPrice: this.getTotalPrice,
        orderDate: String(new Date()),
        cardNumber: this.cardNumber,
        cardName: this.cardName,
        cardExpiration: this.cardMonth + "/" + this.cardYear,
      });
      console.log("クレジットカードで購入しました");
    } else if (Number(this.paymentMethod) === 1) {
      // 代金引換で支払いの場合
      await setDoc(doc(db, "users", customerEmail, "orders", String(orderId)), {
        name: this.name,
        email: this.email,
        zipCode: this.zipCode,
        address: this.address + this.buildingName,
        paymentMethod: this.paymentMethod,
        totalPrice: this.getTotalPrice,
        orderDate: String(new Date()),
      });
      console.log("代金引換で購入しました");
    } else {
      this.errorPaymentMethod = "※お支払い方法を選択してください";
      return;
    }

    // cartListの中の商品情報を取得する
    for (let i = 0; i < this.cartList.length; i++) {
      const isbn = this.cartList[i].isbn;
      const quantity = this.cartList[i].quantity;
      const title = this.cartList[i].book.title;
      const itemImage = this.cartList[i].book.mediumImageUrl;
      const price = this.cartList[i].book.itemPrice;
      const author = this.cartList[i].book.author;

      // orderItemIdを付与する
      let orderItemId = 0;

      // usersコレクションの中のordersコレクションの中のorderItemを取得し、sizeプロパティで要素の数を取得
      await firestoreDb
        .collection("users")
        .doc(customerEmail)
        .collection("orders")
        .doc(String(orderId))
        .collection("orderItem")
        .get()
        .then((snap) => {
          orderItemId = snap.size;
        });

      // ordersコレクションの中にorderItemコレクションを作成し、購入した商品情報を記録する
      await setDoc(
        doc(
          db,
          "users",
          customerEmail,
          "orders",
          String(orderId),
          "orderItem",
          String(orderItemId)
        ),
        {
          orderItemId: orderItemId,
          isbn: isbn,
          title: title,
          itemImage: itemImage,
          price: price,
          author: author,
          quantity: quantity,
        }
      );
    }
    this.$store.commit("resetCartList");
    console.log("カートリスト:" + JSON.stringify(this.cartList));
  }

  /**
   * 会員登録する際に登録したお届け先情報.
   */
  async autoInput(): Promise<void> {
    this.email = this.$store.getters.getLoginEmail;

    const docRef = doc(db, "users", this.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.name = docSnap.data().name;
      this.zipCode = docSnap.data().zipCode;
      this.address = docSnap.data().address;
      this.buildingName = docSnap.data().buildingName;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  /**
   * 合計金額を返す.
   */
  get getTotalPrice(): number {
    let totalPrice = 0;
    for (let cartItem of this["$store"].getters.getCartList) {
      totalPrice += cartItem.book.itemPrice * cartItem.quantity;
    }
    return totalPrice;
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
    // 都道府県+市区町村を自動で入力
    this.address = response.data.items[0].pref + response.data.items[0].address;
  }
}
</script>

<style scoped>
.registration {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
}
.item {
  font-size: 20px;
  font-weight: 500;
  border-bottom: solid gainsboro;
}

.orderConfirm {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
}
li {
  list-style: none;
  display: flex;
  padding-top: 10px;
}
.titleAndPrice {
  margin-left: 10px;
}
.totalPrice {
  text-align: right;
  font-size: 20px;
}
.colorAdjust {
  color: #f11e46;
}
.cardInfo {
  height: 25px;
  margin-top: 5px;
  margin-left: 5px;
}

.orderCompleted {
  width: 200px;
  height: 45px;
  font-size: 16px;
  color: white;
  background-color: #64bb30;
  border-radius: 4px;
  padding: 10px;
  border: unset;
  margin-bottom: 15px;
}
.orderCompleted:hover {
  background-color: #94ce70;
}
.orderDone {
  text-align: center;
}
</style>
