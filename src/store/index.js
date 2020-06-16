import Vue from "vue";
import Vuex from "vuex";
import getEmptyNote from "../constants/noteSchema";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: []
  },
  getters: {
    getNotes: state => state.notes
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    }
  },
  actions: {
    fetchNotes({ commit }) {
      commit("setNotes", [getEmptyNote(), getEmptyNote(), getEmptyNote()]);
    }
  }
});
