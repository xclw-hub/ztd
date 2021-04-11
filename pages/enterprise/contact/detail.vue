<template>
	<view class="mainCon">
		<u-navbar :immersive="true" back-icon-color="#fff" title-color="#fff" :background="background" :title="navtitle"
			:border-bottom="false">
			<view class="navbar-right" @click="tapshowmenu" slot="right">
				<view class="right-item" @click="isDelete()">
					<u-icon name="../../../static/moreDot.png" size="38"></u-icon>
				</view>
			</view>
		</u-navbar>
		<view class="headBg">

		</view>

		<view class="userInfocon">
			<view class="mainbox">
				<view class="avatar">
					<image :src="user.contactHead" mode="" v-if='user.contactHead!=0'></image>
					<view class="ss" v-else>
						{{user.contactName|fristName}}
					</view>
				</view>
				<view class="name">
					{{user.contactName}}
				</view>
				<view class="zhiwei">
					{{user.position}}
				</view>
				<view class="sidai" style="background-image: url(../../../static/sidai.png);background-size: 100% 100%;"
					v-if="user.isDefault">
					<image src="../../../static/checkbox.png" style="padding-bottom: 10rpx;" mode=""></image>
					<view style="color: #fff;padding-bottom: 10rpx;">
						默认
					</view>
				</view>
			</view>
		</view>

		<view class="infoCon">
			<view class="item">
				<view class="labelName">
					注册手机号
				</view>
				<view class="content">
					{{user.phoneNum}}
				</view>
			</view>
			<view class="item">
				<view class="labelName">
					密码
				</view>
				<view class="content" style="border: none;">
					*********
				</view>
			</view>
		</view>
		<view class="menueBar" v-if="isShowmenu">
			<view class="item" @click="beLoved">
				默认联系人
			</view>
			<view class="item" @click="editcontacts">
				编辑
			</view>
			<view class="item" style="border: none;" @click="doDelete">
				注销账户
			</view>
		</view>
		<view class="bottomBar" @click="dial">
			<view class="addMore">
				<image style="width: 26rpx;height: 32rpx;margin-right: 10rpx;" src="../../../static/phone.png" mode="">
				</image>
				<view>
					拨打电话
				</view>
			</view>
		</view>
		<u-mask :show="isShowmenu" @click="isShowmenu = false" z-index="55"></u-mask>
		<uni-popup id="deletePopupDialog" ref="deletePopupDialog" type="dialog">
			<uni-popup-dialog type="info" title="注销账号" content="确定要注销此账号吗？" buttonLeftBgColor="#BDBDBD"
				buttonRightBgColor="#FF9000" textRightColor="#FFFFFF" title_left="否" title_right="是"
				:before-close="true" @confirm="deleteConfirm" @close="deleteClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import {
		request
	} from '../../../util/request.js'
	export default {
		components: {
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				background: {
					backgroundColor: 'rgb(255, 255, 255,0)',
				},
				navtitle: '详情',
				isShowmenu: false,
				isInvalid: true, //信息是否删除了
				dropOptionShow: false, //是否显示下拉框
				user: {},
				tel:'',
				contactId:1,
				a:0

			}
		},

		onLoad(option) {
			let that = this
			that.tel=option.tel
			that.contactId=option.contactId
			that.a= option.a
			console.log(that.a)
			request({
				url: '/addContact/contactDetail',
				data: {
					phoneNum: option.tel
				}
			}).then(res => {
				console.log(res[1].data)
				that.user = res[1].data
			})
		},
		onShow(){
			let that = this
			that.isShowmenu=false
			request({
				url: '/addContact/contactDetail',
				data: {
					phoneNum: that.tel
				}
			}).then(res => {
				console.log(res[1].data)
				that.user = res[1].data
			})
		},
		filters: {
		  fristName: function (value) {
			return value[0]
		  }
		},
		computed:{
			unChanged: function () {
				if(this.a==1){
					return true
				}else{
					return false
				}
			}
		},
		methods: {
			beLoved() {
				let that = this
				console.log({
							phoneNum: that.user.phoneNum,
							userName: that.user.contactName
						})
				if (that.user.isDefault == true) {
					uni.showToast({
						title: '此人已设置为默认联系人',
						duration: 2000,
						icon: 'none'
					});
				} else {
					request({
						url: '/addContact/setDefault',
						data: {
							phoneNum: that.user.phoneNum,
							userName: that.user.contactName
						}
					}).then(res => {
						console.log(res[1].data)
						that.user = res[1].data
						request({
							url: '/addContact/contactDetail',
							data: {
								phoneNum: that.tel
							}
						}).then(res => {
							console.log(res[1].data)
							that.user = res[1].data
						})
					})
					
				}
			},
			tapshowmenu() {
				this.isShowmenu = !this.isShowmenu;
			},
			dial() {
				uni.makePhoneCall({
					phoneNumber: '18380748516'
				})
			},
			editcontacts() {
				let that =this
				console.log('asdf')
				console.log(that.a)
				uni.navigateTo({
					url: './changeContact?name=' + that.user.contactName + '&job=' + that.user.position + '&telephone=' + that
						.user.phoneNum+'&isDefault='+that.user.isDefault+'&contactId='+that.user.contactId+'&a='+that.a
				})
			},
			isDelete() {
				this.dropOptionShow = !this.dropOptionShow
			},
			doDelete() {
				this.$refs.deletePopupDialog.open()
				this.dropOptionShow = false
			},
			deleteConfirm(done) {
				console.log('是');
				let that = this
				request({
					url: '/addContact/delete',
					data: {
						phoneNum: that.user.phoneNum,
						userName: that.user.contactName
					}
				}).then(res => {
					console.log(res)
					this.isInvalid = false
					uni.redirectTo({
						url: './contactList'
					});
				})
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			deleteClose(done) {
				console.log('否');
				done()
			}
		}
	}
