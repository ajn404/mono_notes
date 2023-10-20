//injection
//appEntrypoint
//此文件的默认导出应该是一个接收 Vue App 实例的函数，允许使用 自定义 Vue 插件，app.use 和其他高级使用情形的定制

import type { App } from 'vue';

export default (app: App) => {
};