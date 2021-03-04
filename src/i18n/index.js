// @micro 通常情况下此文件不需要修改

import mainI18n from 'main-i18n'
import registerI18n from 'main-i18n-register'
import unregisterI18n from 'main-i18n-unregister'
import { name } from '../../package.json'
import zhCN from './locale/zh-CN'
import enUS from './locale/en-US'

const locale = {
    'zh-CN': zhCN,
    'en-US': enUS
}

function register () {
    registerI18n(name, locale)
}

function unregister () {
    unregisterI18n(name)
}

export {
    register,
    unregister,
    mainI18n as i18n,
    mainI18n as default
}
