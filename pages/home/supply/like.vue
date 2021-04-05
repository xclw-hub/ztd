<template>
	<view class="mainCon">
		<uniNavBar
			status-bar="true"
			backgroundColor="#2D6BDD"
			@clickLeft="clickBack"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>感兴趣</text>
			</view>
		</uniNavBar>
		<view>
			<view class="listCon">
				<view class="item" v-for="(item, index) in 10" :key="index" @click="tapdetail">
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
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components:{
			uniNavBar
		},
		data() {
			return {
				keyword: "",
				background: {
					backgroundColor: '#2D6BDD',
				}
			}
		},
		onReachBottom() {

		},
		onLoad: function () {
			//定时器模拟ajax异步请求数据
			setTimeout(()=>{
				this.filterData = data; 
				//设置选中项
				// 一下的注释是针对测试数据说明结构的意思，具体传入什么数据，要看你自己数据。如果data.js数据有修改，注意defaultSelected也要修改
				//传入defaultSelected的结构不能错，错了就报错运行异常。 不想选中的请传入null
				// this.defaultSelected = [
				// 	[1,1,0],				//第0个菜单选中 一级菜单的第1项，二级菜单的第1项，三级菜单的第3项
				// 	[null,null],			//第1个菜单选中 都不选中
				// 	[1],					//第2个菜单选中 一级菜单的第1项
				// 	[[0],[1,2,7],[1,0]],	//筛选菜单选中 第一个筛选的第0项，第二个筛选的第1,2,7项，第三个筛选的第1,0项
				// 	[[0],[1],[1]]			//单选菜单选中 第一个筛选的第0项，第二个筛选的第1项，第三个筛选的第1项
				// ];
			},100);
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			tapdetail() {
				uni.navigateTo({
					url: './supplydetail'
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
    .uniNavBar_left{
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	image{
    		width: 36rpx;
    		height: 36rpx;
    	}
    }
    .uniNavBar_center{
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	text{
    		font-size: 36rpx;
    		font-family: Source Han Sans CN;
    		font-weight: 400;
    		color: #FFFFFF;
    	}
    }
	.listCon {
		padding: 20rpx;
		margin-top:10px;
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
