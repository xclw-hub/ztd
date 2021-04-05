<template>
	<view>
<!-- 		<uniNavBar
			status-bar="true"
			backgroundColor="#2D6BDD"
			@clickLeft="clickBack"
		>
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>详情</text>
			</view>
		</uniNavBar> -->
		<view class="title">
			<text>{{title}}</text>
		</view>
		<view class="info">
			<image src ='../../../static/enterprise/clock.png' mode="heightFix"></image>
			<text>{{info}}</text>
		</view>
		<view class="quotation">
			<text>{{quotation}}</text>
		</view>
		<view class="content">
			<text>{{content}}</text>
		</view>
		<view class="label">
			<text>{{label}}</text>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		components:{
			uniNavBar
		},
		data(){
			return{
				title:"废旧塑料进口渠道关闭 塑料制品生产走向自力更生",
				info:"2019/02/27",
				quotation:"日前，国家发展改革委、生态环境部发布了新版“限塑令”——《关于进一步加强塑料污染治理的意见》，全面禁止废塑料进口。与此同时，随着国内垃圾分类政策的实施，国内塑料生产强调“自力更生”，在可回收废物中分拣的废塑料回收比率料将上升，将在一定程度上填补国外废塑料进口缺口。",
				content:"日前，国家发展改革委、生态环境部发布了新版“限塑令”—《关于进一步加强塑料污染治理的意见》，全面禁止废塑料进口。与此同时，随着国内垃圾分类政策的实施，国内塑料生产强调“自力更生”，在可回收废物中分拣的废塑料回收比率料将上升，将在一定程度上填补国外废塑料进口缺口。业内人士分析认为，这一张一弛，或对我国环境保护、促进废塑料行业持续发展起到推动作用。\n\n废旧塑料进口渠道关闭\n\n中国塑料加工工业协会理事长朱文玮指出，现代经济社会对塑料的需求巨大，而大部分塑料具有可再生性，我国每年使用的回收利用废塑料3000万吨左右，占塑料消费量的30%以上。其中，EPS塑料（可发性聚苯乙烯）的回收率在90%左右。\n\n正因中国市场的巨大需求，过去20年，国外废弃物大量涌向中国，破坏了我国的生态环境。为此，中国向世界宣布将不再接受废弃塑料等24种进口固体废弃物，禁令在2018年1月生效，随后生态环境部多次调整禁止进口固体废物目录，自此切断了从国外进口废塑料的路径。\n\n国内塑料制品产量的变化与废塑料进口息息相关，随着禁止废塑料进口的政策趋严，导致塑料制品的产量大幅下降，从2017下半年开始，中国塑料制品产量梯次回落，到2018年有6个月份产量负增长，当年产量同比下降19.6%。\n\n到了2019年，国内塑料制品产量再次恢复增长，达到8184.17万吨，同比增长35.5%。业内专家分析，增量一部分来自新材料市场，包括改性塑料、塑料合金、可降解塑料等；另一部分来自国内废塑料回收市场重新活跃。\n",
				label:"本文为金智创新原创，欢迎转载，转载请标明出处，违者必究！"
			}
		},
		methods:{
			clickBack(){
				uni.navigateBack({
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.title{
		padding: 45rpx 40rpx 20rpx 40rpx;
		line-height: 50rpx;
		text{
			font-family: SourceHanSansCN-Medium;
			font-size: 38rpx;
			font-weight: 500;
			color: #444444;
		}
	}
	.info{
		padding: 0 40rpx 20rpx 40rpx;
		display: flex;
		line-height: 24rpx;
		image{
			width: 24rpx;
			height: 24rpx;
		}
		text{
			padding-left: 5rpx;
			font-size: 26rpx;
			font-weight: 400;
			font-family: ArialMT;
			color: #999999;
		}
	}
	.quotation{
		margin: 0rpx 40rpx 10rpx 40rpx;
		padding: 30rpx;
		background: #F2F5FB;
		border-left: 5rpx solid #B9C7E0;
		line-height: 42rpx;
		text{
			color: #666666;
			font-size: 26rpx;
			font-weight: 400;
			font-family: SourceHanSansCN-Regular;
		}
	}
	.content{
		padding: 20rpx 40rpx 0 40rpx;
		line-height: 48rpx;
		text{
			font-size: 30rpx;
			font-weight: 400;
			font-family: SourceHanSansCN-Regular;
			color: #333333;
		}
	}
	.label{
		padding: 40rpx;
		line-height: 42rpx;
		text{
			font-size: 28rpx;
			font-weight: 400;
			font-family: SourceHanSansCN-Regular;
			color: #999999;
		}
	}
</style>
