<template>
  <div id="app" class="container">
    <film-list></film-list>
    <router-view/>
  </div>
</template>

<script>

import FilmList from './components/FilmList'

export default {
  name: 'App',
  components: {
    FilmList
  }
}
</script>

<style>

</style>
