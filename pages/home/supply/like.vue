<template>
	<view class="mainCon">
		<uniNavBar status-bar="true" backgroundColor="#2D6BDD" @clickLeft="clickBack">
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>感兴趣</text>
			</view>
		</uniNavBar>
		<view>
			<view class="listCon">
				<view class="item" v-for="(item, index) in dataList" :key="index" @click="tapdetail(item)">
					<image class="goodsimg" :src="item.pic[0]" mode=""></image>
					<view class="name u-line-2">
						{{item.title}}
					</view>
					<view class="priceCon">
						<view class="unit">
							￥
						</view>
						<view class="price">
							{{item.price}}
						</view>
					</view>
					<view class="position">
						<u-icon name="map" color="#AAAAAA" size="30"></u-icon>
						<view class="city">
							{{item.source}}
						</view>
					</view>
				</view>
			</view>
			<view style="height: 200rpx;text-align: center;color: #AAAAAA;font-size: 33rpx;">
				上拉加载更多
			</view>
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
				keyword: "",
				background: {
					backgroundColor: '#2D6BDD',
				},
				dataList: [],
				pageNumber: 1
			}
		},
		onReachBottom() {
			let _this = this
			let that =this
			console.log('触底刷新')
			console.log(this.pageNumber)
			let token = uni.getStorageSync('token');
			let d
			if (_this.$store.state.kind == '0') {
				d = {
					token,
					memberId: 1,
					companyId: that.$store.state.enterpriseInfo.enterpriseId,
					type: _this.$store.state.kind,
					parkId: _this.$store.state.enterpriseInfo.parkId,
					page: _this.pageNumber+1
				}
			} else {
				d = {
					token,
					memberId: that.$store.state.id,
					companyId: that.$store.state.userInfo.enterpriseId,
					type: _this.$store.state.kind,
					parkId: _this.$store.state.userInfo.parkId,
					page: _this.pageNumber+1
				}
			}
			console.log(d)
			request({
				url: '/collectionList',
				data: d,
			}).then(res => {
				console.log(res)
				if (res[1].data.data.list.length != 0) {
					let length = _this.dataList.length
					_this.dataList.concat(res[1].data.data.list)
					let len = _this.dataList.length
					for(let i = length;i<len;i++){
						_this.dataList[i].pic = _this.dataList[i].pic.split(',')
						_this.dataList[i].price = Number(_this.dataList[i].price).toFixed(2);
					}
					console.log(_this.dataList)
					_this.pageNumber++
				} else {
					console.log('没有更多内容了')
				}
			})
		},
		onLoad: function() {
			let _this = this
			let that = this
			let token = uni.getStorageSync('token');
			let d
			if (_this.$store.state.kind == '0') {
				d = {
					token,
					memberId: 1,
					companyId: that.$store.state.enterpriseInfo.enterpriseId,
					type: _this.$store.state.kind,
					parkId: _this.$store.state.enterpriseInfo.parkId,
					page: 1
				}
			} else {
				d = {
					token,
					memberId: that.$store.state.id,
					companyId: that.$store.state.userInfo.enterpriseId,
					type: _this.$store.state.kind,
					parkId: _this.$store.state.userInfo.parkId,
					page: 1
				}
			}
			console.log(d)
			request({
				url: '/collectionList',
				data: d,
			}).then(res => {
				console.log(res[1].data.data)
				that.dataList = res[1].data.data.list
				let len = _this.dataList.length
				for(let i = 0;i<len;i++){
					_this.dataList[i].pic = _this.dataList[i].pic.split(',')
					_this.dataList[i].price = Number(_this.dataList[i].price).toFixed(2);
				}
			})
		},
		methods: {
			clickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			tapdetail(item) {
				uni.navigateTo({
					url: './supplydetail?supplyId='+item.pkid
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>
<style lang="scss">
	.uniNavBar_left {
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 36rpx;
			height: 36rpx;
		}
	}

	.uniNavBar_center {
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}

	.listCon {
		padding: 20rpx;
		margin-top: 10px;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.item {
			background-color: #fff;
			width: 345rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 15rpx;
			padding: 15rpx;
			margin-bottom: 25rpx;

			.goodsimg {
				width: 100%;
				height: 350rpx;
			}

			.name {
				width: 100%;
				font-size: 32rpx;
			}

			.priceCon {
				width: 100%;
				display: flex;
				align-items: flex-end;

				.unit {
					color: #F02828;
					font-size: 28rpx;
				}

				.price {
					font-size: 32rpx;
					color: #F02828;
				}
			}

			.position {
				width: 100%;
				display: flex;
				align-items: center;
				color: #AAAAAA;

				.city {
					margin-left: 5rpx;
				}
			}
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
		background-color: #F5F5F5;
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
	.navrightCon {
		// display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		margin-right: 26rpx;
		image {
			width: 34rpx;
			height: 34rpx;
		}

		.scan {}

	}
</style>
