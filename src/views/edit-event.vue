<template>
    <div class="edit" v-if="values.length > 0">
        <breadcrumb :name="name" class="bread"></breadcrumb>
        <label for="">
            学院活动ID:
            <a class="button">获取学院数据</a>
            <input type="text" name="head" v-model="courseId" :value="name">
        </label>
        <label for="">
            <p>请选择缩略图:</p>
            <input type="file" name="file" @change="getFile($event)" ref="file" value="12" />
            <input type="text" name="fileVal" v-model="thumb">
            <a @click="uploadImg" class="button">提交</a>
        </label>
        <label for="" v-for="(name,index) in inputs" :key="index" v-show="inputs.length>0">
            {{ name }}
            <div v-if="name === '活动详情' " id="editor" style="margin-top: 10px">
    
            </div>
            <div v-else-if="name === '讲师描述' " id="teacherEditor" style="margin-top: 10px">
    
            </div>
            <input v-else-if="name === '报名截止时间'" type="datetime-local" name="head" v-model="values[index]" :value="values[index]">
            <input v-else type="text" name="head" v-model="values[index]" :value="name">
        </label>
        <div>
            <input type="checkbox" name="show" id="show" v-model="isShow">
            <label for="show">是否可见</label>
        </div>
        <div>
            <input type="checkbox" name="show" id="end" v-model="isEnd">
            <label for="end">是否结束</label>
        </div>
        <a @click="saveBlog" class="button">保存</a>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import Vue from 'vue'
import { apiUrl } from 'common/js/dom'
import axios from 'axios'
import wangEditor from 'wangeditor'
let qs = require('qs');
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
            name: 'Edit',
            inputs: [],
            values: [],
            isShow: false,
            isEnd: false,
            file: '',
            thumb: '',
            editor: [0, 1],
            editorCont: '',
            tEditorCont: '',
            singleUrl: '',
            courseId: 0,
            startTime: {
                time: ''
            },
            id: 0,

        }
    },
    watch: {
        values(val) {
            console.log(val)
        },
        selected(val) {
            console.log(val)
        },
        checked(val) {
            console.log(val)
        }
    },
    created() {
        this.addEl()
        this.values[2] = dateFormat
        //console.log(this.hasEditor)
    },
    mounted() {
        this.createEditor('#editor', 0, this.editorCont)
        this.createEditor('#teacherEditor', 1, this.tEditorCont)
        if (this.singleUrl) {
            this.pushCont()
        }
    },
    components: {
        breadcrumb
    },
    methods: {
        addEl() {
            let data = this.$route.query

            if (data.url) {
                this.singleUrl = data.url
            }

            for (let i = 0; i < data.inputs.length; i++) {
                Vue.set(this.values, i, '')
                Vue.set(this.inputs, i, data.inputs[i])
            }

        },
        getFile(event) {
            this.file = event.target.files[0];
        },
        pushCont() {
            this.$http.get(this.singleUrl, {
                withCredentials: true
            }).then((res) => {
                let info = res.data.data
                let product = info.productCode ? info.productCode : 0
                console.log(info)
                this.courseId = info.courseId
                this.id = info.id
                this.thumb = info.thumb
                this.values[0] = info.title
                this.values[1] = info.eventTime
                this.values[2] = info.signupEndTime.split(' ').join('T')
                this.values[3] = info.category
                this.values[4] = info.suitablePeople
                this.editor[0].txt.html(info.content)
                this.values[6] = info.address
                this.values[7] = info.lecturer
                this.values[8] = info.lecturerTitle
                this.values[9] = info.lecturerThumb
                this.editor[1].txt.html(info.lecturerDesc)
                this.isShow = info.isShow === 1 ? true : false
                this.isEnd = info.isEnd === 1 ? true : false
            })
        },
        saveBlog() {
            let stateVal = this.isShow ? 1 : 0
            let endVal = this.isEnd ? 1 : 0

            let event = {
                'courseId': this.courseId,
                'title': this.values[0],
                'eventTime': this.values[1],
                'signupEndTime': this.values[2],
                'category': this.values[3],
                'suitablePeople': this.values[4],
                'content': this.editor[1].txt.html(),
                'address': this.values[6],
                'lecturer': this.values[7],
                'lecturerTitle': this.values[8],
                'lecturerThumb': this.values[9],
                'lecturerDesc': this.editor[1].txt.html()
            }

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            console.log(event)
            if (this.singleUrl) {
                let event2 = {
                    'id': this.id,
                    'title': this.values[0],
                    'eventTime': this.values[1],
                    'signupEndTime': this.values[2],
                    'category': this.values[3],
                    'suitablePeople': this.values[4],
                    'content': this.editor[1].txt.html(),
                    'address': this.values[6],
                    'lecturer': this.values[7],
                    'lecturerTitle': this.values[8],
                    'lecturerThumb': this.values[9],
                    'lecturerDesc': this.editor[1].txt.html()
                }
                this.$http.put(`${apiUrl}/admin/patsnap/event`, qs.stringify(event2), {
                    withCredentials: true
                }).then(function (res) {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                this.$http.post(`${apiUrl}/admin/patsnap/event`, qs.stringify(event), {
                    withCredentials: true
                }).then(function (res) {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }

        },
        uploadImg() {
            let formData = new FormData();
            formData.append('file', this.file);

            let _this = this

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            this.$http.post(`${apiUrl}/admin/file_manager/attachments/uploadImage`, formData, {
                withCredentials: true
            }, config).then(function (res) {
                console.log(res)
                _this.thumb = res.data.data[0]
            }).catch((err) => {
                console.log(err)
                // this.$router.push({
                //     name: 'login'
                // })
            })
        },
        createEditor(id, i, content) {
            this.editor[i] = new wangEditor(id)
            let _this = this
            this.editor[i].customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'
            ]
            this.editor[i].customConfig.customUploadImg = function (files, insert) {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法
                let formData = new FormData();
                formData.append('file', files[0]);
                let imgUrl;
                console.log(files[0])
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                _this.$http.post(`${apiUrl}/admin/file_manager/attachments/uploadImage`, formData, {
                    withCredentials: true
                }, config).then(function (res) {
                    imgUrl = res.data.data[0]
                    insert('/static/callout.jpg')
                }).catch((err) => {
                    console.log(err)

                })

            }
            this.editor[i].customConfig.onchange = (html) => {
                content = html
            }

            this.editor[i].create()
        },
    }

};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.edit
    label
        display : block
        width : 100%
        margin : 10px 0
        &.inline
            display : inline-block
            input
                display : inline-block
                width : 60px
        textarea
            width: 100%
            margin : 10px 0
        input
            width : 100%
            height : 30px
            margin : 10px 0
            &[type='file']
                width : 70px
                border: none
            &[name='fileVal']
                display : inline-block
                width : 70%
                margin-right : 20px
        select
            width : 100%
            margin : 10px 0
            height : 30px
            font-size : 18px
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
    #editor        
            h1 
                font-size: 36px
                font-weight : 500
            h2 
                font-size: 30px
                font-weight : 500
            h3 
                font-size: 24px
                font-weight : 500
            h4 
                font-size: 18px
                font-weight : 500
            h5 
                font-size: 14px
                font-weight : 500
            ol
                list-style : decimal
                li
                    list-style : decimal
            ul 
                list-style : disc
                li
                    list-style : disc
</style>