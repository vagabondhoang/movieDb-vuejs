<template>
    <div>
        <h1>Trailers</h1>
        <div class="trailers">
          <div v-for="(trailer, idx) in this.$store.state.trailers" :key="idx">
            <iframe :title="trailer.name" :src="trailer.key | pathTrailer" allowFullScreen :key="trailer.key" />
          </div>
        </div>
    </div>
</template>
<script>
import { URL_YOUTUBE } from '../utils/constants.js'

export default {
  filters: {
    pathTrailer (key) {
      return `${URL_YOUTUBE}${key}`
    }
  }
}
</script>
<style scoped>
  .trailers {
    display: flex;
    overflow: auto;
    justify-content: space-between;
  }
</style>


