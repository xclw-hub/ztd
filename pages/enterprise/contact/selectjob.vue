<template>
	<view class="mainCon">
		<view class="searchBar">
			<u-search @search="onsearch" height="80" placeholder="搜索职务名称" v-model="keyword" shape="square"
				:show-action="false"></u-search>
		</view>
		<view class="listCon">
			<view class="cellItem" v-for="(item,index) in list" @click="tapsel(item)">
				{{item}}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				list: ["总经理（总裁）", "副总经理", "人力资源总监", "财务总监", "营销总监", "总经理（总裁）", "副总经理", "人力资源总监", "财务总监", "营销总监", "总经理（总裁）",
					"副总经理", "人力资源总监", "财务总监", "营销总监"
				]
			}
		},
		methods: {
			onsearch() {
				console.log('搜索了')
			},
			tapsel(item){
				uni.navigateBack({
					delta:1
				})
				 uni.$emit('zhiweiupdate',{item:item});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.searchBar {
		padding: 20rpx;
	}

	.listCon {
		padding: 20rpx;

		.cellItem {
			padding: 25rpx 0;
			border-bottom: 1rpx solid #E9E9E9;
			color: #333333;
			font-size: 30rpx;
		}
	}
</style>
