<template>
  <div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        goods: {}
      }
    },
    created () {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.errno === 0) {
          this.goods = res.data
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
