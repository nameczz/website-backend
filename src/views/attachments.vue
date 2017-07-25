<template>
    <div class="attachments">
        <breadcrumb :name="name"></breadcrumb>
        <big-img v-if="showImg" @clickImg="viewImg" :imgSrc="imgSrc"></big-img>
        <tablebox class="tableBox" :theads="theads" :bigTh="bigTh" @thClick="sortDom(el, theads, tables, type, sortUrl, direction)">
            <tr v-for="(value, key, index) in tables" v-show="tables.id[index]">
                <td v-for="(th, num) in theads" :class="{big: num === bigTh}" v-if="th!=='actions'">
                    <img v-if="th === 'img'" :src="tables.path[index]" width="180" alt="图片" @click="showBig($event)" :ref="'img'+index">
                    <span v-else>{{tables[th][index]}}</span>
                </td>
                <td v-else>
                    <v-actions where="patsnap" :type="name" :id="tables.id[index]"></v-actions>
                </td>
                <!-- <td v-else>
                            <img :src="tables.path[index]" width="180" alt="图片" @click="showBig($event)" :ref="'img'+index">
                        </td> -->
            </tr>
        </tablebox>
        <pagination :showPages="10" :totalPages="100"></pagination>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import tablebox from 'components/table-box'
import pagination from 'components/pagination'
import bigImg from 'components/bigImg';
import vActions from 'components/actions'

import { arrSplice, apiUrl } from 'common/js/dom'

import { sortDom } from 'api/sort'
import { getCurrentTable } from 'api/getTable'

const originalUrl = `${apiUrl}/admin/file_manager/attachments`

export default {
    data() {
        return {
            name: 'Attachments',
            theads: ['id', 'img', 'title', 'path', 'actions'],
            tables: {
                'id': [],
                'img': [],
                'path': [],
                'title': [],
                'actions': []
            },
            bigTh: 10,
            type: 'id',
            direction: 'asc',
            showImg: false,
            imgSrc: ''
        }
    },
    created() {
        getCurrentTable(originalUrl, this.theads, this.tables)
    },
    computed: {
        sortUrl() {
            return `${apiUrl}/admin/file_manager/attachments/index/sort:${this.type}/direction:${this.direction}`
        }
    },
    methods: {
        navTo(url) {
            this.$router.push({
                name: url
            })
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
    },
    components: {
        breadcrumb,
        tablebox,
        pagination,
        bigImg,
        vActions
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
