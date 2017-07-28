<template>
    <div class="search-input">
        <input type="text" value="" :placeholder="type+'搜索框'" v-model="message">
        <a class="button" @click="submit(message)">
            搜索
        </a> 
    </div>
</template>

<script>

export default {
    props: {
        type: {
            type: String
        }
    },
    data() {
        return {
            message: ''
        }
    },
    methods: {
        submit(message) {
            this.$emit('search', message, this.type)
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search-input
    display : inline-block
    input
        height : 22px
        padding : 5px 10px
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
</style>