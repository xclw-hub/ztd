<template>
	<view class="mainCon">
		<u-navbar height="60" back-icon-color="#fff" :title="null" :background="background">
			<view class="slot-wrap">
				<view class="search-wrap" @click="enterSearch">
					<u-search search-icon="../../../static/searchIcon.png" v-model="keyword" i :show-action="false" height="80"
					 :action-style="{color: '#fff'}" shape="square" placeholder="请输入关键字搜索"></u-search>
				</view>
			</view>
			<view class="navrightCon">
				<div style="height: 16px;" @click="toLike">
					<image class="scan"  src="../../../static/home/like.png" mode=""></image>
				</div>
				<div style="height: 10px;">
					<span style="font-size: 12px;color: #FFFFFF;">感兴趣</span>
				</div>
				
			</view>
		</u-navbar>
		<view>
			<view class="dropmenu">
				<u-dropdown ref="uDropdown">
					<u-dropdown-item :title="region">
						<view class="slot-content" style="background-color: #FFFFFF;">
							<scroll-view scroll-y="true" style="height: 350rpx;">
								<view class="province">
									<view class="labelName">
										省份
									</view>
									<view class="provinceList">
										<view class="provinceItem" :class="provinceCurrent==index?'active':''"
											v-for="(item,index) in provinceList" @click.stop="tapprovinceItem(index)">
											{{item}}
										</view>
									</view>
								</view>
								<view class="city">
									<view class="labelName">
										城市
									</view>
									<view class="cityList">
										<view class="cityItem" :class="cityCurrent==index?'active':''"
											v-for="(item,index) in cityList" @click.stop="tapcityItem(index)">
											{{item}}
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="slotbottomBar">
								<view class="reset" @click="tapresetregion">
									重置
								</view>
								<view class="save" @click="tapsaveregion">
									确定
								</view>
							</view>
						</view>
					</u-dropdown-item>
					<u-dropdown-item :title="price">
						<view class="slot-content" style="background-color: #FFFFFF;">
							<view class="slotpriceCon">
								<view class="labelName">
									价格区间（元）
								</view>
								<view class="priceinput">
									<view class="inputitem">
										<input type="number" placeholder="最低价" v-model="minprice" />
									</view>
									<view class="middleLine">
			
									</view>
									<view class="inputitem">
										<input type="number" placeholder="最高价" v-model="maxprice" />
									</view>
								</view>
								<view class="tips">
									注：最多可保留两位小数
								</view>
							</view>
							<view class="slotbottomBar">
								<view class="reset" @click="priceCancel">
									取消
								</view>
								<view class="save" @click="pricesave">
									确定
								</view>
							</view>
						</view>
					</u-dropdown-item>
				</u-dropdown>
			</view>
			
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
			<view class="bottomBar">
				<view class="addMore" @click="publish">
					发布商品
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue'
	import data from '@/components/shop_dropdown/data.js';//筛选菜单数据
	export default {
		components: {
			'HMfilterDropdown':HMfilterDropdown 
		},
		data() {
			return {
				defaultSelected:[],
				filterData:[], //传入数据，具体数据格式，请下载示例查看
				keyword: "",
				background: {
					backgroundColor: '#2D6BDD',
				},
				region: "不限地区",
				price: "不限价格",
				provinceList: ["不限", "北京", "天津", "上海", "重庆", "河北", "辽宁", "黑龙江", "江西", "浙江", "安徽", "山东", "河南", "湖北", "江西",
					"浙江", "安徽", "山东", "河南", "湖北"
				],
				cityList: ["不限"],
				provinceCurrent: 0,
				cityCurrent: 0,
				minprice: "",
				maxprice: ""
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
			toLike(){
				uni.navigateTo({
					url:'./like'
				})
			},
			enterSearch(){
				uni.navigateTo({
					url:'search'
				})
			},
			//接收菜单结果
			confirm(e){
				this.indexArr = e.index;
				this.valueArr = e.value;
				
			},
			tapdetail() {
				uni.navigateTo({
					url: './supplydetail'
				})
			},
			publish(){
				// console.log("我要发布")
				uni.navigateTo({
					url:'./publish'
				})
			},
			tapprovinceItem(index) {
				this.provinceCurrent = index;
			},
			tapcityItem(index) {
				this.cityCurrent = index;
			},
			tapresetregion() {
				this.provinceCurrent = 0;
				this.cityCurrent = 0;
				this.region = "不限地区";
				this.$refs.uDropdown.close();
			},
			tapsaveregion() {
				let province = this.provinceList[this.provinceCurrent];
				let city = this.cityList[this.cityCurrent];
				if (province == "不限" && city == "不限") {
					this.region = "不限地区";
					this.$refs.uDropdown.close();
					return;
				} else {
					this.region = province;
					this.$refs.uDropdown.close();
				}
			},
			priceCancel() {
				this.$refs.uDropdown.close();
			},
			pricesave() {
				if (this.minprice == "" || this.maxprice == "") {
					return uni.showToast({
						title: '请输入价格区间',
						icon: 'none'
					})
				}
			
				if (this.maxprice < this.minprice) {
					return uni.showToast({
						title: '最高价必须高于最低价',
						icon: 'none'
					})
				}
			
				let minprice = Number(this.minprice);
				let maxprice = Number(this.maxprice);
			
				this.price = minprice.toFixed(2) + '-' + maxprice.toFixed(2);
				this.$refs.uDropdown.close();
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
		margin-top: 20rpx;
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
	
	.dropmenu {
		background-color: #fff;
	
		.slot-content {
	
			.province {
				margin-top: 35rpx;
				display: flex;
				align-items: flex-start;
				padding: 0rpx 30rpx;
	
				.labelName {
					color: #999999;
					width: 100rpx;
					font-size: 30rpx;
				}
	
				.provinceList {
					flex: 1;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					color: #666666;
	
					.provinceItem {
						margin-left: 12rpx;
						margin-right: 12rpx;
						margin-bottom: 12rpx;
						font-size: 30rpx;
					}
				}
			}
	
			.city {
				display: flex;
				align-items: flex-start;
				padding: 0rpx 30rpx;
				margin-top: 15rpx;
	
				.labelName {
					color: #999999;
					width: 100rpx;
					font-size: 30rpx;
				}
	
				.cityList {
					flex: 1;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					color: #666666;
	
					.cityItem {
						margin-left: 12rpx;
						margin-right: 12rpx;
						margin-bottom: 12rpx;
						font-size: 30rpx;
					}
				}
			}
	
			.active {
				color: #2D6BDD;
				border: 1rpx solid #2D6BDD;
				padding: 5rpx 10rpx;
				border-radius: 6rpx;
			}
	
	
			.slotpriceCon {
				padding: 25rpx 20rpx;
	
				.labelName {
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
				}
	
				.priceinput {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 15rpx;
	
					.inputitem {
						width: 280rpx;
						height: 80rpx;
						background-color: #F3F3F3;
						border-radius: 15rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
					}
	
					.middleLine {
						width: 50rpx;
						height: 5rpx;
						background-color: #F3F3F3;
						border-radius: 2rpx;
					}
				}
	
				.tips {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #999999;
					margin-top: 15rpx;
				}
	
			}
	
			.slotbottomBar {
				display: flex;
				align-items: center;
				justify-content: space-between;
	
				.reset {
					width: 50%;
					line-height: 90rpx;
					text-align: center;
					background-color: #fff;
					color: #666666;
					font-size: 32rpx;
					border-top: 1rpx solid #C7C7C7;
				}
	
				.save {
					width: 50%;
					line-height: 90rpx;
					background-color: #FF9000;
					color: #fff;
					font-size: 32rpx;
					text-align: center;
					border-top: 1rpx solid #FF9000;
				}
			}
		}
	}
</style>
