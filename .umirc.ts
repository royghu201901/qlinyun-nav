export default {
  npmClient: 'pnpm',
  title: '国贸数字研发部导航',
  routes: [
    { path: '/',
      title: '国贸数字研发部导航',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/:type', component: '@/pages/list' },
        { path: '/:type/:id', component: '@/pages/list' },
      ]
    }
  ],
  proxy: {
    '/verbCenter': {
      'target': 'http://192.168.8.113:8111/verbCenter',
      // 'target': 'http://192.168.8.233:8111/verbCenter',
      'changeOrigin': true,
      'pathRewrite': { '^/verbCenter' : '' },
      'secure': false,
    },
  },
};
