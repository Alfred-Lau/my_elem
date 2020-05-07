<template>
  <div id="app">
    <!--header之类的保留字不能随意使用-->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header'
  import {urlParse} from 'common/js/utils'
  import mock from '../data.json'

  const {seller = {}} = mock

  const ERR_OK = 0

  export default{
    data () {
      return {
        seller: {
          id: (() => {
              let queryParam = urlParse()
              return queryParam.id
          })()
        }
      }
    },
    components: {
      'v-header': header
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$http.get('/api/seller?id=' + this.seller.id).then((res) => {
          res = res.body
          if (res.errno === ERR_OK) {
            this.seller = Object.assign({}, this.seller, res.data)
          } else {
            this.seller = Object.assign({}, this.seller, seller)
          }
        }).catch(() => {
          this.seller = Object.assign({}, this.seller, seller)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet">
  @import './common/stylus/index.styl'

  #app
    .tab
      display: flex
      height: 40px
      width: 100%
      /*垂直居中不要忘*/
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
