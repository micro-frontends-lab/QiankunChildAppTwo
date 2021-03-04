// @micro 控制子应用组件的加载状态，视图缓存等，通常情况下不需要修改

export default {
    namespaced: true,
    state: {
        isLoading: false,
        isCachable: false,
        shouldRender: true,
        cachableRoutes: []
    },
    mutations: {
        setLoadingState (state, isLoading = false) {
            state.isLoading = isLoading
        },
        setCacheState (state, isCachable = false) {
            state.isCachable = isCachable
        },
        addCachableRoute (state, routeName = '') {
            !state.cachableRoutes.includes(routeName) && state.cachableRoutes.push(routeName)
        },
        removeCachableRoute (state, routeName = '') {
            if (routeName !== undefined) {
                let routes = [...state.cachableRoutes]
                let index = routes.indexOf(routeName)
                if (index >= 0) {
                    routes.splice(index, 1)
                    state.cachableRoutes = routes
                }
            } else {
                state.cachableRoutes = []
            }
        }
    },
    actions: {
        setLoadingState ({ commit }, isLoading = false) {
            commit('setLoadingState', isLoading)
        },
        setCacheState ({ commit }, isCachable = false) {
            commit('setCacheState', isCachable)
        },
        addCachableRoute ({ commit }, routeName = '') {
            commit('addCachableRoute', routeName)
        },
        removeCachableRoute ({ commit }, routeName = '') {
            commit('removeCachableRoute', routeName)
        }
    }
}
