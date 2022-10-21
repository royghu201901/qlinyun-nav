# qlinyun-nav

<p>
  <a href="https://github.com/facebook/react"><img src="https://badgen.net/badge/React/18.0.0" alt="框架" /></a>
  <a href="https://github.com/umijs/umi"><img src="https://badgen.net/badge/Umijs/3.0.0" alt="脚手架" /></a>
  <a href="https://v4.mui.com/"><img src="https://badgen.net/badge/MUI/V4" alt="UI库" /></a>
  <a href="https://pnpm.io/"><img src="https://badgen.net/badge/PNPM/包管理/F69220" alt="UI库" /></a>
</p>

✨ 国贸数字研发部导航 ✨

> 研发部内部导航 仅用于内部使用
> 框架 - React ^18.0.0
> 脚手架 - Umijs ^3.0.0
> UI库 - Material-UI V4
> 包管理 - PNPM

## Build Setup 项目安装及打包

```bash
# install dependencies
$ pnpm install

# serve with hot reload at localhost:8000
$ pnpm dev

# build for production and launch server
$ pnpm build
$ pnpm start

```
## Directory Structure 项目结构

```bash
.
├── package.json                                # 依赖及版本
├── .umirc.ts                                   # 配置文件，包含 umi 内置功能和插件的配置
├── public
└── src
     ├── .umi
     ├── api                                   ## 接口文档
     └── layouts                               ## 全局布局文件
          ├── components                      ### 全局布局组件
               ├── LogDialog.tsx             #### 日志组件
               ├── ModuleAddDialog.tsx       #### 模块新增/修改组件
               ├── MyNav.tsx                 #### 导航栏组件，主要交互功能
               ├── QuickAddDialog.tsx        #### 快速添加/修改导航标签组件
               └── SpeedDials.tsx            #### 快速拨号组件
          ├── index.less                      ### 全局布局样式
          └── index.tsx                       ### 全局布局页面
     └── pages                                 ## 路由页面及组件
          ├── components                      ### 页面组件
               ├── DeleteCardDialog.tsx      #### 删除导航标签弹框组件
               ├── DeleteModuleDialog.tsx    #### 删除模块弹框组件
               └── MyCard.tsx                #### 导航标签卡片组件
          ├── index.tsx                       ### 主页面入口
          └── list.tsx                        ### 主要页面入口
     ├── utils                                 ## 工具函数，包含 axios 配置
     └── types.d.ts                            ## 全局类型声明
```
## Process 项目进程及完工功能

- [x] 导航标签列表主页面
- [x] 添加模块
- [x] 快速修改模块
- [x] 删除模块
- [x] 快速添加标签
- [x] 修改标签
- [x] 删除标签
- [x] 导航标签列表分页面 - 关注列表
- [x] 导航标签列表分页面 - 按模块跳转
- [x] 快速拨号功能（回到顶部、返回首页、跳转关注列表、快速添加标签）
- [x] 隐藏快速拨号功能
- [x] 搜索功能
