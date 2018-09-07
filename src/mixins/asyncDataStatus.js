export default {
  data () {
    return {
      asyncDataStatusReady: false
    }
  },

  methods: {
    asyncDataStatusFetched () {
      this.asyncDataStatusReady = true
      this.$emit('ready')
    }
  }
}
