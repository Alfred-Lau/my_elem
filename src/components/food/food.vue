<template>
  <transition name="move">
    <div class="food-scroll" ref="foodCard" v-show="showFood">
      <div class="food" >
        <div class="image-header">
          <img :src="food.image">
          <div class="back">
            <i class="icon-arrow_lift" @click="hide"></i>
          </div>
        </div>
        <div class="content">
          <div class="food-content">
            <div class="name">{{food.name}}</div>
            <span class="count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
            <div class="price">
              <span class="now"> ¥{{ food.price }} </span>
              <span v-if="food.oldPrice" class="oldPrice"> ¥{{ food.oldPrice }} </span>
            </div>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
          <div class="cartcontrol-wrapper" v-show="food.count > 0">
            <cartcontrol :food="food"></cartcontrol>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="desc" v-show="food.info">
          <div class="title">商品介绍</div>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <div class="ratingselect-wrapper">
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @ratetype.select="ratetypeselect" @content.toggle="contenttoggle"></ratingselect>
          </div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import ratingselect from 'components/ratingselect/ratingselect'
  import split from 'components/split/split'
  import BScroll from 'better-scroll'
  import Vue from 'vue'

  const ALL = 2

  export default {

    components: {
      cartcontrol,
      split,
      ratingselect
    },
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFood: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      ratetypeselect (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      togglecontent (onlycontent) {
        this.onlyContent = onlycontent
        this.$nextTick(() => {
          // better-scroll选择条件切换之后,需要刷新滚动!!!
          this.scroll.refresh()
        })
      },
      show () {
        this.selectType = ALL
        this.onlyContent = true
        this.showFood = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodCard, {
              click: true
            })
            console.log('new')
          } else {
            console.log('second')
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFood = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        this.$emit('cartadd', event.target)
        Vue.set(this.food, 'count', 1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food-scroll
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index: 1
    background: #fff
    bottom: 48px
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      heieht 0
      /*完成一个未知高度的占位*/
      padding-top: 100%
      /*子元素使用绝对定位*/
      img
        position: absolute
        top: 0
        left 0
        width 100%
        height: 100%

    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow_lift
        display: block
        color: #fff
        /*扩大点击区域*/
        padding: 10px
        font-size 20px
    .content
      padding: 18px
      position: relative
      .food-content
        .name
          margin-bottom: 8px
          font-size 14px
          font-weight: 700
          line-height: 14px
          color rgb(7, 17, 27)
        .count, .rating
          display: inline-block
          margin-bottom: 18px
          height: 10px
          line-height: 10px;
          color: rgb(147, 153, 159)
          font-size 10px
        .count
          margin-right: 12px;
        .price
          .now
            font-size 20px
            color: rgb(147, 153, 159)
            font-weight 700
            line-height: 24px;
            margin-right: 8px
          .oldPrice
            font-size 10px
            line-height: 24px;
            font-weight: 700

      .buy
        position: absolute
        height: 24px
        right: 18px
        bottom: 18px
        border-radius 12px
        background: rgb(0, 160, 220)
        color: #fff
        font-size 10px
        line-height: 24px;
        padding: 0 12px
        box-sizing: border-box
        &.fade-enter-active, &.fade-leave-active
          transition all .2s
        &.fade-leave-active, &fade-enter
          opacity: 0

      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px

    .desc
      padding: 18px
      .title
        margin-bottom: 6px
      .text
        padding: 0 8px
        font-size 12px
        font-weight: 200;
        color: rgb(77, 85, 93)
        line-height: 24px;
    .ratings
      padding-top: 18px;
      .title
        padding-left: 18px
</style>
