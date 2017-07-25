<template>
    <div class="search-input">
        <input type="text" value="" :placeholder="type+'搜索框'" v-model="message">
        <button @click="submit(message)">
            搜索
        </button>
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
            this.$emit('search', message ,this.type)
        }
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.search-input
    display : inline-block
    input
        height : 22px
    button
        margin-left: 6px
        height : 20px
</style>