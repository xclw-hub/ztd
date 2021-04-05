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
				<text>会议通知</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="meeting-list">
				<view class="meeting-item"  v-for="(item, index) in meetingList" :key='index' @click="enterDetail(index)">
					<view class="meetingNew" v-if="item.state===0">
						<view class="up">
							<view id="meetingNew-flag">
							</view>
							<text class="up-title">{{item.title}}</text>
						</view>
						<view class="down">
							<view class="down-time">
								<image src="../../../static/home/meetingDuration.png"></image>
								<text>时间：{{item.startTime}}</text>
							</view>
							<view class="down-location">
								<image src="../../../static/home/meetingLocation.png"></image>
								<text>地点：{{item.location}}</text>
							</view>
						</view>
					</view>
					<view class="meetingNoStart"  v-else-if="item.state===1">
						<view class="up">
							<view id="meetingNoStart-flag">
								<text>未开始</text>
							</view>
							<text class="up-title">{{item.title}}</text>
						</view>
						<view class="down">
							<view class="down-time">
								<image src="../../../static/home/meetingDuration.png"></image>
								<text>时间：{{item.startTime}}</text>
							</view>
							<view class="down-location">
								<image src="../../../static/home/meetingLocation.png"></image>
								<text>地点：{{item.location}}</text>
							</view>
						</view>
					</view>
					
					<view class="meetingStarted"  v-else-if="item.state===2||item.state===3">
						<view class="up">
							<view id="meetingStarted-flag">
								<text>进行中</text>
							</view>
							<text class="up-title">{{item.title}}</text>
						</view>
						<view class="down">
							<view class="down-time">
								<image src="../../../static/home/meetingDuration.png"></image>
								<text>时间：{{item.startTime}}</text>
							</view>
							<view class="down-location">
								<image src="../../../static/home/meetingLocation.png"></image>
								<text>地点：{{item.location}}</text>
							</view>
						</view>
					</view>
					
					<view class="meetingEnd"  v-else-if="item.state===4">
						<view class="up">
							<view id="meetingEnd-flag">
								<text>已结束</text>
							</view>
							<text class="up-title">{{item.title}}</text>
						</view>
						<view class="down">
							<view class="down-time">
								<image src="../../../static/home/meetingDuration.png"></image>
								<text>时间：{{item.startTime}}</text>
							</view>
							<view class="down-location">
								<image src="../../../static/home/meetingLocation.png"></image>
								<text>地点：{{item.location}}</text>
							</view>
						</view>
					</view>
					
					<view class="meetingCancel"  v-else>
						<view class="up">
							<text class="up-title" id="meetingCancel-title">{{item.title}}</text>
						</view>
						<view class="down">
							<view class="down-time">
								<image src="../../../static/home/meetingDuration.png"></image>
								<text>时间：{{item.startTime}}</text>
							</view>
							<view class="down-location">
								<image src="../../../static/home/meetingLocation.png"></image>
								<text>地点：{{item.location}}</text>
							</view>
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
				meetingList:[
					{
						//0:新会议通知,1:已报名，待参加(企业),2:进行中，待参加,3:进行中，已参加,4:正常结束，5:取消会议     6:待反馈，有报名,7:已报名，待参加(个人),8:未报名参加
						state:0,
						title:'关于加强疫情防控期间外来车辆',
						publisher:'赵汝杰',
						checker:'李松林',
						publishTime:'2020-12-02 22:49',
						content:'美国一些人的政治操弄，既滑出了道义的底线，也偏离了人性的轨道。国际社会普遍称赞中国以自身付出的巨大牺牲为全球作出巨大贡献，美国一些政客却热衷于拉帮结伙、敲诈勒索。奉劝美国一些政客，听听文明世界的忠告，追责索赔闹剧继续演下去，只会失道寡助，自取其辱。',
						imgSrc:'../../../static/home/meetingSrc.png',
						startTime:'2020-11-25 14:00  星期三',
						durationTime:'30分钟',
						location:'南区1206会议室'
					},
					{
						state:1,
						title:'关于加强疫情防控期间外来车辆',
						publisher:'赵汝杰',
						checker:'李松林',
						publishTime:'2020-12-02 22:49',
						content:'美国一些人的政治操弄，既滑出了道义的底线，也偏离了人性的轨道。国际社会普遍称赞中国以自身付出的巨大牺牲为全球作出巨大贡献，美国一些政客却热衷于拉帮结伙、敲诈勒索。奉劝美国一些政客，听听文明世界的忠告，追责索赔闹剧继续演下去，只会失道寡助，自取其辱。',
						imgSrc:'../../../static/home/meetingSrc.png',
						startTime:'2020-11-25 14:00  星期三',
						durationTime:'30分钟',
						location:'南区1206会议室'
					},
					{
						state:2,
						title:'关于加强疫情防控期间外来车辆',
						publisher:'赵汝杰',
						checker:'李松林',
						publishTime:'2020-12-02 22:49',
						content:'美国一些人的政治操弄，既滑出了道义的底线，也偏离了人性的轨道。国际社会普遍称赞中国以自身付出的巨大牺牲为全球作出巨大贡献，美国一些政客却热衷于拉帮结伙、敲诈勒索。奉劝美国一些政客，听听文明世界的忠告，追责索赔闹剧继续演下去，只会失道寡助，自取其辱。',
						imgSrc:'../../../static/home/meetingSrc.png',
						startTime:'2020-11-25 14:00  星期三',
						durationTime:'30分钟',
						location:'南区1206会议室'
					},
					{
						state:3,
						title:'关于加强疫情防控期间外来车辆',
						publisher:'赵汝杰',
						checker:'李松林',
						publishTime:'2020-12-02 22:49',
						content:'美国一些人的政治操弄，既滑出了道义的底线，也偏离了人性的轨道。国际社会普遍称赞中国以自身付出的巨大牺牲为全球作出巨大贡献，美国一些政客却热衷于拉帮结伙、敲诈勒索。奉劝美国一些政客，听听文明世界的忠告，追责索赔闹剧继续演下去，只会失道寡助，自取其辱。',
						imgSrc:'../../../static/home/meetingSrc.png',
						startTime:'2020-11-25 14:00  星期三',
						durationTime:'30分钟',
						location:'南区1206会议室'
					},
					{
						state:4,
						title:'关于加强疫情防控期间外来车辆',
						publisher:'赵汝杰',
						checker:'李松林',
						publishTime:'2020-12-02 22:49',
						content:'美国一些人的政治操弄，既滑出了道义的底线，也偏离了人性的轨道。国际社会普遍称赞中国以自身付出的巨大牺牲为全球作出巨大贡献，美国一些政客却热衷于拉帮结伙、敲诈勒索。奉劝美国一些政客，听听文明世界的忠告，追责索赔闹剧继续演下去，只会失道寡助，自取其辱。',
						imgSrc:'../../../static/home/meetingSrc.png',
						startTime:'2020-11-25 14:00  星期三',
						durationTime:'30分钟',
						location:'南区1206会议室'
					},
					{
						state:5,
						title:'关于加强疫情防控期间外来车辆',
						publisher:'赵汝杰',
						checker:'李松林',
						publishTime:'2020-12-02 22:49',
						content:'美国一些人的政治操弄，既滑出了道义的底线，也偏离了人性的轨道。国际社会普遍称赞中国以自身付出的巨大牺牲为全球作出巨大贡献，美国一些政客却热衷于拉帮结伙、敲诈勒索。奉劝美国一些政客，听听文明世界的忠告，追责索赔闹剧继续演下去，只会失道寡助，自取其辱。',
						imgSrc:'../../../static/home/meetingSrc.png',
						startTime:'2020-11-25 14:00  星期三',
						durationTime:'30分钟',
						location:'南区1206会议室'
					},
				]
					
			}
		},
		methods:{
			clickBack(){
				uni.navigateTo({
					url:'../home'
				})
			},
			enterDetail(index){
				let obj=this.meetingList[index]
				let param={
					state: obj.state,
					title: obj.title,
					publisher: obj.publisher,
					checker: obj.checker,
					publishTime: obj.publishTime,
					content: obj.content,
					imgSrc: obj.imgSrc,
					startTime: obj.startTime,
					durationTime: obj.durationTime,
					location: obj.location
				}
				if(obj.state===0){		//进入新会议通知页面
					uni.navigateTo({
						url:'meetingDetailNoApply?param='+JSON.stringify(param)
					})
				}
				else{		
					uni.navigateTo({
						url:'meetingDetailApplied?param='+JSON.stringify(param)
					})
				}
				console.log(param)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #E9E9E9;
	}
	.uniNavBar_left{
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 36rpx;
			height: 36rpx;
		}
	}
	.uniNavBar_center{
		display: flex;
		align-items: center;
		justify-content: center;
		text{
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.meeting-list{
		.meeting-item{
			width: 100%;
			background: #FFFFFF;
			padding-top: 39rpx;
			padding-bottom: 38rpx;
			margin-bottom: 20rpx;
			display: flex;
			flex-direction: column;
			.up{
				display:flex;
				align-items: center;
				margin-left: 40rpx;
				margin-right: 40rpx;
				.up-title{
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #333333;
				}
				#meetingCancel-title{
					color: #777777;
				}
			}
			.down{
				margin-top: 23rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
				display: flex;
				flex-direction: column;
				.down-time, .down-location{
					display: flex;
					align-items: center;
				}
				image{
					width: 24rpx;
					height: 24rpx;
					margin-right: 11rpx;
				}
				text{
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #777777;
					line-height: 42rpx;
				}
				// text{
				// 	display: -webkit-box;
				// 	-webkit-box-orient: vertical;
				// 	-webkit-line-clamp: 2;
				// 	overflow: hidden;
				// 	font-size: 25rpx;
				// 	font-family: Source Han Sans CN;
				// 	font-weight: 400;
				// 	color: #AAAAAA;
				// 	line-height: 36rpx;
				// }
			}
		}
	}
	#meetingNew-flag{
		width: 16rpx;
		height: 16rpx;
		background: #FF4949;
		border-radius: 50%;
		margin-right: 14rpx;
	}
	#meetingNoStart-flag{
		margin-right: 14rpx;
		width: 96rpx;
		height: 40rpx;
		border: 2rpx solid #2E6BDE;
		border-radius: 5rpx;
		display:flex;
		align-items: center;
		justify-content: center;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #2E6BDE;
			line-height: 42rpx;
		}
	}
	#meetingStarted-flag{
		margin-right: 14rpx;
		width: 96rpx;
		height: 40rpx;
		background: #00AD76;
		border-radius: 5rpx;
		display:flex;
		align-items: center;
		justify-content: center;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 42rpx;
		}
	}
	#meetingEnd-flag{
		margin-right: 14rpx;
		width: 96rpx;
		height: 40rpx;
		background: #BFBFBF;
		border-radius: 5rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 42rpx;
		}
	}
</style>
