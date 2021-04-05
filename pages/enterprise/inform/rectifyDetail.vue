<template>
	<view>
		<view class="nav">
			<view class="head">
				<view id="left" @click="clickBack">
					<image id="left" src="../../../static/enterprise/return.png"></image>
				</view>
				<view id="center">
					<text>详情</text>
				</view>
			</view>
		</view>
		
		<view class="body">
			<view class="rectangle"></view>
			<view class="body-up">
				<text id="title">{{informBody.title}}</text>
				<view class="tips">
					<text>发布人：{{informBody.publisher}}</text>
					<text>时间：{{informBody.publishTime}}</text>
				</view>
			</view>
			<text class="body-down">{{informBody.content}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				informBody:{},
			}
		},
		onLoad(option) {
			this.informBody = JSON.parse(option.obj)
			console.log(this.informBody)
		},
		methods:{
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nav{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		// z-index: -10;
		background-color: #2D6BDD;
		// padding-top: 36rpx;
		padding-top: 56rpx;
		padding-bottom: 56rpx;
		padding-left: 40rpx;
		padding-right: 76rpx;
		.head{
			height: 88rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			#left{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				image{
					width: 36rpx;
					height: 36rpx;
				}
			}
			#center{
				display: flex;
				align-items: center;
				flex: 1;
				justify-content: center;
				text{
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}
	}
	.body{
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0px 0px;
		padding-top: 49rpx;
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 218rpx;
		position: absolute;
		overflow: scroll;
		// top: 140rpx;
		top: 160rpx;
		left: 0;
		right: 0;
		bottom: 0;
		.rectangle{
			position: absolute;
			left: 0;
			width: 6rpx;
			height: 40rpx;
			background-color: #2D6BDD;
		}
		.body-up{
			display: flex;
			flex-direction: column;
			border-bottom: 1rpx solid #E9E9E9;
			padding-bottom: 34rpx;
			#title{
				font-size: 34rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
			.tips{
				margin-top: 27rpx;
				display: flex;
				text:nth-child(1){
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
					line-height: 42rpx;
					margin-right: 39rpx;
				}
				text:nth-child(2){
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
					line-height: 42rpx;
				}
			}
		}
		.body-down{
			display: block;
			margin-top: 37rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #333333;
			line-height: 52rpx;
		}
	}	
</style>
