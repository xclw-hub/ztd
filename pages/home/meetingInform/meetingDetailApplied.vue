<template>
	<view>
		<view class="nav">
			<view class="head">
				<view id="left" @click="clickBack">
					<image src="../../../static/enterprise/return.png"></image>
				</view>
				<view id="center">
					<text>会议详情</text>
				</view>
				<view id="right" v-if="state!=2&&state!=6" @click="clickOption">
					<image src="../../../static/moreDot.png"></image>
				</view>
				<view id="right-empty" v-else></view>
			</view>
			<view class="flag">
				<view class="flag-box">
					<image src="../../../static/home/meeting_flag1.png"></image>
					<text v-if="state==1||state==7">已报名，待参加</text>
					<text v-else-if="state==2">进行中，待参加</text>
					<text v-else-if="state==3">进行中，已参加</text>
					<text v-else-if="state==4">已结束</text>
					<text v-else-if="state==5">已结束，被取消</text>
					<text v-else-if="state==6">待反馈，有报名</text>
					<text v-else-if="state==8">未报名参加</text>
					<text v-else>状态码错误</text>
					<image src="../../../static/home/meeting_flag2.png"></image>
				</view>
			</view>
		</view>
		
		<view class="body">
			<view class="rectangle"></view>
			<view class="body-up">
				<text id="title">{{title}}</text>
				<view class="tips">
					<text>发布人：{{publisher}}</text>
					<text>审核人：{{checker}}</text>
					<text>时间：{{publishTime}}</text>
				</view>
			</view>
			
			<view class="body-center">
				<text>{{content}}</text>
				<image :src='imgSrc'></image>
			</view>
			
			<view class="body-down">
				<view class="box" id="box1">
					<view class="left">
						<image src="../../../static/home/meetingTime.png"></image>
						<text>会议开始时间</text>
					</view>
					<text class="right">{{startTime}}</text>
				</view>
				<view class="box" id="box2">
					<view class="left">
						<image src="../../../static/home/meetingDuration.png"></image>
						<text>会议时长</text>
					</view>
					<text class="right">{{durationTime}}分钟</text>
				</view>
				<view class="box">
					<view class="left">
						<image src="../../../static/home/meetingLocation.png"></image>
						<text>会议地点</text>
					</view>
					<text class="right">{{location}}</text>
				</view>
			</view>
			
			<view class="participatorAbout">
				<view class="participatorAbout-rectangle"></view>
				<text>与会人员</text>
				<view class="participator-list">
					<view class="participator" v-for="(item, index) in participatorList" :key='index'>
						<view class="participator-left">
							<view class="participator-img">
								<image :src='item.photo'></image>
							</view>
							<view class="participator-identity">
								<text>{{item.name}}</text>
								<view class="participator-identity-job">
									<text>{{item.position}}</text>
								</view>
							</view>
						</view>
						<view class="participator-right">
							<view class="noSignIn" v-if="!item.isSignIn">
								<image src="../../../static/enterprise/clock.png"></image>
								<text>未签到</text>
							</view>
							<view class="signIn" v-if="item.isSignIn">
								<image src="../../../static/home/signIn.png"></image>
								<text>已签到</text>
							</view>
							<view class="phone">
								<image src="../../../static/telephone.png" @click="dialTelephone(index)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<view class="cancel" v-if="state==5">
				<view class="cancel-up">
					<image src="../../../static/home/why.png"></image>
					<text>取消原因</text>
				</view>
				<view class="cancel-center">
					<text>{{cancelReason.content}}</text>
				</view>
				<view class="cancel-down">
					<text>审核人：{{cancelReason.checker}}</text>
					<text>时间：{{cancelReason.time}}</text>
				</view>
			</view>
			
			<view class="personal" v-if="state==6">
				<view class="personal-left" @click="personalNoParticipate">
					<text>不参加</text>
				</view>
				<view class="personal-right" @click="personalParticipate">
					<text>参加</text>
				</view>
			</view>
		</view>
		
		<!-- 遮罩层 -->
		<view class="mask" v-show="adjustOptionPopUpShow"></view>
		<!-- 参会调整对话框 -->
		<view class="dropOption" v-show="adjustOptionShow" @click="doAdjust">
			<text>参会调整</text>
		</view>
		<!-- 点击参会调整后的弹窗 -->
		<view class="popup-addParticipator" v-show="adjustOptionPopUpShow">
			
			<view class="popup-addParticipator-title">
				<text>选择与会人员</text>
				<image src="../../../static/enterprise/cancel.png" @click="closeAdjustParticipator"></image>
			</view>
			
			<view class="popup-participator-list">
				<view class="popup-participator" v-for="(item, index) in contactList" :key='index'>
					<view class="popup-participator-left">
						<view class="popup-participator-img">
							<image :src='item.photo'></image>
						</view>
						<view class="popup-participator-identity">
							<text>{{item.name}}</text>
							<view class="popup-participator-identity-job">
								<text>{{item.position}}</text>
							</view>
						</view>
					</view>
					<view class="popup-participator-right-no" v-show="item.isPaticipator" @click="cancelParticipate(index)">
						<text>取消</text>
					</view>
					<view class="popup-participator-right-yes" v-show="!item.isPaticipator" @click="confirmParticipate(index)">
						<text>参加</text>
					</view>
				</view>
			</view>
			
			<view class="popup-addParticipator-option">
				<view class="popup-addParticipator-option-left" @click="addOtherParticipator">
					<text>调整自定义与会人员</text>
				</view>
				<view class="popup-addParticipator-option-right" @click="confirmAdd">
					<text>确定</text>
				</view>
			</view>
		</view>
		<!-- 取消参会对话框 -->
		<view class="dropOption" v-show="cancelOptionShow" @click="doCancel">
			<text>取消参会</text>
		</view>
		<!-- 是否取消参会对话框 -->
		<uni-popup id="cancelPopupDialog" ref="cancelPopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			title="再次确认" 
			content="您是否确认取消参加这次会议？"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="否"
			title_right="是"
			:before-close="true" 
			@confirm="cancelConfirm" 
			@close="cancelClose"></uni-popup-dialog>
		</uni-popup>
		<!-- 删除记录对话框 -->
		<view class="dropOption" v-show="deleteOptionShow" @click="doDelete">
			<text>删除记录</text>
		</view>
		<!-- 是否删除记录对话框 -->
		<uni-popup id="deletePopupDialog" ref="deletePopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			title="提示" 
			content="您确定要删除此条会议记录吗？"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="否"
			title_right="是"
			:before-close="true" 
			@confirm="deleteConfirm" 
			@close="deleteClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				deleteOptionShow:false,		//删除记录下拉框
				adjustOptionShow:false,		//参会调整对话框
				cancelOptionShow:false,		//取消参会对话框
				adjustOptionPopUpShow:false,	//点击参会调整后的弹窗	
				meetingId:0,
				//1:已报名，待参加(企业),2:进行中，待参加,3:进行中，已参加,4:正常结束，5:取消会议     6:待反馈，有报名,7:已报名，待参加(个人),8:未报名参加
				state:1,
				title:'',
				publisher:'',
				checker:'',
				publishTime:'',
				content:'',
				imgSrc:'',
				startTime:'',
				durationTime:'',
				location:'',
				contactList:[],		//可选成员列表
				participatorList:[],		//已参加的成员列表
				enterpriseId:0,		//包括企业用户的ID以及个人用户所在企业的ID
				token:'',
				cancelReason:{
					content:'宣讲文案需要资料补充及修正，为节省大家工作时间，故会议时间延后，调整后重新发布',
					checker:'李松林',
					time:'2020-12-02 22:49'
				}
			};
		},
		onLoad: function(option) {
			let obj = JSON.parse(option.param)
			this.state = obj.state,
			this.meetingId = obj.meetingId
			this.title = obj.title,
			this.publisher = obj.publisher,
			this.checker = obj.checker,
			this.publishTime = obj.publishTime,
			this.content = obj.content,
			this.imgSrc = obj.imgSrc,
			this.startTime = obj.startTime,
			this.durationTime = obj.durationTime,
			this.location = obj.location
			this.cancelReason = {
				time: obj.cancelTime,
				content: obj.cancelreason,
				checker: obj.cancelChecker
			}
			console.log(obj)
			let _this = this
			//获取企业ID
			if(_this.$store.state.kind === '0'){
				_this.enterpriseId = _this.$store.state.id
			}else{		//如果是个人用户，则获取其所在企业id
				let useInfo = _this.$store.state.userInfo
				_this.enterpriseId = useInfo.enterpriseId
			}
			//获取token
			uni.getStorage({
				key:'token',
				success:function(res){
					// console.log(res.data)
					_this.token = res.data
				},
				fail:function(err){
					console.log('token获取失败')
					return
				}
			})
			// console.log(_this.enterpriseId)
			// console.log(_this.meetingId)
			_this.$request({
				url:'/enterpriseParticipation',
				data:{
					enterpriseId: _this.enterpriseId,
					meetingId: _this.meetingId
				}
			}).then(res=>{
				let data = res[1].data
				// console.log(data)
				if(!data.statusCode){
					let contactArr = data.contactInfoList
					console.log(data.contactInfoList)
					for(let i = 0; i < contactArr.length; i++){
						if(contactArr[i].contactId){		//自定义与会成员没有ID，所以需要过滤成员列表
							let contactItem = {
								contactId: contactArr[i].contactId,
								photo: contactArr[i].head,
								name: contactArr[i].contactName,
								phone: contactArr[i].contactPhoneNum,
								position: contactArr[i].position,
								isSignIn: contactArr[i].contactSignedIn,
								isPaticipator: contactArr[i].contactParticipated		//用来改变参加与否的样式
							}
							if(contactArr[i].contactParticipated){
								_this.participatorList.push(contactItem)
							}
							_this.contactList.push(contactItem)
						}
					}
					console.log(_this.participatorList)
					console.log(_this.contactList)
				}else{
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						duration: 2000,
						title: data.statusMsg
					})
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		methods:{
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			clickOption(){
				if(this.state==1)
					this.adjustOptionShow=true
				else if(this.state==7)
					this.cancelOptionShow=true
				else
					this.deleteOptionShow=true
			},
			// 点击取消参会，显示对话弹窗
			doCancel(){
				this.$refs.cancelPopupDialog.open()
				this.cancelOptionShow=false
			},
			cancelConfirm(done) {
				let _this = this
				_this.$request({
					url:'/cancelAttending',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						userId: _this.$store.state.id,
						type: _this.$store.state.kind
					}
				}).then(res=>{
					// console.log(res)
					let data = res[1].data
					if(data.statusCode === 2000){
						console.log('取消参会成功')
						uni.reLaunch({
							url:'meetingInform'
						})
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: data.statusMsg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			cancelClose(done) {
				console.log('否');
				done()
			},
			// 个人已报名待参加页面点击参加
			personalParticipate(){
				console.log('参加')
				let _this = this
				_this.$request({
					url:'/acceptMeeting',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						userId: _this.$store.state.id,
						type: _this.$store.state.kind
					}
				}).then(res=>{
					let data = res[1].data
					// console.log(data)
					if(data.statusCode === 2000){
						console.log('会议参加成功')
						uni.reLaunch({
							url:'meetingInform'
						})
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: data.statusMsg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			// 个人已报名待参加页面点击不参加
			personalNoParticipate(){
				console.log('不参加')
				let _this = this
				_this.$request({
					url:'/cancelAttending',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						userId: _this.$store.state.id,
						type: _this.$store.state.kind
					}
				}).then(res=>{
					// console.log(res)
					let data = res[1].data
					if(data.statusCode === 2000){
						console.log('会议不参加')
						uni.reLaunch({
							url:'meetingInform'
						})
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: data.statusMsg
						})
					}
				}).catch(err=>{
					console.log(err)
				})	
			},
			// 点击删除记录，显示对话弹窗
			doDelete(){
				this.$refs.deletePopupDialog.open()
				this.deleteOptionShow=false
			},
			deleteConfirm(done) {
				console.log('是');
				let _this = this
				_this.$request({
					url:'/deleteRecord',
					data:{
						token: _this.token,
						userId: _this.$store.state.id,
						type: _this.$store.state.kind,
						meetingId: _this.meetingId
					}
				}).then(res=>{
					console.log(res)
					let data = res[1].data
					if(data.statusCode === 2000){
						console.log('删除记录成功')
						// uni.navigateBack({
						// 	delta:1
						// })
						uni.reLaunch({
							url:'meetingInform'
						})
					}
					else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: data.statusMsg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			deleteClose(done) {
				console.log('否');
				done()
			},
			// 点击参会调整按键,显示相应弹窗
			doAdjust(){
				this.adjustOptionShow=false
				this.adjustOptionPopUpShow=true
			},
			closeAdjustParticipator(){
				this.adjustOptionPopUpShow=false
			},
			confirmParticipate(index){
				let _this = this
				_this.contactList[index].isPaticipator=true
				// console.log(_this.token)
				// console.log(_this.meetingId)
				_this.$request({
					url:'/selectContacts',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						contactId: _this.contactList[index].contactId
					}
				}).then(res=>{
					// console.log(res)
					let data = res[1].data
					if(data.statusCode === 2000){
						console.log(_this.contactList[index].name+'会议参加成功')
					}else{
						console.log(_this.contactList[index].name+'会议参加失败')
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			cancelParticipate(index){
				let _this = this
				_this.contactList[index].isPaticipator=false
				_this.$request({
					url:'/cancelContacts',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						contactId: _this.contactList[index].contactId
					}
				}).then(res=>{
					// console.log(res)
					let data = res[1].data
					if(data.statusCode === 2000){
						console.log(_this.contactList[index].name+'取消参加成功')
					}else{
						console.log(_this.contactList[index].name+'取消参加失败')
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			addOtherParticipator(){
				this.adjustOptionPopUpShow=false
				uni.navigateTo({
					url:'addParticipator?meetingId='+this.meetingId
				})
			},
			confirmAdd(){
				// console.log('参会人员已确认')
				this.adjustOptionPopUpShow=false
				let _this = this
				_this.$request({
					url:'/acceptMeeting',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						userId: _this.$store.state.id,
						type: _this.$store.state.kind
					}
				}).then(res=>{
					let data = res[1].data
					// console.log(data)
					if(data.statusCode === 2000){
						uni.showToast({
							icon: 'success',
							position: 'bottom',
							duration: 2000,
							title: '参会调整成功'
						})
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							duration: 2000,
							title: data.statusMsg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//拨打电话
			dialTelephone(index){
				console.log(this.participatorList[index].phone)
				uni.makePhoneCall({
				    phoneNumber: this.participatorList[index].phone
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		// z-index: -10;
		background-color: #2D6BDD;
		// padding-top: 36rpx;
		padding-top: 56rpx;
		padding-bottom: 56rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		.head{
			height: 88rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			#left{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				image{
					width: 36rpx;
					height: 36rpx;
				}
			}
			#center{
				display: flex;
				align-items: center;
				flex: 1;
				justify-content: center;
				text{
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			#right{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				image{
					width: 38rpx;
					height: 8rpx;
				}
			}
			#right-empty{
				width: 36rpx;
				height: 36rpx;
			}
		}
		.flag{
			display: flex;
			justify-content: center;
			.flag-box{
				display: flex;
				align-items: center;
				image{
					height: 20rpx;
					width: 50rpx;
				}
				text{
					margin-left: 28rpx;
					margin-right: 28rpx;
					font-size: 26rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 42rpx;
				}
			}
		}
	}
	.body{
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0px 0px;
		padding-top: 49rpx;
		padding-bottom: 30rpx;
		position: absolute;
		overflow: scroll;
		// top: 190rpx;
		top: 210rpx;
		bottom: 0;
		.rectangle{
			position: absolute;
			left: 0;
			width: 6rpx;
			height: 40rpx;
			background-color: #2D6BDD;
		}
		.body-up{
			display: flex;
			flex-direction: column;
			border-bottom: 1rpx solid #E9E9E9;
			padding-bottom: 34rpx;
			padding-left: 39rpx;
			padding-right: 39rpx;
			#title{
				font-size: 34rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
			.tips{
				margin-top: 27rpx;
				display: flex;
				justify-content: space-between;
				text{
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
					line-height: 42rpx;
				}
			}
		}
		.body-center{
			padding-left: 39rpx;
			padding-right: 39rpx;
			padding-bottom: 46rpx;
			margin-top: 37rpx;
			display: flex;
			flex-direction: column;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
				line-height: 52rpx;
			}
			image{
				margin-top: 37rpx;
				width: 100%;
				height: 290rpx;
			}
		}
		.body-down{
			border-top: 20rpx solid #E9E9E9;
			border-bottom: 20rpx solid #E9E9E9;
			padding-left: 39rpx;
			padding-right: 39rpx;
			display: flex;
			flex-direction: column;
			.box{
				display: flex;
				padding-top: 38rpx;
				padding-bottom: 40rpx;
				justify-content: space-between;
				.left{
					display: flex;
					align-items: center;
					image{
						height: 28rpx;
						width: 28rpx;
						margin-right: 11rpx;
					}
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #777777;
						line-height: 42rpx;
					}
				}
				.right{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #333333;
					line-height: 42rpx;
				}
			}
			#box1,#box2{
				border-bottom: 1rpx solid #E9E9E9;
			}
		}
		.participatorAbout{
			display: flex;
			flex-direction: column;
			padding-left: 41rpx;
			padding-right: 41rpx;
			padding-top: 31rpx;
			padding-bottom: 31rpx;
			.participatorAbout-rectangle{
				position: absolute;
				left: 0;
				width: 6rpx;
				height: 40rpx;
				background-color: #2D6BDD;
			}
			text:nth-child(1){
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
				line-height: 42rpx;
			}
			.participator-list{
				display: flex;
				flex-direction: column;
				.participator{
					height: 150rpx;
					display: flex;
					align-items: center;
					border-top: 1rpx solid #E9E9E9;
					justify-content: space-between;
					.participator-left{
						display: flex;
						align-items: center;
						.participator-img{
							margin-right: 33rpx;
							width: 80rpx;
							height: 80rpx;
							image{
								width: 80rpx;
								height: 80rpx;
							}
						}
						.participator-identity{
							display: flex;
							flex-direction: column;
							text:nth-child(1){
								font-size: 30rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #333333;
								line-height: 36rpx;
							}
							.participator-identity-job{
								margin-top: 16rpx;
								padding-left: 8rpx;
								padding-right: 8rpx;
								border: 1rpx solid #888888;
								border-radius: 5rpx;
								text{
									font-size: 24rpx;
									font-family: Source Han Sans CN;
									font-weight: 400;
									color: #777777;
									line-height: 36rpx;
								}
							}
						}
					}
					.participator-right{
						display: flex;
						align-items: center;
						.noSignIn{
							width: 150rpx;
							height: 54rpx;
							border: 2rpx solid #C2C2C2;
							border-radius: 27rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							image{
								width: 24rpx;
								height: 24rpx;
								margin-right: 10rpx;
							}
							text{
								font-size: 28rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #999999;
							}
						}
						.signIn{
							width: 150rpx;
							height: 54rpx;
							border: 2rpx solid #C2C2C2;
							border-radius: 27rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							image{
								width: 24rpx;
								height: 24rpx;
								margin-right: 10rpx;
							}
							text{
								font-size: 28rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #00AD76;
							}
						}
						.phone{
							margin-left: 30rpx;
							width: 60rpx;
							height: 60rpx;
							image{
								width: 60rpx;
								height: 60rpx;
							}
						}
					}
				}
				view:nth-child(1){
					border-top: none;
				}
			}
		}
		.cancel{
			border-top: 20rpx solid #E9E9E9;
			display: flex;
			flex-direction: column;
			padding: 40rpx;
			.cancel-up{
				display: flex;
				align-items: center;
				image{
					height: 28rpx;
					width: 28rpx;
				}
				text{
					margin-left: 12rpx;
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #222222;
					line-height: 44rpx;
				}
			}
			.cancel-center{
				margin-top: 29rpx;
				text{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #666666;
					line-height: 42rpx;
				}
			}
			.cancel-down{
				margin-top: 29rpx;
				display: flex;
				text{
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
					line-height: 42rpx;
				}
				text:nth-child(1){
					margin-right: 40rpx;
				}
			}
		}
		.personal{
			border-top: 20rpx solid #E9E9E9;
			display: flex;
			height: 144rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
			justify-content: space-between;
			align-items: center;
			.personal-left{
				width: 324rpx;
				height: 84rpx;
				border: 2rpx solid #7D7D7D;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-size: 34rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #666666;
					line-height: 26rpx;
				}
			}
			.personal-right{
				width: 324rpx;
				height: 84rpx;
				background: #2D6BDD;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-size: 34rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					line-height: 26rpx;
				}
			}
		}
	}
	.dropOption{
		width: 160rpx;
		height: 70rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(122, 122, 122, 0.32);
		border-radius: 10rpx;
		position:absolute;
		top: 110rpx;
		right: 40rpx;
		text-align: center;
		text{
			font-size: 26rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #555555;
			line-height: 66rpx;
		}
	}
	.popup-addParticipator{
		background-color: #FFFFFF;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		position: fixed;
		z-index: 999;
		bottom: 0;
		left: 0;
		right: 0;
		padding-top: 40rpx;
		display: flex;
		flex-direction: column;
		.popup-addParticipator-title{
			margin-left: 41rpx;
			margin-right: 41rpx;
			display: flex;
			justify-content: space-between;
			text{
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
				line-height: 76rpx;
			}
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
		.popup-participator-list{
			margin-left: 41rpx;
			margin-right: 41rpx;
			display: flex;
			flex-direction: column;
			.popup-participator{
				height: 150rpx;
				display: flex;
				align-items: center;
				border-top: 1rpx solid #E9E9E9;
				justify-content: space-between;
				.popup-participator-left{
					display: flex;
					align-items: center;
					.popup-participator-img{
						margin-right: 33rpx;
						width: 80rpx;
						height: 80rpx;
						image{
							width: 80rpx;
							height: 80rpx;
						}
					}
					.popup-participator-identity{
						display: flex;
						flex-direction: column;
						text:nth-child(1){
							font-size: 30rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #333333;
							line-height: 36rpx;
						}
						.popup-participator-identity-job{
							// height: 36rpx;
							margin-top: 16rpx;
							padding-left: 8rpx;
							padding-right: 8rpx;
							border: 1rpx solid #888888;
							border-radius: 5rpx;
							text{
								font-size: 24rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #777777;
								line-height: 36rpx;
							}
						}
					}
				}
				.popup-participator-right-yes{
					width: 106rpx;
					height: 60rpx;
					background: #FF9C00;
					border-radius: 5rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 36rpx;
					}
				}
				.popup-participator-right-no{
					width: 106rpx;
					height: 60rpx;
					border: 1rpx solid #888888;
					border-radius: 5rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #888888;
						line-height: 36rpx;
					}
				}
			}
			view:nth-child(1){
				border-top: none;
			}
		}
		.popup-addParticipator-option{
			border-top: 1rpx solid #E9E9E9;
			height: 110rpx;
			display: flex;
			text{
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
				line-height: 36rpx;
				white-space: nowrap;
			}
			.popup-addParticipator-option-left{
				border-right: 1rpx solid #E9E9E9;
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.popup-addParticipator-option-right{
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index:666;
		background-color: rgba(0, 0, 0, 0.4);
		transition: opacity 0.3s;
	}
</style>
