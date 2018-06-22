/* ajax工具方法 */
import axios from 'axios';
import Qs from 'qs';
import {
	MessageBox,
	Indicator
} from 'mint-ui';

const baseURL = 'http://scw.new.songcaiwa.cn:8080';
// const baseURL = 'https://scw.new.songcaiwa.cn';

// 创建axios实例
const service = axios.create({
	baseURL, // api的base_url
	timeout: 25000, // 请求超时时间
	transformRequest: [(data) => {
		// 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
		data = Qs.stringify(data);
		return data;
	}],
});
// respone拦截器
service.interceptors.response.use(
	(response) => {
		console.log(response);
		const dataText = response.data;
		let data = null;
		if (typeof dataText === 'object') {
			data = dataText;
		} else if (typeof dataText === 'string') {
			// const startIndex = dataText.indexOf('(') + 1;
			// const endIndex = dataText.lastIndexOf(')');
			// const responseText = dataText.slice(startIndex, endIndex);
			data = dataText;
		} else if (typeof dataText === 'number') {
			data = dataText
		}
		return Promise.resolve(data);
	},
	(error) => {
		if (error.response.status === 302) {
			
		}else {
			MessageBox('提示', `请求数据失败 ${error}`);
			return Promise.reject(error);
		}
	},
);

export default service;
