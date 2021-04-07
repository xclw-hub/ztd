<template>
	<view>
		<view class="header">
			<view class="nav">
				<image src="/static/enterprise/return.png" @click="clickBack"></image>
				<view class="my">
					<text>我的</text>
				</view>
			</view>
			<view class="head">
				<view class="img">
					<!-- <image :src="user_logo!='' ? user_logo : '../../static/home/userIcon.png'" mode=""></image>
					<image src="../../static/enterprise/header.png" @click="changePicture" v-if="src===''"></image> -->
					<image :src="src!= undefined ? src : '../../static/enterprise/header.png'" mode="" @click="changePicture"></image>
				</view>	  
				
				<view class="name">
					<text id="enterprise">{{enterpriseName}}</text>
					<text id="id">{{enterpriseID}}</text>
					<view class="industry">
						<view class="noChoice" @click="changeIndustryKind" v-if="isEmptyList">
							<image src="../../static/enterprise/box.png"></image>
							<text>选择行业</text>
						</view>
						<view class="industry-box" v-if="!isEmptyList">
							<view class="item" v-for="(item, index) in industryKindList" :key='index'>
								<text>{{item}}</text>
							</view>
						</view>
						
						<view class="item" id="item-omit" @click="openPopList" v-if="!isEmptyList">
							<!-- <text>...</text> -->
							<view id="omit"></view>
							<view id="omit"></view>
							<view id="omit"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="issue" @click="enterInformationPublish">
				<view id="issue_imagin">
					<image src="../../static/enterprise/issue.png"></image>
				</view>	
				<view id="issue_btn">
					<text>供需发布</text>
					<image src="../../static/enterprise/btn.png"></image>
				</view>
			</view>
			<view class="product" @click="enterMyGoods">
				<view id="product_imagin">
					<image src="../../static/enterprise/product.png"></image>
				</view>	
				<view id="product_btn">
					<text>我的商品</text>
					<image src="../../static/enterprise/btn.png"></image>
				</view>
			</view>
			<view class="inform" @click="enterInform">
				<view id="inform_imagin">
					<image src="../../static/enterprise/inform.png"></image>
				</view>	
				<view id="inform_btn">
					<text>消息通知</text>
					<image src="../../static/enterprise/btn.png"></image>
				</view>
			</view>
			<view class="password" @click="enterChangePassword">
				<view id="password_imagin">
					<image src="../../static/enterprise/password.png"></image>
				</view>	
				<view id="password_btn">
					<text>修改密码</text>
					<image src="../../static/enterprise/btn.png"></image>
				</view>
			</view>
			<view class="contact" @click="enterContact">
				<view id="contact_imagin">
					<image src="../../static/enterprise/contact.png"></image>
				</view>	
				<view id="contact_btn">
					<text>联系人管理</text>
					<image src="../../static/enterprise/btn.png"></image>
				</view>
			</view>
			<view class="park" @click="enterPark">
				<view id="park_imagin">
					<image src="../../static/enterprise/park.png"></image>
				</view>	
				<view id="park_btn">
					<text>我的园区</text>
					<view id="enter">
						<view id="noEnterPark" v-if="parkState === '0'">
							<text>未入园</text>
						</view>
						<view id="waitCheck" v-else-if="parkState === '1'">
							<text>待审核</text>
						</view>
						<text id="enteredPark" v-else>{{parkName}}</text>
						<image src="../../static/enterprise/btn.png"></image>
					</view>
					
				</view>
			</view>
			<view class="phone" @click="enterChangePhoneNumber">
				<view id="phone_imagin">
					<image src="../../static/enterprise/phone.png"></image>
				</view>	
				<view id="phone_btn">
					<text>变更手机号</text>
					<image src="../../static/enterprise/btn.png"></image>
				</view>
			</view>
			<view class="feedback" @click="enterFeedBack">
				<view id="feedback_imagin">
					<image src="../../static/enterprise/feedback.png"></image>
				</view>	
				<view id="feedback_btn">
					<text>意见反馈</text>
				</view>
			</view>
			<view class="about" @click="enterAbout">
				<view id="about_imagin">
					<image src="../../static/enterprise/about.png"></image>
				</view>	
				<view id="about_btn">
					<text>关于我们</text>
				</view>
			</view>
			<button class="logOut" @click="loginOut">
				<text>退出登录</text>
			</button>
			<!--更换图片 -->
			<uni-popup id="changePic" ref="changePic" type="dialog">
			<image src="../../static/enterprise/header.png" mode="aspectFit" v-if="src == undefined  "></image>
			<image :src="src" @click="changePicture" mode="aspectFit" v-else></image>
			<view class="changePicture">
				<button type="default" @click="choosePictrue">更换头像</button>
			</view>
			</uni-popup>
			<!-- 申请园区对话框 -->
			<uni-popup id="applyPopupDialog" ref="applyPopupDialog" type="dialog">
				<uni-popup-dialog 
				type="info" 
				title="待审核" 
				:content="joinedPark"
				title_left="取消申请"
				title_right="我知道了"
				:isbuttonRightBorder="true"
				:before-close="true" 
				@confirm="applyConfirm" 
				@close="applyClose"></uni-popup-dialog>
			</uni-popup>
			<!-- 已入园对话框 -->
			<uni-popup id="enterParkPopupDialog" ref="enterParkPopupDialog" type="dialog">
				<uni-popup-dialog 
				type="info" 
				title="已入园" 
				:content="joinedPark"
				title_left="退出园区"
				title_right="我知道了"
				:isbuttonRightBorder="true"
				:before-close="true" 
				@confirm="enterParkConfirm" 
				@close="enterParkClose"></uni-popup-dialog>
			</uni-popup>
			<gmy-img-cropper
			    ref="gmyImgCropper"
			    quality="0.5"
			    cropperType="free"
			    fileType="jpg"
			    imgSrc=""
			    @getImg="getImg"
			></gmy-img-cropper>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="popListShow" @click="closePopList"></view>
		<!-- 显示所有已选行业列表 -->
		<view class="popList-body" v-if="popListShow">
			<view class="popList-body-title">
				<view id="popList-body-title-img">
					<image src="../../static/enterprise/header.png"></image>
				</view>
				<text id="popList-body-title-name">{{enterpriseName}}</text>
				<text id="popList-body-title-id">{{enterpriseID}}</text>
			</view>
			<view class="popList-body-content">
				<text id="popList-body-content-title">所属行业</text>
				<view id="popList-body-content-list">
					<view id="popList-body-content-item" v-for="(item, index) in industryKindList" :key='index'>
						<text>{{item}}</text>
					</view>
				</view>
				<button @click="changeIndustryKind" :disabled="isAbleClick">
					<text>变更行业</text>
					<text v-if="isAbleClick">（{{clockTime}}分后可变更）</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import gmyImgCropper from "../../components/gmy-img-cropper/gmy-img-cropper.vue"
	export default {
		components: {
		    uniPopup,
		    uniPopupDialog,
			gmyImgCropper,
		},
		data() {
			return {
				clockTime:30,
				changeTimeClock:0,
				isAbleClick:false,		//是否禁用选择行业按键
				popListShow:false,		//显示行业种类选择弹框
				industryKindList:[''],		//所有已选的行业种类列表
				enterpriseName:'长沙市九州仓储服务有限公司',
				enterpriseID:'zhanghao_100',
				parkState:'2',		//我的园区状态，0表示未加入园区，1表示园区正在申请状态，2表示已加入园区
				parkName:'',
				src:''//图片路径
			}
		},
		computed:{
			joinedPark(){
				return '您加入的园区为：'+this.parkName
			},
			isEmptyList(){
				//由于数组是由字符串转化过来，当该字符串为空时，得到的数组也会有一个空值，此时的数组长度也为1
				if(this.industryKindList[0]===''){		
					return true
				}else{
					return false
				}
			}
		},
		onLoad(option) {
			// var obj=JSON.parse(decodeURIComponent(option.obj))		//接收注册页面传来的数据
			// console.log(option)
			let _this = this
			let token
			uni.getStorage({
				key:'token',
				success:function(res){
					token = res.data
					console.log(_this.$store.state.id)
					console.log(_this.$store.state.kind)
					_this.$request({
						url:'/isBindPark',
						data:{
							token:token,
							userId:_this.$store.state.id,
							userType:_this.$store.state.kind
						}
					}).then(res=>{
						console.log('isbindpark')
						console.log(res[1].data)
						let data =res[1].data
						if(data.statusCode == 2000){
							if(data.isBindPark==true){
								//已绑定园区
								_this.parkState=2
								_this.parkName=data.parkName
							}else if(data.isBindPark==false){
								if(data.parkId){
									//未绑定但正在审核
									_this.parkState=1
									_this.parkName=data.parkName
								}else{
									//未入园
									_this.parkState=0
								}
							}
						}else{
							console.log(data.statusMsg)
						}
					}).catch(err=>{
						console.log(err)
					})
					_this.$request({
						url:'/industry/homePageIndustry',
						data:{
							userId:_this.$store.state.id,
							userType:_this.$store.state.kind
						}
					}).then(res=>{
						console.log('homePageIndustry')
						console.log(res[1].data)
						if(res[1].data){
							_this.industryKindList=res[1].data
						}
					}).catch(err=>{
						console.log(err)
					})
				}
			})
			if(option.industryKindArr){
				console.log('存在')
				this.industryKindList=option.industryKindArr.split(',')
				this.changeTimeClock=option.changeTime
			}else{
				console.log('不存在')
			}
			let info = _this.$store.state.enterpriseInfo
			console.log('用户', info.enterpriseLogo)
			_this.src = info.enterpriseLogo
			_this.enterpriseName = info.enterpriseName
			_this.enterpriseID = info.enterpriseId
		},
		methods: {
			clickBack(){
				// uni.navigateTo({
				// 	url:'../home/home'
				// })
				uni.reLaunch({
					url:'../home/home'
				})
			},
			changePicture(){
				this.$refs.changePic.open()
			},
			choosePictrue(){
				let that = this
				console.log('asdf')
			    this.$refs.gmyImgCropper.chooseImage();
				this.$refs.changePic.close()
			},
			getImg:function(e){
				// let _this = this
				// uni.getStorage({
				// 	key:'token',
				// 	success:function(res){
				// 		_this.$request({
				// 			url:'/uploadIcon',
				// 			data:{
				// 				token: res.data,
				// 				multipartFile: e,
				// 				userId: _this.$store.state.id,
				// 				userType: 0
				// 			}
				// 		}).then(res=>{
				// 			console.log(res)
				// 		}).catch(err=>{
				// 			console.log(err)
				// 		})
				// 	},
				// 	fail:function(err){
				// 		console.log(err)
				// 	}
				// })
			    console.log("父页面拿到了图片",e);
				this.src = e;
			    this.imgCropperShow = false;
				let _this = this;
				uni.getStorage({
					key: 'token',
					success: function (res) {
						let token = res.data
						let tempFilePaths = _this.src; 
						 uni.uploadFile({
							url : 'http://39.105.57.219/ztd/uploadIcon',
							filePath: tempFilePaths,
							name: 'multipartFile',
							formData: {
								token: token,
								'userId': _this.$store.state.enterpriseInfo.enterpriseId,
								'userType': '0'
							},
							success : function(res){
								//upload方法返回回来的数据是string类型，所以这里要转成json对象
								let result = JSON.parse(res.data)
								if (result.statusCode == 2000) {
									_this.$store.state.enterpriseInfo.enterpriseLogo = 'http://39.105.57.219/ztd/loadIcon?id='+_this.$store.state.enterpriseInfo.enterpriseId+'&type=0'
								}
								uni.showToast({title:'头像修改成功'})
							}
						 })
							
					},fail:function(res){  
						console.log("用户取消上传文件", res)  
					}  
				});
				
			},
			closePopList(){
				this.popListShow=false
			},
			openPopList(){
				var nowTime = new Date()
				var nowTime_mSecond=nowTime.getTime()
				var timeClock_second=(nowTime_mSecond-this.changeTimeClock)/1000
				var timClock_minute=parseInt(timeClock_second/60)		//分钟
				this.clockTime=3-timClock_minute		//
				if(this.clockTime>0){
					this.isAbleClick=true
				}
				else{
					this.isAbleClick=false
				}
				console.log('上次变更时间为：'+this.changeTimeClock+'毫秒')
				this.popListShow=true
			},
			changeIndustryKind(){
				// var _this=this
				let _this = this
				_this.$request({
					url:'/preferentialPolicies/industryChoose',
					data:{
						'industry':[],//industryKindArr,
						'enterpriseId':_this.$store.state.id
					}
				}).then(res =>{
					  let data = res[1].data
					  if(data.statusCode == 3024){
					  }else{
						  console.log('不存在')
						  uni.navigateTo({
						  	url:'industrySelect'
						  })
					  }
				})
			},
			applyConfirm(done) {
				console.log('我知道了');
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			applyClose(done) {
				console.log('取消申请');
				// 需要执行 done 才能关闭对话框
				done()
			},
			enterParkConfirm(done) {
				console.log('我知道了');
				done()
			},
			enterParkClose(done) {
				console.log('退出园区');
				done()
			},
			enterInformationPublish(){
				uni.navigateTo({
					url:'informationPublish/informationPublish'
				})
			},
			enterMyGoods(){
				uni.navigateTo({
					url:'myGoods/myGoods'
				})
			},
			enterInform(){
				uni.navigateTo({
					url:'inform/inform'
				})
			},
			enterChangePassword(){
				uni.navigateTo({
					url:'changePassword'
				})
			},
			enterChangePhoneNumber(){
				uni.navigateTo({
					url:'changePhoneNumber'
				})
			},
			enterPark(){
				if (this.parkState=='0'){		//还未加入园区
					uni.navigateTo({
						url:'myPark/parkApply'
					})
				}
				else if (this.parkState=='1'){		//正在申请园区
					this.$refs.applyPopupDialog.open()
				}
				else{		//已加入园区
					this.$refs.enterParkPopupDialog.open()
				}
			},
			enterContact(){
				console.log("进入联系人页面")
				uni.navigateTo({
					url:'contact/contactList'
				})
			},
			enterFeedBack(){
				uni.navigateTo({
					url:'feedBack'
				})
			},
			enterAbout(){
				uni.navigateTo({
					url:'about'
				})
			},
			loginOut(){
				uni.clearStorage()
				uni.navigateTo({
					url:'../login/index'
				})
			}
		}
	}
</script>

<style scoped>
	.header{
		/* height: 390rpx; */
		padding-left: 40rpx;
		padding-right: 40rpx;
		padding-top: 86rpx;
		/* padding-top: 66rpx; */
		padding-bottom: 100rpx;
		background-image: url(../../static/enterprise/background.png);
		background-repeat: no-repeat;
		background-size: 100% 480rpx;
	}
	.nav{
		display: flex;
		flex-direction: row;
		padding-right: 36rpx;
	}
	.nav image{
		width: 36rpx;
		height: 36rpx;
	}
	.nav .my{
		flex: 1;
		text-align: center;
	}
	.nav .my text{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.head{
		margin-top: 58rpx;
		display: flex;
		flex-direction: row;
		align-items:center;
	}
	.head .img{
		width: 160rpx;
		height: 160rpx;
	}
	.head image{
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}
	.head .name{
		margin-left: 34rpx;
		display: flex;
		flex-direction: column;
	}
	.head .name #enterprise{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		margin-bottom: 15rpx;
	}
	.header .name #id{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		margin-bottom: 18rpx;
	}
	.name .industry{
		display: flex;
	}
	.industry .noChoice{
		width: 160rpx;
		height: 50rpx;
		/* border: 1rpx solid #FFFFFF; */
		border: 1rpx solid transparent;
		border-color: rgba(255, 255, 255, 0.5);
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.noChoice image{
		width: 25rpx;
		height: 25rpx;
		margin-right: 8rpx;
	}
	.noChoice text{
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.industry .industry-box{
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		height: 50rpx;
		overflow: hidden;
	}
	.item{
		padding-left: 16rpx;
		padding-right: 16rpx;
		height: 50rpx;
		/* border: 1rpx solid #FFFFFF; */
		border: 1rpx solid transparent;
		border-color: rgba(255, 255, 255, 0.5);
		/* opacity: 0.5; */
		border-radius: 5rpx;
		margin-right: 10rpx;
		display: flex;
		align-items: center;
	}
	.item text{
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	#item-omit{
		display: flex;
		justify-content: flex-end;
	}
	#omit{
		width: 6rpx;
		height: 6rpx;
		background: #FFFFFF;
		border-radius: 50%;
		margin-right: 2rpx;
	}
	.content{
		width: 100%;
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		/* position: relative;
		top: -80rpx; */
		position: absolute;
		/* z-index: 20; */
		overflow: scroll;
		top: 400rpx;
		bottom: 0;
	}
	.issue{
		margin-top: 28rpx;
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.issue #issue_imagin{
		display: flex;
		align-items: center;
	}
	.issue #issue_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.issue #issue_btn{
		margin-left: 19rpx;
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}
	.issue #issue_btn image{
		width: 17rpx;
		height: 30rpx;
	}
	.product{
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.product #product_imagin{
		display: flex;
		align-items: center;
	}
	.product #product_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.product #product_btn{
		margin-left: 19rpx;
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}
	.product #product_btn image{
		width: 17rpx;
		height: 30rpx;
	}
	.inform{
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.inform #inform_imagin{
		display: flex;
		align-items: center;
	}
	.inform #inform_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.inform #inform_btn{
		margin-left: 19rpx;
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}
	.inform #inform_btn image{
		width: 17rpx;
		height: 30rpx;
	}
	.password{
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.password #password_imagin{
		display: flex;
		align-items: center;
	}
	.password #password_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.password #password_btn{
		margin-left: 19rpx;
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}
	.password #password_btn image{
		width: 17rpx;
		height: 30rpx;
	}
	.contact{
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.contact #contact_imagin{
		display: flex;
		align-items: center;
	}
	.contact #contact_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.contact #contact_btn{
		margin-left: 19rpx;
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}
	.contact #contact_btn image{
		width: 17rpx;
		height: 30rpx;
	}
	.park{
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.park #park_imagin{
		display: flex;
		align-items: center;
	}
	.park #park_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.park #park_btn{
		margin-left: 19rpx;
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.park #park_btn #enter{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	/* 未入园显示的提示文字 */
	.park #park_btn #enter #noEnterPark{
		width: 110rpx;
		height: 54rpx;
		border: 1rpx solid #A0A0A0;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 30rpx;
	}
	.park #park_btn #enter #noEnterPark text{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	/* 待审核显示的提示文字 */
	.park #park_btn #enter #waitCheck{
		width: 110rpx;
		height: 54rpx;
		background: #2D6BDD;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 30rpx;
	}
	.park #park_btn #enter #waitCheck text{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	/* 已入园显示的提示文字 */
	.park #park_btn #enter #enteredPark{
		margin-right: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.park #park_btn #enter image{
		width: 17rpx;
		height: 30rpx;
	}
	.phone{
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.phone #phone_imagin{
		display: flex;
		align-items: center;
	}
	.phone #phone_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.phone #phone_btn{
		margin-left: 19rpx;
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}
	.phone #phone_btn image{
		width: 17rpx;
		height: 30rpx;
	}
	.feedback{
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.feedback #feedback_imagin{
		display: flex;
		align-items: center;
	}
	.feedback #feedback_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.feedback #feedback_btn{
		margin-left: 19rpx;
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		align-items: center;
	}
	.about{
		margin-left: 42rpx;
		margin-right: 42rpx;
		height: 111rpx;
		display: flex;
		flex-direction: row;
	}
	.about #about_imagin{
		display: flex;
		align-items: center;
	}
	.about #about_imagin image{
		width: 36rpx;
		height: 36rpx;
	}
	.about #about_btn{
		margin-left: 19rpx;
		/* border-bottom: 1rpx solid #ECECEC; */
		flex: 1;
		display: flex;
		align-items: center;
	}
	.logOut{
		position: relative;
		top: 50rpx;
		margin-bottom: 50rpx;
		width: 670rpx;
		height: 88rpx;
		background: #FFFFFF;
		border: 2rpx solid #A0A0A0;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.logOut text{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
		line-height: 26rpx;
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
	.popList-body{
		width: 100%;
		position: absolute;
		z-index:30;
		/* background-color: #F0AD4E; */
		top: 413rpx;
	}
	.popList-body-title{
		margin-left: 75rpx;
		margin-right: 75rpx;
		height: 230rpx;
		background: linear-gradient(-35deg, #1D54BC, #108CF5);
		border-radius: 20rpx 20rpx 0 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.popList-body-title #popList-body-title-img{
		width: 140rpx;
		height: 140rpx;
		position: absolute;
		top: -70rpx;
	}
	.popList-body-title image{
		width: 140rpx;
		height: 140rpx;
	}
	.popList-body-title #popList-body-title-name{
		margin-top: 108rpx;
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #FFFFFF;
	}
	.popList-body-title #popList-body-title-id{
		margin-top: 10rpx;
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
	}
	.popList-body-content{
		padding: 33rpx 38rpx 39rpx 38rpx;
		margin-left: 75rpx;
		margin-right: 75rpx;
		background: #FFFFFF;
		border-radius: 0 0 20rpx 20rpx;
	}
	.popList-body-content #popList-body-content-title{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333
	}
	.popList-body-content #popList-body-content-list{
		margin-top: 25rpx;
		display: flex;
		flex-wrap: wrap;
	}
	#popList-body-content-item{
		background-color: #FFFFFF;
		color: #666666;
		height: 50rpx;
		border: 1rpx solid #BFBFBF;
		border-radius: 5rpx;
		padding-left: 16rpx;
		padding-right: 16rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		display: flex;
		align-items: center;
	}
	#popList-body-content-item text{
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		/* color: #666666; */
	}
	.popList-body-content button{
		margin-top: 24rpx;
		/* height: 88rpx; */
		background: #FFFFFF;
		border: 1rpx solid #A0A0A0;
		border-radius: 5rpx;
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}
	.popList-body-content button text:nth-child(1){
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.popList-body-content button text:nth-child(2){
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.changePicture button {
		margin-top: 50rpx;
		margin-left: 120rpx;
		margin-right: 120rpx;
		border-radius: 25rpx;
		border: 1rpx solid #FFFFFF;
		background-color: transparent;
		color: #FFFFFF;
	}
	
</style>
