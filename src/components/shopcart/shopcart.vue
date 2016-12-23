<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <!--注意class的语法-->
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <span class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount >0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">{{totalPrice}}元</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payTotal}}</div>
      </div>
    </div>
    <div class="ball-wrapper">
      <!--能用transition尽量用,不要使用group-->
      <transition name="drop" v-for="(ball, index) in balls" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: []
      }
    },
    props: {
      selectFood: {
        type: Array,
        default () {
          return [
            {
              price: 30,
              count: 2
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFood.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFood.forEach((food) => {
          count += food.count
        })
        return count
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      payTotal () {
        if (this.totalPrice === 0) {
          return `${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差${this.minPrice - this.totalPrice}元起送`
        } else {
          return '去结算'
        }
      }
    },
    methods: {
      beforeEnter (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - 22 - rect.top)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
        done()
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.el = el
            ball.show = true
            this.dropBalls.push(ball)
            return
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    background: #000
    .content
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      font-size 0px
      .content-left
        flex: 1
        .logo-wrapper
          position: relative
          display: inline-block
          top: -10px
          width: 56px
          height: 56px
          vertical-align: top
          margin: 0 12px
          padding: 6px
          box-sizing: border-box
          border-radius: 50%
          /*必须设置,否则不显示*/
          background: #141d27
          .logo
            height: 100%
            width: 100%
            border-radius: 50%
            background: #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              line-height: 44px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            right: 0
            top: 0
            width: 24px
            height: 16px
            line-height: 16px
            border-radius 12px
            text-align center
            font-size 9px
            color: #fff
            font-weight: 700
            background rgb(240, 20, 20)
            box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
        /*文字垂直居中*/
        .desc
          display: inline-block
          padding: 0 12px
          font-size 10px
          line-height: 24px;
          color: rgba(255, 255, 255, 0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          color: rgba(255, 255, 255, 0.4)
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-wrapper
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
        &.drop-leave-active
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
</style>
