import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Promise } from 'core-js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filmList: [],
    trailers: [],
    casts: [],
    recommendations: [],
    filmInfo: {},
    errored: false
  },

  actions: {
    fetchFilmList: ({ dispatch }, { urlList }) => dispatch('fetchItem', { endpoint: urlList, resource: 'filmList' }),

    fetchDetailFilm: ({ dispatch }, { urlDetail }) => dispatch('fetchItem', { endpoint: urlDetail, resource: 'filmInfo' }),

    fetchTrailers: ({ dispatch }, { urlTrailers }) => dispatch('fetchItem', { endpoint: urlTrailers, resource: 'trailers' }),

    fetchCasts: ({ dispatch }, { urlCast }) => dispatch('fetchItem', { endpoint: urlCast, resource: 'casts' }),

    fetchRecommendations: ({ dispatch }, { urlRecommendations }) => dispatch('fetchItem', { endpoint: urlRecommendations, resource: 'recommendations' }),

    fetchItem ({ state, commit }, { endpoint, resource }) {
      return new Promise((resolve, reject) => {
        axios
          .get(endpoint)
          .then(response => {
            commit('fetchItem', { resource, response })
            resolve(state[resource])
          })
          .catch(error => {
            state.errored = error
          })
      })
    }
  },

  mutations: {
    fetchItem (state, { resource, response }) {
      if (resource === 'casts') {
        state[resource] = JSON.parse(JSON.stringify(response.data.cast))
      } else if (resource === 'filmInfo') {
        state[resource] = response.data
      } else {
        state[resource] = JSON.parse(JSON.stringify(response.data.results))
      }
    }
  }
})
