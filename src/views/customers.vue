<template>
    <div class="articles">
        <breadcrumb :name="name"></breadcrumb>
        <div class="edit-box">
            <edit-button :name="buttonName" :query="query"></edit-button>
            <search v-if="options.length > 0" class="search-keywords" :options="options" @option-change="optionChange"></search>
            <search-input class="search-keywords" type="title" @search="searchType"></search-input>
            <search-input class="search-keywords" type="auth" @search="searchType"></search-input> 
        </div>
        <tablebox :theads="showTheads" class="table-box" @thClick="sortTable" :bigTh="bigTh">
            <tr v-for="(value, key, index) in tables" v-show="tables.id[index]">
                <td v-for="(th, num) in theads" :class="{big: num === bigTh, id: num === 0}" v-if="th !== 'actions'">
                    {{tables[th][index]}}
                </td>
                <td v-else>
                    <v-actions where="patsnap" :type="name" :id="tables.id[index]" :query="query"></v-actions>
                </td>
            </tr>
        </tablebox>
        <pagination v-if="totalPages > 0" :showPages="showPages" :totalPages="totalPages" @pageChange="pageChange"></pagination>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import editButton from 'components/edit-button'
import tablebox from 'components/table-box'
import pagination from 'components/pagination'
import search from 'components/search'
import searchInput from 'components/search-input'
import vActions from 'components/actions'

import { apiUrl } from 'common/js/dom'
import { getPageUrl, getSortUrl, getOriginUrl, getSystemCodenameUrl, getSystemOriginUrl } from 'common/js/apiUrl.js'

import { getSmallKeywords } from 'api/seo'
import { getCurrentTable } from 'api/getTable'
import { getTotalPages } from 'api/getPages'

export default {
    data() {
        return {
            name: 'customers',
            bigTh: 2,
            showPages: 0,
            totalPages: 0,
            options: [],
            optionsId: [],
            selectedOption: '',
            selectedPage: 1,
            selectedHead: 'id',
            direction: 'asc',
            showTheads: ['ID', '标题', 'logo', '分类', '作者', '状态', '创建时间', '更新时间', '操作'],
            theads: ['id', 'title', 'logo', 'categorValue', 'auth', 'statusValue', 'created', 'updated', 'actions'],
            tables: {
                'id': [],
                'title': [],
                'logo': [],
                'categorValue': [],
                'auth': [],
                'statusValue': [],
                'created': [],
                'updated': []
            },
            big: 3,
            buttonName: '添加客户案例',
            query: {
                'inputs': ['标题1', '作者'],
                'options01': ['请选择'],
                'type': 'customers'
            }
        }
    },
    created() {
        getSmallKeywords(`${getSystemCodenameUrl(10002)}`, this.options, this.optionsId)
        
        getCurrentTable(this.pageUrl, this.theads, this.tables)
        getTotalPages(getOriginUrl(this.name)).then((res) => {
            this.totalPages = Math.ceil(res.data.total / 20)    
            if (this.totalPages <= 10) {
                this.showPages = this.totalPages
            } else {
                this.showPages = 10
            }
        })
        this.getOptions(this.query.options01, 10002)
    },
    computed: {
        codeNameUrl() {
            return `${getOriginUrl(this.name)}?categor=${this.selectedOption}`
        },
        pageUrl() {
            let pageUrl = getPageUrl(this.name, this.selectedPage)
            return pageUrl
        },
        sortUrl() {
            if (this.selectedHead === 'categorValue') {
                this.selectedHead = 'categor'
            } else if (this.selectedHead === 'statusValue') {
                this.selectedHead = 'status'
            }
            let sortUrl = getSortUrl(this.name, this.selectedHead, this.direction)

            return sortUrl
        }
    },
    watch: {
        selectedOption(val) {
            console.log(val)
            getCurrentTable(this.codeNameUrl, this.theads, this.tables)
            this.showPages = 0
            this.totalPages = 0
            getTotalPages(this.codeNameUrl).then((res) => {
                this.totalPages = Math.ceil(res.data.total / 20)
                console.log(res)
                if (this.totalPages <= 10) {
                    this.showPages = this.totalPages
                } else {
                    this.showPages = 10
                }
            })
        },
        pageUrl(val) {
            getCurrentTable(val, this.theads, this.tables)
        },
        sortUrl(val) {
            getCurrentTable(val, this.theads, this.tables)
        }
    },
    components: {
        breadcrumb,
        pagination,
        tablebox,
        editButton,
        search,
        searchInput,
        vActions
    },
    methods: {
        pageChange(el) {
            this.selectedPage = el
        },
        optionChange(el) {
            console.log(this.optionsId[el])
            this.selectedOption = this.optionsId[el]
        },
        sortTable(el) {
            console.log(el)
            if (el === '操作') {
                return false
            }
            let index = this.showTheads.indexOf(el)
            console.log(index)
            this.selectedHead = this.theads[index]
            this.direction = this.direction === 'desc' ? 'asc' : 'desc'

            console.log(this.selectedHead)
        },
        getOptions(options, id) {
            this.$http.get(getSystemCodenameUrl(id), {
                withCredentials: true
            }).then((res) => {
                console.log(res)
                let info = res.data.data
                for (let key of info) {
                    if (options.indexOf(key.value) < 0) {
                        options.push(key.value)
                    }
                }
            })
        },
        searchType(message, type) {
            console.log(message)
            console.log(type)
            let url = `${this.pageUrl}?categor=${this.selectedOption}&${type}=${message}`

            getCurrentTable(url, this.theads, this.tables)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.articles
    display : flex
    flex-direction : column
    min-height : 100%
    font-size: 14px
    .edit-box
        display : flex
        justify-content : space-between
        align-items : center
        padding: 10px
    .table-box
        flex : 1
        margin-bottom : 10px
        tr
            display : flex
            td
                flex : 1
                padding : 8px
                box-sizing : border-box
                line-height : 20px
                text-align : left
                max-width : 220px
                word-wrap: break-word
                border-bottom : 1px solid $color-input-border
                &.big
                    flex: 2
</style>


