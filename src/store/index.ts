import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    _favourites: [ 1, 5, 18 ]
  },
  getters: {
    favouriteBeers: (state )=> {
      return state._favourites
    }
  },
  mutations: {
    addFavourites(state, payload: number ): void {
      state._favourites.push(payload)
    },
    removeFavourites(state, payload: number): void {
      state._favourites.indexOf(payload);
      if (state._favourites.indexOf(payload) > -1) {
        state._favourites.splice(state._favourites.indexOf(payload), 1);
      }
    },
  },
  actions: {
    addFavourites(context, payload): void {
      context.commit('addFavourites', payload)
    },
    removeFavourites(context, payload): void {
      context.commit('removeFavourites', payload)
    },
  },
  modules: {},
});

export default store;
