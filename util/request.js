//对网络请求进行全局封装
const baseURL = "http://39.105.57.219:80/ztd"
export function request(config){
	return new Promise((resolve,reject)=>{
		// console.log(config)
		uni.request({
			url:baseURL+config.url,
			method:config.method || 'POST',		//默认为post方法
			header:config.header || {'Content-Type': 'application/x-www-form-urlencoded'},
			data:config.data || {}
		}).then((res)=>{
			resolve(res)
		}).catch((err) => {
			reject(err)
			})
	})
}
// export function request(config){
// 	return uni.request(config)
// }