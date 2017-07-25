<template>
    <div class="articles">
        <breadcrumb :name="name"></breadcrumb>
        <div class="edit-box">
            <edit-button class="edit" :name="buttonName" :query="query"></edit-button>
            <search v-if="options.length > 0" class="search-keywords" :options="options" @option-change="optionChange"></search>
    
            <!-- <search-input class="search-keywords" type="title" @search="searchType"></search-input>
                <search-input class="search-keywords" type="categorValue" @search="searchType"></search-input> -->
        </div>
        <tablebox :theads="showTheads" class="table-box" @thClick="sortTable" :bigTh="bigTh">
            <tr v-for="(value, key, index) in tables" v-show="tables.id[index]">
                <td v-for="(th, num) in theads" :class="{big: num === bigTh}" v-if="th !== 'actions'">
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
import { getCurrentTable } from 'api/getTable'
import { getTotalPages } from 'api/getPages'
import { getPageUrl, getSortUrl, getSystemCodenameUrl } from 'common/js/apiUrl.js'
import { getSmallKeywords } from 'api/seo'

const urlKeywords = `${apiUrl}/admin/patsnap/articles`

export default {
    data() {
        return {
            name: 'articles',
            bigTh: 1,
            totalPages: 0,
            showPages: 0,
            options: [],
            optionsId: [],
            selectedOption: '',
            selectedPage: 1,
            selectedHead: 'id',
            direction: 'asc',
            showTheads: ['ID', '标题', '类型', '产品', '作者', '状态', '创建时间', '更新时间', '操作'],
            theads: ['id', 'title', 'categorValue', 'productCodeValue', 'auth', 'statusValue', 'created', 'updated', 'actions'],
            tables: {
                'id': [],
                'title': [],
                'categorValue': [],
                'productCodeValue': [],
                'auth': [],
                'statusValue': [],
                'created': [],
                'updated': []
            },
            big: 3,
            buttonName: '添加文章',
            query: {
                'inputs': ['标题', '作者'],
                'options01': [],
                'options02': ['请选择']
            }
        }
    },
    created() {
        getSmallKeywords(`${getSystemCodenameUrl(10001)}`, this.options, this.optionsId)
        getCurrentTable(this.pageUrl, this.theads, this.tables)
        getTotalPages(urlKeywords).then((res) => {
            this.totalPages = res.data.total
            if (this.totalPages <= 10) {
                this.showPages = this.totalPages
            } else {
                this.showPages = 10
            }
        })
        this.getOptions(this.query.options01, 10001)
        this.getOptions(this.query.options02, 10006)
    },
    computed: {
        pageUrl() {
            let pageUrl = getPageUrl(this.name, this.selectedPage)
            return pageUrl
        },
        sortUrl() {
            if (this.selectedHead === 'categorValue') {
                this.selectedHead = 'categor'
            } else if (this.selectedHead === 'statusValue') {
                this.selectedHead = 'status'
            } else if (this.selectedHead === 'productCodeValue') {
                this.selectedHead = 'productCode'
            }
            let sortUrl = getSortUrl(this.name, this.selectedHead, this.direction)

            return sortUrl
        }
    },
    watch: {
        selectedOption(val) {
            console.log(val)
            getCurrentTable(this.codeNameUrl, this.theads, this.tables)
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
        vActions,
        search,
        searchInput
    },
    methods: {
        pageChange(el) {
            this.selectedPage = el
        },
        optionChange(el) {
            this.selectedOption = this.optionsId[el]
        },
        sortTable(el) {
            if (el === '操作') {
                return false
            }
            let index = this.showTheads.indexOf(el)
            this.selectedHead = this.theads[index]
            this.direction = this.direction === 'desc' ? 'asc' : 'desc'

        },
        getOptions(options, id) {
            this.$http.get(getSystemCodenameUrl(id), {
                withCredentials: true
            }).then((res) => {
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
            let url = `${getSystemCodenameUrl(this.selectedOption)}&${type}=${message}`

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
                border-bottom : 1px solid $color-input-border
                &.big
                    flex: 2
</style>


