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
				<text>消息</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="body" @click="openSystemInform">
				<view class="img">
					<image src="../../../static/enterprise/systemInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">系统消息</text>
						<text class="tips2">5小时前</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{systemInform[0].body}}</text>
						<view class="informationCount">
							<text>{{systemInform.length}}</text>
						</view>
					</view>
				</view>
			</view>
		
			<view class="body" @click="openMeetingInform">
				<view class="img">
					<image src="../../../static/enterprise/meetingInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">会议通知</text>
						<text class="tips2">3天前</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{meetingInform[0].body}}</text>
						<view class="informationCount">
							<text>{{meetingInform.length}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="body" @click="openFeedBackInform">
				<view class="img">
					<image src="../../../static/enterprise/findInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">找融资反馈</text>
						<text class="tips2">3天前</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{financeInform[0].body}}</text>
						<view class="informationCount">
							<text>{{financeInform.length}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="body" @click="openPolicyInform">
				<view class="img">
					<image src="../../../static/enterprise/policyInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">惠企政策通知</text>
						<text class="tips2">3天前</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{policyInform[0].body}}</text>
						<view class="informationCount">
							<text>{{policyInform.length}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="body" @click="openRectifyInform">
				<view class="img">
					<image src="../../../static/enterprise/rectifyInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">整改通知</text>
						<text class="tips2">3天前</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{rectifyInform[0].body}}</text>
						<view class="informationCount">
							<text>{{rectifyInform.length}}</text>
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
		components:{uniNavBar},
		data() {
			return {
				systemInform:[
					{
						time:'2020-12-21 13:35',
						title:'信息填报',
						body:'您收到“关于新型冠状病毒防治的调查报告”的填报通知，请尽快填写。',
					},
					{
						time:'2020-12-21 13:35',
						title:'信息填报',
						body:'您收到“关于新型冠状病毒防治的调查报告”的填报通知，请尽快填写。',
					}
				],
				meetingInform:[
					{
						time:'2020-12-21 13:35',
						title:'会议取消',
						body:'在 2020-11-25 12:00  星期三的会议已被取消，请知晓。',
					},
					{
						time:'2020-12-20 13:35',
						title:'会议通知',
						body:'您收到了一条“xxx会议名称”的会议邀请通知，请您及时查看。'
					}
				],
				financeInform:[
					{
						time:'2020-12-21 13:35',
						title:'融资反馈',
						body:'您在 2020-11-25 09:15  提交的融资需求已反馈，请查看详情。',
					},
					{
						time:'2020-12-11 13:35',
						title:'融资反馈',
						body:'您在 2020-10-19 12:00  提交的融资需求已反馈，请查看详情。'
					}
				],
				policyInform:[
					{
						time:'2020-12-21 13:35',
						title:'经营扶持',
						body:'2020年生物质发电中央补贴项目申报',
						deadline:'2021年2月4日'
					},
					{
						time:'2020-12-11 13:35',
						title:'减税降税',
						body:'惠州文化产业发展专项资金开始申报'
					},
					{
						time:'2020-12-21 13:35',
						title:'人才政策',
						body:'鼓励类外商投资项目进口设备免税确认申报材料',
					},
					{
						time:'2020-12-21 13:35',
						title:'投融资',
						body:'国家发展改革委环资司有关负责同志出席国家节水型城市申报材料预审会',
						deadline:'2021年2月4日'
					}
				],
				rectifyInform:[
					{
						time:'2020-12-21 13:35',
						title:'整改通知',
						body:'2021年2月11日消防检测结果整改通知。',
					},
					{
						time:'2020-12-21 13:35',
						title:'整改通知',
						body:'2021年11月15日消防检测结果整改通知。',
					},
				]
			}
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			openSystemInform(){
				let _this = this
				let parameArr = _this.systemInform
				console.log(parameArr)
				uni.navigateTo({
					url:'./systemInform?parameArr='+JSON.stringify(parameArr)
				})
			},
			openMeetingInform(){
				let _this = this
				let parameArr = _this.meetingInform
				console.log(parameArr)
				uni.navigateTo({
					url:'./meetingInform?parameArr='+JSON.stringify(parameArr)
				})
			},
			openFeedBackInform(){
				let _this = this
				let parameArr = _this.financeInform
				console.log(parameArr)
				uni.navigateTo({
					url:'./feedBackInform?parameArr='+JSON.stringify(parameArr)
				})
			},
			openPolicyInform(){
				let _this = this
				let parameArr = _this.policyInform
				// console.log(parameArr)
				uni.navigateTo({
					url:'./policyInform?parameArr='+JSON.stringify(parameArr)
				})
			},
			openRectifyInform(){
				let _this = this
				let parameArr = _this.rectifyInform
				// console.log(parameArr)
				uni.navigateTo({
					url:'./rectifyInform?parameArr='+JSON.stringify(parameArr)
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
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	.body{
		height: 151rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.body .img{
		width: 90rpx;
		height: 90rpx;
		margin-right:24rpx ;
		display: flex;
		justify-content: flex-start;
	}
	.img image{
		width: 90rpx;
		height: 90rpx;
	}
	.body .bodyRight{
		height: inherit;
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1;
		border-bottom:1rpx solid #E9E9E9;
	}
	.bodyRight .title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.title .tips1{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000000;
	}
	.title .tips2{
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
	}
	.bodyContent{
		margin-top: 21rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.bodyContent .information{
		width: 522rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
	}
	.bodyContent .informationCount{
		width: 32rpx;
		height: 32rpx;
		background: #F44F4F;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bodyContent .informationCount text{
		/* display: flex;
		justify-self: center; */
		font-size: 20rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
