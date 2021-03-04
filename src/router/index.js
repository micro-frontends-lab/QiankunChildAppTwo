import { name } from '../../package.json'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
import messenger from '@/messenger'
import authCheck from 'main-auth-check'
import log from '@/micro/log'
import routePrefix from 'main-route-prefix'

Vue.use(VueRouter)

let router = new VueRouter({
    base: routePrefix.VALUE, // 使用主应用路由前缀配置
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    let cachable = store.state[name].component.isCachable
    // @micro 检查路由权限
    authCheck({ route: to }).then((passed) => {
        if (passed) {
            // @micro 设置视图加载状态
            store.dispatch(`${name}/component/setLoadingState`, true)
            // @micro 添加需要缓存的视图名称到store中
            cachable && store.dispatch(`${name}/component/addCachableRoute`, to.name)
            log(`${name} route ${to.path} auth passed.`)
            next()
        } else {
            // @micro example: 子应用广播消息
            // @micro 如果没有权限，向主应用请求跳转403
            messenger.broadcast(`${name}:403`)
            log(`${name} route ${to.path} auth denied.`)
        }
    })
})

router.afterEach((to, from) => {
    // @micro 设置视图加载状态
    store.dispatch(`${name}/component/setLoadingState`, false)
})

export default router
