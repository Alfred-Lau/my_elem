<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="decrease " v-show="food.count > 0" @click="decreaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="count" v-show="food.count > 0">{{food.count}}</div>
    <div class="increase icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      },
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }

        this.$emit('cartadd', event.target)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0px
    .decrease
      display: inline-block
      padding: 6px
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
      /*注意相关的四个状态在transition完成之后都是要把内容消除的,所以必须要把基本的样式写好*/
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
        .inner
          transition: all 0.4s linear
      &.move-enter,&.move-leave-active
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .count
      display: inline-block
      width: 12px
      font-size 10px
      color: rgb(147, 153, 159)
      line-height: 24px;
      height: 24px
      vertical-align: top
      padding-top: 6px
    .increase
      display: inline-block
      font-size 24px
      padding: 6px
      color: rgb(0, 160, 220)
      line-height: 24px;


</style>
