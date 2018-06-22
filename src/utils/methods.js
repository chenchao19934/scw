/* 全局方法 */
import Vue from 'vue';

function back(router) {
  router.go(-1);
}

function parseFloat(num) {
  return window.parseFloat(num.toFixed(2));
  // return 
}

function getQueryString(param) {
  let currentUrl = decodeURIComponent(window.location.href);
  let arr = currentUrl.split("?");
  if (arr.length > 1) {
    arr = arr[1].split("&");
    for (var i = 0; i < arr.length; i++) {
      var tem = arr[i].split("=");
      if (tem[0] == param) {
        return tem[1];
      }
    }
    return null;
  } else {
    return null;
  }
}
Vue.prototype.$back = back;
Vue.prototype.$parseFloat = parseFloat;
console.log("statrt")
Vue.prototype.$getQueryString = getQueryString;