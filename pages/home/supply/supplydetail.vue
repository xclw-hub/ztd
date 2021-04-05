<template>
	<view class="mainCon">
		<u-navbar :immersive="true" back-icon-color="#fff" title-color="#fff" :background="background" :title="navtitle"
		 :border-bottom="false">
			<view class="navbar-right" slot="right">  <!-- v-show收藏 -->
				<view class="right-item">
					<!-- <u-icon name="../../../static/moreDot.png" size="38"></u-icon> -->
					<image class="collection" v-if="!showUpImg" src="../../../static//home/uncollect.png" @click="tapshowup"></image>
					<image class="collection" v-if="showUpImg" src="../../../static//home/collect.png" @click="tapshowup"></image>
				</view>
			</view>
		</u-navbar>
		<view class="headBg">
			<image src="../../../static/detail_headbg.png" mode="widthFix"></image>
		</view>
		<view class="swiperbar">
			<u-swiper :list="ct.pic" height="600" mode="number" indicator-pos="bottomRight"></u-swiper>
		</view>
		<view class="goodsinfo">
			<view class="pricebar">
				<view class="unit">
					￥
				</view>
				<view class="price">
					{{ct.price}}
				</view>
			</view>
			<view class="goodsName u-line-2">
				{{ct.title}}
			</view>
			<view class="position">
				<u-icon name="map" color="#AAAAAA" size="30"></u-icon>
				<view class="city">
					发货：{{ct.address}}
				</view>
			</view>
		</view>
		<view class="detailInfo">
			<view class="labelHead">
				<image src="../../../static/detailLeft.png" mode=""></image>
				<view class="title">
					详细信息
				</view>
				<image src="../../../static/detailRight.png" mode=""></image>
			</view>
			<u-parse :content="ct.content" @navigate="navigate"></u-parse>
			<view class="item">
				{{ct.content}}
			</view>

		</view>

		<view class="connectBar">
			<view class="labelHead">
				<image src="../../../static/connectleft.png" mode=""></image>
				<view class="title">
					联系方式
				</view>
				<image src="../../../static/connectright.png" mode=""></image>
			</view>

			<view class="contentCon">
				<view class="companyName">
					{{ct.companyTitle}}
				</view>
				<view class="item">
					<view class="leftcon">
						<image src="../../../static/name.png" mode=""></image>
						<view class="labelName">
							联系人
						</view>
					</view>
					<view class="rightcon">
						{{ct.contacts}}
					</view>
				</view>
				<view class="item">
					<view class="leftcon">
						<image src="../../../static/selfphone.png" mode=""></image>
						<view class="labelName">
							移动电话
						</view>
					</view>
					<view class="rightcon">
						{{ct.tel}}
					</view>
				</view>
				<view class="item" style="border: none;">
					<view class="leftcon">
						<image src="../../../static/address.png" mode=""></image>
						<view class="labelName">
							详细地址
						</view>
					</view>
					<view class="rightcon">
						{{ct.address}}
					</view>
				</view>
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
				background: {
					backgroundColor: 'rgb(255, 255, 255,0)',
				},
				/* list: [{
						image: 'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/158549/25/3032/179759/60016b0aE036dc5e6/e02ae5289d3209b1.jpg',
					},
					{
						image: 'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/158549/25/3032/179759/60016b0aE036dc5e6/e02ae5289d3209b1.jpg',
					},
					{
						image: 'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/158549/25/3032/179759/60016b0aE036dc5e6/e02ae5289d3209b1.jpg',
					}
				], */
				navtitle: null,
				showUpImg: true,
				ct:{}
			}
		},
		onPageScroll(e) {
			if (e.scrollTop > 25) {
				this.background.backgroundColor = "#2D6BDD";
				this.navtitle = "详情"
			} else {
				this.background.backgroundColor = 'rgb(255, 255, 255,0)';
				this.navtitle = null
			}
		},
		onLoad(option){
			let _this=this
			let that = this
			let token = uni.getStorageSync('token');
			let d
				if(_this.$store.state.kind=='0'){
					d={
						token,
						memberId: 1,
						companyId: that.$store.state.enterpriseInfo.enterpriseId,
						type:_this.$store.state.kind,
						parkId:_this.$store.state.enterpriseInfo.parkId,
						supplyId:option.supplyId
					}
				}else{
					d={
						token,
						memberId: that.$store.state.id,
						companyId: that.$store.state.userInfo.enterpriseId,
						type:_this.$store.state.kind,
						parkId:_this.$store.state.userInfo.parkId,
						supplyId:option.supplyId
					}
				}
			request({
				url: '/supplyDetail',
				data: d,
			}).then(res => {
				console.log(res[1].data.data)
				_this.ct=res[1].data.data
				_this.ct.pic = _this.ct.pic.split(',')
				_this.showUpImg=_this.ct.collection
			})
		},
		methods: {
			tapshowup:function() {
				let _this=this
				let that = this
				let token = uni.getStorageSync('token');
				let d
				if(_this.$store.state.kind=='0'){
					d={
						token,
						memberId: 1,
						companyId: that.$store.state.enterpriseInfo.enterpriseId,
						type:_this.$store.state.kind,
						parkId:_this.$store.state.enterpriseInfo.parkId,
						supplyId:_this.ct.pkid
					}
				}else{
					d={
						token,
						memberId: that.$store.state.id,
						companyId: that.$store.state.userInfo.enterpriseId,
						type:_this.$store.state.kind,
						parkId:_this.$store.state.userInfo.parkId,
						supplyId:_this.ct.pkid
					}
				} 
				console.log(d)
				request({
					url: '/supplyFavorites',
					data: d,
				}).then(res => {
					console.log(res[1].data.data)
					if(res[1].data.data=='操作成功'){
						that.showUpImg = !that.showUpImg;	
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar-right {
		margin-right: 24rpx;
		display: flex;
		
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.right-item {
		position: relative;
		display: flex;
		padding: 5rpx 20rpx;
		.collection{
			width: 40rpx;
			height: 36rpx;
			// display: block; 
			// overflow: hidden
		}
	}

	.headBg {
		width: 100%;

		image {
			width: 100%;
		}
	}

	.swiperbar {
		padding-bottom: 25rpx;
	}

	.goodsinfo {
		padding: 20rpx;
		border-top: 20rpx solid #F5F5F5;
		border-bottom: 20rpx solid #F5F5F5;

		.pricebar {
			display: flex;
			align-items: flex-end;
			color: #F02828;

			.unit {
				font-size: 30rpx;
			}

			.price {
				font-size: 35rpx;
			}
		}

		.goodsName {
			color: #333333;
			font-size: 32rpx;
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

	.detailInfo {
		padding: 20rpx;

		.labelHead {
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 60rpx;
				height: 20rpx;
			}

			.title {
				color: #1D5DD3;
				font-size: 40rpx;
				margin: 0 15rpx;
			}
		}

		.item {
			padding: 10rpx 20rpx;
			color: #666666;
			font-size: 32rpx;
		}
	}

	.connectBar {
		width: 100%;
		height: 700rpx;
		background: linear-gradient(-35deg, #1D54BC, #108CF5);

		.labelHead {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-top: 20rpx;

			image {
				width: 60rpx;
				height: 20rpx;
			}

			.title {
				color: #fff;
				font-size: 40rpx;
				margin: 0 15rpx;
			}
		}

		.contentCon {
			width: 700rpx;
			height: 500rpx;
			margin: 20rpx auto;
			background-image: url(../../../static/connectBg.png);
			background-size: 100% 100%;
			padding: 20rpx;

			.companyName {
				font-size: 40rpx;
				color: #333;
				font-weight: bold;
				border-bottom: 1rpx solid #E5E5E5;
				padding: 20rpx 10rpx;
			}

			.item {
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #E5E5E5;
				padding: 20rpx 10rpx;

				.leftcon {
					display: flex;
					align-items: center;
					width: 250rpx;

					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}

					.labelName {
						font-size: 32rpx;
						color: #666666;
					}
				}

				.rightcon {
					flex: 1;
					color: #666666;
					font-size: 32rpx;
				}
			}
		}
	}

	// .menueBar {
	// 	width: 200rpx;
	// 	position: fixed;
	// 	top: 150rpx;
	// 	right: 25rpx;
	// 	border-radius: 20rpx;
	// 	background-color: #fff;
	// 	z-index: 99;
	// 	padding: 10rpx 15rpx;
	// 	box-shadow: 0rpx 0rpx 20rpx 0rpx rgba(122, 122, 122, 0.32);

	// 	.item {
	// 		width: 100%;
	// 		text-align: center;
	// 		border-bottom: 1rpx solid #E9E9E9;
	// 		line-height: 80rpx;
	// 		font-size: 32rpx;
	// 		color: #666666;
	// 	}
	// }
</style>
