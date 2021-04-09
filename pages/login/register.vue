<template>
	<view>
		<uniNavBar 
			status-bar="true"
			@clickLeft="clickBack"
			@clickRight="clickNext"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="right" class="uniNavBar_right">
				<span type="default">下一步</span>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="title">
				<span id="item1">企业注册</span>
				<span id="item2">请填写以下注册信息</span>
			</view>
			<table width="100%" rules=rows>
				<tr>
					<view>
						<span>公司名称</span>
						<input 
							type="text" 
							maxlength="100"
							:placeholder="enterpriseName_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="enterpriseName"
							@focus="enterpriseNameFocus"
							@blur="enterpriseNameBlue"/>
					</view>
				</tr>
				<tr>
					<view>
						<span>所属行业</span>
						<view class="industry" @click="selectIndustry">
							<text v-if="industryShow===''">请选择行业</text>
							<text v-else id="industryshow">{{industryShow}}</text>
							<image src="../../static/enterprise/btn.png"></image>
						</view>
					</view>
				</tr>
				<tr>
					<view>
						<span>账号</span>
						<input 
							type="text"
							:placeholder="accountNumber_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="accountNumber"
							@focus="accountNumberFocus"
							@blur="accountNumberBlue"/>
					</view>
				</tr>
				<tr>
					<view>
						<span>输入密码</span>
						<input 
							type="text"
							password 
							:placeholder="password_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="password"
							@focus="passwordFocus"
							@blur="passwordBlue"/>
					</view>
				</tr>
				<tr>
					<view>
						<span>确认密码</span>
						<input 
							type="text"
							password
							:placeholder="passwordConfirm_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="passwordConfirm"
							@focus="passwordConfirmFocus"
							@blur="passwordConfirmBlue"/>
					</view>
				</tr>
			</table>
			<view class="statement" @click="clickProtocal">注册即代表同意<span class="blue">《招通达用户协议》</span>和<span class="blue">《招通达隐私保护声明》</span></view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {uniNavBar},
		data(){
			return{
				enterpriseName:"",		//公司名称
				accountNumber:"",		//账号
				password:"",		//密码
				passwordConfirm:"",		//确认密码
				industryKindList:[],		//所属行业
				industryShow:'',
				enterpriseName_placeholder:"请输入公司名全称,注册后不可修改",
				accountNumber_placeholder:"以字母或数字开头可包含特殊符号的6~18位字符组合",
				password_placeholder:"以字母或数字开头可包含特殊符号的6~18位字符组合",
				passwordConfirm_placeholder:"以字母或数字开头可包含特殊符号的6~18位字符组合"
			}
		},
		onLoad(option) {
			if(option.industryArr){
				this.industryShow = option.industryArr
				this.industryKindList = option.industryArr.split(',')
				console.log(this.industryKindList)
			}
		},
		methods:{
			clickBack(){		//导航栏返回按键
				uni.navigateBack({
					delta: 1
				});
			},
			selectIndustry(){
				uni.navigateTo({
					url:'industrySelect'
				})
			},
			clickNext(){		//导航栏下一步按键
				let patt = /^[a-zA-Z\d]/		//正则表达式
				// let reg = /^[\u4e00-\u9fa5]{0,50}$/		//0-50个中文字符正则
				if (this.enterpriseName==="") {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请输入公司名称'
				    })
				    return false
				}
				if(this.accountNumber===""){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请输入账号'
					})
					return false
				}
				if(this.password===""){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请输入密码'
					})
					return false
				}
				if(this.passwordConfirm===""){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '请输入确认密码'
					})
					return false
				}
				// if(!reg.test(this.enterpriseName)){
				// 	uni.showToast({
				// 	    icon: 'none',
				// 		position: 'bottom',
				// 	    title: '公司名称超过限制，请重新输入'
				// 	})
				// 	return false
				// }
				if(!patt.test(this.accountNumber)||this.accountNumber.length<6||this.accountNumber.length>18){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '账号格式不符，请重新输入'
					})
					return false
				}
				if(!patt.test(this.password)||this.password.length<6||this.password.length>18){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '密码格式不符，请重新输入'
					})
					return false
				}
				if(!patt.test(this.passwordConfirm)||this.passwordConfirm.length<6||this.passwordConfirm.length>18){
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '确认密码格式不符，请重新输入'
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
				let obj ={
					'name':this.enterpriseName,
					'account':this.accountNumber,
					'psw':this.password,
					'industryKindList':this.industryKindList
				}
				uni.navigateTo({		//将公司名称、账号、密码传到下一页面
					url:'phoneNumberBind?obj='+JSON.stringify(obj)
				})
			},
			enterpriseNameFocus(){		//输入栏聚焦
				this.enterpriseName_placeholder=''
			},
			enterpriseNameBlue(){		//输入栏失去焦点
				this.enterpriseName_placeholder="请输入公司名全称,注册后不可修改"
			},
			accountNumberFocus(){
				this.accountNumber_placeholder=''
			},
			accountNumberBlue(){
				this.accountNumber_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			passwordFocus(){
				this.password_placeholder=''
			},
			passwordBlue(){
				this.password_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			passwordConfirmFocus(){
				this.passwordConfirm_placeholder=''
			},
			passwordConfirmBlue(){
				this.passwordConfirm_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			clickProtocal(){
				uni.navigateTo({
					url:"protocol"
				})
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
	.title #item1{
		font-size: 48rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
		line-height: 26rpx;
	}
	.title #item2{
		margin-top: 40rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #999999;
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
		border-bottom:1px solid #C7C7C7;
	}
	tr {
		height: 191rpx;
		border:1px solid #C7C7C7;
	}
	tr view{
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
	tr input{
		margin-top: 46rpx;
	}
	.statement{
		margin-top: 33rpx;
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}
	.statement .blue{
		color: #2E6BDE;
	}
	.industry{
		margin-top: 50rpx;
		margin-bottom: 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.industry text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}
	#industryshow{
		display: block;
		width: 650rpx;
		white-space: nowrap; 
		overflow: hidden; 
		/* text-overflow: ellipsis; */
		text-overflow: clip;
	}
	.industry image{
		width: 17rpx;
		height: 30rpx;
	}
</style>
