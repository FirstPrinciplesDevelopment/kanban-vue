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
    apiBaseRoutes: {
      attachments: '',
      boards: '',
      cards: '',
      containers: '',
      labels: '',
      members: '',
      tags: '',
      users: '',
    },
    boards: {
      /*
      url: {
        url,
        name,
        slug,
        containers: [...urls],
        members: [...urls],
        labels: [...urls],
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
      // ...urls
    ],
    boardSlugMap: {
      // "slug": "url",
    },
    containers: {
      /*
      url: {
        url,
        board,  // url
        name,
        slug,
        position,
        cards: [...urls],
        labels: [...urls],
        tags: [...urls],
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
      // ...urls
    ],
    cards: {
      /*
      url: {
        url,
        container,  // url
        name,
        slug,
        content,
        start_time,
        end_time,
        complexity,
        hours,
        position,
        assigned_users: [...urls],
        labels: [...urls],
        tags: [...urls],
        attachments: [...urls],
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
      // ...urls
    ],
  },
  getters: {
    // getters provide access to vuex state, they DO NOT call APIs or change vuex state
    getBoardByUrl: (state) => (url) => {
      return state.boards[url];
    },
    getBoardBySlug: (state, getters) => (slug) => {
      const url = state.boardSlugMap[slug];
      return getters.getBoardByUrl(url);
    },
    getContainersByBoardUrl: (state) => (board_url) => {
      var result = [];
      for (const url of state.containerList) {
        if (state.containers[url].board === board_url) {
          result.push(state.containers[url]);
        }
      }
      return result.sort((a, b) => {
        return a.position - b.position;
      });
    },
    getContainerByUrl: (state) => (url) => {
      return state.containers[url];
    },
    getCardsByContainerUrl: (state) => (container_url) => {
      var result = [];
      for (const url of state.cardList) {
        if (state.cards[url].container === container_url) {
          result.push(state.cards[url]);
        }
      }
      return result.sort((a, b) => {
        return a.position - b.position;
      });
    },
    getCardByUrl: (state) => (url) => {
      return state.cards[url];
    },
  },
  mutations: {
    // mutations change vuex state, they DO NOT call APIs
    setRoutes(state, data) {
      console.log('setRoutes mutation');
      state.apiBaseRoutes = data;
    },
    authenticate(state, token) {
      console.log('authenticate mutation');
      console.log(token);
      state.authToken = token;
      state.isAuthenticated = true;
    },
    loadData(state, data) {
      console.log('loadData mutation');
      console.log('data from API:');
      console.log(data);
      // reset state before adding new data
      state.boards = {};
      state.boardList = [];
      state.boardSlugMap = {};
      state.containers = {};
      state.containerList = [];
      state.cards = {};
      state.cardList = [];
      // set boards
      for (const board of data['boards']) {
        state.boards[board.url] = board;
        state.boardList.push(board.url);
        state.boardSlugMap[board.slug] = board.url;
      }
      // set containers
      for (const container of data['containers']) {
        state.containers[container.url] = container;
        state.containerList.push(container.url);
      }
      // set cards
      for (const card of data['cards']) {
        state.cards[card.url] = card;
        state.cardList.push(card.url);
      }
      // // set labels
      // for (const label of data["labels"]) {
      //   state.labels[label.url] = label;
      //   state.labelList.push(label.url);
      // }
      // // set tags
      // for (const tag in data["tags"]) {
      //   state.tag[tag.url] = tag;
      //   state.tagList.push(tag.url);
      // }
      // // set members
      // for (const member in data["members"]) {
      //   state.members[member.url] = member;
      //   state.memberList.push(member.url);
      // }
      console.log('Data in state:');
      console.log(state);
    },
    loadBoards(state, data) {
      console.log('loadBoards mutation');
      console.log(data);
      // maintain boards in state like Array [ board_url : {board_object}, ...]
      for (const board of data) {
        state.boards[board.url] = board;
        state.boardList.push(board.url);
        state.boardSlugMap[board.slug] = board.url;
      }
    },
    createBoard(state, data) {
      console.log('createBoard mutation');
      console.log(data);
      // add a board to state like boards[board_url] : {board_object}
      state.boards[data.url] = data;
      state.boardList.push(data.url);
      // update boardSlugMap
      state.boardSlugMap[data.slug] = data.url;
    },
    deleteBoard(state, url) {
      console.log('deleteBoard mutation');
      console.log(url);
      // lookup the board's slug to delete the slug -> url mapping
      delete state.boardSlugMap[state.boards[url].slug];
      // delete a board, which is a key: {value} on the boards object
      delete state.boards[url];
      // delete url from boardList
      const index = state.boardList.indexOf(url);
      state.boardList.splice(index, 1);
    },
    updateBoard(state, data) {
      // identical to createBoard, but may be extended in the future
      console.log('updateBoard mutation');
      console.log(data);
      // update a board in state like boards[board_url] : {board_object}
      state.boards[data.url] = data;
      // no need to update state.boardList - the url cannot change
    },
    loadContainers(state, data) {
      console.log('loadContainers mutation');
      console.log(data);
      // maintain containers in state like Array [ container_url : {container_object}, ...]
      for (const container of data) {
        state.containers[container.url] = container;
        state.containerList.push(container.url);
      }
    },
    createContainer(state, data) {
      console.log('createContainer mutation');
      console.log(data);
      // add a container to state like containers[container_url] : {container_object}
      state.containers[data.url] = data;
      state.containerList.push(data.url);
    },
    deleteContainer(state, url) {
      console.log('deleteContainer mutation');
      console.log(url);
      // delete a container, which is a key: {value} on the containers object
      delete state.containers[url];
      // delete url form containerList
      const index = state.containerList.indexOf(url);
      state.containerList.splice(index, 1);
    },
    updateContainer(state, data) {
      // identical to createContainer, but may be extended in the future
      console.log('updateContainer mutation');
      console.log(data);
      // update a container in state like containers[container_url] : {container_object}
      state.containers[data.url] = data;
      // no need to update state.containerList - the url cannot change
    },
    loadCards(state, data) {
      console.log('loadCards mutation');
      console.log(data);
      // maintain cards in state like Array [ card_url : {card_object}, ...]
      for (const card of data) {
        state.cards[card.url] = card;
        state.cardList.push(card.url);
      }
    },
    createCard(state, data) {
      console.log('createCard mutation');
      console.log(data);
      // add a card to state like cards[card_url] : {card_object}
      state.cards[data.url] = data;
      state.cardList.push(data.url);
    },
    deleteCard(state, url) {
      console.log('deleteCard mutation');
      console.log(url);
      // delete a card, which is a key: {value} on the cards object
      delete state.cards[url];
      const index = state.cardList.indexOf(url);
      state.cardList.splice(index, 1);
    },
    updateCard(state, data) {
      // identical to createCard, but may be extended in the future
      console.log('updateCard mutation');
      console.log(data);
      // update a card in state like cards[card_url] : {card_object}
      state.cards[data.url] = data;
      // no need to update state.cardList - the url cannot change
    },
  },
  actions: {
    async getApiRoutesAsync({ commit }) {
      console.log('in getApiRoutesAsync action');
      await axios.get(`${apiBase}`).then(({ data }) => {
        console.log(data);
        commit('setRoutes', data);
      });
    },
    async authenticateAsync({ commit }, payload) {
      console.log('in authenticateAsync action');
      await axios.post(`${apiBase}/auth/`, payload).then(({ data }) => {
        if (data['token']) {
          // write token to localStorage
          localStorage.setItem('kanbanAccessToken', data['token']);
          // write token to Vuex store state
          commit('authenticate', data['token']);
        }
      });
    },
    async loadDataAsync({ commit }) {
      console.log('in loadDataAsync action');
      await axios
        .get(`${apiBase}/normalized/`, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('loadData', data);
        });
    },
    async loadBoardsAsync({ commit }) {
      console.log('in loadBoardsAsync action');
      await axios
        .get(`${this.state.apiBaseRoutes.boards}`, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('loadBoards', data);
        });
    },
    async deleteBoardAsync({ commit }, url) {
      console.log('in deleteBoardAsync action');
      await axios
        .delete(`${url}`, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(() => {
          commit('deleteBoard', url);
        });
    },
    async createBoardAsync({ commit }, payload) {
      console.log('in createBoardAsync action');
      await axios
        .post(`${this.state.apiBaseRoutes.boards}`, payload, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('createBoard', data);
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    async updateBoardAsync({ commit }, payload) {
      console.log('in updateBoardAsync action');
      await axios
        .put(`${payload.url}`, payload, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('updateBoard', data);
        });
    },
    async loadContainersAsync({ commit }) {
      console.log('in loadContainersAsync action');
      await axios
        .get(`${this.state.apiBaseRoutes.containers}`, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('loadContainers', data);
        });
    },
    async deleteContainerAsync({ commit }, url) {
      console.log('in deleteContainerAsync action');
      await axios
        .delete(`${url}`, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(() => {
          commit('deleteContainer', url);
        });
    },
    async createContainerAsync({ commit }, payload) {
      console.log('in createContainerAsync action');
      await axios
        .post(`${this.state.apiBaseRoutes.containers}`, payload, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('createContainer', data);
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    async updateContainerAsync({ commit }, payload) {
      console.log('in updateContainerAsync action');
      await axios
        .put(`${payload.url}`, payload, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('updateContainer', data);
        });
    },
    async loadCardsAsync({ commit }) {
      console.log('in loadCardsAsync action');
      await axios
        .get(`${this.state.apiBaseRoutes.cards}`, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('loadCards', data);
        });
    },
    async deleteCardAsync({ commit }, url) {
      console.log('in deleteCardAsync action');
      await axios
        .delete(`${url}`, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(() => {
          commit('deleteCard', url);
        });
    },
    async createCardAsync({ commit }, payload) {
      console.log('in createCardAsync action');
      await axios
        .post(`${this.state.apiBaseRoutes.cards}`, payload, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('createCard', data);
        })
        .catch(function(error) {
          // TODO: decompose
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    async updateCardAsync({ commit }, payload) {
      console.log('in updateCardAsync action');
      await axios
        .put(`${payload.url}`, payload, {
          headers: {
            Authorization: `Token ${this.state.authToken}`,
          },
        })
        .then(({ data }) => {
          commit('updateCard', data);
        });
    },
  },
  modules: {},
});
