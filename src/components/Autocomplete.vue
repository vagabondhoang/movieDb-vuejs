<template>
    <div>
      <div class="form-group">
        <input 
          type="text" 
          placeholder="type in here" 
          v-model="query"
          @change="handleChange"
          @keyup.enter="submit"
          class="form-control"
        >
        <div class="options" v-show="visible">
          <ul>
            <li 
              v-for="(film, idx) in suggestions"
              :key="film.id"
              :class="{'isActive': (active && idx === liIndex)}"
              @mouseover="isActive(idx)"
              @mouseout="removeActive"
              @click="selected(film.id)"
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
    </div>
</template>
<script>
import { debounce } from 'lodash'
import axios from 'axios'
import { URL_SEARCH, API_KEY_ALT, URL_IMG, IMG_SIZE_XSMALL } from '../utils/constants.js'
import defaultImage from '../assets/logo.png'

export default {
  data () {
    return {
      query: '',
      delay: 500,
      suggestions: [],
      active: false,
      liIndex: 0,
    }
  },

  watch: {
    query () {
      this.debouncedGetQuery()
    }
  },

  computed: {
    visible () {
      return this.suggestions.length > 0 && this.query
    }
  },

  filters: {
    pathImage (backdropPath) {
      return backdropPath ? `${URL_IMG}${IMG_SIZE_XSMALL}${backdropPath}` : `${defaultImage}`
    }
  },

  methods: {
    selected (filmId) {
      this.$router.push({ name: 'FilmDetail', params: { id: filmId } })
    },

    handleChange () {
      const urlSearch = `${URL_SEARCH}${this.query}${API_KEY_ALT}`

      if (this.query.trim().length !== 0) {
        axios
          .get(urlSearch)
          .then(response => {
            this.suggestions = response.data.results
          })
      }
    },

    submit () {
      if (this.query.trim().length !== 0) {
        this.$router.push({ name: 'PageSearch', params: { query: this.query } })
        this.$emit('setSuggestions', JSON.parse(JSON.stringify(this.suggestions)))
        this.query = ''
      }
    },

    isActive (idx) {
      this.liIndex = idx
      this.active = true
    },

    removeActive () {
      this.active = false
    },
  },

  created () {
    this.debouncedGetQuery = debounce(this.handleChange, this.delay)
  },

}
</script>
<style lang="scss">
input {
  position: relative;
}
.options {
  position: absolute;
  z-index: 10;
  max-height: 60vh;
  overflow: scroll;

  ul {
    list-style-type: none;
    padding: 0;

    li {
      background: #f3eaea;
      border: 1px solid #e0d7d7;
      padding: 5px;
      cursor: pointer;

      a {
        text-decoration: none;

        img {
          width: 45px;
          height: 25px;
        }
      }
    }

    li.isActive {
      background: #967b7b;

      a {
        color: white;
      }
    }
  }
}

</style>


