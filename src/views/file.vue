<template>
    <div class="file">
        <div v-if="toDo === 'file'">
            <breadcrumb name="上传文件" class="bread"></breadcrumb>
            <form>
                <label for="">
                    请选择文件:
                    <input type="file" name="file" @change="getFile($event)" />
                </label>
                <label for="">
                    CodeId:
                    <input type="text" :value="codeId" name="codeId" v-model="codeId" readonly="readonly">
                </label>
                <label for="">
                    <input type="radio" value="full" name="type" v-model="type"> 全量
                    <input type="radio" value="add" name="type" v-model="type"> 增加
                </label>
    
                <a @click="submitForm($event)" class="button">
                    提交
                </a>
                <!-- <input type="submit" name="commit" value="Login" class="btn btn-primary btn-block"> -->
            </form>
        </div>
        <div v-if="toDo === 'new' || toDo === 'change'">
            <breadcrumb name="新增一条" class="bread"></breadcrumb>
            <form>
                <label for="">
                    请输入infoCode:
                    <input type="text" name="file" v-model="infoCode" />
                </label>
                <label for="">
                    请输入Value:
                    <input type="text" name="file" v-model="codeVal" />
                </label>
                <select  v-model="codeId">
                    <option value="" v-for="(option, num) in options" :key="num" :value="num">
                        {{ option }}
                    </option>
                </select>
    
                <a @click="saveNew($event)" class="button">
                    提交
                </a>
                <!-- <input type="submit" name="commit" value="Login" class="btn btn-primary btn-block"> -->
            </form>
        </div>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import search from 'components/search'

import { apiUrl } from 'common/js/dom'
import axios from 'axios'
import { getSeoKeywords } from 'api/seo'
import { getSystemOriginUrl } from 'common/js/apiUrl.js'


export default {
    data() {
        return {
            name: '上传文件',
            codeId: 7,
            file: '',
            type: '',
            toDo: '',
            options: [],
            optionsId: [],
            infoCode: '',
            codeVal: '',
            selectedOption: 0,
            singleUrl: ''
        }
    },
    watch: {
        type(val) {
            console.log(val)
        },
        file(val) {
            console.log(val)
        },
        codeId(val) {
            console.log(val)
        }
    },
    created() {
        console.log(this.$route.query)
        
        this.selectedOption = this.$route.query.codeId
        this.toDo = this.$route.query.toDo
        this.singleUrl = this.$route.query.url
        getSeoKeywords(getSystemOriginUrl(), this.options, this.optionsId)
        this.codeId = 0
    },
    mounted() {
        if (this.singleUrl) {
            this.$http.get(this.singleUrl, {
                withCredentials: true
            }).then((res) => {
                let info = res.data.data[0]
                let num = this.optionsId.indexOf(info.codeId)
                console.log(this.optionsId)
                this.codeId = num
                this.codeVal = info.value
                this.infoCode = info.infoCode
                console.log(this.codeId)
            })
        }
    },
    methods: {
        getFile(event) {
            this.file = event.target.files[0];

        },
        optionChange(event) {
            let value = event.target.value
            let index = this.options.indexOf(value)
            this.$emit('option-change', index)
        },
        submitForm(event) {
            event.preventDefault();
            let _this = this
            let formData = new FormData();
            formData.append('codeId', this.codeId);
            formData.append('type', this.type);
            formData.append('file', this.file);

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            this.$http.post(`${apiUrl}/admin/system/code_info/upload`, formData, {
                withCredentials: true
            }, config).then(function (res) {
                if (res.data.status == '1') {
                    alert('上传成功')
                    _this.$router.go(-1)
                } else {
                    console.log(res)
                    alert('上传失败:' + res.data.message)
                }
            }).catch((err) => {
                alert('上传失败')
                console.log(err)
                // this.$router.push({
                //     name: 'login'
                // })
            })
        },
        optionChange(el) {
            this.selectedOption = this.optionsId[el]
        },
        saveNew() {
            let formData = new FormData();
            formData.append('codeId', this.selectedOption);
            formData.append('infoCode', this.infoCode);
            formData.append('value', this.codeVal);
            let data = {
                'codeId': this.selectedOption,
                'infoCode': this.infoCode,
                'value': this.codeVal
            }
            this.$http.post(`${apiUrl}/admin/system/code_info`, formData, {
                withCredentials: true
            }).then((res) => {
                if (res.data.status === 1) {
                    alert('新增成功')
                } else {
                    alert('新增失败')
                }
            })
            console.log(this.codeVal)
            console.log(this.infoCode)
        }
    },
    components: {
        breadcrumb,
        search
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.file
    .bread
        margin-bottom : 10px
     form
        label
            display : block
            margin-bottom : 10px
        input[type="submit"]
            padding : 6px
            border-radius : 2px
            background : #fff
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

</style>