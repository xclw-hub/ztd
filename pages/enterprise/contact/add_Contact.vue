<template>
	<view>
		<uniNavBar status-bar="true" border="true" @clickLeft="clickBack" @clickRight="confirm">
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
		</uniNavBar <view class="content">
		<!-- 			<view class="title">
				<span>信息填写</span>
			</view> -->
		<table width="100%" rules=rows>
			<tr>
				<view class="style1">
					<span>联系人姓名</span>
					<input type="text" :placeholder="name_placeholder" placeholder-class="placeholderStyle"
						v-model="name" @focus="nameFocus" @blur="nameBlue" />
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
					<input type="text" :placeholder="phoneNumber_placeholder" placeholder-class="placeholderStyle"
						v-model.trim="phoneNumber" @focus="phoneNumberFocus" @blur="phoneNumberBlue" />
				</view>
			</tr>
			<tr>
				<view class="style1">
					<span>密码</span>
					<input type="text" password :placeholder="password_placeholder" placeholder-class="placeholderStyle"
						v-model.trim="password" @focus="passwordFocus" @blur="passwordBlue" />
				</view>
			</tr>
			<tr>
				<view class="style1">
					<span>确认密码</span>
					<input type="text" password :placeholder="passwordConfirm_placeholder"
						placeholder-class="placeholderStyle" v-model.trim="passwordConfirm"
						@focus="passwordConfirmFocus" @blur="passwordConfirmBlue" />
				</view>
			</tr>
			<tr>
				<view class="style1">
					<view class="contactPeople">
						<view class='people'>默认联系人</view>
						<view class="bt" v-if='unChanged'>
							<evan-switch v-model='checked' disabled='true'></evan-switch>
						</view>
						<view class="bt" v-if='!unChanged'>
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
	import {
		request
	} from '../../../util/request.js'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				name_placeholder: "请输入姓名",
				position_placeholder: "选择职务",
				phoneNumber_placeholder: "请输入绑定手机号",
				password_placeholder: "以字母或数字开头可包含特殊符号的6~18位字符组合",
				passwordConfirm_placeholder: "以字母或数字开头可包含特殊符号的6~18位字符组合",
				name: "", //联系人姓名
				position: "", //职务
				phoneNumber: "", //手机号
				password: "", //密码
				passwordConfirm: "",
				isDefault: true, //是否是默认联系人
				enterpriseId: 1, //绑定的企业Id
				token: "",
				unChanged:false,
				checked: false // 默认联系人开启
			}
		},
		onLoad(option) {
			let that = this;
			console.log(option.a)
			if(option.a==0){
				that.unChanged=true
				that.checked=true
			}else{
				that.unChanged=false
				that.checked=false
			}
			uni.$on('zhiweiupdate', function(data) {
				that.position = data.item;
				console.log(data.item);
			})
		},
		methods: {
			clickBack() {
					uni.redirectTo({
						url: './contactList'
					});
			},
			confirm() {
				let that = this
				if (that.password != that.passwordConfirm) {
					uni.showToast({
						icon: 'none',
						title: '两次输入密码不一致'
					})
					return
				}
				let d = {
					username: that.name,
					phoneNum: that.phoneNumber,
					position: that.position,
					password: that.password,
					isDefault: that.checked,
					enterpriseId: that.$store.state.enterpriseInfo.enterpriseId
				}
				console.log(d)
				request({
					url: '/addContact/addContact',
					data: d,
				}).then(res => {
					console.log(res)
					uni.redirectTo({
						url: './contactList'
					});
				})
			},
			nameFocus() {
				this.name_placeholder = ""
			},
			nameBlue() {
				this.name_placeholder = "请输入姓名"
			},
			positionFocus() {
				this.position_placeholder = ""
			},
			positionBlue() {
				this.position_placeholder = "选择职务"
			},
			phoneNumberFocus() {
				this.phoneNumber_placeholder = ""
			},
			phoneNumberBlue() {
				this.phoneNumber_placeholder = "请输入绑定手机号"
			},
			passwordFocus() {
				this.password_placeholder = ""
			},
			passwordBlue() {
				this.password_placeholder = "以字母或数字开头可包含特殊符号的6~18位字符组合"
			},
			passwordConfirmFocus() {
				this.passwordConfirm_placeholder = ""
			},
			passwordConfirmBlue() {
				this.passwordConfirm_placeholder = "以字母或数字开头可包含特殊符号的6~18位字符组合"
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
	.uniNavBar_left,
	.uniNavBar_center,
	.uniNavBar_right {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.uniNavBar_left image {
		width: 20rpx;
		height: 36rpx;
	}

	.uniNavBar_center {
		text-align: center;
	}

	.uniNavBar_center text {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}

	.uniNavBar_right .uniNavBar_right_box {
		width: 90rpx;
		height: 54rpx;
		background: #2D6BDD;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.uniNavBar_right_box text {
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32rpx;
	}

	.content {
		padding-left: 39rpx;
		padding-right: 39rpx;
	}

	/* 	.title{
		display: flex;
		flex-direction: column;
		margin-top: 50rpx;
	} */
	.title span {
		font-size: 48rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
		line-height: 26rpx;
	}

	.placeholderStyle {
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}

	table {
		margin-top: 20rpx;
		border-bottom: 1rpx solid #C7C7C7;
		margin-left: 39rpx;
		margin-right: 39rpx;
	}

	tr {
		height: 191rpx;
		border: 1rpx solid #C7C7C7;
	}

	tr span {
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 26rpx;
	}

	.style1 {
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

	.style1 input {
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

	.contactPeople {
		display: flex;
		flex-direction: row;
		align-items: center;
		/*指定垂直居中*/
	}

	.bt {
		flex: 10;
	}

	.contactWarn {
		margin-top: 46rpx;
		display: flex;
		flex-direction: row;
		height: 28rpx;
	}

	.contactWarn image {
		height: 100%;
	}

	.warnContent {
		padding-left: 10rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 26rpx;
	}
</style>
