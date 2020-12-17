import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    boards: []
  },
  mutations: {
    setBoards(state, data) {
      state.boards = data;
      console.log(data);
    }
  },
  actions: {
    async loadBoardsAsync(context) {
      const { data } = await axios.get('http://127.0.0.1:8000/boards/', {
        headers: {
          Authorization: 'Token 4e4898303f4ead5cb3d400d66630cfb747457938'
        }
      });
      context.commit("setBoards", data);
    }
  },
  modules: {
  }
})
