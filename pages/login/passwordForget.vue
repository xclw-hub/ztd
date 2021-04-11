<template>
	<view>
		<uniNavBar
			status-bar="true"
			@clickLeft="clickBack"
			@clickRight="confirm"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="right" class="uniNavBar_right">
				<span type="default">确定</span>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="title">
				<span>忘记密码</span>
			</view>
			<table width="100%" rules=rows>
				<tr>
					<view class="tr_style">
						<span>手机号码</span>
						<input 
							type="text" 
							class="phone"
							:placeholder="phoneNumber_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="phoneNumber"
							@focus="phoneNumberFocus"
							@blur="phoneNumberBlue"/>
					</view>
				</tr>
				<tr>
					<view class="tr_style">
						<span>输入新密码</span>
						<input 
							type="text" 
							class="phone"
							:placeholder="password_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="password"
							@focus="passwordFocus"
							@blur="passwordBlue"/>
					</view>
				</tr>
				<tr>
					<view class="tr_style">
						<span>确认密码</span>
						<input 
							type="text" 
							class="phone"
							:placeholder="confirmPassword_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="passwordConfirm"
							@focus="confirmPasswordFocus"
							@blur="confirmPasswordBlue"/>
					</view>
				</tr>
				<tr>
					<view class="verification_magin">
						<span>验证码</span>
						<view class="verification">
							<view id="area">
								<input 
								type="text"
								maxlength="6"
								:placeholder="verificationCode_placeholder"
								placeholder-class="placeholderStyle"
								v-model.trim="verificationCode"
								@focus="verificationCodeFocus"
								@blur="verificationCodeBlue" />
							</view>
							<view id="code">
								<button 
									type="default" 
									:disabled="isAbleClick" 
									:class="[isActive_btn ? activeClass_btn : 'active2_btn']" 
									@click="getVerificationCode"
								>
									<span :class="[isActive_tips ? activeClass_tips : 'active2_tips']">{{verificationCode_tips}}</span>
								</button>
							</view>
						</view>
					</view>
				</tr>
			</table>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
		data() {
			return {
				phoneNumber_placeholder:"请输入绑定手机号",
				password_placeholder:"以字母或数字开头可包含特殊符号的6~18位字符组合",
				confirmPassword_placeholder:"以字母或数字开头可包含特殊符号的6~18位字符组合",
				verificationCode_placeholder:"请输入验证码",
				verificationCode_tips:'获取验证码',
				isAbleClick:false,		//默认可以点击获取验证码
				activeClass_btn:'active1_btn',		//验证码倒计时时,button按键的样式
				isActive_btn:true,		//为true时，按键样式为active1_btn
				activeClass_tips:'active1_tips',		//验证码倒计时,span字体的样式
				isActive_tips:true,		//为true时，按键样式为active1_tips
				phoneNumber:"",
				password:"",
				passwordConfirm:"",
				verificationCode:"",
				type:""
			}
		},
		onLoad(option) {		//接收注册页面传来的数据
			this.type=option.type
			console.log(this.type)
		},
		methods: {
			clickBack(){		//导航栏返回按键
				uni.navigateBack({
					delta: 1
				})
			},
			//获取手机验证码
			getVerificationCode(){
				let _this=this
				let reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/   //11位手机号码正则
				if(_this.phoneNumber===""){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请填写您的手机号'
					})
					return false
				}
				if(!reg_tel.test(_this.phoneNumber)){
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
						'phoneNumber':_this.phoneNumber
					}
				}).then(res=>{
					let data = res[1].data
					if(data.statusCode===2000){
						uni.showToast({
						    icon:'success',
							position:'bottom',
						    title: '验证码发送成功'
						})
					}else{
						uni.showToast({
						    icon:'none',
							position:'bottom',
						    title: data.statusMsg
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
			confirm(){
				let _this=this
				if(_this.password===""){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入新密码'
					})
					return false
				}
				if(_this.passwordConfirm===""){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入确认密码'
					})
					return false
				}
				if(_this.verificationCode===""){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入验证码'
					})
					return false
				}
				if(this.password!==this.passwordConfirm){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '输入密码与确认密码不一致'
					})
					return false
				}
				_this.$request({
					url:"/changePassword",
					data: {
						// 'phoneNumber': '18842741274',
						// 'password': '123456',
						// 'verificationCode': '881100',
						// 'type': '1'
						'phoneNumber': _this.phoneNumber,
						'password': _this.password,
						'verificationCode': _this.verificationCode,
						'type': _this.type
					}
				}).then(res=>{
					let data = res[1].data
					console.log(data)
					if(data.statusCode===2000){
						console.log("密码修改成功")
						uni.navigateBack({
							delta: 1
						})
					}else{
						uni.showToast({
						    icon:'none',
							position:'bottom',
						    title: data.statusMsg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			phoneNumberFocus(){		//输入栏聚焦
				this.phoneNumber_placeholder=''
			},
			phoneNumberBlue(){		//输入栏失去焦点
				this.phoneNumber_placeholder="请输入绑定手机号"
			},
			passwordFocus(){
				this.password_placeholder=''
			},
			passwordBlue(){
				this.password_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			confirmPasswordFocus(){
				this.confirmPassword_placeholder=''
			},
			confirmPasswordBlue(){
				this.confirmPassword_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			verificationCodeFocus(){
				this.verificationCode_placeholder=''
			},
			verificationCodeBlue(){
				this.verificationCode_placeholder="请输入验证码"
			}
		}
	}
</script>

<style scoped>
	.uniNavBar_left, .uniNavBar_right{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_left image{
		width: 20rpx;
		height: 36rpx;
	}
	.uniNavBar_right span{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #2D6BDD;
		line-height: 26rpx;
	}
	.content{
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
	.title{
		display: flex;
		flex-direction: column;
		margin-top: 50rpx;
	}
	.title span{
		font-size: 48rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
		line-height: 26rpx;
	}
	.placeholderStyle{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}
	table
	{
		margin-top: 20rpx;
		border-bottom:1rpx solid #C7C7C7;
	}
	tr {
		height: 191rpx;
		border:1rpx solid #C7C7C7;
	}
	tr .tr_style{
		margin-top: 50rpx;
		margin-bottom: 40rpx;
	}
	tr span{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	tr .phone{
		margin-top: 46rpx;
	}
	.verification_magin{
		margin-top: 50rpx;
		margin-bottom: 16rpx;
	}
	.verification{
		margin-top: 46rpx;
		display: flex;
		align-items:center;
	}
	#area{
		flex-grow: 1;
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
