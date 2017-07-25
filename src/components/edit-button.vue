<template>
    <div class="edit-button">
        <a @click="showEdit" class="button">{{ name }}</a>
    </div>
</template>

<script>


export default {
    props: {
        name: {
            type: String,
            require: true
        },
        query: {
            type: Object
        },
        navName: {
           type: String,
           default: 'edit' 
        }
    },
    methods: {
        showEdit() {
            this.$router.push({
                name: this.navName,
                query: this.query,
            })
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
    .edit-button
        .button
            display: inline-block;
            outline: none;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            color : #fff
            background : #51a351
            padding: 6px 12px;
            text-shadow: 0 1px 1px rgba(0,0,0,.3);
            border-radius: 6px;
            box-shadow: 0 1px 2px rgba(0,0,0,.2);
            &:hover
                cursor : pointer
                background : #77bc25
            &:active
                position: relative
                top: 1px
</style>
