<template>
	<view>
		<uniNavBar
			status-bar="true"
			backgroundColor="#2D6BDD"
			@clickLeft="clickBack"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>我的园区</text>
			</view>
		</uniNavBar>
		<view class="content">
			<image src="../../../static/enterprise/parkApply.png"></image>
			<text id="tip1">您还未加入任何园区</text>
			<text id="tip2">入园成功后即可享受该园区带来的便捷服</text>
			<button class="apply" @click="parkApply">
				<text>申请入园</text>
			</button>
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
		onLoad(){
			
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			parkApply(){
				uni.navigateTo({
					url:'./parkBind'
				})
			}
		}
	}
</script>

<style scoped>
	.uniNavBar_left, .uniNavBar_center{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_left image{
		width: 36rpx;
		height: 36rpx;
	}
	.uniNavBar_center{
		text-align: center;
	}
	.uniNavBar_center text{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.content{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.content image{
		margin-top: 176rpx;
		width: 531rpx;
		height: 385rpx;
	}
	.content #tip1{
		margin-top: 70rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.content #tip2{
		margin-top: 30rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
	}
	.content .apply{
		margin-top: 65rpx;
		width: 580rpx;
		height: 88rpx;
		background: #2D6BDD;
		box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(27, 140, 255, 0.5);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.apply text{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
