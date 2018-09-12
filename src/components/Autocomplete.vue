<template>
    <div>
      <input 
        type="text" 
        placeholder="type in here" 
        v-model="query"
        @change="handleChange"
        @keyup.enter="submit"
      >
      <div class="options" v-show="visible">
        <ul>
          <li 
            v-for="film in this.$store.state.suggestions"
            :key="film.id"
          >
            <router-link :to="{name: 'FilmDetail', params: {id: film.id}}">
              <img
                :src="film.backdrop_path | pathImage" 
                :alt="film.title"
                :id="film.id"
              >
              {{ film.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import { URL_SEARCH, API_KEY_ALT, URL_IMG, IMG_SIZE_XSMALL } from '../utils/constants.js'
import defaultImage from '../assets/logo.png'

export default {
  data () {
    return {
      query: '',
      delay: 500,
    }
  },

  watch: {
    query () {
      this.debouncedGetQuery()
    },
  },

  computed: {
    visible () {
      return this.$store.state.suggestions.length > 0 && this.query
    }
  },

  filters: {
    pathImage (backdropPath) {
      return backdropPath ? `${URL_IMG}${IMG_SIZE_XSMALL}${backdropPath}` : `${defaultImage}`
    }
  },

  methods: {
    ...mapActions(['searchFilms']),

    handleChange () {
      const urlSearch = `${URL_SEARCH}${this.query}${API_KEY_ALT}`
      if (this.query.trim().length !== 0) {
        console.log()
        this.searchFilms({ urlSearch })
      }
    },

    submit () {
      if (this.query.trim().length !== 0) {
        this.$router.push({ name: 'PageSearch', params: { query: this.query } })
        this.query = ''
      }
    },

    beforeRouteEnter (to, from, next) {
      console.log(to)
      console.log(from)
      next()
    }
  },

  created () {
    this.debouncedGetQuery = _.debounce(this.handleChange, this.delay)
  },

  mounted () {
    // console.log(this.visible)
  }
}
</script>
<style scoped>
input {
  position: relative;
}
.options {
  position: absolute;
}
.options ul {
  list-style-type: none;
  padding: 0;
}
.options ul li {
  background: #f3eaea;
  border: 1px solid #e0d7d7;
}
</style>


