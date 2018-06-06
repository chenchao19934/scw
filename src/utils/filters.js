/* 全局过滤器 */
import Vue from 'vue';
import moment from 'moment';

moment.locale('zh-cn');

const filter = {
};
// 将毫秒数转换成正常日期格式，分隔符为/
export function dateStringFilter(val) {
  if (val) {
    if (typeof val === 'string' || typeof val === 'number') {
      return moment(new Date(window.parseInt(val) * 1000)).format('YYYY/MM/DD');
    } else if (typeof val === 'object') {
      return moment(val).format('YYYY/MM/DD');
    }
  } else {
    return '';
  }
};
// 将秒数转换成正常日期格式, 分隔符为-
export function dateStringFilterStrike(val) {
  if (val) {
    if (typeof val === 'string') {
      return moment(new Date(window.parseInt(val) * 1000)).format('YYYY-MM-DD');
    } else if (typeof val === 'object') {
      return moment(val).format('YYYY-MM-DD');
    }
  } else {
    return '';
  }
};
// 将秒数转换成正常日期格式, 分隔符为：
export function dateStringFilterTime(val) {
  if (val) {
    if (typeof val === 'string') {
      return moment(new Date(window.parseInt(val) * 1000)).format('HH:mm:ss');
    } else if (typeof val === 'object') {
      return moment(val).format('HH-mm-ss');
    }
  } else {
    return '';
  }
};
// 将秒数转换成正常日期格式， 分隔符为.
export function dateStringFilterDot(val) {
  if (val) {
    if (typeof val === 'string') {
      return moment(new Date(window.parseInt(val) * 1000)).format('YYYY.MM.DD');
    } else if (typeof val === 'object') {
      return moment(val).format('YYYY.MM.DD');
    }
  } else {
    return '';
  }
};
// 将毫秒数转换成正常日期格式
export function weekStringFilter(val) {
  if (val) {
    if (typeof val === 'string') {
      return moment(new Date(window.parseInt(val) * 1000)).format('dddd');
    } else if (typeof val === 'object') {
      return moment(val).day();
    }
  } else {
    return '';
  }
};
// 秒转换成小时
export function sec2Hour(value) {
  let theTime = window.parseInt(value);// 秒
  let theTime1 = 0;// 分
  let theTime2 = 0;// 小时
  // alert(theTime);
  if (theTime > 60) {
    theTime1 = window.parseInt(theTime / 60);
    theTime = window.parseInt(theTime % 60);
    // alert(theTime1+"-"+theTime);
    if (theTime1 > 60) {
      theTime2 = window.parseInt(theTime1 / 60);
      theTime1 = window.parseInt(theTime1 % 60);
    }
  }
  // var result = ""+window.parseInt(theTime)+"秒";
  let result = '';
  if (theTime1 > 0) {
    result = `${window.parseInt(theTime1)}分${result}`;
  }
  if (theTime2 > 0) {
    result = `${window.parseInt(theTime2)}小时${result}`;
  }
  return result;
};
// 转换成数字类型
export function parseInt(val){window.window.parseInt(val)};
// 保留两位小数
export function toFixed(val, digits = 2){ window.parseFloat(val.toFixed(digits))};

