import { name } from '../package.json'

// @micro example: 在配置了externals前提下引入主应用暴漏的对象
import Vue from 'vue'
import log from '@/micro/log'
// import VueRouter from 'vue-router'
// import Vuex from 'vuex'
// import ViewUI from 'view-design'
// import ViewUIPro from '@/libs/iview-pro/iview-pro.min.js'
// import 'view-design/dist/styles/iview.css'
// import './libs/iview-pro/iview-pro.css'
// import iLink from '@/components/link'
// import mde from '@/components/mde'
// import quill from '@/components/quill'
// import request from '@/plugins/request'
// import plugins from '@/plugins'
// import util from '@/libs/util'

import messenger from '@/messenger'
import { store, register as registerStore, unregister as unregisterStore } from '@/store'
import { i18n, register as registerI18n, unregister as unregisterI18n } from '@/i18n'
import router from '@/router'
import App from './App.vue'

// @micro example: 使用在主应用中未注册的vue插件
// Vue.use(iLink)
// Vue.use(mde)
// Vue.use(quill)
// Vue.use(plugins)

let instance = null

export async function bootstrap () {
    log(`${name} bootstraped.`)
}

export async function mount (props) {
    if (instance) {
        log(`${name} already mounted with cache.`)
    } else {
        log(`${name} mount props:`, props)
        registerI18n() // @micro 注册子应用的多语言配置
        registerStore() // @micro 注册子应用的store modules
        store.dispatch(`${name}/component/setCacheState`, props.cachable) // @micro 向store中存储主应用对视图缓存的设置
        instance = new Vue({
            router,
            store,
            i18n,
            render: (h) => h(App)
        })
        instance.$mount(props.root.el) // @micro 向主应用提供的供子应用挂载的dom节点上挂载子应用
        log(`${name} mounted.`)
    }
}

export async function unmount (props) {
    if (props.cachable) {
        log(`${name} is not unmounted, since it's cachable.`)
    } else {
        instance.$destroy()
        instance = null
        store.dispatch(`${name}/component/removeCachableRoute`) // @micro 清除缓存过的视图
        unregisterStore() // @micro 解除动态添加的store modules的注册
        unregisterI18n() // @micro 解除动态添加的多语言设置
        messenger.off() // @micro 解除应用间消息监听的绑定
        log(`${name} unmounted.`)
    }
}
