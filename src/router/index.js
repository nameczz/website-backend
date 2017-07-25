import Vue from 'vue'
import Router from 'vue-router'
import 'common/stylus/index.styl'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/login' },
        {
            path: '/admin',
            redirect: '/admin/dashboard',
            name: 'admin',
            component: function(resolve) {
                require(['pages/admin'], resolve);
            },
            children: [{
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: function(resolve) {
                        require(['views/dashboard'], resolve);
                    }
                }, {
                    path: 'media/attachments',
                    name: 'Attachments',
                    component: function(resolve) {
                        require(['views/attachments'], resolve);
                    }
                },
                {
                    path: 'users/users',
                    name: 'Users',
                    component: function(resolve) {
                        require(['views/users'], resolve);
                    }
                },
                {
                    path: 'users/permissions',
                    name: 'Permissions',
                    component: function(resolve) {
                        require(['views/permissions'], resolve);
                    }
                },
                {
                    path: 'users/roles',
                    name: 'Roles',
                    component: function(resolve) {
                        require(['views/roles'], resolve);
                    }
                },
                {
                    path: 'system',
                    name: 'System',
                    component: function(resolve) {
                        require(['views/system'], resolve);
                    }
                },
                {
                    path: 'patsnap/articles',
                    name: 'Articles',
                    component: function(resolve) {
                        require(['views/articles'], resolve);
                    }
                },
                {
                    path: 'patsnap/customers',
                    name: 'Customers',
                    component: function(resolve) {
                        require(['views/customers'], resolve);
                    }
                },
                {
                    path: 'patsnap/events',
                    name: 'Events',
                    component: function(resolve) {
                        require(['views/events'], resolve);
                    }
                },
                {
                    path: 'patsnap/orders',
                    name: 'Orders',
                    component: function(resolve) {
                        require(['views/orders'], resolve);
                    }
                },
                {
                    path: 'patsnap/subscribes',
                    name: 'Subscribes',
                    component: function(resolve) {
                        require(['views/subscribes'], resolve);
                    }
                },
                {
                    path: 'system/file',
                    name: 'file',
                    component: function(resolve) {
                        require(['views/file'], resolve);
                    }
                },
                {
                    path: 'edit',
                    name: 'edit',
                    component: function(resolve) {
                        require(['views/edit'], resolve);
                    }
                },
                {
                    path: 'edit-event',
                    name: 'editEvent',
                    component: function(resolve) {
                        require(['views/edit-event'], resolve);
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: function(resolve) {
                require(['pages/login'], resolve);
            }
        }
    ]
})