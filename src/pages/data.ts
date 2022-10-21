import type {
  CardListInterface,
} from '@/types'

const cardList: CardListInterface[] = [
  {
    id: 100,
    name: '内部系统导航',
    cards: [
      { id: 1, title: 'GitLab', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/gitlab.png', url: 'http://nav.qlinyun.com:9088/', description: '内部代码仓库', label: 1 },
      { id: 2, title: 'Confluence', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/confluence.png', url: 'http://nav.qlinyun.com:9089/index.action#all-updates', description: '项目文档' },
      { id: 3, title: 'Jenkins', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/jenkins.png', url: 'http://nav.qlinyun.com:9083/login?from=%2F', description: '发布系统' },
      { id: 4, title: '禅道', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/zentao.png', url: 'http://nav.qlinyun.com/user-login-Lw==.html', description: '禅道' },
      { id: 5, title: 'Maven仓库', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/maven.png', url: 'http://nav.qlinyun.com:9081/', description: 'Maven仓库' },
      { id: 6, title: 'ProcessOn', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/processon.png', url: 'https://www.processon.com/', description: '思维导图' },
      { id: 7, title: '堡垒机', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/jump-server.png', url: 'http://nav.qlinyun.com:9000/core/auth/login/', description: '堡垒机' },
      { id: 8, title: 'SQL审核平台', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/sqle.png', url: 'http://nav.qlinyun.com:9123/login/', description: 'SQL审核平台' },
      { id: 9, title: '接口性能监控平台', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/monitoring.png', url: 'https://testqlinyun.back.qlinyun.com/kylinsitemonitoring#threads', description: '接口性能监控平台' },
      { id: 10, title: '异常捕获系统', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/sentry.png', url: 'https://sentry.qlinyun.com/organizations/kylin/projects/', description: '异常捕获系统' },
      { id: 11, title: '开发环境任务调度中心', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/xxl-job.png', url: 'http://dev.qlinyun.com:8181/xxl-job-admin/toLogin', description: '开发环境任务调度中心' },
      { id: 12, title: '测试环境任务调度中心', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/xxl-job.png', url: 'http://xxl-job.back.qlinyun.com/xxl-job-admin/jobinfo', description: '测试环境任务调度中心' },
      { id: 13, title: '正式环境任务调度中心', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/xxl-job.png', url: 'https://xxl-job.qlinyun.com/xxl-job-admin/', description: '正式环境任务调度中心' },
    ]
  },
  {
    id: 200,
    name: '开发环境导航',
    cards: [
      { id: 1, title: '麒麟云', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/qlinyun.png', url: 'http://dev.qlinyun.com:8040/', description: '麒麟云开发地址' },
      { id: 2, title: '麒麟云Swagger', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/swagger.png', url: 'http://dev.qlinyun.com:8040/kylinsite/doc.html#/home', description: '麒麟云开发Swagger' },
      { id: 3, title: '麒麟云管理平台', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/management.png', url: 'http://dev.qlinyun.com:8081/', description: '麒麟云管理平台开发地址' },
      { id: 4, title: '麒麟云管理平台Swagger', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/swagger.png', url: 'http://dev.qlinyun.com:8091/kylinManage/doc.html#/home', description: '管理平台开发Swagger' },
      { id: 5, title: '麒麟云运营中心', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/operation.png', url: 'http://dev.qlinyun.com:8020/login', description: '麒麟云运营中心开发地址' },
      { id: 6, title: '麒麟云运营中心Swagger', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/swagger.png', url: 'http://dev.qlinyun.com:8090/operation/doc.html#/home', description: '运营中心开发Swagger' },
      { id: 7, title: '麒麟优品', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/kylinmall-test.png', url: 'http://dev.qlinyun.com:8030/', description: '麒麟优品开发地址' },
      { id: 8, title: '麒麟物流', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/logistics.png', url: 'http://dev.qlinyun.com:8050/login', description: '麒麟物流开发地址' },
    ]
  },
  {
    id: 300,
    name: '测试环境导航',
    cards: [
      { id: 1, title: '麒麟云', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/qlinyun.png', url: 'https://t.back.qlinyun.com/', description: '麒麟云测试地址' },
      { id: 2, title: '麒麟云管理平台', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/management.png', url: 'http://management.back.qlinyun.com/login', description: '麒麟云管理平台测试地址' },
      { id: 3, title: '麒麟云运营中心', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/operation.png', url: 'http://operationcenter.back.qlinyun.com/login', description: '麒麟云运营中心测试地址' },
      { id: 4, title: '麒麟优品', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/kylinmall-test.png', url: 'http://kylinmall.back.qlinyun.com/', description: '麒麟优品测试地址' },
      { id: 5, title: '麒麟物流', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/logistics.png', url: 'http://express.back.qlinyun.com/login', description: '麒麟物流测试地址' },
      { id: 6, title: '大中台', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/admincenter.png', url: 'http://admincenter.back.qlinyun.com/#/', description: '大中台测试地址' },
      { id: 7, title: '麒麟数据中心', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/datacenter.png', url: 'http://dcenter.back.qlinyun.com/login', description: '麒麟数据中心测试地址' },
    ]
  },
  {
    id: 400,
    name: '正式环境导航',
    cards: [
      { id: 1, title: '麒麟云', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/qlinyun.png', url: 'https://www.qlinyun.com/', description: '麒麟云正式地址' },
      { id: 2, title: '麒麟云管理平台', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/management.png', url: 'https://management.qlinyun.com/login', description: '麒麟云管理平台正式地址' },
      { id: 3, title: '麒麟云运营中心', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/operation.png', url: 'https://operationcenter.qlinyun.com/login', description: '麒麟云运营中心正式地址' },
      { id: 4, title: '麒麟优品', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/kylinmall.png', url: 'https://kylinmall.qlinyun.com/', description: '麒麟优品正式地址' },
      { id: 5, title: '麒麟物流', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/logistics.png', url: 'https://express.qlinyun.com/login', description: '麒麟物流正式地址' },
      { id: 6, title: '大中台', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/admincenter.png', url: 'https://admincenter.qlinyun.com/#/', description: '大中台正式地址' },
      { id: 7, title: '麒麟数据中心', image: 'https://kylin-static.oss-cn-hangzhou.aliyuncs.com/navigation/datacenter.png', url: 'https://dcenter.qlinyun.com/login', description: '麒麟数据中心正式地址' },
    ]
  },
]

export default cardList
