<template>
	<view>
		<uniNavBar
			status-bar="true"
			@clickLeft="clickBack"
			@clickRight="personLogin"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="right" class="uniNavBar_right">
				<span type="default">个人账号登录</span>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="title">
				<span>企业账号登录</span>
			</view>
			<table width="100%" rules=rows>
				<tr>
					<view class="style1">
						<span>账号</span>
						<input 
							type="text" 
							:placeholder="account_placeholder"
							placeholder-class="placeholderStyle"
							v-model="enterpriseAccount"
							@focus="accountFocus"
							@blur="accountBlue"/>
					</view>
				</tr>
				<tr>
					<view class="style2">
						<span>密码</span>
						<view class="pswInput">
							<input 
								type="text"
								:placeholder="password_placeholder"
								placeholder-class="placeholderStyle"
								:password="!showPassword"
								v-model="password"
								@focus="passwordFocus"
								@blur="passwordBlue"/>
							<image class="eye" :src="eye_src" @click="changePassword"></image>
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
				account_placeholder:"请输入企业账号",
				password_placeholder:"请输入密码",
				showPassword: false,		//是否显示密码
				eye_src: "/static/login/eye-no.png",
				enterpriseAccount:"",		//企业账号
				password:""		,//密码
				cid: "qweqweqwewqe"		//设备CID
			}
		},
		onLoad() {
			// 获取设备CID
			let clientInfo = plus.push.getClientInfo();
			this.cid = clientInfo.clientid;
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			personLogin(){
				uni.navigateTo({
					url:'personLogin'
				})
			},
			//开始登录
			startLogin(){
				let _this=this
				//进行正常登录
				if(_this.enterpriseAccount===""){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '请输入账号'
					})
					return false
				}
				if(_this.password===""){
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						duration: 2000,
						title: '请输入密码'
					})
					return false
				}
				_this.$request({
					url:"/login",
					data: {
						'username': _this.enterpriseAccount,
						'password': _this.password,
						'cid': _this.cid
						// 'username': 'ztd',
						// 'password': '123456',
						// 'cid': 'the second cid'
					}
				}).then(res=>{
					let data = res[1].data
					// console.log(data)
					if(data.statusCode===2000){
						console.log("登录成功")
						uni.showToast({
							icon:'success',
							position:'bottom',
							duration: 2000,
							title: '登录成功'
						})
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
						_this.$store.commit('setKind', '0')
						_this.$store.commit('setId', data.id)
						uni.navigateTo({
							url:'../home/home'
						})
					}else{
						uni.showToast({
						    icon:'none',
							position:'bottom',
							duration: 2000,
						    title: data.statusMsg
						})
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			//跳转到忘记密码页面，并传递账号类型参数type='0'(企业账号)
			passwordForget(){
				uni.navigateTo({
				    url: "passwordForget?type='0'"
				})
			},
			changePassword(){
				this.showPassword = !this.showPassword
				if(this.showPassword){
					this.eye_src="/static/login/eye-on.png"
				}else{
					this.eye_src="/static/login/eye-no.png"
				}
				// console.log(this.eye_src)
			},
			accountFocus(){
				this.account_placeholder=""
			},
			accountBlue(){
				this.account_placeholder="请输入企业账号"
			},
			passwordFocus(){
				this.password_placeholder=""
			},
			passwordBlue(){
				this.password_placeholder="请输入密码"
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
	tr span{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.style1{
		margin-top: 50rpx;
		margin-bottom: 40rpx;
	}
	.style1 input{
		margin-top: 46rpx;
	}
	.style2{
		margin-top: 50rpx;
		margin-bottom: 35rpx;
	}
	.style2 .pswInput{
		margin-top: 46rpx;
		display: flex;
		flex-direction: row;
		align-items:center;
	}
	.pswInput input{
		flex: 1;
	}
	.eye{
		width: 42rpx;
		height: 28rpx;
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
