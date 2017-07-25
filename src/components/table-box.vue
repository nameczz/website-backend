<template>
    <div class="table-box">
        <table>
            <thead>
                <th v-for="(th, index) in theads" :key="th" class="title" :class="{ 'big': index === bigTh, 'none': th === '操作'}" @click="sort(th, index)">
                    {{ th }}
                </th>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        theads: {
            type: Array,
            required: true
        },
        bigTh: {
            type: Number,
            default: 100
        },
        url: {
            type: Array
        }
    },
    methods: {
        sort(name, index){
            this.$emit('thClick', name, index)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.table-box
    table
        width : 100%
        thead
            display : flex
            align-items : center
            width : 100%
            border-bottom: 1px solid $color-input-border
        .title
            flex : 1
            text-align :left
            padding : 8px
            box-sizing : border-box
            color : #08c
            cursor : pointer
            &.big
                flex : 2
            &.none
                color : #000
                cursor : default
</style>
