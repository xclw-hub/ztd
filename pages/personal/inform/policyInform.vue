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
				<text>惠企政策通知</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="body" v-for="(item, index) in policyInformArr" :key='index'>
				<text class="time">{{item.time}}</text>
				<view class="body-detail">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<text class="body-detail-content">{{item.body}}</text>
					<text class="body-detail-deadline" v-if="item.deadline!=null">申请截至时间：{{item.deadline}}</text>
					<text class="body-detail-option">查看详情>></text>
				</view>
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
				policyInformArr:[],
			}
		},
		onLoad(option) {
			let InformArr=JSON.parse(option.parameArr)
			console.log(InformArr)
			this.policyInformArr=InformArr
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
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
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 100rpx;
	}
	.body{
		width: 100%;
		margin-top: 45rpx;
		display: flex;
		flex-direction: column;
	}
	.body .time{
		align-self: center;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #BBBBBB;
	}
	.body-detail{
		margin-top: 27rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 15rpx;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
	}
	.body-detail .title{
		padding-bottom: 20rpx;
		border-bottom:1rpx solid #E9E9E9;
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}
	.body-detail .title text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
	}
	.body-detail .body-detail-content{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 46rpx;
	}
	.body-detail .body-detail-deadline{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 46rpx;
	}
	.body-detail .body-detail-option{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
		line-height: 46rpx;
	}
</style>
