<template>
  <div id="app" class="container">
    <router-view v-show="showPage" @ready="pageReady" />
    <AppSpinner v-show="!showPage" />
  </div>
</template>

<script>
import AppSpinner from './components/AppSpinner'

export default {
  components: {
    AppSpinner
  },

  data () {
    return {
      showPage: false
    }
  },

  methods: {
    pageReady () {
      this.showPage = true
    }
  }
}
</script>

<style scoped>

</style>
