import { Book } from "@/types/Book";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    books: new Array<Book>(),
  },
  mutations: {},
  actions: {
    async getBookList(context, payload) {
      const response = await axios.get(
        "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?format=json&title=%E5%A4%AA%E9%99%BD&booksGenreId=001004008&applicationId=e06e2a5afcf14b52139c1fb6c58e9dbc"
      );
      console.dir("response:" + JSON.stringify(response));
      payload = response.data;
      context.commit("addBookList", payload);
    },
  },
  modules: {},
});
