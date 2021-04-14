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
			<view class="body" @click="openSystemInform" v-if="systemInform[0].body!=''">
				<view class="img">
					<image src="../../../static/enterprise/systemInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">系统消息</text>
						<text class="tips2">{{systemInformTimeDiff | timeDiff}}</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{systemInform[0].body}}</text>
						<view class="informationCount">
							<text>{{systemInform.length}}</text>
						</view>
					</view>
				</view>
			</view>
		
			<view class="body" @click="openMeetingInform" v-if="meetingInform[0].body!=''">
				<view class="img">
					<image src="../../../static/enterprise/meetingInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">会议通知</text>
						<text class="tips2">{{meetingInformTimeDiff | timeDiff}}</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{meetingInform[0].body}}</text>
						<view class="informationCount">
							<text>{{meetingInform.length}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="body" @click="openFeedBackInform" v-if="financeInform[0].body!=''">
				<view class="img">
					<image src="../../../static/enterprise/findInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">找融资反馈</text>
						<text class="tips2">{{financeInformTimeDiff | timeDiff}}</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{financeInform[0].body}}</text>
						<view class="informationCount">
							<text>{{financeInform.length}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="body" @click="openPolicyInform" v-if="policyInform[0].body!=''">
				<view class="img">
					<image src="../../../static/enterprise/policyInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">惠企政策通知</text>
						<text class="tips2">{{policyInformTimeDiff | timeDiff}}</text>
					</view>
					<view class="bodyContent">
						<text class="information">{{policyInform[0].body}}</text>
						<view class="informationCount">
							<text>{{policyInform.length}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="body" @click="openRectifyInform" v-if="rectifyInform[0].body!=''">
				<view class="img">
					<image src="../../../static/enterprise/rectifyInform.png"></image>
				</view>
				<view class="bodyRight">
					<view class="title">
						<text class="tips1">整改通知</text>
						<text class="tips2">{{rectifyInformTimeDiff | timeDiff}}</text>
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
				systemInformTimeDiff: 0,
				systemInform:[
					{
						time:'',
						title:'',
						body:'',
					}
				],
				meetingInformTimeDiff: 0,
				meetingInform:[
					{
						time:'',
						title:'',
						body:'',
					}
				],
				financeInformTimeDiff: 0,
				financeInform:[
					{
						time:'',
						title:'',
						body:'',
					}
				],
				policyInformTimeDiff: 0,
				policyInform:[
					{
						time:'',
						title:'',
						body:'',
						deadline:''
					}
				],
				rectifyInformTimeDiff: 0,
				rectifyInform:[
					{
						time:'',
						title:'',
						body:'',
					}
				]
			}
		},
		filters:{
			timeDiff(timestamp) {
				let time_second = parseInt(timestamp / 1000)
				if(time_second < 60){
					return time_second+'秒前'
				}
				else{
					let time_minute = parseInt(time_second / 60)
					if(time_minute < 60){
						return time_minute+'分钟前'
					}
					else{
						let time_hour = parseInt(time_minute / 60)
						if(time_hour < 24){
							return time_hour+'小时前'
						}else{
							let time_day = parseInt(time_hour / 24)
							return time_day+'天前'
						}
					}
				}
			 }
		},
		onLoad() {
			let _this = this
			let parkId,enterpriseId
			if(_this.$store.state.kind==='0'){
				parkId = _this.$store.state.enterpriseInfo.parkId
				enterpriseId = _this.$store.state.id
			}
			else{
				parkId = _this.$store.state.userInfo.parkId
				enterpriseId =_this.$store.state.userInfo.enterpriseId
			}
			console.log(_this.$store.state.id)
			console.log(_this.$store.state.kind)
			console.log(parkId)
			console.log(enterpriseId)
			//获取系统消息
			_this.$request({
				url:'/noticeService/systemNoticeList',
				data:{
					userId: _this.$store.state.id,
					userType: _this.$store.state.kind,
					// userId: 1,
					// userType: '0',
				}
			}).then(res=>{
				let data = res[1].data
				console.log(data)
				if(data.length > 0){
					let informObj = {
						time: data[0].receiveTime,
						title: data[0].title,
						body: data[0].summary
					}
					_this.systemInform.splice(0,1,informObj)
					let nowTime = new Date().getTime()		//获取当前时间戳
					_this.systemInformTimeDiff = nowTime - informObj.time
					// console.log(nowTime - informObj.time)
				}
				console.log(_this.systemInform)
			}).catch(err=>{
				console.log(err)
			})
			//获取惠企政策消息
			_this.$request({
				url:'/noticeService/preferentialPoliciesForEnterpriseNoticeList',
				data:{
					userId: _this.$store.state.id,
					userType: _this.$store.state.kind,
					// userId: 1,
					// userType: '0',
				}
			}).then(res=>{
				let data = res[1].data
				// console.log(data)
				if(data.length > 0){
					let informObj = {
						time: data[0].receiveTime,
						title: data[0].title,
						body: data[0].summary,
						deadline: data[0].deadline
					}
					_this.policyInform.splice(0,1,informObj)
					let nowTime = new Date().getTime()		//获取当前时间戳
					_this.policyInformTimeDiff = nowTime - informObj.time
				}
				// console.log(_this.policyInform)
			}).catch(err=>{
				console.log(err)
			})
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
				let meetingbody
				if(data.length > 0){
					if(data[0].meetingType === 0){	//会议通知
						meetingbody='您收到了一条“'+data[0].meetingName+'”的会议邀请通知，请您及时查看并反馈。'
					}
					else{
						meetingbody='在 '+data[0].meetingTime+' 的会议已被取消，请知晓。'
					}
					let informObj = {
						time: data[0].receiveTime,
						title: '会议被取消',
						body: meetingbody
					}
					// console.log(informObj)
					_this.meetingInform.splice(0,1,informObj)
					let nowTime = new Date().getTime()		//获取当前时间戳
					_this.meetingInformTimeDiff = nowTime - informObj.time
				}
				// console.log(_this.meetingInform)
			}).catch(err=>{
				console.log(err)
			})
			//获取整改通知消息
			_this.$request({
				url:'/noticeService/rectificationNoticeList',
				data:{
					userId: _this.$store.state.id,
					userType: _this.$store.state.kind,
					// userId: 1,
					// userType: '0',
				}
			}).then(res=>{
				let data = res[1].data
				// console.log(data)
				if(data.length > 0){
					let informObj = {
						time: data[0].time,
						title: '整改通知',
						body: data[0].summary
					}
					_this.rectifyInform.splice(0,1,informObj)
					let nowTime = new Date().getTime()		//获取当前时间戳
					_this.rectifyInformTimeDiff = nowTime - informObj.time
				}
			}).catch(err=>{
				console.log(err)
			})
			//获取融资反馈消息
			_this.$request({
				url:'/noticeService/financingFeedbackNoticeList',
				data:{
					parkId: parkId,
					companyId: enterpriseId
					// parkId: 4,
					// companyId: 12,
				}
			}).then(res=>{
				let data = res[1].data.data.list
				// console.log(data)
				if(data.length > 0){
					let informObj = {
						time: data[0].time,
						title: '融资反馈',
						body:'您在 '+ data[0].createTime +' 提交的融资需求已反馈，请查看详情。',
					}
					_this.financeInform.splice(0,1,informObj)
					let nowTime = new Date().getTime()		//获取当前时间戳
					let endTime = Date.parse(new Date(informObj.time))
					_this.financeInformTimeDiff = nowTime - endTime
				}
				// console.log(_this.financeInform)
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
			openSystemInform(){
				uni.navigateTo({
					url:'./systemInform'
				})
			},
			openMeetingInform(){
				uni.navigateTo({
					url:'./meetingInform'
				})
			},
			openFeedBackInform(){
				uni.navigateTo({
					url:'./feedBackInform'
				})
			},
			openPolicyInform(){
				uni.navigateTo({
					url:'./policyInform'
				})
			},
			openRectifyInform(){
				uni.navigateTo({
					url:'./rectifyInform'
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
