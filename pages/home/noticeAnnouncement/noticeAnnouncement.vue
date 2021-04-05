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
				<text>通知公告</text>
			</view>
		</uniNavBar>
		
		<view class="title" >
			<view class="service" @click="serviceClick" :class="[isActive_service ? activeClass_service : 'active2_service']" >
				<text v-bind:style="{color:serviceColor}">活动&政策</text>
			</view>
			<view class="need" @click="needClick" :class="[isActive_need ? activeClass_need : 'active2_need']">
				<text v-bind:style="{color:needColor}">重要通知</text>
			</view>
		</view>
		<view class="content">
			<view class="myService" v-if="choice">
				<view class="serviceList" v-for="(item,index) in policyList" :key="index" @click="viewserviceDetail">
					<text id="message">{{item.content}}</text>
					<view class="publishinfo">
						<view id="people">
							<image src="../../../static/home/people.png"></image>
							<text>{{item.people}}</text>
						</view>
						<view id="time">
							<image src="../../../static/enterprise/clock.png"></image>
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view v-else class="supplyList">
				<view class="supplyitem" v-for="(item,index) in noticeList" :key="index" @click="viewSupplyDetail(index)">
					<text class="reddot" v-if="!item.isread"></text><text id="message">{{item.content}}</text>
					<view class="publishinfo">
						<view id="people">
							<image src="../../../static/home/people.png"></image>
							<text>{{item.people}}</text>
						</view>
						<view id="time">
							<image src="../../../static/enterprise/clock.png"></image>
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{
			uniNavBar,
		},
		data() {
			return {
				
				policyList:
				[
					{
						content:'2020年长沙雨花经济开发区公开招聘党建指导员体检公告',
						people:'孙正蓉',
						time:'2020-12-08 11:39'
					},
					{
						content:'5G+工业互联网及软件产业园二期项目监理中选候选人公示',
						people:'孙正蓉',
						time:'2020-12-08 11:39'
					},
					{
						content:'2020年雨花经开区道路交通设施整治工程中标候选人公示',
						people:'孙正蓉',
						time:'2020-12-08 11:39'
					},
					{
						content:'湖南省财政厅关于申报2021年湖南省制造强省专项资金奖励项目的通知',
						people:'孙正蓉',
						time:'2020-12-08 11:39'
					}
				],
				noticeList:
				[
					{
							content: '5G+工业互联网及软件产业园二期项目监理中选候选人公示',
							people: '孙正蓉',
							time: '2020-12-08 11:39',
							isread: false
						},
						{
							content: '2020年长沙雨花经济开发区公开招聘党建指导员体检公告',
							people: '孙正蓉',
							time: '2020-12-08 11:39',
							isread: false
						},
						{
							content: '2020年雨花经开区道路交通设施整治工程中标候选人公示a',
							people: '孙正蓉',
							time: '2020-12-08 11:39',
							isread: false
						},
						{
							content: '湖南省财政厅关于申报2021年湖南省制造强省专项资金奖励项目的通知',
							people: '孙正蓉',
							time: '2020-12-08 11:39',
							isread: false
						}
				],
				choice:true,		//表示选择我的服务，否则表示选择供需列表
				isActive_service:true,		//点击我的服务时的view样式
				activeClass_service:'active1_service',
				serviceColor:'#2D6BDD',
				isActive_need:false,		//点击供应需求时的view样式
				activeClass_need:'active1_need',
				needColor:'#666666',
			}
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			serviceClick(){
				this.isActive_service=true
				this.isActive_need=false
				this.serviceColor='#2D6BDD'
				this.needColor='#666666'
				this.choice=true //触发活动政策模块
			},
			needClick(){
				this.isActive_need=true
				this.isActive_service=false
				this.needColor='#2D6BDD'
				this.serviceColor='#666666'
				this.choice=false   //触发通知公告模块
			},
			// 查看供应详情
			viewSupplyDetail(index) {
				this.noticeList[index].isread=true;
				uni.navigateTo({
					url: 'importantNoticedetail'
				})
			},
			viewserviceDetail(){
				uni.navigateTo({
					url:'activityPolicydetail'
				})
			},			
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
		position: relative;
		z-index: 10;
		width: 100%;
	}
	.title{
		display: flex;
		flex-direction: row;
	}
	.active1_service{
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom:5rpx solid #2D6BDD;
	}
	.active2_service{
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.active1_need{
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom:5rpx solid #2D6BDD;
	}
	.active2_need{
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.title text{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
	}
	
	.myService .serviceList{
		width: 100%;
		padding-left: 30rpx;
		padding-right: 30rpx;
		height: 186rpx;
		padding-top: 20rpx;
		border-bottom: 20rpx solid #eee;
	}
	
	.reddot {
		display: inline-block;
		width: 17rpx;
		height: 17rpx;
		border-radius: 50%;
		background-color: #fa3534;
		margin-right: 7rpx;
		margin-bottom: 5rpx;
	}
	
	.serviceList  #message{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.myService .publishinfo{
		display: flex;
		margin-top: 10rpx;
		
	}
	.serviceList .publishinfo #people{
		display: flex;
		align-items: center;
	}
	.serviceList .publishinfo #people image{
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		margin-top: 10rpx;
	}
	.serviceList .publishinfo #people text{
		width: 78rpx;
		height: 26rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
		margin-right: 20rpx;
	}
	.serviceList .publishinfo #time{
		display: flex;
		align-items: center;
	}
	.serviceList .publishinfo #time image{
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		margin-top: 20rpx;
	}
	.serviceList .publishinfo #time text{
		width: 204rpx;
		height: 20rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
	}
	
	.supplyList .supplyitem{
		width: 100%;
		padding-left: 30rpx;
		padding-right: 30rpx;
		height: 186rpx;
		padding-top: 20rpx;
		border-bottom: 20rpx solid #eee;
	}
	
	.supplyitem  #message{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.supplyList .publishinfo{
		display: flex;
		margin-top: 10rpx;
		
	}
	.supplyitem .publishinfo #people{
		display: flex;
		align-items: center;
	}
	.supplyitem .publishinfo #people image{
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		margin-top: 10rpx;
	}
	.supplyitem .publishinfo #people text{
		width: 78rpx;
		height: 26rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
		margin-right: 20rpx;
	}
	
	.supplyitem .publishinfo #time{
		display: flex;
		align-items: center;
	}
	.supplyitem .publishinfo #time image{
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		margin-top: 20rpx;
	}
	.supplyitem .publishinfo #time text{
		width: 204rpx;
		height: 20rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
	}

</style>
