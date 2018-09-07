<template>
    <div>
      <section>
        <h2>Detail goes here</h2>
        <div v-if="asyncDataStatusReady" class="row">
          <div class="col-sm-6 col-md-4 col-xs-12">
            <img 
              :src="info.poster_path | pathImage"
              :alt="info.title"
              class="img-fluid"
            >
          </div>
          <div class="col-sm-6 col-md-4 col-xs-12">
            <h2>{{info.original_title}}</h2>
            <h1>Overview: </h1>
            <p>{{info.overview | trimmedString}}</p>
            <h1>Release_date</h1>
            <p>{{info.release_date}}</p>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
import axios from 'axios'
import asyncDataStatus from '@/mixins/asyncDataStatus.js'
import { URL_DETAIL, API_KEY, URL_IMG, IMG_SIZE_LARGE } from '../utils/constants.js'

export default {
  props: {
    id: {
      type: String | Number,
      required: true
    }
  },

  mixins: [asyncDataStatus],

  filters: {
    trimmedString (str) {
      return str.length > 250 ? `${str.substring(0, 250)}...` : str
    },

    pathImage (path) {
      return path ? `${URL_IMG}${IMG_SIZE_LARGE}${path}` : `../assets/logo.png`
    }
  },

  data () {
    return {
      info: {},
      URL_IMG,
      IMG_SIZE_LARGE,
      errored: false,
    }
  },

  mounted () {
    axios
      .get(`${URL_DETAIL}${this.id}?api_key=${API_KEY}`)
      .then(response => {
        this.info = response.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => {
        this.asyncDataStatusFetched()
      })
  }
}
</script>
<style scoped>

</style>

