<template>
	<view>
		<uniNavBar status-bar="true" backgroundColor="#2D6BDD" @clickLeft="clickBack">
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>通知公告</text>
			</view>
		</uniNavBar>

		<view class="title">
			<view class="service" @click="serviceClick"
				:class="[isActive_service ? activeClass_service : 'active2_service']">
				<text v-bind:style="{color:serviceColor}">活动&政策</text>
			</view>
			<view class="need" @click="needClick" :class="[isActive_need ? activeClass_need : 'active2_need']">
				<text v-bind:style="{color:needColor}">重要通知</text>
			</view>
		</view>
		<view class="content">
			<view class="myService" v-if="choice">
				<view class="serviceList" v-for="(item,index) in policyList" :key="index" @click="viewserviceDetail(index)">
					<text id="message">{{item.title}}</text>
					<view class="publishinfo">
						<view id="people">
							<image src="../../../static/home/people.png"></image>
							<text>{{item.publisher}}</text>
						</view>
						<view id="time">
							<image src="../../../static/enterprise/clock.png"></image>
							<text>{{item.time|toDate}}</text>
						</view>
					</view>
				</view>
			</view>

			<view v-else class="supplyList">
				<view class="supplyitem" v-for="(item,index) in noticeList" :key="index"
					@click="viewSupplyDetail(index)">
					<text class="reddot" v-if="!item.read"></text><text id="message">{{item.title}}</text>
					<view class="publishinfo">
						<view id="people">
							<image src="../../../static/home/people.png"></image>
							<text>{{item.publisher}}</text>
						</view>
						<view id="time">
							<image src="../../../static/enterprise/clock.png"></image>
							<text>{{item.time|toDate}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		request
	} from '../../../util/request.js'
			import uParse from "@/components/feng-parse/parse.vue"
	function timestampToTime(timestamp) {
		var date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
		
		let strDate = Y+M+D+h+m+s;
		return strDate;
		
	}
	export default {
		components: {
			uniNavBar,
		},
		data() {
			return {

				policyList: [
				],
				noticeList: [
				],
				choice: true, //表示选择我的服务，否则表示选择供需列表
				isActive_service: true, //点击我的服务时的view样式
				activeClass_service: 'active1_service',
				serviceColor: '#2D6BDD',
				isActive_need: false, //点击供应需求时的view样式
				activeClass_need: 'active1_need',
				needColor: '#666666',
			}
		},
		onLoad() {
			let _this = this
			let that = this
			console.log({
					userId:_this.$store.state.id,
					userType:_this.$store.state.kind
				})
			
			request({
				url: '/announcement/govInformationList',
				data:{
					userId:_this.$store.state.id,
					// userId:1,
					userType:_this.$store.state.kind
				}
			}).then(res => {
				console.log(res[1].data)
				that.policyList = res[1].data
			})
			request({
				url: '/announcement/govNoticeList',
				data:{
					// userId:58,
					userId:_this.$store.state.id,
					userType:_this.$store.state.kind
				}
			}).then(res => {
				console.log(res[1].data)
				that.noticeList = res[1].data
			})
		},
		filters: {
		  toDate: function (value) {
			let date1 = timestampToTime(value)
		    return date1
		  }
		},
		methods: {
			clickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			serviceClick() {
				this.isActive_service = true
				this.isActive_need = false
				this.serviceColor = '#2D6BDD'
				this.needColor = '#666666'
				this.choice = true //触发活动政策模块
			},
			needClick() {
				this.isActive_need = true
				this.isActive_service = false
				this.needColor = '#2D6BDD'
				this.serviceColor = '#666666'
				this.choice = false //触发通知公告模块
			},
			// 查看供应详情
			viewSupplyDetail(index) {
				let that = this
				this.noticeList[index].read = true;
				uni.navigateTo({
					url: 'importantNoticedetail?pkid='+that.noticeList[index].pkid
				})
			},
			viewserviceDetail(index) {
				let that = this
				console.log(that.policyList[index].pkid)
				uni.navigateTo({
					url: 'activityPolicydetail?pkid='+that.policyList[index].pkid
				})
			},
		}
	}
</script>

<style scoped>
	.uniNavBar_left,
	.uniNavBar_center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.uniNavBar_left image {
		width: 36rpx;
		height: 36rpx;
	}

	.uniNavBar_center {
		text-align: center;
	}

	.uniNavBar_center text {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}

	.content {
		position: relative;
		z-index: 10;
		width: 100%;
	}

	.title {
		display: flex;
		flex-direction: row;
	}

	.active1_service {
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 5rpx solid #2D6BDD;
	}

	.active2_service {
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.active1_need {
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 5rpx solid #2D6BDD;
	}

	.active2_need {
		background: #F5F5F5;
		height: 80rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title text {
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
	}

	.myService .serviceList {
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

	.serviceList #message {
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}

	.myService .publishinfo {
		display: flex;
		margin-top: 10rpx;

	}

	.serviceList .publishinfo #people {
		display: flex;
		align-items: center;
	}

	.serviceList .publishinfo #people image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		margin-top: 10rpx;
	}

	.serviceList .publishinfo #people text {
		height: 26rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
		margin-right: 20rpx;
	}

	.serviceList .publishinfo #time {
		display: flex;
		align-items: center;
	}

	.serviceList .publishinfo #time image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		margin-top: 20rpx;
	}

	.serviceList .publishinfo #time text {
		height: 20rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
	}

	.supplyList .supplyitem {
		width: 100%;
		padding-left: 30rpx;
		padding-right: 30rpx;
		height: 186rpx;
		padding-top: 20rpx;
		border-bottom: 20rpx solid #eee;
	}

	.supplyitem #message {
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}

	.supplyList .publishinfo {
		display: flex;
		margin-top: 10rpx;

	}

	.supplyitem .publishinfo #people {
		display: flex;
		align-items: center;
	}

	.supplyitem .publishinfo #people image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		margin-top: 10rpx;
	}

	.supplyitem .publishinfo #people text {
		height: 26rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
		margin-right: 20rpx;
	}

	.supplyitem .publishinfo #time {
		display: flex;
		align-items: center;
	}

	.supplyitem .publishinfo #time image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
		margin-top: 20rpx;
	}

	.supplyitem .publishinfo #time text {
		height: 20rpx;
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 42rpx;
	}
</style>
