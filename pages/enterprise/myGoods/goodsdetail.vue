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
			<image src="../../../static/detail_headbg.png" mode="widthFix"></image>
		</view>
		<view class="swiperbar">
			<u-swiper :list="list" height="600" mode="number" indicator-pos="bottomRight"></u-swiper>
		</view>
		<view class="goodsinfo">
			<view class="pricebar">
				<view class="unit">
					￥
				</view>
				<view class="price">
					18888.00
				</view>
			</view>
			<view class="goodsName u-line-2">
				厂家供应 23L小型湿热试验箱 迷你型高低温交变湿热试验箱
			</view>
			<view class="position">
				<u-icon name="map" color="#AAAAAA" size="30"></u-icon>
				<view class="city">
					发货：广东省东莞市
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
			<view class="item">
				产地：广东
			</view>
			<view class="item">
				是否进口：否
			</view>
			<view class="item">
				订货号：1
			</view>
			<view class="item">
				品牌：兴华
			</view>
			<view class="item">
				类型：BF
			</view>

			<view class="item">
				尺寸：定制（cm）
			</view>
			<view class="item">
				净重：定制（kg）
			</view>
			<view class="item">
				最大负荷：定制（kg）
			</view>
			<view class="item">
				内部尺寸：600
			</view>

			<view class="item">
				外形尺寸：700
			</view>

			<view class="item">
				框架材质：钣金焊接
			</view>

			<view class="item">
				可折叠：否
			</view>

			<view class="item">
				是否跨境出口专供货源：否
			</view>

		</view>
		<view style="height: 35rpx;">
			
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
					上海苍茂实业有限公司
				</view>
				<view class="item">
					<view class="leftcon">
						<image src="../../../static/name.png" mode=""></image>
						<view class="labelName">
							联系人
						</view>
					</view>
					<view class="rightcon">
						林丽芬 女士(销售部 经理)
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
						15026907667
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
						中国上海市松江区石湖荡镇长塔路945弄18号1楼U-2
					</view>
				</view>
			</view>
		</view>
		<view class="menueBar" v-if="isShowmenu">
			<view class="item">
				重新编辑
			</view>
			<view class="item" style="border: none;" v-if="dropOptionShow" @click="doDelete">
				删除
			</view>
		</view>
		<uni-popup id="deletePopupDialog" ref="deletePopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			title="提示" 
			content="确定要删除这个产品吗？"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="否"
			title_right="是"
			:before-close="true" 
			@confirm="deleteConfirm" 
			@close="deleteClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				background: {
					backgroundColor: 'rgb(255, 255, 255,0)',
				},
				list: [{
						image: 'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/158549/25/3032/179759/60016b0aE036dc5e6/e02ae5289d3209b1.jpg',
					},
					{
						image: 'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/158549/25/3032/179759/60016b0aE036dc5e6/e02ae5289d3209b1.jpg',
					},
					{
						image: 'https://m.360buyimg.com/mobilecms/s1265x1265_jfs/t1/158549/25/3032/179759/60016b0aE036dc5e6/e02ae5289d3209b1.jpg',
					}
				],
				navtitle: null,
				isShowmenu: false,
				isInvalid:true,		//信息是否删除了
				dropOptionShow:false,		//是否显示下拉框
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
		methods: {
			tapshowmenu() {
				this.isShowmenu = !this.isShowmenu;
			},
			isDelete(){
				this.dropOptionShow=!this.dropOptionShow
			},
			doDelete(){
				this.$refs.deletePopupDialog.open()
				this.dropOptionShow=false
			},
			deleteConfirm(done) {
				console.log('是');
				this.isInvalid=false
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			deleteClose(done) {
				console.log('否');
				done()
			},
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
				font-size: 34rpx;
				color: #333;
				font-weight: bold;
				border-bottom: 1rpx solid #E5E5E5;
				padding: 20rpx 10rpx;
				padding-bottom: 40rpx;
				padding-top: 30rpx;
			}

			.item {
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid #E5E5E5;
				padding: 30rpx 10rpx;

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
</style>
