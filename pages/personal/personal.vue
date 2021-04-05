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
					<image src="../../static/enterprise/header.png" @click="changePicture" v-if="src==''"></image>
					<image :src="src" @click="changePicture" v-else></image>
				</view>	
				
				<view class="name">
					<text id="personalName">{{personalName}}</text>
					<text id="personalPhone">{{personalPhone}}</text>
					<view class="industry">
						<view class="industry-box">
							<view class="item" v-for="(item, index) in industryKindList" :key='index'>
								<text>{{item}}</text>
							</view>
						</view>
						
						<view class="item" id="item-omit" @click="openPopList">
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
			<view class="feedback" @click="enterFeedBack">
				<view id="feedback_imagin">
					<image src="../../static/enterprise/feedback.png"></image>
				</view>	
				<view id="feedback_btn">
					<text>意见反馈</text>
					<image src="../../static/enterprise/btn.png"></image>
				</view>
			</view>
			<view class="about" @click="enterAbout">
				<view id="about_imagin">
					<image src="../../static/enterprise/about.png"></image>
				</view>	
				<view id="about_btn">
					<text>关于我们</text>
					<image src="../../static/enterprise/btn.png"></image>
				</view>
			</view>
			<button class="logOut" @click="loginOut">
				<text>退出登录</text>
			</button>
			<!--更换图片 -->
			<uni-popup id="changePic" ref="changePic" type="dialog">
			<image src="../../static/enterprise/header.png" mode="aspectFit" v-if="src==''"></image>
			<image :src="src" @click="changePicture" mode="aspectFit" v-else></image>
			<view class="changePicture">
				<button type="default" @click="choosePictrue">更换图片</button>
			</view>
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
				<text id="popList-body-title-name">{{personalName}}</text>
				<text id="popList-body-title-id">{{personalPhone}}</text>
			</view>
			<view class="popList-body-content">
				<text id="popList-body-content-title">所属行业</text>
				<view id="popList-body-content-list">
					<view id="popList-body-content-item" v-for="(item, index) in industryKindList" :key='index'>
						<text>{{item}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				popListShow:false,		//显示行业种类选择弹框
				industryKindList:['智能制造', '机器人', '智能制造', '机器人', '新能源汽车','智能制造', '机器人', '新能源汽车','智能制造', '机器人', '新能源汽车'],		//所有已选的行业种类列表
				personalName:'王小明',
				personalPhone:'15880598952',
				src:''//图片路径
			}
		},
		onLoad() {
			let info = this.$store.state.userInfo
			console.log(info)
			console.log(info.contactHead)
			this.src = info.contactHead
			let _this = this
			this.personalName = info.contactName
			this.personalPhone = info.phoneNum
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
							url : 'http://39.105.57.219:80/ztd/uploadIcon',
							filePath: tempFilePaths,
							name: 'multipartFile',
							formData: {
								token: token,
								'userId': _this.$store.state.id,
								'userType': 1
							},
							success : function(res){
								//upload方法返回回来的数据是string类型，所以这里要转成json对象
								let result = JSON.parse(res.data)
								if (result.statusCode == 2000) {
									_this.$store.state.userInfo.contactHead = 'http://39.105.57.219:80/ztd/loadIcon?id='+_this.$store.state.id+'&type=1'
								}
								console.log(_this.$store.state.userInfo.contactHead)
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
				this.popListShow=true
			},
			enterInformationPublish(){
				uni.navigateTo({
					url:'../enterprise/informationPublish/informationPublish',
				})
			},
			enterMyGoods(){
				uni.navigateTo({
					url:'../enterprise/myGoods/myGoods'
				})
			},
			enterInform(){
				uni.navigateTo({
					url:'../enterprise/inform/inform'
				})
			},
			enterChangePassword(){
				uni.navigateTo({
					url:'../enterprise/changePassword'
				})
			},
			enterFeedBack(){
				uni.navigateTo({
					url:'../enterprise/feedBack'
				})
			},
			enterAbout(){
				uni.navigateTo({
					url:'../enterprise/about'
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
		/* padding-top: 66rpx; */
		padding-top: 86rpx;
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
	}
	.head .name{
		margin-left: 34rpx;
		display: flex;
		flex-direction: column;
	}
	.head .name #personalName{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #FFFFFF;
		margin-bottom: 15rpx;
	}
	.header .name #personalPhone{
		font-size: 28rpx;
		font-family: Arial;
		font-weight: 400;
		color: #FFFFFF;
		margin-bottom: 18rpx;
	}
	.name .industry{
		display: flex;
	}
	.industry-box{
		display: flex;
		flex-direction: row;
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
		padding-bottom: 51rpx;
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
		flex-direction: row;
		justify-content: space-between;
	}
	.feedback #feedback_btn image{
		width: 17rpx;
		height: 30rpx;
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
		border-bottom: 1rpx solid #ECECEC;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}
	.about #about_btn image{
		width: 17rpx;
		height: 30rpx;
	}
	.logOut{
		position: absolute;
		bottom: 40rpx;
		left: 0;
		right: 0;
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
