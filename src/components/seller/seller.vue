<template>
    <div class="seller" ref="seller">
        <div class="content">
            <div class="overview">
                <div class="main-content">
                    <h1 class="title">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <div class="star">
                            <star :size="36" :score="seller.score"></star>
                        </div>
                        <span class="text">({{seller.ratingCount}})</span>
                        <span class="text">月售{{seller.sellCount}}单</span>
                    </div>
                </div>
                <div class="extra-content">
                    <ul>
                        <li class="item">
                            <h1 class="name">起送价</h1>
                            <span class="number">{{seller.minPrice}}</span>元
                        </li>
                        <li class="item">
                            <h1 class="name">商家配送</h1>
                            <span class="number">{{seller.deliveryPrice}}</span>元
                        </li>
                        <li class="item">
                            <h1 class="name">平均配送时间</h1>
                            <span class="number">{{seller.deliveryTime}}</span>分钟
                        </li>
                    </ul>
                </div>
                <div class="favorite" @click="toggleFavorite">
                    <i class="icon-favorite" :class="{'active': favorite}"></i>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin-wrapper">
                <div class="bulletin">
                    <h1 class="title">公告与活动</h1>
                    <div class="content">
                        <p class="main">{{seller.bulletin}}</p>
                    </div>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item" v-for="item in seller.supports">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="description">
                {{ item.description }}
              </span>
                    </li>
                </ul>

                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref="picWrapper">
                    <ul class="pic-list" ref="picList">
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="item" v-for="item in seller.infos">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from 'components/star/star'
    import split from 'components/split/split'
    import BScroll from 'better-scroll'
    import {loadFromLocal, saveToLocal} from 'common/js/store'

    export default {
        data () {
            return {
                classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                favorite: (() => {
                  return loadFromLocal(this.seller.id, 'favorite', false)
                })()
            }
        },
        computed: {
          favoriteText () {
            return this.favorite ? '已收藏' : '收藏'
          }
        },
        components: {
            star,
            split
        },
        watch: {
            seller () {
                this._initScroll()
                this._initPics()
            }
        },
        props: {
            seller: {
                type: Object
            }
        },
        created () {

        },
        // 先于watch执行
        mounted () {
            this._initScroll()
            this._initPics()
        },
        methods: {
            _initPics () {
                if (this.seller.pics) {
                    let picWidth = 120
                    let margin = 6
                    let width = (picWidth + margin) * this.seller.pics.length - margin
                    this.$refs.picList.style.width = width + 'px'
                    this.$nextTick(() => {
                        if (!this.picScroll) {
                            this.picScroll = new BScroll(this.$refs.picWrapper, {
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            })
                        } else {
                            this.picScroll.refresh()
                        }
                    })
                }
            },
            _initScroll () {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            },
            toggleFavorite (event) {
              if (!event._constructed) {
                return
              }
              this.favorite = !this.favorite
              saveToLocal(this.seller.id, 'favorite', this.favorite)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .seller
        position: absolute
        top: 174px
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        .overview
            padding: 18px
            .main-content
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                .title
                    margin-bottom: 8px;
                    font-size 14px
                    line-height: 14px;
                    color: rgb(7, 17, 27)
                    font-weight: 700
                .star-wrapper
                    font-size 0px
                    line-height: 18px;
                    .star
                        display: inline-block
                        vertical-align: top
                        margin-right: 8px;
                    .text
                        display: inline-block
                        vertical-align: top
                        font-size 10px
                        color: rgb(77, 85, 93)
                    .text:nth-child(2)
                        margin-right: 12px;
            .extra-content
                margin-top: 18px
                ul
                    display: flex
                    .item
                        flex: 1
                        display: inline-block
                        text-align center
                        border-right: 1px solid rgba(7, 17, 27, 0.1)
                        &:last-child
                            border: none
                        .name
                            margin-bottom: 4px
                            font-size 10px
                            line-height: 10px;
                            color: rgb(47, 153, 159)
                        .number
                            font-size 24px
                            font-weight: 200
                            line-height: 24px;
                            color: rgb(7, 17, 27)

            .favorite
                position: absolute
                top: 18px
                right: 11px
                width: 50px
                text-align center
                .icon-favorite
                    display block
                    font-size 24px
                    line-height: 24px;
                    color: #d4d6d9
                    margin-bottom: 4px;
                    &.active
                        color rgb(240, 20, 20)
                .text
                    font-size 10px
                    line-height: 10px
                    color rgb(77, 85, 93)
        .bulletin-wrapper
            margin-top: 18px;
            .bulletin
                margin: 0 auto
                width: 80%
                padding-bottom: 16px
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                .title
                    margin-bottom: 8px
                    font-size 14px
                    line-height: 14px;
                    color: rgb(7, 17, 27)
                    font-weight: 700
                .content
                    margin: 0 12px
                    .main
                        font-size 12px
                        line-height: 24px;
                        font-weight: 200;
                        color: rgb(240, 20, 20)
            .supports
                width: 80%
                margin: 0 auto
                .support-item
                    padding: 16px 12px
                    border-bottom: 1 solid rgba(7, 17, 27, 0.1)
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
                            bg-img('decrease_4')
                        &.discount
                            bg-img('discount_4')
                        &.special
                            bg-img('special_4')
                        &.invoice
                            bg-img('invoice_4')
                        &.guarantee
                            bg-img('guarantee_4')
                        .text
                            line-height: 16px
                            font-size 12px
                            font-weight: 200
                            color: rgb(7, 17, 27)

        .pics
            padding: 18px
            .title
                margin-bottom: 12px;
                font-size 14px
                line-height: 14px;
                color: rgb(7, 17, 27)
                font-weight: 700
            .pic-wrapper
                width: 100%
                overflow: hidden
                white-space: nowrap
                .pic-list
                    font-size 0px
                    .pic-item
                        display: inline-block
                        margin-right: 6px;
                        width: 120px
                        height: 90px
                        &:last-child
                            margin: 0

        .info
            padding: 18px
            .title
                margin-bottom: 8px;
                font-size 14px
                line-height: 14px;
                color: rgb(7, 17, 27)
                font-weight: 700
            .item
                padding: 16px 12px
                border-top: 1px solid rgba(7, 17, 27, 0.1)
                font-size 12px
                line-height: 16px;
                font-weight: 200
                color: rgb(7, 17, 27)

</style>
