<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let _this = this
		//#ifdef APP-PLUS 
			let location = ''
			setTimeout(()=>{
				plus.navigator.closeSplashscreen();
			},1500);
		
			var info = plus.push.getClientInfo();
			console.log( JSON.stringify( info ) );
			   /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/  
			plus.push.addEventListener("click", function(msg) {  
				// console.log("click:"+JSON.stringify(msg));  
				// console.log(msg.payload);  
				// console.log(JSON.stringify(msg));  
				//这里可以写跳转业务代码
				let title = msg.payload.title
				switch(title){
					case '审核通过':
					case '信息填报':
					case '审核被拒绝':
						location = 'systemInform'
						break
					case '会议取消':
					case '会议通知':
						location = 'meetingInform'
						break
					case '融资反馈':
						location = 'feedBackInform'
						break
					case '整改通知':
						location = 'rectifyInform'
						break
					default:
						location = 'policyInform'
						
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	position: 'bottom',
				// 	duration: 2000,
				// 	title: '../enterprise/inform/' + location
				// })
				uni.navigateTo({
					url: '../enterprise/inform/' + location
				})
			}, false);  
				// 监听在线消息事件    
			plus.push.addEventListener("receive", function(msg) {  
				// plus.ui.alert(2);  
				//这里可以写跳转业务代码
				uni.showModal({
				    title: msg.payload.title,
				    content: msg.payload.content,
					confirmText:'添加联系人',
					cancelText:'暂不添加',
				    success: function (res) {
				        if (res.confirm) {
				            uni.navigateTo({
				            	url:'../enterprise/contact/contactList'
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				console.log("recevice:"+JSON.stringify(msg))  
		   }, false);  
		//#endif  
			//token登录
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