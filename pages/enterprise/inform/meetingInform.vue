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
			<view class="body" v-for="(item, index) in meetingInformArr" :key='index'>
				<text class="time">{{item.time | timestampToTime}}</text>
				<view class="body-detail">
					<view class="title">
						<text>{{item.title}}</text>
					</view>
					<text class="body-detail-content">{{item.body}}</text>
					<text class="body-detail-content-tips" @click="enterMeetingDetail">查看会议详情>></text>
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
				meetingInformArr:[],
			}
		},
		filters:{
			timestampToTime(timestamp) {
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
		},
		onLoad(option) {
			let _this = this
			//获取会议通知消息
			_this.$request({
				url:'/noticeService/meetingNoticeList',
				data:{
					userId: _this.$store.state.id,
					userType: _this.$store.state.kind,
					// userId: 1,
					// userType: '1',
				}
			}).then(res=>{
				let data = res[1].data
				console.log(data)
				for(let i = 0; i < data.length; i++){
					if(data[i].meetingType === 0){	//会议通知
						let informObj = {
							time: data[i].receiveTime,
							title: '会议通知',
							body:'您收到了一条“'+data[i].meetingName+'”的会议邀请通知，请您及时查看并反馈。'
						}
						_this.meetingInformArr.push(informObj)
					}
					else{
						let informObj = {
							time: data[i].receiveTime,
							title: '会议取消',
							body:'在 '+data[i].meetingTime+' 的会议已被取消，请知晓。'
						}
						_this.meetingInformArr.push(informObj)
					}
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			enterMeetingDetail(){
				uni.navigateTo({
					url:'../../home/meetingInform/meetingInform'
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
		height: 202rpx;
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
	.body-detail .body-detail-content-tips{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2D6BDD;
		line-height: 46rpx;
	}
</style>
