<template>
	<view class="content">
		<view class="head">
			<image class="logo" src="/static/login/logo.png"></image>
		</view>
		<text class="slogan">沟通零距离  需求一键达</text>
		<view class="body">
			<button 
					class="register_btn"
					type="default"
					@click="register"
			><text>企业注册</text></button>
			<button
					class="enterpriseLogin_btn"
					type="default"
					@click="enterpriseLogin"
			><text>企业账号登录</text></button>
		</view>
		<view class="personLogin_btn">
			<text @click="personLogin">个人账号登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
		},
		methods: {
			register(){
				uni.navigateTo({
					url:'register'
				})
				// 获取设备CID
				// uni.showModal({
				//     title: '审核通过',
				//     content: '撒擦擦打赏',
				// 	confirmText:'添加联系人',
				// 	cancelText:'暂不添加',
				//     success: function (res) {
				//         if (res.confirm) {
				//             uni.navigateTo({
				//             	url:'../enterprise/myPark/parkBind'
				//             })
				//         } else if (res.cancel) {
				//             console.log('用户点击取消');
				//         }
				//     }
				// });
			},
			enterpriseLogin(){
				//进入正常登录页面
				uni.navigateTo({
					url:'enterpriseLogin'
				})
			},
			personLogin(){
				//进入正常登录页面
				uni.navigateTo({
					url:'personLogin'
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		background-image:url(../../static/login/bg.jpg);
		background-repeat: no-repeat;
		/* background-repeat:repeat-x; */
		background-size: 100% 480rpx;
	}
	.content, .head, .body{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.head{
		width: 670rpx;
		height: 670rpx;
	}
	.logo {
		height: 122rpx;
		width: 350rpx;
		margin-top:529rpx ;
		font-size: 36rpx;
		color: #8f8f94;
	}
	.slogan{
		margin-top: 25rpx;
		width: 354rpx;
		height: 29rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
		line-height: 26rpx;
		text-align:center;
	}
	.body{
		margin-top: 90rpx;
	}
	.register_btn{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 670rpx;
		height: 88rpx;
		border: 2rpx solid #777777;
		border-radius: 10rpx;
	}
	.register_btn text{
		white-space: nowrap;		/* 禁止换行 */
		width: 134rpx;
		height: 32rpx;
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 26rpx;
	}
	.enterpriseLogin_btn{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 40rpx;
		width: 670rpx;
		height: 88rpx;
		background: #2E6BDE;
		box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(27, 140, 255, 0.5);
		border-radius: 10rpx;
	}
	.enterpriseLogin_btn text{
		white-space: nowrap;		/* 禁止换行 */
		width: 202rpx;
		height: 32rpx;
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 26rpx;
	}
	.personLogin_btn{
		margin-top: 153rpx;
		margin-bottom: 30rpx;
	}
	.personLogin_btn text{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 26rpx;
	}
</style>
