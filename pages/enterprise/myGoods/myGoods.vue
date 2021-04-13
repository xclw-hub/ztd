<template>
	<view class="mainCon">
		<u-navbar height="60" back-icon-color="#fff" :title="null" :background="background">
			<view class="slot-wrap">
				<view class="search-wrap" @click="enterSearch">
					<u-search search-icon="../../../static/searchIcon.png" v-model="keyword" i :show-action="false" height="80"
					 :action-style="{color: '#fff'}" shape="square" placeholder="请输入关键字搜索"></u-search>
				</view>
			</view>
		</u-navbar>
		<view class="listCon">
			<view class="item" v-for="(item, index) in goodsList" :key='index' @click="tapdetail(index)">
				<image class="goodsimg" :src="item.pic[0]"
				 mode=""></image>
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
		<view style="height: 200rpx;text-align: center;color: #AAAAAA;font-size: 33rpx;" v-if="goodsList.length!=0">
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
				goodsList:[],
				keyword: "",
				background: {
					backgroundColor: '#2D6BDD',
				},
				page:1,
				token:''
			}
		},
		onShow() {
			this.page=1
			this.getSupplyInformationList()
		},
		onLoad() {
			this.token = uni.getStorageSync('token');
			this.page=1
			this.getSupplyInformationList()
		},
		onReachBottom() {
			this.page+=1
			this.getSupplyInformationList()
		},
		methods: {
			// onNavigationBarButtonTap(e) {
			// 	console.log("success")		
			// },
			tapdetail(index) {
				uni.navigateTo({
					url: './goodsdetail?supplyId='+this.goodsList[index].pkid
				})
			},
			enterSearch() {
				uni.navigateTo({
					url: 'search'
				})
			},
			publish(){
				// console.log("我要发布")
				uni.navigateTo({
					url:'./publish'
				})
			},
			getSupplyInformationList(){
				let _this = this
				if(_this.$store.state.kind == 0){
					_this.$request({
						url:'/supplyInformationList',
						data:{
							token:_this.token,
							type:_this.$store.state.kind,
							page:_this.page,
							companyId:_this.$store.state.id
						}
					}).then(res =>{
						console.log('supplyInformationList')
						console.log(res[1].data.data)
						let gt = res[1].data.data
						let len = _this.goodsList.length
						if(len == 0){
							_this.goodsList = gt.list
						}else{
							_this.goodsList.concat(gt.list)
						}
						let length = _this.goodsList.length
						for(let i = len;i<length;i++){
							_this.goodsList[i].pic = _this.goodsList[i].pic.split(',')
							_this.goodsList[i].price = Number(_this.goodsList[i].price).toFixed(2);
						}
						console.log(_this.goodsList)
					}).catch(err =>{
						console.log(err)
					})
				}else{
					_this.$request({
						url:'/supplyInformationList',
						data:{
							token:_this.token,
							type:_this.$store.state.kind,
							page:_this.page,
							memberId:_this.$store.state.id,
							companyId:_this.$store.state.userInfo.enterpriseId
						}
					}).then(res =>{
						console.log('supplyInformationList')
						console.log(res[1].data.data)
						let gt = res[1].data.data
						let len = _this.goodsList.length
						if(len == 0){
							_this.goodsList = gt.list
						}else{
							_this.goodsList.concat(gt.list)
						}
						let length = _this.goodsList.length
						for(let i = len;i<length;i++){
							_this.goodsList[i].pic = _this.goodsList[i].pic.split(',')
							_this.goodsList[i].price = Number(_this.goodsList[i].price).toFixed(2);
						}
						console.log(_this.goodsList)
					}).catch(err =>{
						console.log(err)
					})
				}
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
