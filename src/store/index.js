import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { copyNote } from "../utils";
import { VUEX_PERSIST_KEY } from "../constants";

const vuexLocal = new VuexPersistence({
  key: VUEX_PERSIST_KEY,
  reducer: state => state.notes
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    notes: [],
    note: null
  },
  getters: {
    notes: state => state.notes,
    note: state => state.note,
    getNoteById: state => id => state.notes.find(note => note.id === id)
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes;
    },
    REMOVE_NOTE(state, id) {
      const index = state.notes.findIndex(note => note.id === id);

      state.notes.splice(index, 1);
    },
    SET_NOTE(state, note) {
      state.note = copyNote(note);
    },
    EDIT_NOTE(state, note) {
      state.note = note;
    }
  },
  actions: {
    fetchNotes({ commit }) {
      let notes = localStorage.getItem(VUEX_PERSIST_KEY);

      try {
        notes = JSON.parse(notes) || [];
      } catch (_) {
        notes = [];
      } finally {
        commit("SET_NOTES", notes);
      }
    },
    removeNote({ commit }, { id }) {
      commit("REMOVE_NOTE", id);
    },
    setNote({ commit }, note) {
      commit("SET_NOTE", note);
    },
    editNote({ commit }, note) {
      commit("EDIT_NOTE", note);
    }
  }
});
