// @micro example: 配置路由
// 子应用须正确响应主应用路由路径变化时的视图展示，子应用的顶级模块路由路径须与主应用一致。
// 对于需要被缓存的视图，必须设置路由名称，且要与对应视图组件名称一致。
import { name } from '../../package.json'

export default [
    {
        path: `/${name}/ExampleSingleton`,
        name: 'ExampleSingleton',
        component: () => import('@/views/ExampleSingleton')
    },
    {
        path: `/ExampleMultition`,
        name: 'ExampleMultition',
        component: () => import('@/views/ExampleMultition')
    },
    {
        path: '*',
        name: `404`,
        component: () => import('@/views/404')
    }
]
