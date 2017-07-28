<template>
    <div class="edit" v-if="values.length > 0">
        <breadcrumb :name="name" class="bread"></breadcrumb>
        <label for="">
            <p>请选择缩略图:</p>
            <input type="file" name="file" @change="getFile($event)" ref="file" value="12" />
            <input type="text" name="fileVal" v-model="thumb">
            <a @click="uploadImg" class="button">提交</a>
        </label>
        <label for="" v-for="(name,index) in inputs" :key="index" v-show="inputs.length>0">
            {{ name }}
            <input type="text" name="head" v-model="values[index]" :value="name">
        </label>
        <div :ref="editor" id="editor">
        </div>
        <label for="" v-for="(value, key, index) in selects" :key="index" v-if="value">
            {{ key}}
            <select :name="`select${index}`"  v-model="selected[index]">
                <option value="" v-for="(option, num) in value" :key="num" :value="num">
                    {{ option }}
                </option>
            </select>
        </label>
        <div>
            <input type="checkbox" name="show" id="show" v-model="isShow">
            <label for="show" class="isShow">是否可见</label>
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

export default {
    // values---input value    selected---selected value
    // thumb 图片路径 editor 编辑器对象 editorContent 编辑内容 singleUrl 请求单文api
    // inputs 输入框 selects 
    data() {
        return {
            name: 'Edit',
            type: '',
            inputs: [],
            selects: {
                '分类': [],
                '所属产品': []
            },
            values: [],
            selected: [0, 0],
            isShow: false,
            file: '',
            thumb: '',
            index: 0,
            editor: '',
            editorContent: '',
            singleUrl: '',
            id: 0
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
        },
        editorContent(val) {
            console.log(val)
        }
    },
    created() {
        this.addEl()
        //console.log(this.hasEditor)
    },
    mounted() {
        console.log(this.hasEditor)
        this.createEditor()
        // 编辑文件 分类没有请选择这个 所有value－1
        if (this.singleUrl) {
            this.$http.get(this.singleUrl, {
                withCredentials: true
            }).then((res) => {
                let info = res.data.data
                let product = info.productCode ? info.productCode : 0
                console.log(info)
                Vue.set(this.values, 0, info.title)
                Vue.set(this.values, 1, info.auth)
                Vue.set(this.selected, 0, info.categor - 1)
                Vue.set(this.selected, 1, product)
                this.thumb = info.thumb || info.logo
                this.isShow = info.status === 1 ? true : false
                this.id = info.id
                this.editor.txt.html(info.body)
            })
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
            console.log(data)
            this.type = data.type

            for (let i = 0; i < data.inputs.length; i++) {
                Vue.set(this.values, i, '')
                Vue.set(this.inputs, i, data.inputs[i])
            }
            for (let key in this.selects) {
                if (key === '分类') {
                    this.selects[key] = data.options01
                } else {
                    this.selects[key] = data.options02
                }
            }

        },
        getFile(event) {
            this.file = event.target.files[0];
        },
        // 看下optionchange还有用没
        // optionChange(event) {
        //     let value = event.target.value
        //     let name = event.target.name
        //     console.log(event)
        //     if (name === 'select0') {
        //         Vue.set(this.selected, 0, value)
        //     } else {
        //         Vue.set(this.selected, 1, value)
        //     }
        // },
        createEditor() {
            this.editor = new wangEditor('#editor')
            let _this = this
            this.editor.customConfig.menus = [
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
            this.editor.customConfig.customUploadImg = function (files, insert) {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法
                let formData = new FormData();
                formData.append('file', files[0]);
                let imgUrl;
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                _this.$http.post(`${apiUrl}/admin/file_manager/attachments/uploadImage`, formData, {
                    withCredentials: true
                }, config).then(function (res) {
                    imgUrl = res.data.data[0]
                    insert(imgUrl)
                }).catch((err) => {
                    console.log(err)

                })

            }
            this.editor.customConfig.onchange = (html) => {
                _this.editorContent = html
            }
            this.editor.create()
        },
        saveBlog() {
            let stateVal = this.isShow ? 1 : 0
            let _this = this

            let article = {
                'title': this.values[0],
                'auth': this.values[1],
                'type': 'node',
                'categor': this.selected[0] + 1,
                'productCode': this.selected[1],
                'thumb': this.thumb,
                'logo': this.thumb,
                'status': stateVal,
                'body': this.editor.txt.html()
            }

            let config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }

            if (this.singleUrl && this.id) {
                let article2 = {
                    'id': this.id,
                    'title': this.values[0],
                    'auth': this.values[1],
                    'categor': this.selected[0] + 1,
                    'productCode': this.selected[1],
                    'thumb': this.thumb,
                    'logo': this.thumb,
                    'status': stateVal,
                    'body': this.editor.txt.html()
                }
                this.$http.put(`${apiUrl}/admin/patsnap/${_this.type}`, qs.stringify(article2), {
                    withCredentials: true
                }).then(function (res) {
                    if (res.data.status === 1) {
                        alert('修改完成')
                        _this.$router.go(-1)
                    } else {
                        alert('修改失败')
                    }
                }).catch((err) => {
                    alert('提交失败，请重试')
                    console.log(err)
                })
            } else {
                this.$http.post(`${apiUrl}/admin/patsnap/${_this.type}`, qs.stringify(article), {
                    withCredentials: true
                }).then(function (res) {
                    if (res.data.status === 1) {
                        alert('修改完成')
                        _this.$router.go(-1)
                    } else {
                        alert('修改失败')
                    }

                }).catch((err) => {
                    alert('提交失败，请重试')
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

                if (res.data.errno == '0') {
                    alert('图片提交成功')
                    _this.thumb = res.data.data[0]
                } else {
                    alert('图片提交失败')
                }
                
            }).catch((err) => {
                alert('图片提交失败')
      
            })
        }
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
    .isShow
        display: inline-block
        width: 40%
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
            .w-e-text        
                
                ol
                    list-style : decimal
                    li
                        list-style : decimal
                ul 
                    list-style : disc
                    li
                        list-style : disc
</style>