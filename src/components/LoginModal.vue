<template>
  <div>
    <div class="login">
      <button 
        type="button" 
        class="btn btn-info"
        @click="modalOpen = true"
      >Login</button>
    </div>
    <login-form 
      :show="modalOpen"
      @close="modalOpen = false"></login-form>
  </div>
</template>
<script>
import LoginForm from './LoginForm'

export default {
  components: {
    LoginForm
  },

  data () {
    return {
      modalOpen: false
    }
  }
}
</script>
<style scoped>

</style>


