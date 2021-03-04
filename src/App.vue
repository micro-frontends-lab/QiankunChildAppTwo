<!-- @micro 子应用自己的路由挂载点，融合了视图的缓存和更新机制，通常情况下不需要修改。-->
<template>
    <keep-alive :include="cachableRoutes">
        <router-view v-if="shouldRender" v-show="!isLoading" />
    </keep-alive>
</template>

<script>
    import { name, mainAppName } from '../package.json'
    import { mapState, mapMutations } from 'vuex'
    import messenger from '@/messenger'

    export default {
        // @micro example: 缓存视图名称设置
        // 为保证视图可被缓存，每个视图必须添加name，且与路由中的name相同。
        name: 'App',
        data () {
            return {
                shouldRender: true
            }
        },
        computed: {
            // @micro example: 操作子应用store
            // 子应用注册的store modules命名空间会以应用名称作为前缀
            ...mapState(`${name}/component`, [
                'isCachable',
                'isLoading',
                'cachableRoutes'
            ]),
            exampleI18n () {
                // @micro example: 操作子应用i18n
                // 子应用的i18n设置顶级命名空间为应用名
                return this.$t(`${name}.page.app.exampleI18n`)
            }
        },
        created () {
            let self = this
            messenger.on(`${mainAppName}:refresh`, function (route) {
                if (route.fullPath === self.$route.fullPath) {
                    self.removeCachableRoute(self.$route.name)
                    self.shouldRender = false
                    self.$nextTick(() => {
                        self.shouldRender = true
                        self.isCachable && self.addCachableRoute(self.$route.name)
                    })
                }
            })
        },
        methods: {
            ...mapMutations(`${name}/component`, [
                'addCachableRoute',
                'removeCachableRoute'
            ])
        }
    }
</script>

<style lang="sass" scoped>
    // @micro example: 子应用样式控制
    // 使用css scope或css modules避免css样式冲突。
</style>
