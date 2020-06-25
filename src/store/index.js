import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { VUEX_PERSIST_KEY } from "../constants";
import { SET_NOTES, REMOVE_NOTE, SAVE_NOTE } from "./mutation-types";

const vuexLocal = new VuexPersistence({
  key: VUEX_PERSIST_KEY,
  reducer: state => state.notes
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    notes: []
  },
  getters: {
    notes: state => state.notes,
    getNoteById: state => id => state.notes.find(note => note.id === id)
  },
  mutations: {
    [SET_NOTES](state, notes) {
      state.notes = notes;
    },
    [REMOVE_NOTE](state, id) {
      const index = state.notes.findIndex(item => item.id === id);

      state.notes.splice(index, 1);
    },
    [SAVE_NOTE](state, note) {
      const index = state.notes.findIndex(item => item.id === note.id);
      const order = index > -1 ? index : state.notes.length;

      state.notes.splice(order, 1, {
        ...note,
        todoList: note.todoList.filter(item => item.text.trim().length)
      });
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
        commit(SET_NOTES, notes);
      }
    }
  }
});
