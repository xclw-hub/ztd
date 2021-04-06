<template>
	<view class="mainCon">
		<view class="bottomBar" v-if="listNumber!=0">
			<view class="addMore" @click="addcontact">
				添加
			</view>
		</view>
		<view class="listCon" v-if="listNumber!=0">
			<view class="item" v-for="(item,index) in contactList" :key="index">
				<view class="avatar" @click="tapGodetail(item)">
					<image :src="item.contactHead" mode=""></image>
					<!-- 根据后台返回的参数在此处做条件渲染，是否显示改标志 v-if -->
					<image v-if="item.isDefault" class="connectIcon" src="../../../static/connectIcon.png" mode=""></image>
				</view>
				<view class="infoCon">
					<view class="leftinfo" @click="tapGodetail(item)">
						<view class="name">
							{{item.contactName}}
						</view>
						<view class="zhiwei" @click="tapGodetail(item)">
							{{item.position}}
						</view>
					</view>
					
					<view class="phoneicon">
						<image src="../../../static/telephone.png" mode="" @click="makePhone(item.phoneNum)"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 150rpx;" v-if="listNumber!=0">

		</view>
		<view class="zero" v-if="listNumber==0">
			<image src="../../../static/nocontacter.png" mode="widthFix"></image>
			<view class="z1">
				您还没有添加企业联系人
			</view>
			<view class="z2">
				添加联系人，企业更省心
			</view>
			<view class="z3" @click="addcontact">
				添加联系人
			</view>
		</view>
	</view>
</template>

<script>
	import {
		request
	} from '../../../util/request.js'
	export default {
		data() {
			return {
				//listNumber: 1  计算属性，这里只为演示
				listNumber: 1 ,//listNumber: 0时，显示联系人为空页面，添加完联系人，listNumber+1,跳到该页面显示联系人
				contactList:[]
			}
		},
		onShow(){
			let _this = this
				let that = this
				let token = uni.getStorageSync('token');
				let d
				if(_this.$store.state.kind=='0'){
					d={
						enterpriseId: that.$store.state.enterpriseInfo.enterpriseId,
					}
				}else{
					d={
						enterpriseId: that.$store.state.userInfo.enterpriseId,
					}
				}
				request({
					url: '/addContact/existingContacts',
					data:d
				}).then(res=>{
					console.log(res[1].data)
					that.contactList=res[1].data
					if(that.contactList.length==0){
						that.listNumber==0
					}
				})
		},
		methods: {
			tapGodetail(item) {
				console.log(item.contactId)
				uni.navigateTo({
					url: './detail?tel='+item.phoneNum+'&contactId='+item.contactId
				})
			},
			makePhone(tel){
				uni.makePhoneCall({
					phoneNumber:tel
				})
			},
			addcontact() {
				uni.redirectTo({
					url: './add_Contact'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.zero {
		padding-top: 231rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 100%;
		}

		.z1 {
			font-size: 34rpx;
		}

		.z2 {
			padding-top: 18rpx;
			font-size: 26rpx;
			color: #AAAAAA;
			padding-bottom: 45rpx;
		}

		.z3 {
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

	.bottomBar {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: 0;
		height: 140rpx;
		background-color: #fff;
		z-index: 99;

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

	.listCon {
		padding: 20rpx;

		.item {
			display: flex;
			align-items: flex-start;
			margin-top: 20rpx;

			.avatar {
				position: relative;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				.connectIcon {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					bottom: 15rpx;
					right: 0rpx;
				}
			}

			.infoCon {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 25rpx;
				border-bottom: 1rpx solid #E9E9E9;
				height: 100rpx;
				padding-left: 40rpx;
				box-sizing: content-box;

				.leftinfo {
					height: 100rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-size: 32rpx;
						color: #333333;
					}

					.zhiwei {
						color: #777777;
						font-size: 28rpx;
						border: 1rpx solid #888888;
						border-radius: 7rpx;
						padding: 3rpx 6rpx;
						text-align: center;
					}
				}

				.phoneicon {
					image {
						width: 70rpx;
						height: 70rpx;
					}
				}
			}
		}
	}
</style>
