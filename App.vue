<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		//#ifdef APP-PLUS  
			var info = plus.push.getClientInfo();
			console.log( JSON.stringify( info ) );
			   /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/  
			plus.push.addEventListener("click", function(msg) {  
				console.log("click:"+JSON.stringify(msg));  
				console.log(msg.payload);  
				console.log(JSON.stringify(msg));  
				//这里可以写跳转业务代码
			}, false);  
				// 监听在线消息事件    
			plus.push.addEventListener("receive", function(msg) {  
				// plus.ui.alert(2);  
				//这里可以写跳转业务代码
				console.log("recevice:"+JSON.stringify(msg))  
		   }, false);  

		//#endif  
			//token登录
			let _this = this
			uni.getStorage({
				key: 'token',
				success:function(res){
					console.log(res.data)
					let value = res.data
					//存在token，则使用token登录
					_this.$request({
						url:"/verificationToken",
						data: {
							'token':value
						}
					}).then(res=>{
							let data = res[1].data
							if(data.statusCode===2000&&data.type==='0'){
								console.log("使用token登录成功")
								_this.$store.commit('setKind', '0')
								_this.$store.commit('setId', data.id)
								uni.navigateTo({
									url:'../home/home'
								})
							}
							else{
								console.log(data.statusMsg)
							}
					}).catch(err=>{
							console.log(err)
					})
				},
				fail:function(err){
					console.log('没有存储token，无法使用token登录')
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>