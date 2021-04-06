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
				meetingList:[],
				id:0,		//包括企业用户的ID以及个人ID
				type: ''
			}
		},
		onLoad() {
			let _this = this
			_this.type = _this.$store.state.kind
			_this.id = _this.$store.state.id
			//获取token
			uni.getStorage({
				key:'token',
				success:function(res){
					let token = res.data
					console.log(token)
					//获取所有会议ID
					_this.$request({
						url:'/callMeeting',
						data:{
							token: token,
							userId: _this.id,
							type: _this.type
						}
					}).then(res =>{
						console.log(res)
						let data = res[1].data
						if(data.statusCode === 2000){
							let meetingIdArr = data.meetingIds
							console.log(meetingIdArr)
							//获取每个会议详情并获取状态
							if(meetingIdArr.length <= 0){
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									duration: 2000,
									title: '没有收到相关会议通知'
								})
								return
							}
							for(let i = 0; i < meetingIdArr.length; i++){
								_this.$request({
									url:'/getMeetingDetails',
									data:{
										token: token,
										meetingId:meetingIdArr[i]
										// token: '12',
										// meetingId:120
									}
								}).then(res =>{
									let data = res[1].data
									// console.log(data)
									if(data.success){
										let meetingDetail = data.data
										// console.log(meetingDetail)
										let meetingObj = {
											//-1：该记录已删除或者会议状态有误（不展示该会议信息）  0：待反馈的新会议（只有企业有） 1:已报名，待参加(企业),2:进行中，待参加,3:进行中，已参加,4:正常结束，5:取消会议     6:待反馈，有报名,7:已报名，待参加(个人),8:未报名参加
											state:-1,	
											meetingId: meetingIdArr[i],
											title: meetingDetail.title,
											publisher: meetingDetail.author,
											checker: meetingDetail.examine,
											publishTime: meetingDetail.pubdate,
											content: meetingDetail.content,
											imgSrc: meetingDetail.pic,
											startTime: meetingDetail.starttime,
											durationTime: meetingDetail.duration,
											location: meetingDetail.address,
											cancelTime: meetingDetail.cancelTime || '',
											cancelreason: meetingDetail.cancelreason || '',
											cancelChecker: meetingDetail.examine || ''
										}
										// console.log(id)
										// console.log(type)
										//获取该会议的状态
										_this.$request({
											url:'/participantState',
											data:{
												token: token,
												meetingId: meetingObj.meetingId,
												userId: _this.id,
												type: _this.type,
												startTime: meetingObj.startTime,
												duration: meetingObj.durationTime
											}
										}).then(res=>{
											let data = res[1].data
											console.log(data)
											let meetingState
											if(data.statusCode === 2000){
												switch(data.state){
													case '待反馈':		//新会议
														meetingState = 0
														break;
													case '已报名，待参加':
														if(_this.type === '0'){
															meetingState = 1		//企业的已报名，待参加状态
														}else{
															meetingState = 7
														}
														break;
													case '进行中，待参加':
														meetingState = 2
														break;
													case '进行中，已参加':
														meetingState = 3
														break;
													case '已结束':
														meetingState = 4
														break;
													case '已结束，被取消':
														meetingState = 5
														break;
													case '待反馈，有报名':
														meetingState = 6
														break;
													case '未报名参加':
														meetingState = 8
														break;
													default:
														console.log(meetingIdArr[i]+'会议：状态信息有误，为：' + data.state)
														meetingState = -1		//-1表示该记录被删除，不参与会议展示
												}
												if(meetingState >= 0){
													meetingObj.state = meetingState		//修改会议状态
													console.log(meetingObj)
													_this.meetingList.push(meetingObj)		//加入展示列表
												}
											}
											else{
												console.log(meetingIdArr[i]+'会议：状态获取失败')
											}
										}).catch(err=>{
											console.log(err)
										})
									}
									else{
										console.log('id为：'+meetingIdArr[i]+'的会议详情获取失败')
									}
								}).catch(err=>{
									console.log(err)
								})
							}
						}
						else{
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								duration: 2000,
								title: data.statusMsg
							})
						}
					}).catch(err =>{
						console.log(err)
					})
				},
				fail:function(err){
					console.log('token获取失败')
					return
				}
			})
		},
		methods:{
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			enterDetail(index){
				let obj=this.meetingList[index]
				// let param={
				// 	state: obj.state,
				// 	title: obj.title,
				// 	publisher: obj.publisher,
				// 	checker: obj.checker,
				// 	publishTime: obj.publishTime,
				// 	content: obj.content,
				// 	imgSrc: obj.imgSrc,
				// 	startTime: obj.startTime,
				// 	durationTime: obj.durationTime,
				// 	location: obj.location,
				// }
				if(obj.state===0){		//进入新会议通知页面
					uni.navigateTo({
						url:'meetingDetailNoApply?param='+JSON.stringify(this.meetingList[index])
					})
				}
				else{		
					uni.navigateTo({
						url:'meetingDetailApplied?param='+JSON.stringify(this.meetingList[index])
					})
				}
				// console.log(param)
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
