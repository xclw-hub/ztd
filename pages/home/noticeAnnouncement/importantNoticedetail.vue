<template>
	<view>
		<uniNavBar status-bar="true" backgroundColor="#2D6BDD" @clickLeft="clickBack">
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>详情</text>
			</view>
		</uniNavBar>
		<view class="zhanwei">
			<view class="activityPolicydetail">
				<view class="title">
					<view class="rectangle"></view>
					<view class="titleText">
						<text>{{title}}</text>
					</view>
				</view>
				<view class="info">
					<text>发布人：{{info.publisher}}</text>
					<text>审核人:{{info.auditor}}</text>
					<text>时间：{{info.time}}</text>
				</view>
				<view class="content">
					<!-- 				<view class="quotation">
								<rich-text>{{quotation}}</rich-text>
								<text>{{quotation}}</text>
							</view> -->
					<!-- 				<image src="../../../static/home/501004811.jpg" mode="aspectFill"></image> -->
					<view class="mainText">
						<u-parse :content="mainText" @navigate="navigate"></u-parse>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import {
		request
	} from '../../../util/request.js'
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				title: "",
				info: {
					publisher: "",
					auditor: "",
					time: ""
				},
				quotation: "",
				mainText: '',
			}
		},
		onLoad(option) {
			let that = this
			console.log(option)
			request({
				url: '/announcement/govNoticeDetail',
				data: {
					pkid:option.pkid,
				}
			}).then(res => {
				console.log(res[1].data.data)
				let a = res[1].data.data
				that.title = a.title
				that.info.publisher = a.examine
				that.info.auditor = a.author
				that.info.time = a.pubdate
				that.mainText = a.content
				that.relatedDocuments = a.relevant
			})
			request({
				url: '/announcement/feedbackGovNoticeRead',
				data: {
					// pkid:option.pkid,
					// userId:58,
					userId:that.$store.state.id,
					userType:that.$store.state.kind,
					govNoticeId: option.pkid,
					// govNoticeId: 7
				}
			}).then(res=>{
				console.log(res)
			})
			
		},
		methods: {
			clickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.zhanwei {
		background-color: #2D6BDD;
	}

	.uniNavBar_left {
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 36rpx;
			height: 36rpx;
		}
	}

	.uniNavBar_center {
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}

	.activityPolicydetail {
		border-radius: 30rpx 30rpx 0 0;
		background: #FFFFFF;
		padding-bottom: 1rpx;

		.title {
			display: flex;
			padding-top: 48rpx;

			.rectangle {
				background: #2D6BDD;
				width: 6rpx;
				height: 42rpx;
			}

			.titleText {
				padding: 0 40rpx;

				text {
					font-size: 34rpx;
					font-family: SourceHanSansCN-Regular;
					font-weight: 400;
					color: #333333;
				}
			}
		}

		.info {
			padding: 20rpx 40rpx;
			line-height: 42rpx;

			text {
				color: #999999;
				font-weight: 400;
				font-family: MicrosoftYaHei;
				font-size: 24rpx;
			}

			text:nth-child(2) {
				margin-left: 30rpx;
			}

			text:nth-child(3) {
				margin-left: 30rpx;
			}
		}

		.content {
			margin: 0 40rpx;
			padding-bottom: 50rpx;
			border-top: 1rpx solid #eee;

			.quotation {
				background: #FFFFFF;
				padding-top: 20rpx;
				line-height: 52rpx;

				text {
					font-size: 28rpx;
					font-weight: 400;
					color: #333333;
				}
			}

			image {
				margin-top: 23.5rpx;
				margin-bottom: 26.5rpx;
				width: 670rpx;
				height: 290rpx;
			}

			.mainText {
				font-size: 28rpx;
				font-weight: 400;
				font-family: MicrosoftYaHei;
				line-height: 52rpx;
				color: #333333;
			}
		}
	}
</style>
