// @micro 创建子应用db store，通常情况下不需要做修改。

import { name } from '../../package.json'
import router from '@/router'
import dbFactory from 'main-store-db-factory'

let { pathInit, module } = dbFactory(name, router)

export {
    pathInit,
    module as default
}
