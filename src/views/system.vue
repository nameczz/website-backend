<template>
    <div class="system">
        <breadcrumb :name="name"></breadcrumb>
        <div class="search-box">
            <search v-if="options.length > 0" class="search-keywords" :options="options" @option-change="optionChange"></search>
            <span class="execl-in">
                <a @click="showForm('file')" class="button">导入</a>
            </span>
            <span class="new-word">
                <a @click="showForm('new')" class="button">新增</a>
            </span>
            <search-input class="search-keywords" type="infoCode" @search="searchType"></search-input>
            <search-input class="search-keywords" type="value" @search="searchType"></search-input>
        </div>
        <tablebox :theads="theads" class="table-box" @thClick="sortTable">
            <tr v-for="(value, key, index) in tables" v-show="tables.id[index]">
                <td v-for="(th, num) in theads" v-if="th!=='actions'">
                    {{tables[th][index]}}
                </td>
                <td v-else>
                    <v-actions where="system" type="code_info" :id="tables.id[index]" :query="query" nav="file"></v-actions>
                </td>
            </tr>
        </tablebox>
        <pagination v-if="totalPages > 0" :showPages="showPages" :totalPages="totalPages" @pageChange="pageChange"></pagination>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import tablebox from 'components/table-box'
import { arrSplice } from 'common/js/dom'
import pagination from 'components/pagination'
import search from 'components/search'
import searchInput from 'components/search-input'
import vActions from 'components/actions'

import { getCurrentTable } from 'api/getTable'
import { getSeoKeywords } from 'api/seo'
import { getTotalPages } from 'api/getPages'
import { getSystemPageUrl, getSystemSortUrl, getSystemOriginUrl, getSystemCodenameUrl } from 'common/js/apiUrl.js'


export default {
    data() {
        return {
            name: 'SEO 对应码表',
            options: [],
            optionsId: [],
            totalPages: 0,
            showPages: 0,
            selectedOption: 10001,
            selectedPage: 1,
            selectedHead: 'id',
            direction: 'asc',
            theads: ['id', 'infoCode', 'value', 'codeId', 'codeName', 'rank', 'actions'],
            tables: {
                'total': 0,
                'id': [],
                'infoCode': [],
                'value': [],
                'codeId': [],
                'codeName': [],
                'rank': [],
                'actions': []
            },
            big: 3,
            query: {
                codeId: this.selectedOption,
                toDo: 'change'
            }
        }
    },
    created() {
        getSeoKeywords(getSystemOriginUrl(), this.options, this.optionsId)
        getCurrentTable(this.pageUrl, this.theads, this.tables)
        getTotalPages(getSystemOriginUrl()).then((res) => {
            this.totalPages = Math.ceil(res.data.total / 20)
            console.log(res)
            if (this.totalPages <= 10) {
                this.showPages = this.totalPages
            } else {
                this.showPages = 10
            }
        })
    },
    computed: {
        codeNameUrl() {
            return getSystemCodenameUrl(this.selectedOption)
        },
        pageUrl() {
            return getSystemPageUrl(this.selectedPage, this.selectedOption)
        },
        sortUrl() {
            return getSystemSortUrl(this.selectedHead, this.direction, this.selectedOption)
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
        selectedPage(val) {
            console.log(this.pageUrl)
            getCurrentTable(this.pageUrl, this.theads, this.tables)
        },
        direction(val) {
            getCurrentTable(this.sortUrl, this.theads, this.tables)
        }
    },
    components: {
        breadcrumb,
        pagination,
        search,
        searchInput,
        tablebox,
        vActions
    },
    methods: {
        pageChange(el) {
            this.selectedPage = el
        },
        optionChange(el) {
            this.selectedOption = this.optionsId[el]
        },
        showForm() {
            this.$router.push({
                name: 'file',
                query: {
                    codeId: this.selectedOption,
                    toDo: type
                }
            })
        },
        sortTable(el) {
            this.selectedHead = el
            this.direction = this.direction === 'desc' ? 'asc' : 'desc'

            console.log(this.selectedHead)
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
.system
    display : flex
    flex-direction : column
    min-height : 100%
    font-size: 14px
    .search-box
        display : flex
        align-items : center
        padding: 10px
        .search-keywords
            flex: 1
        .execl-in
            flex: 1
        .button
            display: inline-block;
            outline: none;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            color : #fff
            background : green
            padding: 6px 20px;
            text-shadow: 0 1px 1px rgba(0,0,0,.3);
            border-radius: 6px;
            box-shadow: 0 1px 2px rgba(0,0,0,.2);
            &:hover
                cursor : pointer
                background : #51a351
            &:active
                position: relative
                top: 1px
    .table-box
        flex : 1
        margin-bottom : 10px
        tr
            display : flex
            td
                flex : 1
                padding : 8px
                line-height : 20px
                text-align : left
                border-bottom : 1px solid $color-input-border
                &.big
                    flex: 2
</style>
