import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { cloneNote } from "../utils";
import { VUEX_PERSIST_KEY } from "../constants";
import {
  SET_NOTES,
  REMOVE_NOTE,
  SET_EDITING_NOTE,
  UPDATE_NOTE,
  SAVE_NOTE
} from "./mutation-types";

const vuexLocal = new VuexPersistence({
  key: VUEX_PERSIST_KEY,
  reducer: state => state.notes
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    notes: [],
    editingNote: null
  },
  getters: {
    notes: state => state.notes,
    editingNote: state => state.editingNote,
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
    [SET_EDITING_NOTE](state, note) {
      state.editingNote = cloneNote(note);
    },
    [UPDATE_NOTE](state, note) {
      state.editingNote = note;
    },
    [SAVE_NOTE](state) {
      const note = state.editingNote;
      const index = state.notes.findIndex(item => item.id === note.id);
      const order = index > -1 ? index : state.notes.length;

      state.notes.splice(order, 1, {
        ...note,
        items: note.items.filter(item => item.text.trim().length)
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
