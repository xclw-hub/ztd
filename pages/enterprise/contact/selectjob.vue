<template>
	<view>
		<uniNavBar status-bar="true" border="true" @clickLeft="clickBack">
			<view slot="left" class="uniNavBar_left">
				<image src="/static/login/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>选择职务</text>
			</view>
		</uniNavBar 
		<view class="content">
		<table width="100%" rules=rows>
			<view class="mainCon">
				<view class="search">
					<image @click="onsearch" class="img1" src="../../../static/home/search.png"></image>
					<input
					 type="text"
					 :placeholder="search_placeholder"
					 placeholder-class="placeholderStyle"
					 v-model.trim="keyword"
					 @focus="searchFocus"
					 @blur="searchBlue"/>
					 <image class="img2" @click="clearSearchContent" v-show="keyword!=''" src="../../../static/enterprise/cancel.png"></image>
				</view>
				<view class="listCon">
					<view class="cellItem" v-for="(item,index) in resultList" @click="tapsel(item)">
						{{item}}
					</view>
				</view>
			
			</view>
		</table>
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
				search_placeholder:'搜索职位名称',
				keyword: "",
				list: ["总经理（总裁）",
					"副总经理",
					"技术总监",
					"总经理助理",
					"运营总监",
					"生产总监",
					"销售总监",
					"市场总监（CMO）",
					"营销总监",
					"财务总监（CFO）",
					"人力资源总监",
					"其他"
				],
				resultList:[]
			}
		},
		onLoad() {
			this.resultList=this.list
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			searchFocus(){
				this.search_placeholder=''
			},
			searchBlue(){
				this.search_placeholder='搜索职位名称'
			},
			onsearch() {
				console.log('搜索了')
				let length = this.list.length
				this.resultList=[]
				for(let i=0;i<length;i++){
					if(this.list[i].indexOf(this.keyword)>=0){
						this.resultList.push(this.list[i])
					}
				}
			},
			clearSearchContent(){
				this.keyword=''
				this.resultList=this.list
			},
			tapsel(item) {
				uni.navigateBack({
					delta: 1
				})
				uni.$emit('zhiweiupdate', {
					item: item
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.uniNavBar_left image {
		width: 20rpx;
		height: 36rpx;
	}
	
	.uniNavBar_center {
		text-align: center;
	}
	
	.uniNavBar_center text {
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}

	.content {
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
	.search{
		margin-top: 30rpx;
		margin-left: 39rpx;
		margin-right: 39rpx;
		height: 72rpx;
		background: #F3F3F3;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		padding-left: 21rpx;
	}
	.img1{
		width: 30rpx;
		height: 30rpx;
		margin-right: 15rpx;
	}
	.img2{
		width: 30rpx;
		height: 30rpx;
		margin-left: auto;
		margin-right: 15rpx;
	}

	.listCon {
		padding: 40rpx;

		.cellItem {
			padding: 25rpx 0;
			border-bottom: 1rpx solid #E9E9E9;
			color: #333333;
			font-size: 30rpx;
		}
	}
</style>
