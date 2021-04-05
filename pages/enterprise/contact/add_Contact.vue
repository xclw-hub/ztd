<template>
	<view>
		<uniNavBar
			status-bar="true"
			border="true"
			@clickLeft="clickBack"
			@clickRight="confirm"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>添加联系人</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<view class="uniNavBar_right_box">
					<text>确定</text>
				</view>
			</view>
		</uniNavBar
		<view class="content">
<!-- 			<view class="title">
				<span>信息填写</span>
			</view> -->
			<table width="100%" rules=rows>
				<tr>
					<view class="style1">
						<span>联系人姓名</span>
						<input 
							type="text" 
							:placeholder="name_placeholder"
							placeholder-class="placeholderStyle"
							v-model="name"
							@focus="nameFocus"
							@blur="nameBlue"/>
					</view>
				</tr>
				<tr>
					<view class="style1" @click="tapselctzhiwu">
						<span>职务</span>
						<input type="text" :placeholder="position_placeholder" placeholder-class="placeholderStyle"
							v-model="position" @focus="positionFocus" @blur="positionBlue" :disabled="true" />
						<view class="rightArrow">
							<image src="../../../static/enterprise/btn.png" mode=""></image>
						</view>
					</view>
				</tr>
				<tr>
					<view class="style1">
						<span>注册手机号</span>
						<input 
							type="text" 
							:placeholder="phoneNumber_placeholder"
							placeholder-class="placeholderStyle"
							v-model.trim="phoneNumber"
							@focus="phoneNumberFocus"
							@blur="phoneNumberBlue"/>
					</view>
				</tr>
				<tr>
					<view class="style1">
						<span>密码</span>
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
					<view class="style1">
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
				<tr>
					<view class="style1">
						<view class="contactPeople">
							<view class='people'>默认联系人</view>
							<view class="bt">
								<evan-switch v-model="checked"></evan-switch>
							</view>
						</view>
						<view class="contactWarn">
							<image src="../../../static/enterprise/tan.png" mode="heightFix"></image>
							<view class='warnContent'>默认联系人即为日后配合园区工作的业务人员</view>
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
				name_placeholder:"请输入姓名",
				position_placeholder:"选择职务",
				phoneNumber_placeholder:"请输入绑定手机号",
				password_placeholder:"以字母或数字开头可包含特殊符号的6~18位字符组合",
				passwordConfirm_placeholder:"以字母或数字开头可包含特殊符号的6~18位字符组合",
				name:"",		//联系人姓名
				position:"",		//职务
				phoneNumber:"",		//手机号
				password:"",		//密码
				passwordConfirm:"",
				isDefault:true,		//是否是默认联系人
				enterpriseId:1,		//绑定的企业Id
				token:"",
				checked:false// 默认联系人开启
			}
		},
		onLoad() {
			let that=this;
			uni.$on('zhiweiupdate', function(data) {
				that.position=data.item;
				console.log(data.item);
			})
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta: 1
				})
			},
			confirm(){
				uni.navigateTo({
					url:'contactList'
				})
			},
			// finish(){
			// 	let _this=this
			// 	let patt = /^[a-zA-Z\d]/		//正则表达式
			// 	if (_this.name==="") {
			// 	    uni.showToast({
			// 	        icon: 'none',
			// 			position: 'bottom',
			// 	        title: '请输入联系人姓名'
			// 	    })
			// 	    return false
			// 	}
			// 	if (_this.position==="") {
			// 	    uni.showToast({
			// 	        icon: 'none',
			// 			position: 'bottom',
			// 	        title: '选择人职务'
			// 	    })
			// 	    return false
			// 	}
			// 	if (_this.phoneNumber==="") {
			// 	    uni.showToast({
			// 	        icon: 'none',
			// 			position: 'bottom',
			// 	        title: '请输入联系人手机号'
			// 	    })
			// 	    return false
			// 	}
			// 	if (_this.password==="") {
			// 	    uni.showToast({
			// 	        icon: 'none',
			// 			position: 'bottom',
			// 	        title: '请输入联系人密码'
			// 	    })
			// 	    return false
			// 	}
			// 	if (_this.passwordConfirm==="") {
			// 	    uni.showToast({
			// 	        icon: 'none',
			// 			position: 'bottom',
			// 	        title: '请输入联系人确认密码'
			// 	    })
			// 	    return false
			// 	}
			// 	if(!patt.test(_this.password)||_this.password.length<6||_this.password.length>18){
			// 		uni.showToast({
			// 		    icon: 'none',
			// 			position: 'bottom',
			// 		    title: '密码格式不符，请重新输入'
			// 		})
			// 		return false
			// 	}
			// 	if(!patt.test(_this.passwordConfirm)||_this.passwordConfirm.length<6||_this.passwordConfirm.length>18){
			// 		uni.showToast({
			// 		    icon: 'none',
			// 			position: 'bottom',
			// 		    title: '确认密码格式不符，请重新输入'
			// 		})
			// 		return false
			// 	}
			// 	if(_this.password!==_this.passwordConfirm){
			// 		uni.showToast({
			// 		    icon: 'none',
			// 			position: 'bottom',
			// 		    title: '输入密码与确认密码不一致'
			// 		})
			// 		return false
			// 	}
			// 	//从localStory中获取token
			// 	uni.getStorage({
			// 		key: 'token',
			// 	    success: function (res) {
			// 	        console.log(res)
			// 			_this.token = res.data
			// 		},
			// 		fail:function(err){
			// 			console.log(err)
			// 		}
			// 	})
			// 	_this.$request({
			// 		url:"/register/addContact",
			// 		data: {
			// 			// 'token':'c8e46b7d1cd819d6ef1fe642939bbd01',
			// 			// 'username':'白宇轩',
			// 			// 'position':'学生',
			// 			// 'phoneNumber':'18842741274',
			// 			// 'password':'123456',
			// 			// 'isDefault':_this.isDefault,
			// 			// 'enterpriseId':_this.enterpriseId
			// 			'token':_this.token,
			// 			'username':_this.name,
			// 			'position':_this.position,
			// 			'phoneNumber':_this.phoneNumber,
			// 			'password':_this.password,
			// 			'isDefault':_this.isDefault,
			// 			'enterpriseId':_this.enterpriseId
			// 		}
			// 	}).then(res=>{
			// 		console.log(res[1].data)
			// 		if(res[1].data.statusCode===2000){
			// 			uni.showToast({
			// 				icon:'success',
			// 				position:'bottom',
			// 				title: '联系人添加成功'
			// 			})
			// 			uni.navigateTo({
			// 				url:'contact'
			// 			})
			// 		}else if(res[1].data.statusCode===3008){		//token无效，跳转到企业登录页面
			// 			uni.navigateTo({		
			// 				url:'../login/enterpriseLogin'
			// 			})
			// 		}else if(res[1].data.statusCode===3005){
			// 			uni.showToast({
			// 			    icon:'none',
			// 				position:'bottom',
			// 			    title: '手机号已被注册'
			// 			})
			// 		}else{
			// 			uni.showToast({
			// 			    icon:'none',
			// 				position:'bottom',
			// 			    title: '添加联系人失败'
			// 			})
			// 		}
			// 	}).catch(err=>{
			// 		console.log(err)
			// 	})
			// },
			nameFocus(){
				this.name_placeholder=""
			},
			nameBlue(){
				this.name_placeholder="请输入姓名"
			},
			positionFocus(){
				this.position_placeholder=""
			},
			positionBlue(){
				this.position_placeholder="选择职务"
			},
			phoneNumberFocus(){
				this.phoneNumber_placeholder=""
			},
			phoneNumberBlue(){
				this.phoneNumber_placeholder="请输入绑定手机号"
			},
			passwordFocus(){
				this.password_placeholder=""
			},
			passwordBlue(){
				this.password_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			passwordConfirmFocus(){
				this.passwordConfirm_placeholder=""
			},
			passwordConfirmBlue(){
				this.passwordConfirm_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			tapselctzhiwu() {
				uni.navigateTo({
					url: './selectjob'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.uniNavBar_left, .uniNavBar_center, .uniNavBar_right{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_left image{
		width: 20rpx;
		height: 36rpx;
	}
	.uniNavBar_center{
		text-align: center;
	}
	.uniNavBar_center text{
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.uniNavBar_right .uniNavBar_right_box{
		width: 90rpx;
		height: 54rpx;
		background: #2D6BDD;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.uniNavBar_right_box text{
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32rpx;
	}
	.content{
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
/* 	.title{
		display: flex;
		flex-direction: column;
		margin-top: 50rpx;
	} */
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
		margin-left: 39rpx;
		margin-right: 39rpx;
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
		position: relative;
		.rightArrow {
			position: absolute;
			right: 60rpx;
			bottom: 0rpx;
		
			image {
				width: 17rpx;
				height: 30rpx;
			}
		}
	}
	.style1 input{
		margin-top: 46rpx;
	}
	.people {
		flex: 25;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}
	.contactPeople{
		display: flex;
		flex-direction: row;
		align-items:center;/*指定垂直居中*/
	}
	.bt{
		flex: 10;
	}
	.contactWarn{
		margin-top: 46rpx;
		display: flex;
		flex-direction: row;
		height: 28rpx;
	}
	.contactWarn image{
		height: 100%;
	}
	.warnContent{
		padding-left: 10rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}
</style>
