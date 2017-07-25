<template>
    <div class="admin">
        <div class="website">
            <header>
                <a href="#" class="home">智慧呀官网</a>
                <a href="#" class="to-website">View Website</a>
            </header>
            <div class="content">
                <tab :fathers="fathers" :children="childrens" class="tab"></tab>
                <div class="show-form" ref="showForm">
                    <router-view></router-view>
                </div>
            </div>
            <footer>
                <p>Powered by Vue</p>
            </footer>
        </div>
    
    </div>
</template>

<script>
import tab from 'components/tab'

export default {
    name: 'app',
    data() {
        return {
            fathers: ['Media', 'Users', '系统设置', '智慧芽官网'],
            childrens: [
                ['Attachments'],
                ['Users', 'Roles', 'Permissions'],
                ['System'],
                ['Articles', 'Customers', 'Events', 'Orders', 'Subscribes']
            ],
            refresh: false
        }
    },
    mounted() {
    },
    computed: {
    },
    components: {
        tab
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.admin
    .website
        width : 100%
        min-height : 100vh
        display : flex
        flex-direction : column
        justify-content : space-between
        header, footer
            flex : 1
            padding : 10px 20px
            font-size : $font-size-large
            background : $color-head-background
            color: #fff
            .home
                font-size : $font-size-large
                margin-right : 20px
                color : #fff
            .to-website
                font-size : $font-size-medium
        .content
            display : flex
            flex : 100
            padding : 60px 10px 10px 0 
            min-height : 80vh
            background : $color-content-background
            .tab
                flex: 0 0 170px
            .show-form
                display : flex
                flex-direction : column
                flex: 10
                background : #fff
                padding : 20px
                border-radius : 6px
</style>
