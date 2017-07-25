<template>
    <div class="dashboard">
        <breadcrumb :name="name"></breadcrumb>
    </div>
</template>

<script>
import breadcrumb from 'components/breadcrumb'


export default {
    data() {
        return {
            name: 'dashboard'
        }
    },
    components: {
        breadcrumb
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">

</style>
