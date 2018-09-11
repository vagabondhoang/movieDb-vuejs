<template>
    <div>
      <section>
        <h2>Detail goes here</h2>
        <div v-if="asyncDataStatusReady" class="row">
          <div class="col-sm-6 col-md-4 col-xs-12">
            <img 
              :src="this.$store.state.filmInfo.poster_path | pathImage"
              :alt="this.$store.state.filmInfo.title"
              class="img-fluid"
            >
          </div>
          <div class="col-sm-6 col-md-4 col-xs-12">
            <h2>{{this.$store.state.filmInfo.original_title}}</h2>
            <h1>Overview: </h1>
            <p>{{this.$store.state.filmInfo.overview | trimmedString}}</p>
            <h1>Release_date</h1>
            <p>{{this.$store.state.filmInfo.release_date}}</p>
          </div>
        </div>
      </section>
      <section v-if="asyncDataStatusReady">
        <Trailers />
      </section>
      <section v-if="asyncDataStatusReady">
        <Casts />
      </section>
      <section v-if="asyncDataStatusReady">
        <Recommendations />
      </section>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import Trailers from './Trailers'
import Casts from './Casts'
import Recommendations from './Recommendations'
import asyncDataStatus from '@/mixins/asyncDataStatus.js'
import defaultImage from '../assets/logo.png'
import { URL_DETAIL, API_KEY, URL_IMG, IMG_SIZE_LARGE, URL_VIDEO } from '../utils/constants.js'

export default {
  props: {
    id: {
      type: String | Number,
      required: true
    }
  },

  components: {
    Trailers,
    Casts,
    Recommendations
  },

  methods: {
    ...mapActions(['fetchRecommendations', 'fetchTrailers', 'fetchDetailFilm', 'fetchCasts'])
  },

  mixins: [asyncDataStatus],

  filters: {
    trimmedString (str) {
      return str.length > 250 ? `${str.substring(0, 250)}...` : str
    },

    pathImage (path) {
      return path ? `${URL_IMG}${IMG_SIZE_LARGE}${path}` : `${defaultImage}`
    }
  },

  created () {
    const urlDetail = `${URL_DETAIL}${this.id}?api_key=${API_KEY}`
    const urlTrailers = `${URL_DETAIL}${this.id}${URL_VIDEO}?api_key=${API_KEY}`
    const urlCast = `${URL_DETAIL}${this.id}/credits?api_key=${API_KEY}`
    const urlRecommendations = `${URL_DETAIL}${this.id}/recommendations?api_key=${API_KEY}`

    this.fetchDetailFilm({ urlDetail })
      .then(this.asyncDataStatusFetched)

    this.fetchTrailers({ urlTrailers })
      .then(this.asyncDataStatusFetched)

    this.fetchCasts({ urlCast })
      .then(this.asyncDataStatusFetched)

    this.fetchRecommendations({ urlRecommendations })
      .then(this.asyncDataStatusFetched)
  },
}
</script>
<style scoped>

</style>

