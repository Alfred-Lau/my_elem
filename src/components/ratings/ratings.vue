<template>
    <div class="mainratings" ref="ratings">
        <div class="content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.serviceScore"></star>
                        </div>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <div class="star-wrapper">
                            <star :size="36" :score="seller.foodScore"></star>
                        </div>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="time">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings" @ratetypeselect="ratetypeselect" @onlytoggle="onlytoggle"></ratingselect>
            <div class="mainrating-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)" class="mianrating-item border-1px"
                        v-for="rating in ratings">
                        <div class="user-avatar">
                            <img :src="rating.avatar" width="28" height="28">
                        </div>
                        <div class="main-content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="desc">
                                <div class="star-wrapper">
                                    <star :size="24" :score="rating.score"></star>
                                </div>
                                <span class="deliverytime"
                                      v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <div class="text">{{rating.text}}</div>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <i class="icon-thumb_up"></i>
                                <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                        </div>
                        <div class="time">{{rating.rateTime | fmtDate}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import split from 'components/split/split'
    import BScroll from 'better-scroll'
    import star from 'components/star/star'
    import ratingselect from 'components/ratingselect/ratingselect'
    import {formatDate} from 'common/js/date'

    const ERR_OK = 0
    const ALL = 2
    export default {
        data () {
            return {
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                },
                ratings: []
            }
        },
        methods: {
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false
                }
                if (this.selectType === ALL) {
                    return true
                } else {
                    return type === this.selectType
                }
            },
            ratetypeselect (type) {
                console.log(type)
                this.selectType = type
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
                // 异步更新
            },
            onlytoggle (onlycontent) {
                this.onlyContent = onlycontent
                // better-scroll选择条件切换之后,需要刷新滚动!!!
                this.$nextTick(() => {
                    this.scroll.refresh()
                })
            }
        },
        props: {
            seller: {
                type: Object
            }
        },
        filters: {
            fmtDate(time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
        created () {
            this.$http.get('/api/ratings').then((res) => {
                res = res.body
                if (res.errno === ERR_OK) {
                    this.ratings = res.data
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.ratings, {click: true})
                        console.log(this.scroll)
                    })
                }
            })
        },
        components: {
            split,
            star,
            ratingselect
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

    .mainratings
        position: absolute
        top: 174px
        left: 0
        /*bottom必须设置为零,因为需要整个视口的大小小于它的第一个子元素,better-scroll才能生效!!!*/
        bottom: 0
        width: 100%
        /*否则会出现滚动条*/
        overflow: hidden
        .overview
            display: flex
            .overview-left
                flex: 0 0 137px;
                width: 137px
                margin 18px 0
                text-align: center
                border-right: 1px solid rgba(7, 17, 27, 0.1)
                @media only screen and (max-width: 320px)
                    flex: 0 0 120px
                    width: 120px
                .score
                    font-size 24px
                    line-height: 28px;
                    color: rgb(255, 153, 0)
                    margin-bottom: 6px
                .title
                    margin-bottom: 8px
                    font-size 12px
                    line-height: 12px;
                    color: rgb(7, 17, 27)
                .rank
                    font-size 10px
                    line-height: 10px
                    color: rgb(147, 153, 159)
                    margin-bottom: 6px
            .overview-right
                flex: 1
                padding: 18px 24px
                @media only screen and (max-width: 320px)
                    padding-left: 6px;
                .score-wrapper
                    margin-bottom: 8px
                    .title
                        display: inline-block
                        vertical-align: top
                        font-size 12px
                        line-height: 18px;
                        color: rgb(7, 17, 27)
                    .star-wrapper
                        display: inline-block
                        vertical-align: top
                        margin: 0 12px
                    .score
                        display: inline-block
                        vertical-align: top
                        font-size 12px
                        line-height: 18px
                        color: rgb(255, 153, 0)
                .delivery-wrapper
                    .title
                        margin-right: 12px
                        font-size 12px
                        line-height: 18px;
                        color: rgb(7, 17, 27)
                    .time
                        font-size 12px
                        line-height: 18px;
                        color: rgb(147, 153, 159)

        .mainrating-wrapper
            margin: 0 18px
            .mianrating-item
                position: relative
                display: flex
                padding: 18px 0
                border-1px(rgba(7, 17, 27, 0.1))
                .user-avatar
                    margin-right: 12px;
                    flex: 0 0 28px
                    width: 28px
                    img
                        border-radius 50%
                .main-content
                    flex: 1
                    .name
                        font-size 10px
                        line-height: 12px;
                        color: rgb(7, 17, 27)
                        margin-bottom: 4px
                    .desc
                        font-size 0px
                        margin-bottom: 6px
                        .star-wrapper
                            display: inline-block
                            vertical-align: top
                            margin-right: 6px
                        .deliverytime
                            display: inline-block
                            vertical-align: top;
                            font-size 10px
                            line-height: 12px
                            font-weight: 200
                            color: rgb(47, 153, 159)
                    .text
                        margin-bottom: 8px
                        font-size 12px
                        line-height: 18px
                        color: rgb(7, 17, 27)
                    .recommend
                        line-height: 16px
                        font-size: 0
                        .icon-thumb_up, .recommend-item
                            display: inline-block
                            margin: 0 8px 4px 0
                            font-size: 9px
                        .icon-thumb_up
                            color: rgb(0, 160, 220)
                        .recommend-item
                            padding: 0 6px
                            border: 1px solid rgba(7, 17, 27, 0.1)
                            border-radius: 1px
                            color: rgb(147, 153, 159)
                            background: #fff
                .time
                    position: absolute
                    top: 18px
                    right: 18px
                    font-size 10px
                    line-height: 12px;
                    color: rgb(47, 153, 159)

</style>
