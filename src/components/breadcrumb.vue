<template>
    <div class="breadcrumb">
        <a @click="navTo('admin')">home</a>
        <span class="divider">/</span>
        <a @click="navTo(name)">
            {{ name }}
        </a>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        navTo(url) {
            console.log(url)
            this.$router.push({
                name: url
            })
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.breadcrumb
    padding : 10px
    margin : 4px 0 20px 0
    border-radius : 6px
    background : #f5f5f5
    .divider
        padding : 0 8px
        color : #ccc
</style>
