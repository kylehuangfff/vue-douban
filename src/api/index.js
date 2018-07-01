import axios from 'axios';
import jsonp from 'jsonp';

const instance = axios.create({
	timeout: 15000
})
const API = {
	get(url, params, callback) {
		return new Promise((resolve, reject) => {
			instance.get(url, {
				params: params
			}).then((response) => {
				if (response.data.returncode === '10000') {
					callback && callback(response.data.body)
					resolve(response.data.body)
				} else {
					console.log('服务器错误:' + response.data.message)
					reject(response.data.message)
				}
			}).catch((error) => {
				console.log('服务器错误!' + error)
				reject(error)
			})
		})
	},
	post(url, params, callback) {
		return new Promise((resolve, reject) => {
			instance.post(url, params).then((response) => {
				if (response.data.returncode === '10000') {
					callback && callback(response.data.body)
					resolve(response.data.body)
				} else {
					console.log('服务器错误:' + response.data.message)
					reject(response.data.message)
				}
			}).catch((error) => {
				console.log('服务器错误!' + error)
				reject(error)
			})
		})
	},
	jsonp(url, params = { timeout: 15000 }) {
		return new Promise((resolve, reject) => {
			jsonp(url, params, (err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}
}

export default API;
