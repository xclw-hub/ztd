<template>
	<view>
		<view class="nav">
			<view class="head">
				<view id="left" @click="clickBack">
					<image id="left" src="../../../static/enterprise/return.png"></image>
				</view>
				<view id="center">
					<text>会议详情</text>
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
			
			<view class="participate">
				<view class="participate-left" @click="noParticipate">
					<text>不参加</text>
				</view>
				<view class="participate-right" @click="addParticipator">
					<text>参加</text>
				</view>
			</view>
		</view>
		
		<!-- 遮罩层 -->
		<view class="mask" v-show="isShowAddParticipator"></view>
		
		<view class="addParticipator" v-show="isShowAddParticipator">
			
			<view class="addParticipator-title">
				<text>选择与会人员</text>
				<image src="../../../static/enterprise/cancel.png" @click="closeAddParticipator"></image>
			</view>
			
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
					<view class="participator-right-no" v-show="item.isPaticipator" @click="cancelParticipate(index)">
						<text>取消</text>
					</view>
					<view class="participator-right-yes" v-show="!item.isPaticipator" @click="confirmParticipate(index)">
						<text>参加</text>
					</view>
				</view>
			</view>
			
			<view class="addParticipator-option">
				<view class="addParticipator-option-left" @click="addOtherParticipator">
					<text>确定并增加与会人员</text>
				</view>
				<view class="addParticipator-option-right" @click="confirmAdd">
					<text>确定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowAddParticipator:false,
				meetingId:0,
				enterpriseId:0,		//包括企业用户的ID
				token:'',
				title:'',
				publisher:'',
				checker:'',
				publishTime:'',
				content:'',
				imgSrc:'',
				startTime:'',
				durationTime:'',
				location:'',
				participatorList:[]		//已参加的成员列表
			};
		},
		onLoad: function(option) {
			let obj = JSON.parse(option.param)
			this.meetingId = obj.meetingId,
			this.title = obj.title,
			this.publisher = obj.publisher,
			this.checker = obj.checker,
			this.publishTime = obj.publishTime,
			this.content = obj.content,
			this.imgSrc = obj.imgSrc,
			this.startTime = obj.startTime,
			this.durationTime = obj.durationTime,
			this.location = obj.location
			console.log(obj)
			let _this = this
			//获取企业ID
			_this.enterpriseId = _this.$store.state.id
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
				},
			}).then(res=>{
				let data = res[1].data
				console.log(data)
				if(!data.statusCode){
					let contactArr = data.contactInfoList
					console.log(data.contactInfoList)
					for(let i = 0; i < contactArr.length; i++){
						if(contactArr[i].contactId){		//自定义与会成员没有ID，所以需要过滤成员列表
							let contactItem = {
								contactId: contactArr[i].contactId,
								photo: contactArr[i].head,
								name: contactArr[i].contactName,
								position: contactArr[i].position,
								isSignIn: contactArr[i].contactSignedIn,
								isPaticipator: contactArr[i].contactParticipated		//用来改变参加与否的样式
							}
								_this.participatorList.push(contactItem)
						}
					}
					console.log(_this.participatorList)
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
			noParticipate(){
				let _this = this
				// console.log(_this.token)
				// console.log(_this.meetingId)
				// console.log(_this.enterpriseId)
				_this.$request({
					url:'/cancelAttending',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						userId: _this.enterpriseId,
						type: 0
					}
				}).then(res=>{
					// console.log(res)
					let data = res[1].data
					if(data.statusCode === 2000){
						console.log('会议取消参加成功')
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
			addParticipator(){
				this.isShowAddParticipator=true
			},
			closeAddParticipator(){
				this.isShowAddParticipator=false
			},
			confirmParticipate(index){
				let _this = this
				_this.participatorList[index].isPaticipator=true
				// console.log(_this.token)
				// console.log(_this.meetingId)
				_this.$request({
					url:'/selectContacts',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						contactId: _this.participatorList[index].contactId
					}
				}).then(res=>{
					// console.log(res)
					let data = res[1].data
					if(data.statusCode === 2000){
						console.log(_this.participatorList[index].name+'会议参加成功')
					}else{
						console.log(_this.participatorList[index].name+'会议参加失败')
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			cancelParticipate(index){
				let _this = this
				_this.participatorList[index].isPaticipator=false
				_this.$request({
					url:'/cancelContacts',
					data:{
						token: _this.token,
						meetingId: _this.meetingId,
						contactId: _this.participatorList[index].contactId
					}
				}).then(res=>{
					// console.log(res)
					let data = res[1].data
					if(data.statusCode === 2000){
						console.log(_this.participatorList[index].name+'取消参加成功')
					}else{
						console.log(_this.participatorList[index].name+'取消参加失败')
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			addOtherParticipator(){
				this.isShowAddParticipator=false
				uni.navigateTo({
					url:'addParticipator?meetingId='+this.meetingId
				})
			},
			confirmAdd(){
				// console.log('参会人员已确认')
				this.isShowAddParticipator=false
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
					console.log(data)
					if(data.statusCode === 2000){
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
		padding-right: 76rpx;
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
		}
	}
	.body{
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0px 0px;
		padding-top: 49rpx;
		padding-bottom: 30rpx;
		position: absolute;
		overflow: scroll;
		// top: 140rpx;
		top: 160rpx;
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
		.participate{
			padding-left: 39rpx;
			padding-right: 39rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 144rpx;
			.participate-left{
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
			.participate-right{
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
					color: #FFFFFF;
					line-height: 26rpx;
				}
			}
		}
	}	
	.addParticipator{
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
		.addParticipator-title{
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
		.participator-list{
			margin-left: 41rpx;
			margin-right: 41rpx;
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
				.participator-right-yes{
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
				.participator-right-no{
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
		.addParticipator-option{
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
			.addParticipator-option-left{
				border-right: 1rpx solid #E9E9E9;
				width: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.addParticipator-option-right{
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
