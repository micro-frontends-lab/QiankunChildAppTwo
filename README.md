# 基于 qiankun 实现的微前端子应用示例

## 简介

此项目为使用qiankun、single-spa、micro-core及micro-messenger
在iview admin基础上进行微前端改造形成的子应用示例。

访问主应用入口 [https://micro-frontends-lab.github.io/QiankunMainApp](https://micro-frontends-lab.github.io/QiankunMainApp)
可预览子应用 [https://github.com/micro-frontends-lab/QiankunChildAppOne](https://github.com/micro-frontends-lab/QiankunChildAppOne)
和当前子应用被动态调度的过程。

## 快速开始


1. clone此仓库到本地并checkout出一个新的feature分支
2. 在本地仓库根目录下执行 `yarn install`
3. 在`package.json`中的`name`和`devPort`字段设置子应用名称及开发端口，`mainAppName`字段设
   置主应用名称
4. 运行子应用，执行 `yarn serve`
5. 通过主应用`MICRO_REMOTE_HOST`域名访问远程主应用，点击当前子应用菜单，开始对子应用进行开发。

开发完成后，运行 `yarn build` 打包子应用，打包完的资源在 `dist` 目录下。

## 部署架构图

下图为生产环境分布式部署，开发环境可酌情简化。

![部署架构图](https://github.com/micro-frontends-lab/QiankunMainApp/raw/main/doc/architecture_dep.png)

## 几点必要的规范

### 子应用名称、入口、顶级模块名称、顶级模块路由路径的管理

主应用团队与子应用团队应对开发环境、测试环境、生产环境下子应用的入口提前进行约定，应用的名称和入口不
可重复，模块的名称和路径也不可重复。对于应用名称和模块名称推荐使用驼峰命名法，对单例模式下的模块路由
路径，建议以应用名称作为前缀。

### 共享空间的顶级命名空间管理

对于存在空间共享的情况，包括但不限于css选择器、localStorage、事件名称等应采取软隔离的方式约定顶级
命名空间，避免冲突。各 team 在代码 review 时，应着重对共享空间的顶级命名空间进行检查。子应用模版
对css选择器做了前缀的添加处理，添加的前缀是以子应用名称形成的唯一id。

### 部署服务器的管理

为了确保部署的隔离性，各团队最好各自维护静态服务，如需要部署到同一静态服务下，主应用团队应对部署目录
的用户权限做好设置，避免误操作引起的跨目录文件变更。

### 共享依赖的管理

对于通用的框架、类库、方法、对象等，主应用可以进行集中管理，通过暴露给子应用的方式来进行共享。

主应用需要暴露的对象实际上是挂载在 `window` 对象下的全局变量，不建议暴露过多全局变量。

子应用对主应用暴露出的对象进行访问时，可以通过直接访问 `window` 对象下主应用暴露的变量实现，
也可通过配置打包的 `externals` 选项来实现。

