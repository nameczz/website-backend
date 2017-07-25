<template>
    <div class="pagination">
        <ul>
            <li @click="controlPage(curPage - 1)">
                <a class="lastPage" :class="{darkLight: curPage === 1}">上一页</a>
            </li>
            <li v-for="(page, index) in pages" @click="controlPage(page)" :key="index">
                <a class="page" :class="{highLight: curPage === page}">{{ page }}</a>
            </li>
            <li @click="controlPage(curPage + 1)">
                <a class="nextPage" :class="{darkLight: curPage === totalPages}">下一页</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        showPages: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        url: {
            type: String
        }
    },
    data() {
        return {
            curPage: 1,
            left: 1,
            right: this.showPages
        };
    },
    computed: {
        // 当前的showPages
        pages() {
            let end = this.totalPages
            let pages = []
            for (let i = this.left; i <= this.right; i++) {
                pages.push(i)
            }
            return pages
        }
    },
    methods: {
        controlPage(page) {
            // point:显示页码的中间值
            let url = this.url + page
            let point = Math.ceil(this.showPages / 2)
            let page_number = page - this.left
            console.log(this.totalPages)
            if (page > this.totalPages) {
                return false;
            } else if (page < 1) {
                return false;
            }
            // 上一页
            if (page < this.left) {
                this.left = this.left - point >= 1 ? this.left - point : 1
                this.right = this.left + this.showPages - 1
            }
            // 下一页
            if (page_number >= point && this.right !== this.totalPages) {
                this.left += point
                this.right = this.left + this.showPages - 1 > this.totalPages ? this.totalPages : this.left + this.showPages - 1
            } 
            if (this.curPage !== page) {
                this.curPage = page;
                console.log(page)
                this.$emit('pageChange', page)
            }
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.pagination
    margin: 0 auto
    text-align : center
    li
        display: inline-block
        &:hover
            background-color: #eee
        .nextPage,.lastPage,.page 
            border: 1px solid #ddd
            text-decoration: none
            float: left
            padding: 8px 12px
            margin-left: -1px
            line-height: 1.5
            color: #337ab7
            cursor: pointer
        .page
            width:34px
            height: 39px
            box-sizing: border-box
            text-align: center
            padding: 0
            line-height: 38px
            &.highLight
                background: #f2f2f2
            &.darkLight
                color: grey;cursor: default
</style>