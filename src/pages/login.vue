<template>
    <div class="admin">
        <header class="nav-to-website">
            <h1>Back to 智慧芽官网</h1>
        </header>
        <div class="content">
            <div class="login-box">
                <form>
                    <label>帐号
                        <input type="text" placeholder="Username" name="username" v-model="username">
                    </label>
                    <label>密码
                        <input type="password" placeholder="Password" name="password" v-model="password">
                    </label>
                    <label class="remember">
                        <input type="checkbox" name="remember-me" v-model="rember"> Remember Me
                    </label>
                    <div class="btn-box">
                        <span>Forgot Password?</span>
                        <a @click="login">Log In</a>
                    </div>
                </form>
            </div>
            <p v-if="error" class="error">您的用户名或密码有误！</p>
        </div>
        <footer>
            <p>Powered by Vue</p>
        </footer>
    </div>
</template>

<script>
import { apiUrl } from 'common/js/dom'

export default {

    data() {
        return {
            username: '',
            password: '',
            rember: false,
            error: false
        }
    },
    methods: {
        login() {

            event.preventDefault();
            let _this = this
            let rember = this.rember ? 1 : 0
            let formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', this.password);
            formData.append('remember-me', rember);

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            this.$http.post(`${apiUrl}/login`, formData, {
                withCredentials: true
            }, config).then(function (res) {
                console.log(res)
                _this.$cookie.set('Token', res.data.session.id);
                if (res.data.isSuccess === 'true') {
                    _this.error = false
                    _this.$router.push({
                        name: 'admin'
                    })
                } else {
                    _this.error = true
                    _this.$router.push({
                        name: 'login',
                        query: {
                            error: "error"
                        }
                    })
                }
            }).catch((err, status, error) => {
                console.log(err)
                console.log(document.cookie)
            })

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.admin
    width : 100%
    height : 100vh
    display : flex
    flex-direction : column
    justify-content : space-between
    header, footer
        flex : 1
        padding : 10px 20px
        font-size : $font-size-large
        background : $color-head-background
        color : #fff
    .content
        flex : 100
        .login-box
            max-width : 312px
            margin : 10% auto
            padding : 20px
            background : $color-input-background
            border : 1px solid $color-input-border
            border-radius : 4px
            text-align : right
            label
                display : block
                margin : 10px
                border : 1px solid $color-input-border
                border-radius : 4px 0 0 4px
                [type=text],[type=password]
                    width : 80%
                    border-left : 1px solid $color-input-border
                    padding : 4px 6px
            .remember
                border: none
            .btn-box
                display : flex
                margin : 10px
                align-items : center
                [type=submit]
                    padding: 4px
                    border : 1px solid $color-input-border
                    border-radius : 4px
                    background : $color-input-background
                    cursor : pointer
                    box-shadow : inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)
                span 
                    flex : 2
                    text-align : left
                    color : #08c
        .error
            text-align : center
            color : red
</style>
