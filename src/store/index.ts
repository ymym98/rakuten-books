import { Book } from "@/types/Book";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

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
            item.Item.authorKana,
            item.Item.itemCaption,
            item.Item.itemPrice,
            item.Item.itemUrl,
            item.Item.largeImageUrl,
            item.Item.mediumImageUrl,
            item.Item.publisherName,
            item.Item.salesDate,
            item.Item.size,
            item.Item.smallImageUrl,
            item.Item.subTitle,
            item.Item.subTitleKana,
            item.Item.title,
            item.Item.titleKana
          )
        );
      }
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
     * ログイン状況の取得.
     * @param state ステート
     * @returns ログイン状況
     */
    getLoginFlag(state) {
      return state.login;
    },
    getLoginUserName(state) {
      return state.loginName;
    },
    getLoginEmail(state) {
      return state.loginEmail;
    },
  },
  modules: {},
});
