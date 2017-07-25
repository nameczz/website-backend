<template>
    <div class="file">
        <breadcrumb :name="name" class="bread"></breadcrumb>
        <form>
            <label for="">
                请选择文件:
                <input type="file" name="file" @change="getFile($event)" />
            </label>
            <label for="">
                请输入CodeId:
                <input type="text" :value="codeId" name="codeId" v-model="codeId">
            </label>
            <label for="">
                <input type="radio" value="full" name="type" v-model="type"> 全量
                <input type="radio" value="add" name="type" v-model="type"> 增加
            </label>
    
            <a @click="submitForm($event)">
                提交
            </a>
            <!-- <input type="submit" name="commit" value="Login" class="btn btn-primary btn-block"> -->
        </form>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'
import { apiUrl } from 'common/js/dom'
import axios from 'axios'

export default {
    data() {
        return {
            name: '上传文件',
            codeId: '12',
            file: '',
            type: ''
        }
    },
    watch: {
        type(val) {
            console.log(val)
        },
        file(val) {
            console.log(val)
        }
    },
    created() {
        console.log(axios.defaults.withCredentials)
        this.codeId = this.$route.params.codeId
    },
    methods: {
        getFile(event) {
            this.file = event.target.files[0];
            console.log(this.file);
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

            this.$http.post('http://192.168.38.19:9000/admin/system/code_info/upload', formData, {
                withCredentials: true
            }, config).then(function (res) {
                if(res.status === 1) {
                    alert('上传成功')
                    _this.$router.go(-1)
                } else {
                    alert('上传失败')
                    
                }
            }).catch((err) => {
                alert('上传失败')
                console.log(err)
                // this.$router.push({
                //     name: 'login'
                // })
            })
        }
    },
    components: {
        breadcrumb
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

</style>