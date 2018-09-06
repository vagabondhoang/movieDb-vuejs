<template>
  <div>
    <h1>Film List goes here</h1>
    <section v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment, please try back later
      </p>
    </section>
    <section v-else class="main-poster">
      <div v-if="loading"><AppSpinner /></div>
      <div v-else v-for="chunk in filmChunks" :key="chunk" class="row">
        <div v-for="film in chunk" :key="film.id" class="col-sm-3">
          <img
            :src="`${URL_IMG}${IMG_SIZE_AVERAGE}${film.backdrop_path}`" 
            :alt="film.title"
            :id="film.id"
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import AppSpinner from './AppSpinner'
import { URL_LIST, API_KEY, URL_IMG, IMG_SIZE_AVERAGE } from '../utils/constants.js'

export default {
  components: {
    AppSpinner
  },

  data () {
    return {
      filmList: [],
      URL_IMG,
      IMG_SIZE_AVERAGE,
      loading: true,
      errored: false
    }
  },

  computed: {
    filmChunks () {
      return this.chunk(Object.values(this.filmList), 4)
    }
  },

  mounted () {
    axios
      .get(`${URL_LIST}${API_KEY}`)
      .then(response => {
        console.log(response.data.results)
        this.filmList = response.data.results
      })
      .catch(error => {
        console.log(error)
        this.errored = error
      })
      .finally(() => {
        this.loading = false
      })
  },

  methods: {
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
