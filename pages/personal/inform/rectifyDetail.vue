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
				informBody:{
					title:'2021年2月11日消防检测结果整改通知',
					publisher:'赵汝杰',
					publishTime:'2020-12-02 22:49',
					content:`长沙市九州仓储服务有限公司：

　　依照《中华人民共和国消防法》，我司消防安全管理人员于2020年12月02日对你单位：国投大厦C座001室进行了消防安全监督检查。发现存在下述违反消防法规的行为：

　　1、将室内消火栓进行封堵。

　　2、未按规定安装消防应急照明系统。

　　3、未按规定安装应急疏散指引标识。

　　4、未安规定配备相应的灭火器材。

　　以上行为违反《中华人民共和国消防法》第10、12、21、条的规定，已构成火灾隐患，依据《消防法》第二十五条规定，责令你单位在X年X月X日前整改完毕，否则我司将实施处罚。

　　在此期间你单位应当采取措施，防止发生火灾。

　　xx物业管理有限公司

　　XX年XX月XX日`
				}
			};
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
