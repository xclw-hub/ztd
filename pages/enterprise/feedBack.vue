<template>
	<view>
		<uniNavBar
			status-bar="true"
			backgroundColor="#2D6BDD"
			@clickLeft="clickBack"
			@clickRight="confirm"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>意见反馈</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<text>提交反馈</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="problem">
				<text>问题和建议</text>
				<view class="area">
					<textarea 
					maxlength="400"
					:placeholder="problem_placehoder"
					placeholder-class="placeholderStyle"
					v-model="problem"
					@focus="problemFocus"
					@blur="problemBlue"/>
				</view>
			</view>
			<view class="uploadImg">
				<view class="title">
					<view class="tips">
						<text id="tip1">上传图片</text>
						<text id="tip2">（选填，提供问题截图）</text>
					</view>
					<text id="tip3">{{imageNumber}}/4</text>
				</view>
				<view class="upload">
					<image src="../../static/enterprise/uploadImage.png" @click="chooseImage"></image>
					<image v-for="(item,index) in imageArr" :src="item" :key="index" @click="preview(item)"></image>
				</view>
			</view>
			<view class="contact">
				<view class="tips">
					<text id="tip1">联系方式</text>
					<text id="tip2">（选填）</text>
				</view>
				<view class="contactMethod">
					<input
					:placeholder="contactMethod_placehoder"
					placeholder-class="placeholderStyle"
					v-model.trim="contactMethod"
					@focus="contactMethodFocus"
					@blur="contactMethodBlue"/>
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
				problem_placehoder:'请输入您的反馈内容',
				contactMethod_placehoder:'微信/QQ/邮箱',
				problem:'',
				contactMethod:'',
				imageNumber:0,	//记录已上传的照片数量
				imageArr:[]		,//保存上传照片的路径
			}
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			confirm(){
				let _this = this
				if(_this.problem === ''){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入反馈内容'
					})
					return false
				}
				uni.getStorage({
					key: 'token',
					success:function(res){
						// console.log(res.data)
						let token = res.data
						_this.$request({
							url:'/submitFeedback',
							data:{
								token: token,
								// token: '11888311eb09e1c31467236120fc3d67',
								content: _this.problem,
								imagePath: _this.imageArr,
								contactDetails: _this.contactMethod,
								type: _this.$store.state.kind,
								associatedId: _this.$store.state.id
							}
						}).then(res =>{
							let data = res[1].data
							console.log(data)
							if(data.statusCode == 2000){
								uni.navigateBack({
									delta:1
								})
							}
							else{
								console.log(data.statusMsg)
								uni.showToast({
								    icon:'none',
									position:'bottom',
								    title: '提交失败'
								})
							}
						}).catch(err =>{
							console.log(err)
						})
					},
					fail:function(err){
						console.log(err)
					}
				})
			},
			//选择照片并上传
			chooseImage(){
				uni.chooseImage({
					count:4-this.imageNumber,
					success:res=>{
						this.imageArr=this.imageArr.concat(res.tempFilePaths) 
						// console.log(this.imageArr)
						this.imageNumber=this.imageArr.length
					}
				})
			},
			//上传成功预览图片
			preview(index) {
				uni.previewImage({
					current: index, //当前点击预览的图片
					urls: this.imageArr //预览图片的链接
				})
			},
			problemFocus(){
				this.problem_placeholder=''
			},
			problemBlue(){
				this.problem_placeholder='请输入您的反馈内容'
			},
			contactMethodFocus(){
				this.contactMethod_placeholder=''
			},
			contactMethodBlue(){
				this.contactMethod_placeholder='微信/QQ/邮箱'
			}
		}
	}
</script>

<style scoped>
	.uniNavBar_left, .uniNavBar_center, .uniNavBar_right{
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
	.uniNavBar_right text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32rpx;
	}
	.content{
		padding-left: 40rpx;
		padding-right: 40rpx;
	}
	.problem text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 100rpx;
	}
	.problem .area{
		height: 350rpx;
		background-color: #F5F5F5;
		border-radius: 10rpx;
		padding-left: 30rpx;
		padding-top: 30rpx;
		padding-right: 30rpx;
	}
	.area textarea{
		width: 100%;
	}
	.placeholderStyle{
		font-size: 28rrpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
	}
	.uploadImg .title{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uploadImg .title .tips #tip1{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 100rpx;
	}
	.uploadImg .title .tips #tip2{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 100rpx;
	}
	.uploadImg .title #tip3{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
		line-height: 100rpx;
	}
	.uploadImg .upload image{
		width: 200rpx;
		height: 200rpx;
	}
	.contact .tips #tip1{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 100rpx;
	}
	.contact .tips #tip2{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 100rpx;
	}
	.contact .contactMethod{
		height: 88rpx;
		background: #F5F5F5;
		border-radius: 10rpx;
		padding-left: 29rpx;
		display: flex;
		align-items: center;
	}
</style>
