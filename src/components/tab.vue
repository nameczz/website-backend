<template>
    <div class="tab">
        <ul>
            <li  v-for="(father, fatherNum) in fathers" :key="fatherNum" class="options">
                <a class="option" @click="toggle(fatherNum)">
                    {{ father }}
                </a>
                <div class="container" ref="container">
                    <ul>
                        <li v-for="(child, index) in children[fatherNum]" :key="index" class="details" >
                            <a class="detail" @click="navTo(child)">
                                {{ child }}
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    props: {
        // 数组
        fathers: {
            type: Array,
            required: true
        },
        // 二维数组 和 fathers对应
        children: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            show: []
        }
    },
    created() {
        this.initShow()
    },
    methods: {
        // 展开伸缩 如果用display none的话 难以获取高度，直接用高度进行transition较为方便
        toggle(num) {
            for (let i = 0; i < this.show.length; i++) {
                if (i !== num) {
                    let current = this.$refs.container[i]
                    this.show[i] = false
                    current.style.height = '0px'
                } else {
                    let height = 37 * this.children[i].length + 'px'
                    let current = this.$refs.container[i]
                    current.style.height = !this.show[i] ? height : '0px'
                    this.show[num] = !this.show[num]
                }
            }
        },
        initShow() {
            for (let i = 0; i < this.children.length; i++) {
                this.show[i] = false
            }
        },
        navTo(url) {
            console.log(url)
            this.$router.push({
                name: url
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.tab
    .options
        background : $color-head-background
        border-bottom : 1px solid $color-tab-border
        .option, .detail
            display : block
            padding : 10px 15px
            cursor : pointer
        .container
            height: 0
            overflow: hidden
            transition: height 0.4s
        .details
            background : $color-detail-background
            
            .detail
                text-align : center
                border-bottom : 1px solid $color-tab-border
</style>
