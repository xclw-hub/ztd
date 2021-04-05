<template>
	<view class="mainCon">
		<u-navbar height="60" back-icon-color="#fff" :title="null" :background="background">
			<view class="slot-wrap">
				<view class="search-wrap">
					<u-search search-icon="../../../static/searchIcon.png" v-model="keyword" i :show-action="false" height="80"
					 :action-style="{color: '#fff'}" shape="square" placeholder="请输入关键字搜索"></u-search>
				</view>
			</view>
		</u-navbar>
		<view class="listCon">
			<view class="item" v-for="(item, index) in 10" :key='index' @click="tapdetail">
				<image class="goodsimg" src="https://img10.360buyimg.com/n1/jfs/t1/16292/24/12844/316759/5c9b2f9dEf55358d0/fe0b8cbb7e4f27d0.jpg"
				 mode=""></image>
				<view class="name u-line-2">
					厂家供应 23L小型湿热试验箱 迷你型高低
				</view>
				<view class="priceCon">
					<view class="unit">
						￥
					</view>
					<view class="price">
						18888.00
					</view>
				</view>
				<view class="position">
					<u-icon name="map" color="#AAAAAA" size="30"></u-icon>
					<view class="city">
						广东东莞
					</view>
				</view>
			</view>
		</view>
		<view style="height: 200rpx;text-align: center;color: #AAAAAA;font-size: 33rpx;">
			上拉加载更多
		</view>
		<view class="bottomBar">
			<view class="addMore" @click="publish">
				发布商品
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				background: {
					backgroundColor: '#2D6BDD',
				},
			}
		},
		onReachBottom() {

		},
		methods: {
			tapdetail() {
				uni.navigateTo({
					url: './goodsdetail'
				})
			},
			publish(){
				// console.log("我要发布")
				uni.navigateTo({
					url:'./publish'
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

<style lang="scss" scoped>
	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.search-wrap {
		margin-right: 35rpx;
		flex: 1;
	}

	.listCon {
		padding: 20rpx;
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
</style>
