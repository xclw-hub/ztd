<template>
	<view class="content">
		<image class="head" src="../../static/login/bg.jpg"></image>
		<image class="logo" src="/static/login/logo.png"></image>
		<view class="slogan">
			<text>沟通零距离</text>
			<text>需求一键达</text>
		</view>
		<view class="body">
			<button
					class="enterpriseLogin_btn"
					type="default"
					@click="enterpriseLogin"
			><text>企业账号登录</text></button>
			<button 
					class="register_btn"
					type="default"
					@click="register"
			><text>企业注册</text></button>
		</view>
		<view class="personLogin_btn">
			<view class="tip"></view>
			<text @click="personLogin">个人账号登录</text>
			<view class="tip"></view>
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
	.content, .head, .body{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.head{
		width: 100%;
		height: 500rpx;
	}
	.logo {
		margin-top: 93rpx;
		height: 122rpx;
		width: 350rpx;
		font-size: 36rpx;
		color: #8f8f94;
	}
	.slogan{
		margin-top: 44rpx;
		width: 350rpx;
		height: 29rpx;
		display: flex;
		justify-content: space-between;
	}
	.slogan text{
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
		margin-top: 40rpx;
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
		display: flex;
		align-items: center;
	}
	.personLogin_btn text{
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 26rpx;
	}
	.personLogin_btn .tip{
		width: 100rpx;
		height: 1rpx;
		background: #E3E3E3;
	}
</style>
