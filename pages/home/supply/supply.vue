<template>
	<view class="mainCon">
		<u-navbar height="60" back-icon-color="#fff" :title="null" :background="background">
			<view class="slot-wrap">
				<view class="search-wrap" @click="enterSearch">
					<u-search search-icon="../../../static/searchIcon.png" v-model="keyword" i :show-action="false"
						height="80" :action-style="{color: '#fff'}" shape="square" placeholder="请输入关键字搜索"></u-search>
				</view>
			</view>
			<view class="navrightCon">
				<div style="height: 16px;" @click="toLike">
					<image class="scan" src="../../../static/home/like.png" mode=""></image>
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
										<view class="provinceItem"
											:class="provinceCurrent.title==item.title?'active':''"
											v-for="(item,index) in provinceList" @click.stop="tapprovinceItem(item)">
											{{item.title}}
										</view>
									</view>
								</view>
								<view class="city">
									<view class="labelName">
										城市
									</view>
									<view class="cityList">
										<view class="cityItem" :class="cityCurrent.title==item.title?'active':''"
											v-for="(item,index) in cityList" @click.stop="tapcityItem(item)">
											{{item.title}}
										</view>
									</view>
								</view>
							</scroll-view>
							<view class="slotbottomBar">
								<view class="reset" @click="tapresetregion">
									取消
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
										<input type="number" placeholder="最低价" v-model="minPrice" />
									</view>
									<view class="middleLine">

									</view>
									<view class="inputitem">
										<input type="number" placeholder="最高价" v-model="maxPrice" />
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
				<view class="item" v-for="(item, index) in dataList" :key="index" @click="tapdetail(item.pkid)">
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
	import data from '@/components/shop_dropdown/data.js'; //筛选菜单数据
	import {
		request
	} from '../../../util/request.js'
	export default {
		components: {
			'HMfilterDropdown': HMfilterDropdown
		},
		data() {
			return {
				defaultSelected: [],
				filterData: [], //传入数据，具体数据格式，请下载示例查看
				keyword: "",
				background: {
					backgroundColor: '#2D6BDD',
				},
				region: "不限地区",
				price: "不限价格",
				provinceList: [{
					"pkid": 0,
					"title": "不限",
					"city": [{
						"pkid": 0,
						"title": "不限"
					}]
				}],
				cityList: [{
					"pkid": 0,
					"title": "不限"
				}],
				provinceCurrent: {
					"pkid": 0,
					"title": "不限",
					"city": [{
						"pkid": 0,
						"title": "不限"
					}]
				},
				cityCurrent: {
					"pkid": 0,
					"title": "不限"
				},
				minPrice: "",
				maxPrice: "",
				pageNumber: 1,
				dataList: []

			}
		},
		onReachBottom() {
			let that = this
			let _this = this 
			let province = this.provinceCurrent.title;
			let city = this.cityCurrent.title;
			if (province == "不限" && city == "不限") {
				this.region = "不限地区";
				let token = uni.getStorageSync('token');
				let minPrice = Number(this.minPrice);
				let maxPrice
				if (that.maxPrice == '') {
					maxPrice = 999999.99
				} else {
					maxPrice = Number(this.maxPrice);
				}
				console.log({
					token,
					type: that.$store.state.kind,
					page: that.pageNumber + 1,
					minPrice,
					maxPrice,
					keyword: that.keyword,
					memberId: that.$store.state.userInfo.parkId,
					companyId: that.$store.state.enterpriseInfo.parkId
				})
				if (that.$store.state.kind == '0') {
					request({
						url: '/supplyInformationList',
						data: {
							token,
							type: that.$store.state.kind,
							page: that.pageNumber + 1,
							companyId: that.$store.state.enterpriseInfo.parkId
						},
						
					}).then(res => {
						if (res[1].data.data.list.length != 0) {
							let length = that.dataList.length
							that.dataList.concat(res[1].data.data.list)
							console.log(that.dataList)
							let len = that.dataList.length
							for(let i = length -1;i<len;i++){
								that.dataList[i].pic = that.dataList[i].pic.split(',')
							}
							that.pageNumber++
						} else {
							console.log('没有更多内容了')
						}
					})
				} else {
					request({
						url: '/supplyInformationList',
						data: {
							token,
							type: that.$store.state.kind,
							page: that.pageNumber + 1,
							memberId: that.$store.state.userInfo.parkId,
							/* companyId: that.$store.state.enterpriseInfo.parkId */
						}
					}).then(res => {
						if (res[1].data.data.list.length != 0) {
							let length = that.dataList.length
							that.dataList.concat(res[1].data.data.list)
							console.log(that.dataList)
							let len = that.dataList.length
							for(let i = length -1;i<len;i++){
								that.dataList[i].pic = that.dataList[i].pic.split(',')
							}
							that.pageNumber++
						} else {
							console.log('没有更多内容了')
						}
					})
				}
				return;
			} else {
				if (city) {
					this.region = province + ' ' + city;
				} else {
					this.region = province;
				}
				let token = uni.getStorageSync('token');
				let minPrice = Number(this.minPrice);
				let maxPrice
				if (that.maxPrice == '') {
					maxPrice = 999999.99
				} else {
					maxPrice = Number(this.maxPrice);
				}
				console.log({
					token,
					type: that.$store.state.kind,
					page: that.pageNumber + 1,
					address: that.region,
					minPrice,
					maxPrice,
					keyword: that.keyword,
					memberId: that.$store.state.userInfo.parkId,
					companyId: that.$store.state.enterpriseInfo.parkId
				})
				if (that.$store.state.kind == '0') {
					request({
						url: '/supplyInformationList',
						data: {
							token,
							type: that.$store.state.kind,
							page: that.pageNumbe + 1,
							address: that.region,
							minPrice,
							maxPrice,
							keyword: that.keyword,
							companyId: that.$store.state.enterpriseInfo.parkId
						}
					}).then(res => {
						if (res[1].data.data.list.length != 0) {
							let length = that.dataList.length
							that.dataList.concat(res[1].data.data.list)
							console.log(that.dataList)
							let len = that.dataList.length
							for(let i = length -1;i<len;i++){
								that.dataList[i].pic = that.dataList[i].pic.split(',')
							}
							that.pageNumber++
						} else {
							console.log('没有更多内容了')
						}
					})
				} else {
					request({
						url: '/supplyInformationList',
						data: {
							token,
							type: that.$store.state.kind,
							page: that.pageNumber + 1,
							address: that.region,
							minPrice,
							maxPrice,
							keyword: that.keyword,
							memberId: that.$store.state.userInfo.parkId,
							companyId: that.$store.state.enterpriseInfo.parkId
						}
					}).then(res => {
						if (res[1].data.data.list.length != 0) {
							let length = that.dataList.length
							that.dataList.concat(res[1].data.data.list)
							console.log(that.dataList)
							let len = that.dataList.length
							for(let i = length -1;i<len;i++){
								that.dataList[i].pic = that.dataList[i].pic.split(',')
							}
							that.pageNumber++
						} else {
							console.log('没有更多内容了')
						}
					})
				}
			}
		},
		onLoad: function() {
			let that = this
			let token = uni.getStorageSync('token');
			this.pageNumber = 1
			let province = this.provinceCurrent.title;
			let city = this.cityCurrent.title;
			let minPrice = Number(this.minPrice);
				let maxPrice
				if (that.maxPrice == '') {
					maxPrice = 999999.99
				} else {
					maxPrice = Number(this.maxPrice);
				}
			if (province == "不限" && city == "不限") {
				this.region = "不限地区";
				console.log({
					token,
					type: that.$store.state.kind,
					page: that.pageNumber,
					minPrice,
					maxPrice,
					keyword: that.keyword,
					memberId: that.$store.state.userInfo.parkId,
					companyId: that.$store.state.enterpriseInfo.enterpriseId
				})
				if (that.$store.state.kind == '0') {
					request({
						url: '/supplyInformationList',
						data: {
							token,
							type: that.$store.state.kind,
							page: that.pageNumber,
							companyId: that.$store.state.enterpriseInfo.enterpriseId
						}
					}).then(res => {
						console.log(res[1].data.data)
						let gt = res[1].data.data
						that.dataList = gt.list
						let length = that.dataList.length
						for(let i = 0;i<length;i++){
							that.dataList[i].pic = that.dataList[i].pic.split(',')
						}
					})
				} else {
					request({
						url: '/supplyInformationList',
						data: {
							token,
							type: that.$store.state.kind,
							page: that.pageNumber,
							memberId: that.$store.state.id,/* 
							companyId: that.$store.state.enterpriseInfo.enterpriseId */
						}
					}).then(res => {
						console.log(res[1].data.data)
						let gt = res[1].data.data
						that.dataList = gt
						let length = that.dataList.length
						for(let i = 0;i<length;i++){
							that.dataList[i].pic = that.dataList[i].pic.split(',')
						}
					})
				}
			}
			request({
				url: '/supplyAddressList',
				data: {
					token,
					type: that.$store.state.kind
				},
			}).then(res => {
				let gt = res[1].data.data
				let index
				for (index in gt) {
					that.provinceList.push(gt[index])
				}
			})
		},
		methods: {
			toLike() {
				uni.navigateTo({
					url: './like'
				})
			},
			enterSearch() {
				uni.navigateTo({
					url: 'search'
				})
			},
			//接收菜单结果
			confirm(e) {
				this.indexArr = e.index;
				this.valueArr = e.value;

			},
			tapdetail(pkid) {
				console.log(pkid)
				uni.navigateTo({
					url: './supplydetail?supplyId=' + pkid
				})
			},
			publish() {
				// console.log("我要发布")
				uni.navigateTo({
					url: './publish'
				})
			},
			tapprovinceItem(item) {
				let that = this
				that.provinceCurrent = item;
				that.cityList = item.city
				if (that.provinceCurrent.title == '不限') {
					that.cityCurrent = {
						"pkid": 0,
						"title": "不限"
					}
				}
				if (that.cityList.length == 0) {
					that.cityCurrent = {}
				}
			},
			tapcityItem(item) {
				let that = this
				that.cityCurrent = item;
			},
			tapresetregion() {
				this.provinceCurrent = {
					"pkid": 0,
					"title": "不限",
					"city": [{
						"pkid": 0,
						"title": "不限"
					}]
				};
				this.cityCurrent = {
					"pkid": 0,
					"title": "不限"
				};
				this.cityList = [{
					"pkid": 0,
					"title": "不限"
				}]
				this.region = "不限地区";
				this.$refs.uDropdown.close();
			},
			tapsaveregion() {
				this.pageNumber = 1
				let that = this
				let province = this.provinceCurrent.title;
				let city = this.cityCurrent.title;
				if (province == "不限" && city == "不限") {
					this.region = "不限地区";
					let token = uni.getStorageSync('token');
					let minPrice = Number(this.minPrice);
				let maxPrice
				if (that.maxPrice == '') {
					maxPrice = 999999.99
				} else {
					maxPrice = Number(this.maxPrice);
				}
					console.log({
						token,
						type: that.$store.state.kind,
						page: that.pageNumber,
						minPrice,
						maxPrice,
						keyword: that.keyword,
						memberId: that.$store.state.id,
						companyId: that.$store.state.enterpriseInfo.enterpriseId
					})
					if (that.$store.state.kind == '0') {
						request({
							url: '/supplyInformationList',
							data: {
								token,
								type: that.$store.state.kind,
								page: that.pageNumber,
								minPrice,
								maxPrice,
								keyword: that.keyword,
								companyId: that.$store.state.enterpriseInfo.enterpriseId
							}
						}).then(res => {
							console.log(res[1].data.data)
							let gt = res[1].data.data
							that.dataList = gt.list
							let length = that.dataList.length
							for(let i = 0;i<length;i++){
								that.dataList[i].pic = that.dataList[i].pic.split(',')
							}
						})
					} else {
						request({
							url: '/supplyInformationList',
							data: {
								token,
								type: that.$store.state.kind,
								page: that.pageNumber,
								minPrice,
								maxPrice,
								keyword: that.keyword,
								memberId: that.$store.state.id,
								companyId: that.$store.state.userInfo.enterpriseId
							}
						}).then(res => {
							console.log(res[1].data.data)
							let gt = res[1].data.data
							that.dataList = gt
							let length = that.dataList.length
							for(let i = 0;i<length;i++){
								that.dataList[i].pic = that.dataList[i].pic.split(',')
							}
						})
					}
					this.$refs.uDropdown.close();
					return;
				} else {
					if (city) {
						this.region = province + ' ' + city;
					} else {
						this.region = province;
					}
					let token = uni.getStorageSync('token');
					let minPrice = Number(this.minPrice);
				let maxPrice
				if (that.maxPrice == '') {
					maxPrice = 999999.99
				} else {
					maxPrice = Number(this.maxPrice);
				}
					console.log({
						token,
						type: that.$store.state.kind,
						page: that.pageNumber,
						address: that.region,
						minPrice,
						maxPrice,
						keyword: that.keyword,
						memberId: that.$store.state.id,
						companyId: that.$store.state.userInfo.enterpriseId
					})
					if (that.$store.state.kind == '0') {
						request({
							url: '/supplyInformationList',
							data: {
								token,
								type: that.$store.state.kind,
								page: that.pageNumber,
								address: that.region,
								minPrice,
								maxPrice,
								keyword: that.keyword,
								companyId: that.$store.state.enterpriseInfo.enterpriseId
							}
						}).then(res => {
							console.log(res[1].data.data)
							let gt = res[1].data.data
							that.dataList = gt.list
							let length = that.dataList.length
							for(let i = 0;i<length;i++){
								that.dataList[i].pic = that.dataList[i].pic.split(',')
							}
						})
					} else {
						request({
							url: '/supplyInformationList',
							data: {
								token,
								type: that.$store.state.kind,
								page: that.pageNumber,
								address: that.region,
								minPrice,
								maxPrice,
								keyword: that.keyword,
								memberId: that.$store.state.id,
								companyId: that.$store.state.userInfo.enterpriseId
							}
						}).then(res => {
							console.log(res[1].data.data)
							let gt = res[1].data.data
							that.dataList = gt
							let length = that.dataList.length
							for(let i = 0;i<length;i++){
								that.dataList[i].pic = that.dataList[i].pic.split(',')
							}
						})
					}
					this.$refs.uDropdown.close();
				}
			},
			priceCancel() {
				let that = this
				that.minPrice=''
				that.maxPrice=''
				this.price='不限价格'
				this.$refs.uDropdown.close();

			},
			pricesave() {
				if (this.minPrice == "" || this.maxPrice == "") {
					return uni.showToast({
						title: '请输入价格区间',
						icon: 'none'
					})
				}

				if (this.maxPrice < this.minPrice) {
					return uni.showToast({
						title: '最高价必须高于最低价',
						icon: 'none'
					})
				}
				let minPrice = Number(this.minPrice);
				if(this.maxPrice==''){
					this.price = minPrice.toFixed(2) + '-' + maxPrice;
				}else{
					let maxPrice = Number(this.maxPrice);
					this.price = minPrice.toFixed(2) + '-' + maxPrice.toFixed(2);
				}
				this.$refs.uDropdown.close();
			},
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
