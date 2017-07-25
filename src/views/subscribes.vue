<template>
    <div class="subscribes">
        <breadcrumb :name="name"></breadcrumb>
    
        <div class="edit-box">
            <a href="http://192.168.38.19:9000/admin/patsnap/subscribes/subscribes_extract" class="button" >{{buttonName}}</a>
        </div>
        <div class="search-box">
            <input type="datetime-local" name="search" v-model="startTime" :value="startTime">
            <span>到</span>
            <input type="datetime-local" name="search" v-model="endTime" :value="endTime">
            <a class="button" @click="submitSearch">搜索</a>
        </div>
        <tablebox :theads="showTheads" class="table-box" @thClick="sortTable" :bigTh="bigTh">
            <tr v-for="(value, key, index) in tables" v-show="tables.id[index]" >
                <td v-for="(th, num) in theads" :class="{big: num === bigTh}" >
                    {{tables[th][index]}}
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
import vActions from 'components/actions'
import { apiUrl } from 'common/js/dom'
import { getCurrentTable } from 'api/getTable'
import { getTotalPages } from 'api/getPages'
import { getPageUrl, getOriginUrl,getSortUrl, getSystemCodenameUrl } from 'common/js/apiUrl.js'

const urlKeywords = `${apiUrl}/admin/patsnap/articles`
var dateFormat = "";

//构造符合datetime-local格式的当前日期
function getFormat() {
    dateFormat = "";
    var nTime = new Date();
    dateFormat += nTime.getFullYear() + "-";
    dateFormat += (nTime.getMonth() + 1) < 10 ? "0" + (nTime.getMonth() + 1) : (nTime.getMonth() + 1);
    dateFormat += "-";
    dateFormat += nTime.getDate() < 10 ? "0" + (nTime.getDate()) : (nTime.getDate());
    dateFormat += "T";
    dateFormat += nTime.getHours() < 10 ? "0" + (nTime.getHours()) : (nTime.getHours());
    dateFormat += ":";
    dateFormat += nTime.getMinutes() < 10 ? "0" + (nTime.getMinutes()) : (nTime.getMinutes());
    dateFormat += ":00";
    return dateFormat
}

export default {
    data() {
        return {
            name: 'subscribes',
            bigTh: 2,
            startTime: '2017-01-01T00:00',
            endTime: '2017-07-01T00:00',
            totalPages: 0,
            showPages: 0,
            options: [],
            optionsId: [],
            selectedPage: 1,
            selectedHead: 'id',
            direction: 'asc',
            showTheads: ['ID', '姓名', '邮箱', '订阅信息', '公司名称', '工作岗位', '联系方式', '提交时间', '搜索渠道', '媒介类型', '关键词', '推广计划', '推广单元', '重复'],
            theads: ['id', 'username', 'useremail', 'indus', 'firmname', 'firmpos', 'usertel', 'createtime', 'utmSource',
                'utmMedium', 'utmTerm', 'utmCampaign', 'utmContent', 'isRepeat'],
            tables: {
                'id': [],
                'username': [],
                'useremail': [],
                'indus': [],
                'firmname': [],
                'firmpos': [],
                'usertel': [],
                'createtime': [],
                'utmSource': [],
                'utmMedium': [],
                'utmTerm': [],
                'utmCampaign': [],
                'utmContent': [],
                'isRepeat': []
            },
            big: 3,
            buttonName: '导出excel',
            query: {
                'inputs': ['标题', '作者'],
                'options01': [],
                'options02': ['请选择']
            }
        }
    },
    created() {
        getCurrentTable(this.pageUrl, this.theads, this.tables)
        getTotalPages(getOriginUrl(this.name)).then((res) => {
            this.totalPages = res.data.total
            if (this.totalPages <= 10) {
                this.showPages = this.totalPages
            } else {
                this.showPages = 10
            }
        })
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
        pageUrl(val) {
            getCurrentTable(val, this.theads, this.tables)
        },
        sortUrl(val) {
            getCurrentTable(val, this.theads, this.tables)
        },
        searchVal(val) {
            console.log(val)
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
            if (el === '操作') {
                return false
            }
            let index = this.showTheads.indexOf(el)
            this.selectedHead = this.theads[index]
            this.direction = this.direction === 'desc' ? 'asc' : 'desc'

        },
        submitSearch() {
            
            console.log(this.startTime)
            console.log(this.endTime)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.subscribes
    display : flex
    flex-direction : column
    min-height : 100%
    font-size: 14px
    .edit-box
        display : flex
        align-items : center
        padding: 10px
    .search-box
        margin : 10px 0
        span
            margin : 0 10px
        .button 
            margin-left : 10px
    .button
            display: inline-block;
            outline: none;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            color : #fff
            background : green
            padding: 10px 20px;
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
                max-width : 120px
                word-wrap: break-word
                padding : 8px
                box-sizing : border-box
                line-height : 20px
                text-align : left
                border-bottom : 1px solid $color-input-border
                &.big
                    flex: 2
</style>


