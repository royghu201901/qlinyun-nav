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
      'target': 'http://192.168.8.123:8111/verbCenter',
      'changeOrigin': true,
      'pathRewrite': { '^/verbCenter' : '' },
      'secure': false,
    },
  },
};
