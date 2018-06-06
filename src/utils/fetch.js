/* ajax工具方法 */
import axios from 'axios';
import Qs from 'qs';
import * as mUtils from '@/utils/mUtils.js';
import {
  MessageBox,
} from 'mint-ui';

const baseURL = process.env.BASE_URL;
console.log(process.env);

// 创建axios实例
const service = axios.create({
  baseURL, // api的base_url
  // timeout: 10000, // 请求超时时间
  transformRequest: [(data) => {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    data = Qs.stringify(data);
    return data;
  }],
});

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const dataText = response.data;
    let data = null;
    if (typeof dataText === 'object') {
      data = dataText;
    } else if (typeof dataText === 'string') {
      const startIndex = dataText.indexOf('(') + 1;
      const endIndex = dataText.lastIndexOf(')');
      const responseText = dataText.slice(startIndex, endIndex);
      data = JSON.parse(responseText);
    }

    if ((data.errCode && data.errCode !== 0) || (data.ErrCode && data.ErrCode !== 0)) {
      if (data.errCode === -1) {
        return Promise.resolve(data);
      } else if (data.errCode === -2) { // 第一次进入还未授权过
        const url = encodeURIComponent(window.location.href);
        const bid = window.$bid || process.env.BID;
        window.location.replace(`http://testadmin.w-lans.com/VueAuth.shtml?bid=${bid}&url=${url}`);
      } else {
        MessageBox('提示', data.errMsg);
      }
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  },
  (error) => {
    MessageBox('提示', `请求数据失败 ${error}`);
    return Promise.reject(error);
  },
);

export default service;
