<template>
	<view>
		<uniNavBar
			status-bar="true"
			@clickLeft="clickBack"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>关于我们</text>
			</view>
		</uniNavBar>
		<view class="header">
			<view id="head">
				<image src="../../static/enterprise/ztd.png"></image>
				<text>当前版本 v1.0.3</text>
			</view>
		</view>
		<view class="content">
			<view class="contact">
				<text>联系我们</text>
				<view class="phone_btn" @click="dial">
					<text id="phone">010-68321050</text>
					<image src="../../static/enterprise/telephone.png"></image>
				</view>
			</view>
			<view class="protocol" @click="protocol">
				<text>用户协议及隐私政策</text>
				<image src="../../static/enterprise/btn.png"></image>
			</view>
			<view class="update">
				<text>检查更新</text>
				<image src="../../static/enterprise/btn.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{uniNavBar},
		data() {
			return {
				
			}
		},
		methods: {
			//拨打电话
			dial(){
				uni.makePhoneCall({
				    phoneNumber: '010-68321050' 
				})
			},
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//查看协议
			protocol(){
				uni.navigateTo({
					url:'../login/protocol'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #ECECEC;
	}
	.uniNavBar_left, .uniNavBar_center{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_left image{
		width: 20rpx;
		height: 36rpx;
	}
	.uniNavBar_center text{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.header{
		margin-top: 20rpx;
		height: 460rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}
	.header #head{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.header #head image{
		width: 150rpx;
		height: 150rpx;
	}
	.header #head text{
		margin-top: 27rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
	}
	.content{
		margin-top: 20rpx;
		/* height: 324rpx; */
		background-color: #FFFFFF;
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	.contact, .protocol, .update{
		height: 114rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1rpx solid #ECECEC;
	}
	.contact .phone_btn{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.contact #phone{
		font-size: 30rpx;
		font-family: Arial;
		font-weight: 400;
		color: #666666;
		line-height: 110rpx;
		margin-right: 17rpx;
	}
	.contact image{
		width: 40rpx;
		height: 40rpx;
	}
	.protocol image{
		width: 17rpx;
		height: 30rpx;
	}
	.update image{
		width: 17rpx;
		height: 30rpx;
	}
</style>
