<template>
    <div>
        <h1>Casts</h1>
        <div class="casts">
          <div v-for="cast in this.$store.state.casts" :key="cast.cast_id" class="card">
            <img 
              class="card-img-top img-fluid" 
              :src="cast.profile_path | pathCast" 
              :alt="cast.name"
            >
            <div class="card-body">
              <p class="card-text">{{cast.name}}</p>
              <p class="card-text">{{cast.character}}</p>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { URL_IMG, IMG_SIZE_SMALL } from '../utils/constants.js'
import defaultImage from '../assets/logo.png'

export default {
  filters: {
    pathCast (profilePath) {
      return profilePath ? `${URL_IMG}${IMG_SIZE_SMALL}${profilePath}` : `${defaultImage}`
    }
  }
}
</script>
<style scoped>
.casts {
  display: flex;
  overflow: auto;
}
.card {
  min-width: auto;
  border: 1px solid #e3e3e3;
  margin-right: 10px;
  margin-bottom: 7px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

img {
  max-height: 150px;
  margin: 0 auto;
  display: block;
}
</style>