</script>
<style>
	page {
		background-color: #F5F5F5;
	}
</style>
<style lang="scss" scoped>
	.headBg {
		width: 100%;
		height: 400rpx;
		background: linear-gradient(-35deg, #1D54BC, #108CF5);
	}

	.userInfocon {
		position: absolute;
		top: 200rpx;
		width: 700rpx;
		height: 400rpx;
		left: 25rpx;
		z-index: 40;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0px 12px 20px 0px rgba(193, 193, 193, 0.32);

		.mainbox {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
		}

		.avatar {
			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
			.ss {
				background-color: #2D6BDD;
				color: #FFFFFF;
				font-size: 40rpx;
				width: 160rpx;
				height: 160rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
			}
		}

		.name {
			color: #333333;
			font-size: 35rpx;
			font-weight: 500;
			margin-top: 15rpx;
		}

		.zhiwei {
			color: #777777;
			font-size: 28rpx;
			padding: 5rpx 10rpx;
			border: 1rpx solid #888888;
			border-radius: 5rpx;
			margin-top: 10rpx;
		}

		.sidai {
			width: 160rpx;
			height: 75rpx;
			position: absolute;
			left: 0;
			top: 50rpx;
			display: flex;
			align-items: center;
			font-size: 30rpx;

			image {
				width: 25rpx;
				height: 20rpx;
				margin-left: 20rpx;
				margin-right: 15rpx;
			}
		}
	}

	.infoCon {
		width: 700rpx;
		margin: 230rpx auto;
		box-shadow: 0px 12px 20px 0px rgba(193, 193, 193, 0.32);
		background: #fff;
		border-radius: 20rpx;
		padding: 0rpx 30rpx;

		.item {
			padding-top: 30rpx;

			.labelName {
				color: #999999;
				font-size: 28rpx;
			}

			.content {
				color: #333333;
				font-size: 34rpx;
				padding-top: 15rpx;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #E9E9E9;
			}
		}
	}

	.menueBar {
		width: 200rpx;
		position: fixed;
		top: 150rpx;
		right: 25rpx;
		border-radius: 20rpx;
		background-color: #fff;
		z-index: 99;
		padding: 10rpx 15rpx;
		box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(122, 122, 122, 0.32);

		.item {
			width: 100%;
			text-align: center;
			border-bottom: 1rpx solid #E9E9E9;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #666666;
		}
	}

	.navbar-right {
		// margin-right: 24rpx;
		display: flex;
		padding: 5rpx 20rpx;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		color: #4EA2FA;
		display: flex;
	}

	.bottomBar {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		height: 140rpx;
		background-color: #F5F5F5;
		z-index: 50;

		.addMore {
			width: 600rpx;
			height: 80rpx;
			color: #fff;
			background-color: #2D6BDD;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
		}
	}
</style>
