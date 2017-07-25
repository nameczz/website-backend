import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import { apiUrl } from 'common/js/dom'


Vue.use(Vuex);

var VueCookie = require('vue-cookie');
// Tell Vue to use the plugin
Vue.use(VueCookie);

Vue.config.productionTip = false

Vue.prototype.$http = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// router.beforeEach((to, from, next) => {
//     console.log(VueCookie.get('Token'))
//     if (VueCookie.get('Token') || to.path === '/login') { // 判断是否有token
//         if (to.path === '/login') {
//             next();
//         } else {
//             next()
//         }
//     } else {
//         next('/'); // 否则全部重定向到登录页
//     }
// });

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})