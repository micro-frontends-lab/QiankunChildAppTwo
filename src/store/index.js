import { name } from '../../package.json'
import mainStore from 'main-store'
import registerStore from 'main-store-register'
import unregisterStore from 'main-store-unregister'
import component from './component'
import db from './db'

function register () {
    registerStore(name, {
        modules: {
            namespaced: true,
            // @micro example: 添加store modules
            // 子应用的其它 store modules可以继续添加，
            // 要注意的是子应用的store在操作时要将子应用名称作为顶级命名空间。
            modules: {
                component,
                db
            }
        }
    })
}

function unregister () {
    unregisterStore(name)
}

export {
    register,
    unregister,
    mainStore as store,
    mainStore as default
}
