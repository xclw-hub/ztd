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
				<text>修改密码</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<text>确定</text>
			</view>
		</uniNavBar>
		<view class="content">
			<view class="oldPassword">
				<text>旧密码</text>
				<input
					type="text" 
					:placeholder="oldPassword_placeholder"
					placeholder-class="placeholderStyle"
					v-model.trim="oldPassword"
					@focus="oldPasswordFocus"
					@blur="oldPasswordBlue"/>
			</view>
			<view class="newPassword">
				<text>输入新密码</text>
				<input
					type="text" 
					:placeholder="newPassword_placeholder"
					placeholder-class="placeholderStyle"
					v-model.trim="newPassword"
					@focus="newPasswordFocus"
					@blur="newPasswordBlue"/>
			</view>
			<view class="confirmPassword">
				<text>确认密码</text>
				<input
					type="text" 
					:placeholder="confirmPassword_placeholder"
					placeholder-class="placeholderStyle"
					v-model.trim="confirmPassword"
					@focus="confirmPasswordFocus"
					@blur="confirmPasswordBlue"/>
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
				oldPassword_placeholder:'以字母或数字开头可包含特殊符号的6~18位字符组合',
				newPassword_placeholder:'以字母或数字开头可包含特殊符号的6~18位字符组合',
				confirmPassword_placeholder:'以字母或数字开头可包含特殊符号的6~18位字符组合',
				oldPassword:'',
				newPassword:'',
				confirmPassword:''
			}
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			confirm(){
				console.log('确定')
			},
			oldPasswordFocus(){
				this.oldPassword_placeholder=''
			},
			oldPasswordBlue(){
				this.oldPassword_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			newPasswordFocus(){
				this.newPassword_placeholder=''
			},
			newPasswordBlue(){
				this.newPassword_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			confirmPasswordFocus(){
				this.confirmPassword_placeholder=''
			},
			confirmPasswordBlue(){
				this.confirmPassword_placeholder="以字母或数字开头可包含特殊符号的6~18位字符组合"
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
		padding-top: 6rpx;
	}
	.content text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
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
	.oldPassword{
		height: 191rpx;
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
	}
	.oldPassword input{
		margin-top: 46rpx;
	}
	.newPassword{
		height: 191rpx;
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
	}
	.newPassword input{
		margin-top: 46rpx;
	}
	.confirmPassword{
		height: 191rpx;
		border-bottom: 1rpx solid #C7C7C7;
		padding-top: 49rpx;
	}
	.confirmPassword input{
		margin-top: 46rpx;
	}
</style>
