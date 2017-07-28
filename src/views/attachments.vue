<template>
    <div class="attachments">
        <breadcrumb :name="name"></breadcrumb>
        <search-input class="search-keywords" type="title" @search="searchType"></search-input>
        <big-img v-if="showImg" @clickImg="viewImg" :imgSrc="imgSrc"></big-img>
        <tablebox class="tableBox" :theads="theads" :bigTh="bigTh" @thClick="sortTable">
            <tr v-for="(value, key, index) in tables" v-show="tables.id[index]">
                <td v-for="(th, num) in theads" :class="{big: num === bigTh}" v-if="th!=='actions'">
                    <img v-if="th === 'img'" :src="tables.path[index]" width="180" alt="图片" @click="showBig($event)" :ref="'img'+index">
                    <span v-else>{{tables[th][index]}}</span>
                </td>
                <td v-else>
                    <v-actions where="file_manager" :type="name" :id="tables.id[index]"></v-actions>
                </td>
                <!-- <td v-else>
                                        <img :src="tables.path[index]" width="180" alt="图片" @click="showBig($event)" :ref="'img'+index">
                                    </td> -->
            </tr>
        </tablebox>
        <pagination v-if="totalPages > 0" :showPages="showPages" :totalPages="totalPages" @pageChange="pageChange"></pagination>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import tablebox from 'components/table-box'
import pagination from 'components/pagination'
import bigImg from 'components/bigImg';
import vActions from 'components/actions'
import searchInput from 'components/search-input'

import { arrSplice, apiUrl } from 'common/js/dom'
import { getTotalPages } from 'api/getPages'

import { sortDom } from 'api/sort'
import { getCurrentTable } from 'api/getTable'

let originalUrl = `${apiUrl}/admin/file_manager/attachments`

export default {
    data() {
        return {
            name: 'attachments',
            theads: ['id', 'img', 'title', 'path', 'actions'],
            tables: {
                'id': [],
                'img': [],
                'path': [],
                'title': [],
                'actions': []
            },
            totalPages: 0,
            showPages: 0,
            selectedPage: 1,
            selectedHead: 'id',
            bigTh: 10,
            type: 'id',
            direction: 'asc',
            showImg: false,
            imgSrc: ''
        }
    },
    created() {
        getCurrentTable(originalUrl, this.theads, this.tables)
        getTotalPages(originalUrl).then((res) => {
            this.totalPages = Math.ceil(res.data.total / 20)    
            if (this.totalPages <= 10) {
                this.showPages = this.totalPages
            } else {
                this.showPages = 10
            }
        })
    },
    computed: {
        sortUrl() {
            return `${apiUrl}/admin/file_manager/attachments/index/sort:${this.selectedHead}/direction:${this.direction}`
        },
        pageUrl() {
            return `${apiUrl}/admin/file_manager/attachments/index/page:${this.selectedPage}/sort:${this.selectedHead}/direction:${this.direction}`
        },
    },
    watch: {
        pageUrl(val) {
            getCurrentTable(val, this.theads, this.tables)
        },
        sortUrl(val) {
            getCurrentTable(val, this.theads, this.tables)
        }
    },
    methods: {
        navTo(url) {
            this.$router.push({
                name: url
            })
        },
         pageChange(el) {
            this.selectedPage = el
        },
        showBig(e) {
            document.body.scrollTop = '100px';
            this.showImg = true;
            // 获取当前图片地址
            this.imgSrc = e.currentTarget.src;
        },
        viewImg() {
            this.showImg = false;
        },
        sortTable(el) {
            if (el === '操作') {
                return false
            }
            let index = this.theads.indexOf(el)
            this.selectedHead = this.theads[index]
            this.direction = this.direction === 'desc' ? 'asc' : 'desc'
        },
        searchType(message, type) {
            console.log(message)
            console.log(type)
            let url = `${originalUrl}?title=${message}`

            getCurrentTable(url, this.theads, this.tables)
        }
    },
    components: {
        breadcrumb,
        tablebox,
        pagination,
        bigImg,
        vActions,
        searchInput
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.attachments
    display : flex
    flex-direction : column
    height : 100%
    font-size: 14px
    .tableBox
        flex: 1
        tr
            display : flex
            td
                flex : 1
                padding : 8px
                line-height : 20px
                text-align : left
                border-bottom : 1px solid $color-input-border
                max-width : 200px
                word-wrap : break-word
                &.big
                    flex: 2
                
            
</style>
