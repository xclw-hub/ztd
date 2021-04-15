<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let _this = this
		//#ifdef APP-PLUS 
			setTimeout(()=>{
				plus.navigator.closeSplashscreen();
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
								if(data.statusCode===2000){
									console.log("使用token登录成功")
									if(data.type==='0'){
										_this.$store.commit('setKind', '0')
										_this.$store.commit('setId', data.id)
									}
									else{
										_this.$store.commit('setKind', '1')
										_this.$store.commit('setId', data.id)
									}
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
			},1500);
		
			var info = plus.push.getClientInfo();
			console.log( JSON.stringify( info ) );
			   /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/  
			plus.push.addEventListener("click", function(msg) {  
				//这里可以写跳转业务代码    
				let msgTitle
				let msgContent
				if(msg.aps){		//ios
					msgTitle = msg.aps.alert.title
					msgContent = msg.aps.alert.body
				}
				else{
					msgTitle = msg.payload.title
					msgContent = msg.payload.content
				}
				let body = msg.payload
				switch(msgTitle){
					case '审核通过':
						uni.showModal({
							title: msgTitle,
							content: msgContent,
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
						break
					case '信息填报':
					case '审核被拒绝':
						uni.navigateTo({
							url: '../enterprise/inform/systemInform'
						})
						break
					case '会议取消':
					case '会议通知':
						uni.navigateTo({
							url: '../enterprise/inform/meetingInform'
						})
						break
					case '融资反馈':
						uni.navigateTo({
							url: '../enterprise/inform/feedBackInform'
						})
						break
					case '整改通知':
						uni.navigateTo({
							url: '../enterprise/inform/rectifyInform'
						})
						break
					default:
						uni.navigateTo({
							url: '../enterprise/inform/policyInform'
						})
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	position: 'bottom',
				// 	duration: 5000,
				// 	title: "click:"+JSON.stringify(msg),
				// })
			}, false);  
				// 监听在线消息事件    
			plus.push.addEventListener("receive", function(msg) {  
				// plus.ui.alert(2);  
				//这里可以写跳转业务代码
				let msgTitle
				let msgContent
				if(msg.aps){		//ios
					msgTitle = msg.aps.alert.title
					msgContent = msg.aps.alert.body
				}
				else{
					msgTitle = msg.payload.title
					msgContent = msg.payload.content
				}
				switch(msgTitle){
					case '审核通过':
						uni.showModal({
							title: msgTitle,
							content: msgContent,
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
						break
					case '信息填报':
					case '审核被拒绝':
						uni.navigateTo({
							url: '../enterprise/inform/systemInform'
						})
						break
					case '会议取消':
					case '会议通知':
						uni.navigateTo({
							url: '../enterprise/inform/meetingInform'
						})
						break
					case '融资反馈':
						uni.navigateTo({
							url: '../enterprise/inform/feedBackInform'
						})
						break
					case '整改通知':
						uni.navigateTo({
							url: '../enterprise/inform/rectifyInform'
						})
						break
					default:
						uni.navigateTo({
							url: '../enterprise/inform/policyInform'
						})
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	position: 'bottom',
				// 	duration: 5000,
				// 	title: "receive:"+JSON.stringify(msg),
				// })
		   }, false);  
		//#endif  
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