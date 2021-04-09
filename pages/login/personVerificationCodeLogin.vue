<template>
	<view>
		<uniNavBar
			status-bar="true"
			@clickLeft="clickBack"
			@clickRight="enterpriseLogin"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="right" class="uniNavBar_right">
				<span type="default">企业账号登录</span>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="title">
				<navigator id="btn" url="/pages/login/personLogin">密码登录</navigator>
				<view id="psw">
					<span>验证码登录</span>
				</view>
			</view>
			<table width="100%" rules=rows>
				<tr>
					<view class="tr_style">
						<span>手机号码</span>
						<input 
							type="text" 
							id="phone"
							:placeholder="phoneNumber_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="phoneNumber"
							@focus="phoneNumberFocus"
							@blur="phoneNumberBlue"/>
					</view>
				</tr>
				<tr>
					<view class="verification_magin">
						<span>验证码</span>
						<view class="verification">
							<view id="area">
								<input 
								type="text"
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
		<view class="footer">
			<button
					class="startLogin"
					type="default"
					@click="startLogin"
			><span>登录</span></button>
			<view class="pswForget">
				<view class="tip"></view>
				<text @click="passwordForget">忘记密码</text>
				<view class="tip"></view>
			</view>
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
				verificationCode_placeholder:"请输入验证码",
				verificationCode_tips:'获取验证码',
				isAbleClick:false,		//默认可以点击获取验证码
				activeClass_btn:'active1_btn',		//验证码倒计时时,button按键的样式
				isActive_btn:true,		//为true时，按键样式为active1_btn
				activeClass_tips:'active1_tips',		//验证码倒计时,span字体的样式
				isActive_tips:true,		//为true时，按键样式为active1_tips
				phoneNumber:"",
				verificationCode:"",
				cid:""
			}
		},
		onLoad(){
			// 获取设备CID
			let clientInfo = plus.push.getClientInfo();
			this.cid = clientInfo.clientid;
		},
		methods: {
			clickBack(){
				uni.reLaunch({
					url:'index'
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
			enterpriseLogin(){
				uni.navigateTo({
					url:'enterpriseLogin'
				})
			},
			//进行正常登录
			startLogin(){
				console.log("开始登陆")
				let _this = this
				if(_this.verificationCode===""){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入验证码'
					})
					return false
				}
				_this.$request({
					url:"/personVerificationCodeLogin",
					data: {
						// 'phoneNum': '18842741274',
						// 'verificationCode': '966034',
						// 'cid':'2'
						'phoneNumber': _this.phoneNumber,
						'verificationCode': _this.verificationCode,
						'cid':_this.cid
					}
				}).then(res=>{
					let data = res[1].data
					console.log(data)
					if(data.statusCode===2000){
						console.log("登录成功")
						//将返回的token进行缓存
						uni.setStorage({
						    key: 'token',
						    data: data.token,
						    success: function () {
						        console.log('token缓存成功')
						    },
							fail:function(){
								console.log('token缓存失败')
							}
						})
						//将个人用户类型存入store
						_this.$store.commit('setKind', '1')
						_this.$store.commit('setId', data.id)
						uni.navigateTo({
							url:'../home/home'
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
			//跳转到忘记密码页面，并传递账号类型参数type='1'(个人账号)
			passwordForget(){
				uni.navigateTo({
				    url: "passwordForget?type='1'"
				})
			},
			phoneNumberFocus(){
				this.phoneNumber_placeholder=""
			},
			phoneNumberBlue(){
				this.phoneNumber_placeholder="请输入绑定手机号"
			},
			verificationCodeFocus(){
				this.verificationCode_placeholder=""
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
		white-space: nowrap;		/* 禁止换行 */
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
		flex-direction: row;
		justify-content: flex-start;
		margin-top: 50rpx;
	}
	.title #btn{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
		line-height: 26rpx;
	}
	.title #psw{
		border-left:1rpx solid #9C9C9C;
		padding-left: 29rpx;
		margin-left: 29rpx;
	}
	.title #psw span{
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
	tr #phone{
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
	.footer{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 50rpx;
	}
	.footer button{		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 670rpx;
		height: 88rpx;
		background: #2E6BDE;
		box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(27, 140, 255, 0.5);
		border-radius: 10rpx;
	}
	.footer span{
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 26rpx;
	}
	.pswForget{
		margin-top: 60rpx;
		display: flex;
		align-items: center;
	}
	.pswForget text{
		margin-left: 30rpx;
		margin-right: 30rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
		line-height: 26rpx;
	}
	.pswForget .tip{
		width: 100rpx;
		height: 1rpx;
		background: #E3E3E3;
	}
</style>
