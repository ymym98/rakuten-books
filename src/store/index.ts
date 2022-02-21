import { Book } from "@/types/Book";
import { OrderItem } from "@/types/OrderItem";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 楽天ブックス書籍検索一覧を格納する配列
    books: new Array<Book>(),
    // ログイン状態(true←ログイン, false←ログインしていない)
    login: false,
    // ログインしているユーザーのメールアドレス
    loginEmail: "",
    // ログインしているユーザーの名前
    loginName: "",
    // カートに入っている商品情報
    cartList: new Array<OrderItem>(),
  },
  mutations: {
    /**
     * stateのbooksにAPIで取得した情報を格納する.
     * @param state ステート
     * @param payload 楽天ブックス書籍検索APIのデータ一覧
     */
    addBookList(state, payload) {
      // 初期化
      state.books = new Array<Book>();
      for (const item of payload.Items) {
        state.books.push(
          new Book(
            item.Item.isbn,
            item.Item.author,
            item.Item.itemCaption,
            item.Item.itemPrice,
            item.Item.itemUrl,
            item.Item.largeImageUrl,
            item.Item.mediumImageUrl,
            item.Item.publisherName,
            item.Item.salesDate,
            item.Item.smallImageUrl,
            item.Item.subTitle,
            item.Item.title
          )
        );
      }
    },
    /**
     * カートリストに商品を追加する
     * @param state ステート
     * @param payload カートに入れた商品情報
     */
    addCartList(state, payload) {
      state.cartList.push(payload);
    },

    /**
     *
     * @param state ステート
     * @param index 配列のインデックス番号
     */
    deleteCartListItem(state, index) {
      state.cartList.splice(index, 1);
    },

    /**
     * ログインする.
     * @param state ステート
     * @param payload ログイン中のユーザーのメールアドレス
     */
    login(state, payload) {
      state.login = true;
      state.loginEmail = payload;
    },
    /**
     * ログアウトする.
     * @param state ステート
     */
    logout(state) {
      state.login = false;
      state.loginEmail = "";
    },

    /**
     * ログインユーザーの名前を渡す.
     * @param state ステート
     * @param payload ログインユーザーの名前
     */
    loginUserName(state, payload) {
      state.loginName = payload;
    },
  },
  actions: {
    /**
     * APIから情報を取得し、mutationを呼び出す.
     * @param context コンテキスト
     * @param payload 楽天ブックス書籍検索APIのデータ一覧
     */
    async getBookList(context, payload) {
      const response = await axios.get(
        "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&keyword=%E6%9C%AC&booksGenreId=000&applicationId=1028649662998988122"
      );
      payload = response.data;
      context.commit("addBookList", payload);
    },
  },
  getters: {
    /**
     * stateのbooks情報を返す.
     * @param state ステート
     * @returns 全books情報
     */
    getBookList(state) {
      return state.books;
    },

    /**
     * stateのcartList情報を返す.
     * @param state ステート
     * @returns カートリスト情報
     */
    getCartList(state) {
      const orderItemArray = new Array<OrderItem>();
      for (const item of state.cartList) {
        orderItemArray.push(
          new OrderItem(
            item._isbn,
            item._orderId,
            item._quantity,
            new Book(
              item.isbn,
              item._book._author,
              item._book._itemCaption,
              item._book._itemPrice,
              item._book._itemUrl,
              item._book._largeImageUrl,
              item._book._mediumImageUrl,
              item._book._publisherName,
              item._book._salesDate,
              item._book._smallImageUrl,
              item._book._subTitle,
              item._book._title
            )
          )
        );
      }
      return orderItemArray;
    },

    /**
     * ログイン状況の取得.
     * @param state ステート
     * @returns ログイン状況
     */
    getLoginFlag(state) {
      return state.login;
    },
    /**
     * ログインしたユーザーの名前の取得.
     * @param state ステート
     * @returns ログインユーザーの名前
     */
    getLoginUserName(state) {
      return state.loginName;
    },
    /**
     * ログインしたユーザーのメールアドレスの取得.
     * @param state ステート
     * @returns ログインユーザーのメールアドレス
     */
    getLoginEmail(state) {
      return state.loginEmail;
    },
  },
  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vuex",
      // ストレージの種類を規定
      storage: window.sessionStorage,
      // ログイン状況、ログインユーザーのメールアドレス、ログインユーザーの名前、カートリストを保持
      paths: ["login", "loginEmail", "loginName", "cartList"],
    }),
  ],
  modules: {},
});
