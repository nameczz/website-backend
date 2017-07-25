<template>
    <div class="actions">
        <ul>
            <li>
                <a :href="watchUrl" target="_blank">
                    查看
                </a>
            </li>
            <li>
                <a class="red" @click="deleteCont">
                    删除
                </a>
            </li>
            <li>
                <a @click="changeCont">
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
                return `http://www.zhihuiya.com/${this.type}/view/${this.id}`
            } else if (this.type === 'event') {
                return `http://www.zhihuiya.com/huodong/view/${this.id}`
            } else if (this.type === 'customers') {
                return `http://www.zhihuiya.com/anli/view/${this.id}`
            }
        }
    },
    methods: {
        deleteCont() {
            if (confirm('是否确认删除')) {
                this.$http.delete(this.deleteUrl, {
                    withCredentials: true
                }).then((res) => {
                    alert('删除成功')
                })
            }
        },
        pushQuery() {
            this.query['url'] = getSingleUrl(this.type, this.id)
            console.log(this.query)
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
