import { createStore } from 'vuex';
import axios from 'axios';
import router from '../router/index.js';

// define VUE_APP_API_BASE in .env under project root like
// VUE_APP_API_BASE=http://example.com:8000
const apiBase = process.env.VUE_APP_API_BASE;

export default createStore({
  // enable strict mode for development only (impacts performance)
  strict: true,
  state: {
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
    messageQueue: [],
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
    getMessages: (state) => {
      return state.messageQueue;
    },
  },
  mutations: {
    // mutations change vuex state, they DO NOT call APIs
    setRoutes(state, data) {
      console.log('setRoutes mutation');
      state.apiBaseRoutes = data;
    },
    pushMessage(state, message) {
      console.log('pushMessage mutation');
      state.messageQueue.push(message);
    },
    popMessage(state) {
      console.log('popMessage mutation');
      return state.messageQueue.pop();
    },
    clearMessages(state) {
      console.log('clearMessages mutation');
      state.messageQueue = [];
    },
    removeMessage(state, message) {
      console.log('removeMessage mutation');
      // get index of that message
      var index = state.messageQueue.indexOf(message);
      // if that message exists, remove it
      if (index !== -1) {
        state.messageQueue.splice(index, 1);
      }
    },
    logout(state) {
      console.log('logout mutation');
      // remove tokens from localStorage
      localStorage.removeItem('kanbanAccessToken');
      localStorage.removeItem('kanbanRefreshToken');
      // remove tokens from vuex state, set isAuthenticated = false
      state.accessToken = '';
      state.refreshToken = '';
      state.isAuthenticated = false;
      // clear Vuex state
      state = {};
    },
    authenticate(state, data) {
      console.log('authenticate mutation');
      console.log(data);
      state.accessToken = data['access'];
      state.refreshToken = data['refresh'];
      state.isAuthenticated = true;
    },
    refresh(state, accessToken) {
      console.log('refresh mutation');
      console.log(accessToken);
      state.accessToken = accessToken;
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
    // GET API ROUTES
    async getApiRoutesAsync({ commit }) {
      console.log('in getApiRoutesAsync action');
      await axios.get(`${apiBase}`).then(({ data }) => {
        console.log(data);
        commit('setRoutes', data);
      });
    },
    // REGISTER A NEW USER
    async registerAsync({ commit }, payload) {
      console.log('in registerAsync action');
      return await axios
        .post(`${apiBase}/register/`, payload)
        .then(({ data }) => {
          if (data['success']) {
            commit('pushMessage', `Registered new user ${data['username']}`);
            // navigate to boards (which will be redirected to Login)
            router.push({ name: 'Boards' });
          }
        })
        .catch((error) => {
          if (error.response) {
            commit(
              'pushMessage',
              `Failed to create new user ${payload['username']}: ${error.response.data['error']}`
            );
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
    // AUTHENTICATE USER - TRADE U/P FOR TOKEN
    async authenticateAsync({ commit }, payload) {
      console.log('in authenticateAsync action');
      await axios
        .post(`${apiBase}/token/`, payload)
        .then(({ data }) => {
          if (data['access'] && data['refresh']) {
            // write tokens to localStorage
            localStorage.setItem('kanbanAccessToken', data['access']);
            localStorage.setItem('kanbanRefreshToken', data['refresh']);
            // write tokens to Vuex store state
            commit('authenticate', data);
            commit('pushMessage', `Welcome, ${payload['username']}!`);
          }
        })
        .catch((error) => {
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
    // TRADE REFRESH TOKEN FOR NEW ACCESS TOKEN
    async refreshAsync({ commit }) {
      console.log('in refreshAsync action');
      await axios
        .post(`${apiBase}/token/refresh/`, { refresh: this.state.refreshToken })
        .then(({ data }) => {
          if (data['access']) {
            commit('refresh', data['access']);
          } else {
            commit('logout');
          }
        })
        .catch((error) => {
          // we were unable to refresh our access token, logout
          console.log(error);
          commit('pushMessage', 'Session Expired');
          commit('logout');
        });
    },
    // LOAD ALL DATA [NORMALIZED] FOR CURRENT USER
    async loadDataAsync({ commit, dispatch }) {
      console.log('in loadDataAsync action');
      await axios
        .get(`${apiBase}/normalized/`, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(({ data }) => {
          // persist data to local vuex state
          commit('loadData', data);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('loadDataAsync');
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // LOAD ALL BOARDS FOR CURRENT USER
    async loadBoardsAsync({ commit, dispatch }) {
      console.log('in loadBoardsAsync action');
      await axios
        .get(`${this.state.apiBaseRoutes.boards}`, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(({ data }) => {
          commit('loadBoards', data);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('loadBoardsAsync');
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // DELETE A BOARD
    async deleteBoardAsync({ commit, dispatch }, url) {
      console.log('in deleteBoardAsync action');
      await axios
        .delete(`${url}`, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(() => {
          commit('deleteBoard', url);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('deleteBoardAsync', url);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // CREATE A BOARD
    async createBoardAsync({ commit, dispatch }, payload) {
      console.log('in createBoardAsync action');
      await axios
        .post(`${this.state.apiBaseRoutes.boards}`, payload, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(({ data }) => {
          commit('createBoard', data);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('createBoardAsync', payload);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // UPDATE A BOARD
    async updateBoardAsync({ commit, dispatch }, payload) {
      console.log('in updateBoardAsync action');
      await axios
        .put(`${payload.url}`, payload, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(({ data }) => {
          commit('updateBoard', data);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('updateBoardAsync', payload);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // LOAD ALL CONTAINERS FOR CURRENT USER
    async loadContainersAsync({ commit, dispatch }) {
      console.log('in loadContainersAsync action');
      await axios
        .get(`${this.state.apiBaseRoutes.containers}`, {
          headers: {
            Authorization: `Token ${this.state.accessToken}`,
          },
        })
        .then(({ data }) => {
          commit('loadContainers', data);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('loadContainersAsync');
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // DELETE A CONTAINER
    async deleteContainerAsync({ commit, dispatch }, url) {
      console.log('in deleteContainerAsync action');
      await axios
        .delete(`${url}`, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(() => {
          commit('deleteContainer', url);
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('deleteContainerAsync', url);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // CREATE A CONTAINER
    async createContainerAsync({ commit, dispatch }, payload) {
      console.log('in createContainerAsync action');
      await axios
        .post(`${this.state.apiBaseRoutes.containers}`, payload, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
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
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('createContainerAsync', payload);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // UPDATE A CONTAINER
    async updateContainerAsync({ commit, dispatch }, payload) {
      console.log('in updateContainerAsync action');
      await axios
        .put(`${payload.url}`, payload, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(({ data }) => {
          commit('updateContainer', data);
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('updateContainerAsync', payload);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // LOAD ALL CARDS FOR CURRENT USER
    async loadCardsAsync({ commit, dispatch }) {
      console.log('in loadCardsAsync action');
      await axios
        .get(`${this.state.apiBaseRoutes.cards}`, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(({ data }) => {
          commit('loadCards', data);
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('loadCardsAsync');
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // DELETE A CARD
    async deleteCardAsync({ commit, dispatch }, url) {
      console.log('in deleteCardAsync action');
      await axios
        .delete(`${url}`, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(() => {
          commit('deleteCard', url);
        })
        .catch(function(error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('deleteCardAsync', url);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // CREATE A CARD
    async createCardAsync({ commit, dispatch }, payload) {
      console.log('in createCardAsync action');
      await axios
        .post(`${this.state.apiBaseRoutes.cards}`, payload, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
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
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('createCardAsync', payload);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
    // UPDATE A CARD
    async updateCardAsync({ commit, dispatch }, payload) {
      console.log('in updateCardAsync action');
      await axios
        .put(`${payload.url}`, payload, {
          headers: {
            Authorization: `Bearer ${this.state.accessToken}`,
          },
        })
        .then(({ data }) => {
          commit('updateCard', data);
        })
        .catch(function(error) {
          // TODO: decompose
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // try to get a new access token
            dispatch('refreshAsync').then(() => {
              // try again
              dispatch('updateCardAsync', payload);
            });
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
        });
    },
  },
  modules: {},
});
