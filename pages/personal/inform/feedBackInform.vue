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
				<text>找融资反馈</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="body" v-for="(item, index) in feedBackInformArr" :key='index'>
				<text class="time">{{item.time}}</text>
				<view class="body-detail">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<text class="body-detail-content">{{item.body}}</text>
					<view class="body-detail-content-option">
						<view class="myNeed" @click="myNeedDetial">
							<text>我的需求</text>
						</view>
						<view class="viewFeedBack" @click="viewFeedBack">
							<text>查看反馈</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 遮罩层 -->
		<view class="mask" v-if="dropListShow"></view>
		
		<view class="dropList" v-if="dropListShow">
			<view class="dropList-title">
				<view class="dropList-title-text">
					<text>融资需求</text>
				</view>
				<image @click="closeDropList" src="../../../static/enterprise/cancel.png"></image>
			</view>
			<view class="dropList-content">
				<view class="dropList-content-left">
					<text>长沙</text>
				</view>
				<view class="dropList-content-right">
					<text id="enterpriseName">长沙市比亚迪汽车有限公司</text>
					<text id="enterpriseID">ID：HJDU87628</text>
					<view id="enterpriseContact">
						<view id="enterpriseContact-people">
							<image src="../../../static/enterprise/people.png"></image>
							<text>吴彦瑾</text>
						</view>
						<view id="enterpriseContact-phone">
							<image src="../../../static/enterprise/feedBackPhone.png"></image>
							<text>17763846383</text>
						</view>
					</view>
				</view>
			</view>
			<view class="dropList-method">
				<text>融资方式：</text>
				<text>股权融资</text>
			</view>
			<view class="dropList-describe">
				<text class="dropList-describe-title">需求说明:</text>
				<text class="dropList-describe-body">股权融资通常有四种方式，即股权质押融资、股权交易增值融资、股权增资扩股融资和股权的私募融资。股权质押融资指出质人以其所拥有的股权这一无形资产作为质押标的物，为自己或他人的债务提供担保的行为。股权交易增值融资指公司的原股东，把一小部分的股份溢价出让给其投资人，把获得的溢价部分重新投入公司。</text>
			</view>
			<view class="dropList-time">
				<text>提交时间：2020-12-27 18:44</text>
			</view>
		</view>
	</view>
</template>

<script scoped>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{uniNavBar},
		data() {
			return {
				feedBackInformArr:[],
				dropListShow:false		//是否打开上拉框
			}
		},
		onLoad(option) {
			let InformArr=JSON.parse(option.parameArr)
			console.log(InformArr)
			this.feedBackInformArr=InformArr
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			myNeedDetial(){
				this.dropListShow=true
			},
			viewFeedBack(){
				uni.navigateTo({
					url:'feedBackDetail'
				})
			},
			closeDropList(){
				this.dropListShow=false
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
		align-items: center;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 100rpx;
	}
	.body{
		margin-top: 45rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.body .time{
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
		padding-left: 31rpx;
		padding-right: 31rpx;
	}
	.body-detail .title{
		height: 79rpx;
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
	.body-detail .body-detail-content-option{
		display:flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 26rpx;
	}
	.body-detail-content-option .myNeed{
		display:flex;
		align-items: center;
		justify-content: center;
		width: 50%;
		height: 78rpx;
		border-top:1rpx solid #E9E9E9;
		border-right:1rpx solid #E9E9E9;
	}
	.myNeed text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 46rpx;
	}
	.body-detail-content-option .viewFeedBack{
		display:flex;
		align-items: center;
		justify-content: center;
		width: 50%;
		height: 78rpx;
		border-top:1rpx solid #E9E9E9;
	}
	.viewFeedBack text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
		line-height: 46rpx;
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index:20;
		background-color: rgba(0, 0, 0, 0.4);
		transition: opacity 0.3s;
	}
	.dropList{
		width: 100%;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0px 0px;
		position: fixed;
		bottom: 0;
		z-index: 30;
	}
	.dropList-title{
		margin-top: 44rpx;
		margin-left: 73rpx;
		margin-right: 39rpx;
		display: flex;
	}
	.dropList-title .dropList-title-text{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dropList-title .dropList-title-text text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.dropList-title image{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 34rpx;
		height: 34rpx;
	}
	.dropList-content{
		margin: 29rpx 39rpx 34rpx 39rpx;
		height: 196rpx;
		background: #F5F5F5;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
	}
	.dropList-content .dropList-content-left{
		width: 120rpx;
		height: 120rpx;
		background: #2D6BDD;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dropList-content-left text{
		font-size: 37rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 56rpx;
	}
	.dropList-content .dropList-content-right{
		margin-left: 27rpx;
	}
	.dropList-content-right #enterpriseName{
		display: block;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.dropList-content-right #enterpriseID{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
		line-height: 42rpx;
	}
	.dropList-content-right #enterpriseContact{
		display: flex;
		flex-direction: row;
	}
	#enterpriseContact-people{
		margin-right: 30rpx;
	}
	#enterpriseContact-people image, #enterpriseContact-phone image{
		height: 26rpx;
		width: 26rpx;
	}
	#enterpriseContact-people text, #enterpriseContact-phone text{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
		line-height: 42rpx;
	}
	.dropList-method{
		margin-left: 39rpx;
		margin-right: 39rpx;
		padding-bottom: 29rpx;
		border-bottom:1rpx solid #E9E9E9;
	}
	.dropList-method text:nth-child(1){
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.dropList-method text:nth-child(2){
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD
	}
	.dropList-describe{
		margin-left: 39rpx;
		margin-right: 39rpx;
		margin-top: 30rpx;
		padding-bottom: 29rpx;
		border-bottom:1rpx solid #E9E9E9;
	}
	.dropList-describe .dropList-describe-title{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
		display: block;
		margin-bottom: 29rpx;
	}
	.dropList-describe .dropList-describe-body{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
		line-height: 44rpx;
	}
	.dropList-time{
		margin: 30rpx 39rpx 52rpx 39rpx;
	}
	.dropList-time text{
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
	}
</style>
