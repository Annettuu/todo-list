export const listTask = {
  state: {
    listTask: [],
    lastId: 0
  },
  getters: {
    getListTask (state) {
      return state.listTask;
    },
    getLastId (state) {
      return state.lastId;
    }
  },
  mutations: {
    setListTask(state, newListTask) {
      state.listTask = newListTask;
    },
    setLastId(state, lastId) {
      state.lastId = lastId;
    }
  },
  actions: {
    updateListTask({ commit }, newListTask) {
      commit('setListTask', newListTask);
      localStorage.setItem('listTask', JSON.stringify(newListTask));
    },
    updateLastId({ commit }, lastId) {
      commit('setLastId', lastId);
      localStorage.setItem('lastId', JSON.stringify(lastId));
    },
    loadListTask({ commit }) {
      const savedListTask = localStorage.getItem('listTask');
      if (savedListTask) {
        commit('setListTask', JSON.parse(savedListTask));
      }
    },
    loadLastId({ commit }) {
      const savedLastId = localStorage.getItem('lastId');
      if (savedLastId) {
        commit('setLastId', JSON.parse(savedLastId));
      }
    }
  },
};
