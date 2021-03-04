/**
 * 开发配置
 * */
const env = process.env.NODE_ENV
const { name, mainAppName, devPort } = require('../package.json')

const Setting = {
    // 是否使用 Mock 的数据，默认 开发环境为 true，生产环境为 false
    isMock: env === 'development',
    // @micro example: 部署应用包时的基础URL。
    publicPath: env === 'development' ? `http://localhost:${devPort}/` : `/${name}/`,
    // @micro 生产环境构建文件的目录名，通常情况下不需要修改。
    outputDir: `dist/${name}`,
    // @zbb 这个地方的静态文件打包目录与主应用类似，不建议在代码配置中处理，最好在jenkinsfile里处理
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: '',
    // 开发环境每次保存时 lint 代码，会将 lint 错误输出为编译警告
    // true || false || error
    lintOnSave: false,
    // iView Loader 的选项
    // 详见 https://www.iviewui.com/docs/guide/iview-loader
    iviewLoaderOptions: {
        prefix: false
    },
    // @micro example: 配置 webpack externals
    // 子应用需要依赖的主应用暴露的对象，根据子应用的依赖情况可进行调整。
    externals: {
        "@bingo-micro/messenger": [mainAppName, "messenger"],
        "axios": [mainAppName, "axios"],
        "lodash": [mainAppName, "lodash"],
        "vue": [mainAppName, "Vue"],
        "vuex": [mainAppName, "Vuex"],
        "vue-router": [mainAppName, "VueRouter"],
        "view-design": [mainAppName, "ViewUI"],
        "/@\/micro/log/": [mainAppName, "log"],
        "/iview\.css$/": "",
        "/iview-pro(\.min\.js)?$/": [mainAppName, "ViewUIPro"],
        "/iview-pro\.css$/": "",
        "/\/components/link(\/index.vue)?$/": [mainAppName, "components", "iLink"],
        "/\/components/mde(\/index.vue)?$/": [mainAppName, "components", "mde"],
        "/\/components/quill(\/index.vue)?$/": [mainAppName, "components", "quill"],
        "/\/libs\/util(\.js)?$/": [mainAppName, "util"],
        "/\/libs\/micro-messenger(\/index\.js)?$/": [mainAppName, "messenger"],
        "/\/plugins(\/index\.js)?$/": [mainAppName, "plugins"],
        "/\/plugins\/request(\/index\.js)?$/" : [mainAppName, "request"],
        "/main-auth-check(\.js)?$/": [mainAppName, "auth", "check"],
        "/main-store(\.js)?$/" : [mainAppName, "store", "main"],
        "/main-store-db-factory(\.js)?$/": [mainAppName, "store", "dbFactory"],
        "/main-store-register(\.js)?$/": [mainAppName, "store", "register"],
        "/main-store-unregister(\.js)?$/": [mainAppName, "store", "unregister"],
        "/main-i18n(\.js)?$/" : [mainAppName, "i18n", "i18n"],
        "/main-i18n-register(\.js)?$/": [mainAppName, "i18n", "register"],
        "/main-i18n-unregister(\.js)?$/": [mainAppName, "i18n", "unregister"],
        "/main-route-prefix(\.js)?$/": [mainAppName, "routePrefix"]
    }
}

module.exports = Setting
