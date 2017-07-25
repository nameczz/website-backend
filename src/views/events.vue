<template>
    <div class="events">
        <breadcrumb :name="name"></breadcrumb>
        <div class="edit-box">
            <edit-button :name="buttonName" :query="query" navName="editEvent"></edit-button>
        </div>
        <tablebox :theads="showTheads" class="table-box" @thClick="sortTable" :bigTh="bigTh">
            <tr v-for="(value, key, index) in tables" v-show="tables.id[index]">
                <td v-for="(th, num) in theads" :class="{big: num === bigTh}" v-if="th !== 'actions'">
                    {{tables[th][index]}}
                </td>
                <td v-else>
                    <v-actions where="patsnap" :type="name" :id="tables.id[index]" :query="query" nav="editEvent"></v-actions>
                </td>
            </tr>
        </tablebox>
        <pagination v-if="totalPages > 0" :showPages="10" :totalPages="totalPages" @pageChange="pageChange"></pagination>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import editButton from 'components/edit-button'
import tablebox from 'components/table-box'
import pagination from 'components/pagination'
import vActions from 'components/actions'

import { apiUrl } from 'common/js/dom'
import { getCurrentTable } from 'api/getTable'
import { getTotalPages } from 'api/getPages'
import { getPageUrl, getSortUrl, getOriginUrl } from 'common/js/apiUrl.js'

export default {
    data() {
        return {
            name: 'event',
            bigTh: 1,
            totalPages: 0,
            options: [],
            optionsId: [],
            selectedPage: 1,
            selectedHead: 'id',
            direction: 'asc',
            showTheads: ['ID', '标题', '状态', '创建时间', '更新时间', '操作'],
            theads: ['id', 'title', 'statusValue' ,'created', 'updated', 'actions'],
            tables: {
                'id': [],
                'title': [],
                'statusValue': [],
                'created': [],
                'updated': []
            },
            big: 3,
            buttonName: '添加文章',
            query: {
                'inputs': ['标题', '活动时间', '报名截止时间', '活动分类' , '适合人群', '活动详情', 
                '活动地址', '活动讲师', '讲师头衔', '讲师头像', '讲师描述'
                ]
            }
        }
    },
    created() {
        getCurrentTable(this.pageUrl, this.theads, this.tables)
        getTotalPages(getOriginUrl(this.name)).then((res) => {
            this.totalPages = res.data.total
        })
    },
    computed: {
        pageUrl() {
            let pageUrl = getPageUrl(this.name, this.selectedPage)
            return pageUrl
        },
        sortUrl() {
            let sortUrl = getSortUrl(this.name, this.selectedHead, this.direction)

            return sortUrl
        }
    },
    watch: {
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
        vActions
    },
    methods: {
        pageChange(el) {
            this.selectedPage = el
        },
        optionChange(el) {
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.events
    display : flex
    flex-direction : column
    min-height : 100%
    font-size: 14px
    .edit-box
        display : flex
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


