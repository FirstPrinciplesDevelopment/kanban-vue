import { createStore } from 'vuex';
import axios from 'axios';

// define VUE_APP_API_BASE in .env under project root like
// VUE_APP_API_BASE=http://example.com:8000
const apiBase = process.env.VUE_APP_API_BASE;

export default createStore({
  // enable strict mode for development only (impacts performance)
  strict: true,
  state: {
    authToken: '',
    isAuthenticated: false,
    boards: {
      /*
      id: {
        url,
        id,
        name,
        slug,
        position,
        containers: [...ids],
        members: [...ids],
        labels: [...ids],
        attachments,
        created_by,
        created_time,
        changed_by,
        changed_time,
        archived,
        archived_by,
        archived_time
      }
      */
    },
    boardList: [
      // ...ids
    ],
    containers: {
      /*
      id: {
        url,
        id,
        board,  // id
        name,
        slug,
        position,
        cards: [...ids],
        labels: [...ids],
        tags: [...ids],
        created_by,
        created_time,
        changed_by,
        changed_time,
        archived,
        archived_by,
        archived_time
      }
      */
    },
    containerList: [
      // ...ids
    ],
    cards: {
      /*
      id: {
        url,
        id,
        board,  // id
        container,  // id
        name,
        slug,
        content,
        start_time,
        end_time,
        complexity,
        hours,
        position,
        assigned_users: [...ids],
        labels: [...ids],
        tags: [...ids],
        attachments: [...ids],
        created_by,
        created_time,
        changed_by,
        changed_time,
        archived,
        archived_by,
        archived_time
      }
      */
    },
    cardList: [
      // ...ids
    ],
  },
  getters: {
    getBoardById: (state) => (id) => {
      return state.boards[id];
    },
    getContainersByBoardId: (state) => (board_id) => {
      var result = [];
      for (const id of state.containerList) {
        if (state.containers[id].board.id == board_id) {
          result.push(state.containers[id]);
        }
      }
      return result;
    },
    getContainerById: (state) => (id) => {
      return state.containers[id];
    },
    getCardsByContainerId: (state) => (container_id) => {
      return state.cards.filter((x) => (x.container.id = container_id));
    },
    getCardById: (state) => (id) => {
      return state.cards[id];
    },
  },
  mutations: {
    // mutations change vuex state, they DO NOT call APIs
    authenticate(state, data) {
      console.log('authenticate mutation');
      console.log(data);
      if (data['token']) {
        state.authToken = data['token'];
        state.isAuthenticated = true;
        console.log('auth succeeded');
      } else {
        console.log('auth failed');
      }
    },
    loadData(state, data) {
      console.log('loadData mutation');
      console.log('data from API:');
      console.log(data);
      // set boards
      for (const board of data['boards']) {
        state.boards[board.id] = board;
        state.boardList.push(board.id);
      }
      // set containers
      for (const container of data['containers']) {
        state.containers[container.id] = container;
        state.containerList.push(container.id);
      }
      // set cards
      for (const card of data['cards']) {
        state.cards[card.id] = card;
        state.cardList.push(card.id);
      }
      // // set labels
      // for (const label of data["labels"]) {
      //   state.labels[label.id] = label;
      //   state.labelList.push(label.id);
      // }
      // // set tags
      // for (const tag in data["tags"]) {
      //   state.tag[tag.id] = tag;
      //   state.tagList.push(tag.id);
      // }
      // // set members
      // for (const member in data["members"]) {
      //   state.members[member.id] = member;
      //   state.memberList.push(member.id);
      // }
      console.log('Data in state:');
      console.log(state);
    },
    loadBoards(state, data) {
      console.log('loadBoards mutation');
      console.log(data);
      // maintain boards in state like Array [ board_id : {board_object}, ...]
      for (const board of data) {
        state.boards[board.id] = board;
        state.boardList.push(board.id);
      }
    },
    createBoard(state, data) {
      console.log('createBoard mutation');
      console.log(data);
      // add a board to state like boards[board_id] : {board_object}
      state.boards[data.id] = data;
      state.boardList.push(data.id);
    },
    deleteBoard(state, id) {
      console.log('deleteBoard mutation');
      console.log(id);
      // delete a board, which is a key: {value} on the boards object
      delete state.boards[id];
      const index = state.boardList.indexOf(id);
      state.boardList.splice(index, 1);
    },
    updateBoard(state, data) {
      // identical to createBoard, but may be extended in the future
      console.log('updateBoard mutation');
      console.log(data);
      // update a board in state like boards[board_id] : {board_object}
      state.boards[data.id] = data;
      // no need to update state.boardList - the id cannot change
    },
    loadContainers(state, data) {
      console.log('loadContainers mutation');
      console.log(data);
      // maintain containers in state like Array [ container_id : {container_object}, ...]
      for (const container of data) {
        state.containers[container.id] = container;
        state.containerList.push(container.id);
      }
    },
    createContainer(state, data) {
      console.log('createContainer mutation');
      console.log(data);
      // add a container to state like containers[container_id] : {container_object}
      state.containers[data.id] = data;
      state.containerList.push(data.id);
    },
    deleteContainer(state, id) {
      console.log('deleteContainer mutation');
      console.log(id);
      // delete a container, which is a key: {value} on the containers object
      delete state.containers[id];
      const index = state.containerList.indexOf(id);
      state.containerList.splice(index, 1);
    },
    updateContainer(state, data) {
      // identical to createContainer, but may be extended in the future
      console.log('updateContainer mutation');
      console.log(data);
      // update a container in state like containers[container_id] : {container_object}
      state.containers[data.id] = data;
      // no need to update state.containerList - the id cannot change
    },
    loadCards(state, data) {
      console.log('loadCards mutation');
      console.log(data);
      // maintain cards in state like Array [ card_id : {card_object}, ...]
      for (const card of data) {
        state.cards[card.id] = card;
        state.cardList.push(card.id);
      }
    },
    createCard(state, data) {
      console.log('createCard mutation');
      console.log(data);
      // add a card to state like cards[card_id] : {card_object}
      state.cards[data.id] = data;
      state.cardList.push(data.id);
    },
    deleteCard(state, id) {
      console.log('deleteCard mutation');
      console.log(id);
      // delete a card, which is a key: {value} on the cards object
      delete state.cards[id];
      const index = state.cardList.indexOf(id);
      state.cardList.splice(index, 1);
    },
    updateCard(state, data) {
      // identical to createCard, but may be extended in the future
      console.log('updateCard mutation');
      console.log(data);
      // update a card in state like cards[card_id] : {card_object}
      state.cards[data.id] = data;
      // no need to update state.cardList - the id cannot change
    },
  },
  actions: {
    async authenticateAsync({ commit }, payload) {
      console.log('in authenticateAsync action');
      const { data } = await axios.post(`${apiBase}/auth/`, payload);
      commit('authenticate', data);
    },
    async loadDataAsync({ commit }) {
      console.log('in loadDataAsync action');
      const { data } = await axios.get(`${apiBase}/normalized/`, {
        headers: {
          Authorization: `Token ${this.state.authToken}`,
        },
      });
      commit('loadData', data);
    },
    async loadBoardsAsync({ commit }) {
      console.log('in loadBoardsAsync action');
      const { data } = await axios.get(`${apiBase}/boards/`, {
        headers: {
          Authorization: `Token ${this.state.authToken}`,
        },
      });
      commit('loadBoards', data);
    },
    async deleteBoardAsync({ commit }, id) {
      console.log('in deleteBoardAsync action');
      await axios.delete(`${apiBase}/boards/${id}/`, {
        headers: {
          Authorization: `Token ${this.state.authToken}`,
        },
      });
      commit('deleteBoard', id);
    },
    async createBoardAsync({ commit }, payload) {
      console.log('in createBoardAsync action');
      const { data } = await axios.post(
        `${apiBase}/boards/`,
        payload,
        {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        }
      );
      commit('createBoard', data);
    },
    async updateBoardAsync({ commit }, payload) {
      // TODO: can this be handled more elegantly?
      // remove array members that can't be handled by API
      delete payload.containers;
      delete payload.members;
      delete payload.labels;
      delete payload.attachments;
      console.log('in updateBoardAsync action');
      const { data } = await axios.put(
        `${apiBase}/boards/${payload.id}/`,
        payload,
        {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        }
      );
      commit('updateBoard', data);
    },
    async loadContainersAsync({ commit }, payload) {
      console.log('in loadContainersAsync action');
      const { data } = await axios.get(
        `${apiBase}/boards/${payload.board_id}/containers/`,
        {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        }
      );
      commit('loadContainers', data);
    },
    async createContainerAsync({ commit }, payload) {
      console.log('in createContainerAsync action');
      const { data } = await axios.post(
        `${apiBase}/boards/${payload.board.id}/containers/`,
        payload,
        {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        }
      );
      commit('createContainer', data);
    },
    async loadCardsAsync({ commit }, payload) {
      console.log('in loadCardsAsync action');
      // TODO: change to payload.board.id, or payload.board ?
      const { data } = await axios.get(
        `${apiBase}/boards/${payload.board_id}/containers/${payload.container_id}/cards/`,
        {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        }
      );
      commit('loadCards', data);
    },
  },
  modules: {},
});
