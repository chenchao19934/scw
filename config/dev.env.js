const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  /* 商城bid */
  BID: '"77"',
  EXTERNAL_BID: '"77"',

  /* 域名 */
  TEST_API: '""',
  ONLINE_API: '"http://wox.w-lans.com"',

  TEST_URL: '"http://test.woxmob.78wifi.com"',
  ONLINE_URL: '"http://woxmob.w-lans.com"',

  /* 正式环境接口 */
  // BASE_URL: '"http://wox.w-lans.com"',
  // PAY_URL: '"http://api.w-lans.cn"',
  // WITH_CREDENTIALS: 'true',
  // IS_TEST: '"no"',

  /* 测试环境接口 */
  PAY_URL: '"http://test2.api.w-lans.cn"',
  IS_TEST: '"yes"',
  BASE_URL: '"http://testadmin.w-lans.com"',
  WITH_CREDENTIALS: 'false',
});
