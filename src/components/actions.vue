<template>
    <div class="actions">
        <ul>
            <li>
                <a :href="watchUrl" target="_blank" v-if="type !== 'attachments'">
                    查看
                </a>
            </li>
            <li>
                <a class="red" @click="deleteCont">
                    删除
                </a>
            </li>
            <li>
                <a @click="changeCont" v-if="type !== 'attachments'">
                    编辑
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { apiUrl } from 'common/js/dom'
import { getSingleUrl } from 'common/js/apiUrl.js'

let url = `${apiUrl}/admin`
const s3Url = ' http://www.zhihuiya.com.s3-website.cn-north-1.amazonaws.com.cn/website-mockup'
export default {
    props: {
        url: {
            type: String,
        },
        where: {
            type: String
        },
        type: {
            type: String
        },
        id: {
            type: Number / String
        },
        query: {
            type: Object
        },
        nav: {
            type: String,
            default: 'edit'
        }
    },
    created() {

    },
    computed: {
        deleteUrl() {
            return `${url}/${this.where}/${this.type}/${this.id}`
        },
        changeUrl() {
            return `${url}/${this.where}/${this.type}`
        },
        watchUrl() {
            if (this.type === 'articles') {
                return `${s3Url}/${this.type}/view/${this.id}`
            } else if (this.type === 'event') {
                return `${s3Url}/huodong/view/${this.id}`
            } else if (this.type === 'customers') {
                return `${s3Url}/anli/view/${this.id}`
            } else if (this.type === 'attachments') {
                return `${s3Url}/anli/view/${this.id}`
            }
        }
    },
    methods: {
        deleteCont() {
            if (confirm('是否确认删除')) {
                this.$http.delete(this.deleteUrl, {
                    withCredentials: true
                }).then((res) => {
                    this.$router.go(0)
                })
            }
        },
        pushQuery() {
            console.log(this.query)
            if(this.type === 'code_info'){
                this.query['url'] = this.deleteUrl
            } else {
                this.query['url'] = getSingleUrl(this.type, this.id)
            }
            
            return this.query
        },
        changeCont() {
            this.$router.push({
                name: this.nav,
                query: this.pushQuery()
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.actions
    ul
        li
            display : inline-block
            a
                color : #08c
                cursor : pointer
                &.red
                    color : red
</style>
