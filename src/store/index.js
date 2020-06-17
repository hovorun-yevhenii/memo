import Vue from "vue";
import Vuex from "vuex";
import { getEmptyNote } from "../constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: []
  },
  getters: {
    getNotes: state => state.notes
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    DELETE_NOTE(state, id) {
      const index = state.notes.findIndex(note => note.id === id);

      state.notes.splice(index, 1);
    }
  },
  actions: {
    fetchNotes({ commit }) {
      commit("SET_NOTES", [getEmptyNote(), getEmptyNote(), getEmptyNote()]);
    },
    deleteNote({ commit }, { id }) {
      commit("DELETE_NOTE", id);
    }
  }
});
