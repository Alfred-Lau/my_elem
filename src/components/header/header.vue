<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <!--需要对src进行v-bind,因为一开始它是空的-->
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name"> {{ seller.name }} </span>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime}} 分钟送达
        </div>
        <!--v-if防止异步初始化组件的时候没有数据!-->
        <div v-if="seller.supports" class="support">
          <!--注意,有了span,就不要多此一举的再添加img了,否则容易发生其他错误-->
          <span class="icon" :class="classMap[seller.supports[0].type]">
          </span>
          <span class="text">
            {{ seller.supports[0].description }}
          </span>
        </div>
      </div>
      <div v-if="seller.supports" class="counts" @click="showDetail">
        <span class="count-number"> {{ seller.supports.length }}个 </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text"> {{seller.bulletin}} </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name"> {{ seller.name }} </h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="description">
                {{ item.description }}
              </span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <p v-if="seller.bulletin" class="bulletin">
              {{ seller.bulletin }}
            </p>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  export default{
    data () {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow: false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  /*这样引入比较爽!!!*/
  @import "../../common/icon.css"

  .header
    /*注意注意注意,先对根元素设置颜色和字体!!!*/
    position: relative
    color: #fff
    overflow: hidden
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      font-size: 0
      position: relative
      /*padding margin 最好四个方向全写,从左到右,从上到下*/
      padding: 24px 12px 18px 24px
      .avatar
        display: inline-block
        /*当出现垂直方向不对齐的时候需要使用vertical-align来实现顶部对齐*/
        vertical-align: top
        img
          border-radius 2px
      .content
        font-size 14px
        margin-left: 16px
        display: inline-block
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: top
            bg-img('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size 16px
            line-height: 18px
            font-weight: bold
            display: inline-block
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size 12px

        .support
          margin-right: 4px
          .icon
            display: inline-block
            vertical-align top
            width: 12px
            height: 12px
            background-size 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.special
              bg-img('special_1')
            &.invoice
              bg-img('invoice_1')
            &.guarantee
              bg-img('guarantee_1')
          .text
            display: inline-block
            vertical-align top
            font-size 10px
            line-height: 12px

      .counts
        position: absolute
        right: 12px
        bottom: 14px
        height: 24px
        line-height: 24px
        padding: 0 8px
        border-radius 14px
        background: rgba(0, 0, 0, 0.2)
        text-align center
        .count-number
          vertical-align: top
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          font-size 10px
          line-height: 24px

    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 12px
      font-size 10px
      background rgba(7, 17, 27, 0.2)
      white-space: nowrap
      overflow: hidden
      text-overflow ellipsis
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        background-size 22px 12px
        background-repeat no-repeat
        bg-img('bulletin')
        vertical-align top
        margin-top: 8px
      .bulletin-text
        font-size: 10px
        vertical-align top
        margin: 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      filter blur(10px)
      z-index: -1
    .detail
      /*注意此处absolute和fixed的区别*/
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      /*height也需要设置*/
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter blur(10px)
      &.fade-enter-active, &.fade-leave-active {
        transition: all .5s
        background: rgba(7, 17, 27, 0.8)
      }
      &.fade-enter, &.fade-leave-active {
        opacity: 0
        background: rgba(7, 17, 27, 0)
      }
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          /*此处使用margin原因:背景不需要,漏出来比较好*/
          margin-top: 64px
          padding-bottom: 64px
          .name
            margin-bottom: 16px
            text-align center
            font-size 16px
            line-height: 16px
            font-weight: 700
          .star-wrapper
            padding: 2px 0
            text-align: center
            margin-top: 18px
          .title
            width: 80%
            display: flex
            margin: 28px 36px 24px 36px
            .line
              position: relative
              flex: 1
              top: -6px
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            .text
              margin: 0 12px

          .supports
            width: 80%
            margin: 0 auto
            padding: 0 12px
            .support-item
              margin-bottom: 12px
              &:last-child
                margin-bottom: 0px
              .icon
                display: inline-block
                margin-right: 6px
                height: 16px
                width: 16px
                background-size: 16px 16px
                background-repeat: no-repeat
                vertical-align: top
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.special
                  bg-img('special_2')
                &.invoice
                  bg-img('invoice_2')
                &.guarantee
                  bg-img('guarantee_2')
                .text
                  line-height: 16px
                  font-size 12px
                  font-weight: 200

          .bulletin
            width: 80%
            margin: 0 auto
            padding: 0 2px
            line-height: 24px;
            font-size 12px
            font-weight: 200;
      .detail-close
        position: relative
        height: 32px
        width: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
