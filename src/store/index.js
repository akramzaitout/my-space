import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate';

import home from './home'
import task from './task'
import note from './note'
import event from './event'


import Vuetify from '@/plugins/vuetify.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDark : false,
  },
  getters : {
    isDark( state ){
      return state.isDark;
    }
  },
  actions: {
    toggleDarkMode( { commit , state } ) {
      commit( 'toggleDarkMode' , null );
      Vuetify.framework.theme.dark = state.isDark;
      let color = Vuetify.framework.theme.themes[ ( Vuetify.framework.theme.isDark ) ? 'dark' : 'light' ].primary; 
      document.querySelector('meta[name="theme-color"]').setAttribute("content", color );
    }
  },
  mutations: {
    toggleDarkMode(state){
      state.isDark = !(state.isDark);
    }
  },
  modules: {
    home,
    note,
    task,
    event
  },
  plugins: [
    createPersistedState({ storage: window.localStorage })
  ],
})

