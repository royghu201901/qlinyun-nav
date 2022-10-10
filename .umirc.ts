export default {
  npmClient: 'pnpm',
  title: '国贸数字研发部导航',
  routes: [
    { path: '/',
      title: '国贸数字研发部导航',
      routes: [
        { path: '/', component: '@/pages/index' },
      ]
    }
  ],
  proxy: {
    '/verbCenter': {
      'target': 'http://172.18.188.209:8111/verbCenter',
      'changeOrigin': true,
      'pathRewrite': { '^/verbCenter' : '' },
      'secure': false,
    },
  },
};
