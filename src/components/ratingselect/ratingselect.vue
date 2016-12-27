<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive"  :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div class="switch" @click="toggleContent">
            <span class="icon-check_circle" :class="{'on': onlyContent}"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE = 0
    const NEGATIVE = 1
    const ALL = 2

    export default {
        props: {
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            },
            ratings: {
                type: Array,
                default() {
                    return []
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            positives () {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE
                })
            },
            negatives () {
                return this.ratings.filter((rating) => {
                    return rating.reteType === NEGATIVE
                })
            }
        },
        methods: {
            select (rateType, event) {
                if (!event._constructed) {
                    return
                }
                this.selectType = rateType
                this.$emit('ratetype.select', rateType)
            },
            toggleContent (event) {
                if (!event._constructed) {
                    return
                }
                this.onlyContent = !this.onlyContent
                this.$emit('content.toggle', this.onlyContent)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'

    .ratingselect
        padding: 18px 18px 12px
        border-bottom: 2px solid rgba(7, 17, 27, 0.1)
        .rating-type
            padding-bottom: 18px
            border-1px(rgba(7, 17, 27, 0.1))
            .block
                display: inline-block
                padding: 8px 12px
                margin-right: 8px
                line-height: 16px
                border-radius: 1px
                font-size: 12px
                color: rgb(77, 85, 93)
                &.active
                    color: #fff
                .count
                    margin-left: 2px
                    font-size: 8px
                &.positive
                    background: rgba(0, 160, 220, 0.2)
                    &.active
                        background: rgb(0, 160, 220)
                &.negative
                    background: rgba(77, 85, 93, 0.2)
                    &.active
                        background: rgb(77, 85, 93)
        .switch
            padding-top: 12px
            .icon-check_circle
                /*行内元素垂直对齐的方式:inline-block+vertical-align*/
                display: inline-block
                vertical-align: top
                margin-right: 4px
                font-size: 24px
                line-height: 24px
                color: rgb(147, 153, 159)
                &.on
                    color: #00c850
            .text
                display: inline-block
                vertical-align: top
                line-height: 24px
                font-size 12px
                color: rgb(147, 153, 159)

</style>
