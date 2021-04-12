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
				<text>变更手机号</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<text>确定</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="title">
				<text>解绑手机号，您当前绑定手机号码为 {{phoneNumber}}</text>
			</view>
			<view class="newPhoneNumber">
				<text>新手机号</text>
				<view id="number">
					<input
					 type="text"
					 :placeholder="newPhoneNumber_placeholder"
					 placeholder-class="placeholderStyle"
					 v-model.trim="newPhoneNumber"
					 @focus="newPhoneNumberFocus"
					 @blur="newPhoneNumberBlue"/>
				</view>
			</view>
			<view class="verificationCode">
				<text id="tips">验证码</text>
				<view id="code">
					<input 
					type="text"
					:placeholder="verificationCode_placeholder"
					placeholder-class="placeholderStyle"
					v-model.trim="verificationCode"
					@focus="verificationCodeFocus"
					@blur="verificationCodeBlue"/>
					<button
						type="default" 
						:disabled="isAbleClick" 
						:class="[isActive_btn ? activeClass_btn : 'active2_btn']" 
						@click="getVerificationCode"
					>
						<text :class="[isActive_tips ? activeClass_tips : 'active2_tips']">{{verificationCode_tips}}</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{uniNavBar},
		onLoad() {
			this.setData();
		},
		data() {
			return {
				phoneNumber:'',
				newPhoneNumber:'',
				verificationCode:'',
				enterpriseId:'',
				newPhoneNumber_placeholder:'请输入手机号',
				verificationCode_placeholder:'请输入验证码',
				verificationCode_tips:'获取验证码',
				isAbleClick:false,		//默认可以点击获取验证码
				activeClass_btn:'active1_btn',		//验证码倒计时时,button按键的样式
				isActive_btn:true,		//为true时，按键样式为active1_btn
				activeClass_tips:'active1_tips',		//验证码倒计时,span字体的样式
				isActive_tips:true,		//为true时，按键样式为active1_tips
			}
		},
		methods: {
			setData() {
				let state = this.$store.state
				let info = state.kind == 0 ? state.enterpriseInfo : state.userInfo
				console.log(info)
				this.phoneNumber = info.enterprisePhoNum
				this.enterpriseId = info.enterpriseId
			},
			confirm(){
				// 确认修改手机号
				let _this=this	
						
				if(_this.newPhoneNumber==='' || _this.verificationCode ===''){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请填写完整'
					})
					return false
				}
				uni.getStorage({
				    key: 'token',
				    success: function (res) {
						let token = res.data
				        console.log(token);
						_this.$request({
							url:"/changePhoneNumberByVerificationCode",
							data: {
								'token':token,
								'id':_this.enterpriseId,
								'type':0,
								'newPhoneNumber':_this.newPhoneNumber,
								'verificationCode':_this.verificationCode,
							}
						}).then(res=>{
							console.log(res[1].data)
							if(res[1].data.statusCode===2000){
								uni.showToast({
								    icon:'success',
									position:'bottom',
									duration:500,
								    title: '修改成功'
								})
								setTimeout(function(){
									uni.navigateBack({
										delta:1
									})
								},500)
							}else{
								uni.showToast({
								    icon:'none',
									position:'bottom',
								    title: '修改失败'
								})
							}
						}).catch(err=>{
							console.log(err)
						})
				    }
				});
			},
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			//获取手机验证码
			getVerificationCode(){
				let _this=this
				let reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/   //11位手机号码正则
				if(_this.newPhoneNumber===""){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请填写您的手机号'
					})
					return false
				}
				if(!reg_tel.test(_this.newPhoneNumber)){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请正确填写您的手机号'
					})
					return false
				}
				if(_this.verificationCode_tips==='获取验证码'){
					_this.isAbleClick=true		//禁用按键功能
					_this.isActive_btn=false		//改变按键的样式
					_this.isActive_tips=false		//改变字体的样式
				}else{
					return		//如果已经在倒计时，则不需要进行后续步骤
				}
				//请求发送验证码
				_this.$request({
					url:"/verificationCode",
					data: {
						'phoneNumber':_this.newPhoneNumber		//_this.phoneNumber
					}
				}).then(res=>{
					console.log(res[1].data)
					if(res[1].data.statusCode===2000){
						uni.showToast({
						    icon:'success',
							position:'bottom',
						    title: '验证码发送成功'
						})
					}else{
						uni.showToast({
						    icon:'none',
							position:'bottom',
						    title: '验证码发送失败'
						})
					}
				}).catch(err=>{
					console.log(err)
				})
				//开始倒计时
				let seconds=60
				let timer=setInterval(()=>{
					seconds--
					_this.verificationCode_tips=seconds+'s 后重新获取'
					if(seconds<=0){
						_this.verificationCode_tips='获取验证码'
						_this.isAbleClick=false		//禁用按键功能
						_this.isActive_btn=true		//恢复按键的样式
						_this.isActive_tips=true	//恢复字体的样式
						clearInterval(timer)		//移除计时器
					}
				},1000)
			},
			newPhoneNumberFocus(){
				this.newPhoneNumber_placeholder=''
			},
			newPhoneNumberBlue(){
				this.newPhoneNumber_placeholder='请输入手机号'
			},
			verificationCodeFocus(){
				this.verificationCode_placeholder=''
			},
			verificationCodeBlue(){
				this.verificationCode_placeholder='请输入验证码'
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
	.placeholderStyle{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}
	.title{
		margin-top: 50rpx;
	}
	.title text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
		line-height: 26rpx;
	}
	.newPhoneNumber{
		height: 190rpx;
		border-bottom: 1rpx solid #C7C7C7;
		margin-top: 8rpx;
		padding-top: 50rpx;
	}
	.newPhoneNumber text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.newPhoneNumber #number input{
		margin-top: 46rpx;
	}
	.verificationCode{
		height: 190rpx;
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 50rpx;
	}
	.verificationCode #tips{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.verificationCode #code{
		margin-top: 27rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.verificationCode #code input{
		flex: 1;
	}
	.active1_btn{		/* 获取验证码按键按下前的button样式 */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 220rpx;
		height: 70rpx;
		background:#FFFFFF;
		border: 1rpx solid #2E6BDE;
		border-radius: 10rpx;
	}
	.active2_btn{		/* 获取验证码按键按下后的button样式 */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 220rpx;
		height: 70rpx;
		background: #F5F5F5;
		border-radius: 10rpx;
	}
	.active1_tips{		/* 获取验证码按键按下前的span样式 */
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #2E6BDE;
		line-height: 26rpx;
		white-space: nowrap;		/* 禁止换行 */
	}
	.active2_tips{		/* 获取验证码按键按下后的span样式 */
		font-size: 26rpx;
		font-family: Arial;
		font-weight: 400;
		color: #888888;
		line-height: 26rpx;
		white-space: nowrap;		/* 禁止换行 */
	}
</style>
