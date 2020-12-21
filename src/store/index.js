import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    boards: []
  },
  getters: {
    getBoardById: (state) => (id) => {
      return state.boards.find(board => board.id == id);
    }
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
    }, 
    loadContainers(state, data) {
      console.log("loadContainers mutation");
      console.log(data);
      if (data.length > 0)
      {
        // data is a list of containers, get the board id from the first one
        const board = state.boards.find((board) => board.id === data[0].board.id);
        board.containers = data; 
      }
    },
    loadCards(state, data) {
      console.log("loadCards mutation");
      console.log(data);
      if (data.length > 0)
      {
        // populate the cards attribute on the specified board.container
        // data is a list of cards, get the board and container id from the first one
        const board = state.boards.find((x) => x.id === data[0].board.id);
        const container = board.containers.find((x) => x.id === data[0].container.id);
        container.cards = data;
      }
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
      // TODO: can this be handled more elegantly?
      // remove array members that can't be handled by API
      delete payload.containers;
      delete payload.members;
      delete payload.labels;
      delete payload.attachments;
      console.log("in updateBoardAsync action");
      const { data } = await axios.put(`http://127.0.0.1:8000/boards/${payload.id}/`, payload, {
        headers: {
          Authorization: 'Token 4e4898303f4ead5cb3d400d66630cfb747457938'
        },
      });
      commit('updateBoard', data);
    },
    async loadContainersAsync({ commit }, payload) {
      console.log("in loadContainersAsync action");
      const { data } = await axios.get(`http://127.0.0.1:8000/boards/${payload.board_id}/containers/`, {
        headers: {
          Authorization: 'Token 4e4898303f4ead5cb3d400d66630cfb747457938'
        }
      });
      commit("loadContainers", data);
    },
    async loadCardsAsync({ commit }, payload) {
      console.log("in loadCardsAsync action");
      const { data } = await axios.get(`http://127.0.0.1:8000/boards/${payload.board_id}/containers/${payload.container_id}/cards/`, {
        headers: {
          Authorization: 'Token 4e4898303f4ead5cb3d400d66630cfb747457938'
        }
      });
      commit("loadCards", data);
    },
  },
  modules: {
  }
})
