<template>
  <div class="container">
    <div class="search">
      <Autocomplete />
    </div>
    <div class="main">
      <h1>Film List goes here</h1>
      <section v-if="this.$store.state.errored">
        <p>
          We're sorry, we're not able to retrieve this information at the moment, please try back later
        </p>
      </section>
      <section v-else class="main-poster">
        <div v-if="asyncDataStatusReady" v-for="(chunk, idx) in filmChunks" :key="idx" class="row">
          <div v-for="film in chunk" :key="film.id" class="col-sm-3">
            <router-link :to="{name: 'FilmDetail', params: {id: film.id}}">
              <img
                :src="film.backdrop_path | pathImage" 
                :alt="film.title"
                :id="film.id"
              >
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Autocomplete from './Autocomplete'
import asyncDataStatus from '@/mixins/asyncDataStatus.js'
import defaultImage from '../assets/logo.png'
import { URL_LIST, API_KEY, URL_IMG, IMG_SIZE_AVERAGE, URL_SEARCH, API_KEY_ALT } from '../utils/constants.js'

export default {
  mixins: [asyncDataStatus],

  components: {
    Autocomplete
  },

  filters: {
    pathImage (backdropPath) {
      return backdropPath ? `${URL_IMG}${IMG_SIZE_AVERAGE}${backdropPath}` : `${defaultImage}`
    }
  },

  watch: {
    $route (to, from) {
      console.log(to, from)
    }
  },

  computed: {
    filmChunks () {
      const { suggestions, filmList } = this.$store.state

      return suggestions.length > 0 && this.$route.params.query
        ? this.chunk(Object.values(suggestions), 4)
        : this.chunk(Object.values(filmList), 4)
    }
  },

  created () {
    const { query } = this.$route.params
    if (this.$route.params.query) {
      const urlSearch = `${URL_SEARCH}${query}${API_KEY_ALT}`
      this.searchFilms({ urlSearch })
        .then(() => this.asyncDataStatusFetched())
    } else {
      const urlList = `${URL_LIST}${API_KEY}`
      this.fetchFilmList({ urlList })
        .then(() => this.asyncDataStatusFetched())
    }
  },

  mounted () {
    console.log(111111222222)
    // console.log(this.$store.state.suggestions, '-'.repeat(10))
  },

  methods: {
    ...mapActions(['fetchFilmList', 'searchFilms']),

    chunk (input, size) {
      return input.reduce((arr, item, idx) => {
        return idx % size === 0
          ? [...arr, [item]]
          : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]
      }, [])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .main-poster {
  display: flex;
} */
</style>
