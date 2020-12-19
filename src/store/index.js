import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    boards: []
  },
  mutations: {
    loadBoards(state, data) {
      console.log("loadBoards mutation");
      console.log(data);
      state.boards = data;
    },
    createBoard(state, data) {
      console.log("createBoard mutation");
      console.log(data);
      state.boards.unshift(data);
    },
    deleteBoard(state, id) {
      console.log("deleteBoard mutation");
      console.log(id);
      state.boards = state.boards.filter((board) => board.id !== id);
    },
    updateBoard(state, data) {
      console.log("updateBoard mutation");
      // find the index of the board to update in state by id
      const index = state.boards.findIndex((board) => board.id === data.id);
      // if it doesn't exist, something went wrong
      if (!index) return;
      // update the board at that index
      state.boards.splice(index, 1, data);
    }
  },
  actions: {
    async loadBoardsAsync({ commit }) {
      console.log("in loadBoardsAsync action");
      const { data } = await axios.get('http://127.0.0.1:8000/boards/', {
        headers: {
          Authorization: 'Token 4e4898303f4ead5cb3d400d66630cfb747457938'
        }
      });
      commit("loadBoards", data);
    },
    async deleteBoardAsync({ commit }, id) {
      console.log("in deleteBoardAsync action");
      await axios.delete(`http://127.0.0.1:8000/boards/${id}/`, {
        headers: {
          Authorization: 'Token 4e4898303f4ead5cb3d400d66630cfb747457938'
        }
      });
      commit('deleteBoard', id);
    },
    async createBoardAsync({ commit }, payload) {
      console.log("in createBoardAsync action");
      const { data } = await axios.post(`http://127.0.0.1:8000/boards/`, payload, {
          headers: {
            Authorization: 'Token 4e4898303f4ead5cb3d400d66630cfb747457938'
          }
      });
      commit('createBoard', data);
    },
    async updateBoardAsync({ commit }, payload) {
      console.log("in updateBoardAsync action");
      const { data } = await axios.put(`http://127.0.0.1:8000/boards/${payload.id}/`, {
        headers: {
          Authorization: 'Token 4e4898303f4ead5cb3d400d66630cfb747457938'
        },
        ...payload
      });
      commit('updateBoard', data);
    },
  },
  modules: {
  }
})
