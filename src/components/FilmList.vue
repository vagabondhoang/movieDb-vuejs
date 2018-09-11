<template>
  <div>
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
</template>

<script>
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus.js'
import defaultImage from '../assets/logo.png'
import { URL_LIST, API_KEY, URL_IMG, IMG_SIZE_AVERAGE } from '../utils/constants.js'

export default {
  mixins: [asyncDataStatus],

  filters: {
    pathImage (backdropPath) {
      return backdropPath ? `${URL_IMG}${IMG_SIZE_AVERAGE}${backdropPath}` : `${defaultImage}`
    }
  },

  computed: {
    filmChunks () {
      return this.chunk(Object.values(this.$store.state.filmList), 4)
    }
  },

  created () {
    const urlList = `${URL_LIST}${API_KEY}`

    this.fetchFilmList({ urlList })
      .then(() => this.asyncDataStatusFetched())
  },

  methods: {
    ...mapActions(['fetchFilmList']),

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
