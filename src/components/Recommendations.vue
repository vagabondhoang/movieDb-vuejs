<template>
  <div>
    <h1>Recommendations</h1>
    <div class="recommendations">
      <div 
        v-for="recommendation in this.$store.state.recommendations" 
        :key="recommendation.id"
        class="recommendation"
      >
        <img 
          :src="recommendation.backdrop_path | pathRecommendation"
          :alt="recommendation.title"
        >
        <p>{{recommendation.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { URL_IMG, IMG_SIZE_AVERAGE } from '../utils/constants.js'
import defaultImage from '../assets/logo.png'

export default {
  filters: {
    pathRecommendation (backdropPath) {
      return backdropPath ? `${URL_IMG}${IMG_SIZE_AVERAGE}${backdropPath}` : `${defaultImage}`
    }
  }
}
</script>
<style scoped>
.recommendations {
  display: flex;
  overflow: auto;
  justify-content: space-between;
}
.recommendation {
  margin-right: 10px;
  margin-bottom: 7px;
}
img {
  border-radius: 5px;
}
</style>


