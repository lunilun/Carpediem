import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    thema:'white',
    cate:'',
    itemList: [],
    stateList: [],
  },
  getters:{
    getThema: (state)=>{
      return state.thema;
    },
    getCate:(state)=>{
      return state.cate;
    },
    getState:(state)=>{
      return state.stateList;
    },
  },
  mutations: {
    changeThema(state,payload) {
        state.thema = payload.color;
    },
    saveCate(state,payload) {
      state.cate = payload.cate;
      state.itemList = payload.arr;
    },
    clearCate(state) {
      state.cate = "";
      state.itemList = "";
      state.stateList = "";
    },
    saveState(state, payload) {
      state.stateList = payload.state;
    }
  },
  actions: {},
  modules: {},
  plugins:[createPersistedState()],
});
