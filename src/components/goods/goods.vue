<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-if="item.type >0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in goods" class="good-item food-list-hock">
          <h1 class="title"> {{ item.name }} </h1>
          <ul>
            <li class="food-item" v-for="food in item.foods">
              <div class="food-wrapper">
                <div class="icon">
                  <img width="57px" height="57px" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name"> {{ food.name }} </h2>
                  <p class="description"> {{ food.description }} </p>
                  <div class="extra">
                    <span class="count"> 月售{{ food.sellCount }}份 </span>
                    <span class="ratings"> 好评率{{ food.rating }} </span>
                  </div>
                  <div class="price">
                    <span class="now"> ¥{{ food.price }} </span>
                    <span v-if="food.oldPrice" class="oldPrice"> ¥{{ food.oldPrice }} </span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @cartadd="cartAdd" :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>

        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-food="selectFood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      shopcart,
      cartcontrol
    },
    data () {
      return {
        goods: [],
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        scrollY: 0,
        listHeight: []
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let heightSmall = this.listHeight[i]
          let heightBig = this.listHeight[i + 1]
          if (!heightBig || (this.scrollY >= heightSmall && this.scrollY < heightBig)) {
            return i
          }
        }
        return 0
      },
      selectFood () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.errno === 0) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._caculateHeight()
          })
        }
      })
    },
    methods: {
      cartAdd (target) {
        this.$refs.shopcart.drop(target)
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let goodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hock')
        let el = goodList[index]
        this.goodsScroll.scrollToElement(el, 300)
      },
      _caculateHeight () {
        let height = 0
        let goodlist = this.$refs.goodsWrapper.getElementsByClassName('food-list-hock')
        this.listHeight.push(height)
        for (let i = 0; i < goodlist.length; i++) {
          let item = goodlist[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _initScroll () {
        this.mentScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
          click: true,
          probeType: 3
        })

        this.goodsScroll.on('scroll', (position) => {
          this.scrollY = Math.abs(Math.round(position.y))
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    position: absolute
    display: flex
    top: 174px
    left: 0px
    bottom: 48px
    overflow hidden
    .menu-wrapper
      flex: 0 0 80px
      /*兼容性*/
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        font-size 12px
        font-weight: 200
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, 0.1))
        .icon
          display: inline-block
          vertical-align top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size 12px 12px
          background-repeat: no-repeat
          font-size: 12px
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.special
            bg-img('special_3')
          &.invoice
            bg-img('invoice_3')
          &.guarantee
            bg-img('guarantee_3')

    .goods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-wrapper
        display: flex
        margin: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        padding-bottom: 18px
        &:last-child
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
          img
            border-radius 4px
        .content
          flex: 1
          .name
            font-size: 14px
            font-weight: 700
            height: 14px
            line-height: 14px
            color: rgb(7, 17, 27)
            margin: 2px 0 8px 0
          .description
            font-size 10px
            color: rgb(147, 153, 159)
            line-height: 10px;
            margin-bottom: 8px
          .extra
            font-size 10px
            color: rgb(147, 153, 159)
            line-height: 10px;
            margin-bottom: 8px
            .sellCount
              margin-right: 12px
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


          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
