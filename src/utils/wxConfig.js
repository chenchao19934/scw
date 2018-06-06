import Vue from 'vue'
// 微信js-sdk-api
import wx from 'weixin-js-sdk'
import { getConfig } from '../api/newService'

// 判断当前环境
if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
    if (window.__wxjs_environment === 'miniprogram') {
        Vue.prototype.$device = 'miniprogram';
    } else {
        Vue.prototype.$device = 'wechat';
    }
} else {
    Vue.prototype.$device = 'browser';
}
if (Vue.prototype.$device === 'wechat') {
    let url = location.href.split('#')[0];
    url = url.replace(/\./g, "chenchaoe").replace(/\//g, "chenchaob").replace(/\#/g, "chenchaoc").replace(/\:/g, "chenchaoa").replace(/\?/g, "chenchaod").replace(/\=/g, "chenchaof");
    // 接入微信JSSDK
    // 获取微信JSSDK配置
    getConfig({ urlLink: url }).then(res => {
        wx.config({
            debug: false,
            appId: res.date.appId,
            timestamp: res.date.timestamp,
            nonceStr: res.date.nonceStr,
            signature: res.date.signature,
            jsApiList: ["getLocation", "onMenuShareTimeline", "onMenuShareAppMessage", "chooseImage", "uploadImage", "checkJsApi"]
        });
        wx.ready(() => {
            wx.checkJsApi({
                jsApiList: ["getLocation", "onMenuShareTimeline", "onMenuShareAppMessage", "chooseImage", "uploadImage"],
                success: res => {}
            });
        });
        wx.error((res) => { console.log(res) });
    })
    Vue.prototype.wxLocation = callback => {
        if (typeof(callback) !== 'function') return;
        wx.ready(() => {
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    callback(res);
                },
                // 用户取消定位
                cancel: ()=> {
                    callback("cancel");
                }
            })
        })
    }
    Vue.prototype.wxShare = (title,desc,link,imgUrl,callback) => {
        if (typeof(callback) !== 'function') return;
        wx.ready(() => {
            wx.onMenuShareTimeline({
                title: title,
                link: link,
                imgUrl: imgUrl,
                success: () => {callback("shareSuccess")},
                cancel: () => {callback("shareFaile")}
            });
            wx.onMenuShareAppMessage({
                title: title, 
                desc: desc,
                link: link,
                imgUrl: imgUrl,
                success: () => {callback("shareSuccess")},
                cancel: () => {callback("shareFaile")}
            });
        })
    }
    Vue.prototype.takePhoto = callback => {
        if (typeof(callback) !== 'function') return;
        wx.ready(() => {
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'], 
                sourceType: ['album','camera'],
                success : res => {callback(res.localIds)}
            })
        })
    }
}
