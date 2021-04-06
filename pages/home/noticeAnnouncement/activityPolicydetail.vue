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
<!-- 					<view class="quotation">
						<text>{{quotation}}</text>
					</view> -->
<!-- 					<image src="../../../static/home/501004811.jpg" mode="aspectFill"></image> -->
					<u-parse :content="mainText" @navigate="navigate"></u-parse>
<!-- 					<text>{{mainText}}</text> -->
<!-- 					<view class="mainText">
						<u-parse :content="mainText" @navigate="navigate"></u-parse>
					</view> -->
				</view>
<!-- 				<view class="attachment">
					<view class="attachmentItem" v-for="(item,index) in attachmentItem" :key="index">
						<image src="../../../static/home/link.png"></image>
						<text>{{item.title}}</text>
					</view>
				</view> -->
			</view>
		</view>
		<view class="relatedDocuments">
			<view class="documentsTitle">
				<view class="documentsRectangle"></view>
				<view class="documentsTitleText">
					<text>相关文档</text>
				</view>
			</view>
			<view class="documentItem" v-for="(item,index) in relatedDocuments" :key="index"
				@click="toDetail(item.pkid)">
				<image src="../../../static/home/rectangle.png"></image>
				<text>{{item.title}}</text>
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
				title: "2020年长沙雨花经济开发区公开招聘党建指导员体检公告",
				info: {
					publisher: "赵汝杰",
					auditor: "李嘉城",
					time: "2020-12-02 22:49"
				},
				quotation: "2020年长沙雨花经济开发区公开招聘党建指导员，经网上报名、网络资格初审、笔试、资格审查、考核(面试)等程序，以下4人进入体检，现公告如下:",
				mainText: '一、进入体检人员名单\n具体名单见附件。\n\n二、体检时间、地点\n体检时间及地点另行通知，请考生保持通讯畅通。\n\n三、体检标准\n体检标准和有关要求参照《公务员体检通用标准(试行)》及《公务员录用体检操作手册(试行)》执行。\n\n四、注意事项\n1、请进入体检程序的考生近期保持通讯畅通。\n2、请考生携带本人有效身份证按时到达指定地点集合，由工作人员带领前往医院体检。未在规定时间到达集合地点的，视为自动放弃。',
				attachmentItem: [{
						title: "关于印发《长沙雨花经济开发区推动先进 制造业高质量发展扶植奖励办法》的通知.pdf ",

					},
					{
						title: "附表1奖项审核部门和联系人及联系方式.xls",
					},
					{
						title: "相关申报表格(1).xls",
					}
				],
				relatedDocuments: [{
						title: "关于2020年第二批中央预算内救灾应急补助资金安排方案的公示"
					},
					{
						title: "关于组织参加2020中部（长沙）人工智能产业博览会暨创新发展论坛的通知"
					},
					{
						title: "关于组织参加2020中部（长沙）人工智能产业博览会暨创新发展论坛的通知"
					}
				]
			}
		},
		onLoad(option) {
			let that = this
			console.log(option)
			request({
				url: '/announcement/govInformationDetail',
				data: {
					// pkid:option.pkid,
					pkid: 58
				}
			}).then(res => {
				console.log(res[1].data.data)
				let a = res[1].data.data
				that.title = a.title
				that.info.publisher = a.examine
				that.info.auditor = a.author
				that.info.time = a.pubdate
				that.quotation = a.note
				that.mainText = a.content
				that.relatedDocuments = a.relevant
			})
		},
		methods: {
			toDetail(pkid){
				uni.navigateTo({
					url: 'activityPolicydetail?pkid='+pkid
				})
			},
			clickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss">
	.zhanwei{
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

		.attachment {
			background: #EFF6FF;
			border-radius: 10rpx;
			margin: 30rpx 40rpx 40rpx 40rpx;
			padding: 5rpx 30rpx 36rpx 30rpx;

			.attachmentItem {
				display: flex;
				margin-top: 25rpx;
				align-items: center;
				line-height: 34rpx;

				image {
					width: 38rpx;
					height: 38rpx;
					flex-shrink: 0;
				}

				text {
					margin-left: 20rpx;
					color: #666666;
					font-size: 24rpx;
					font-weight: 400;
					font-family: MicrosoftYaHei;
				}
			}
		}
	}

	.relatedDocuments {
		border-top: 20rpx solid #eee;
		background: #FFFFFF;
		padding-bottom: 1rpx;

		.documentsTitle {
			display: flex;
			padding-top: 20rpx;
			margin-bottom: 30rpx;

			.documentsRectangle {
				background: #2D6BDD;
				width: 6rpx;
				height: 32rpx;
				margin-top: 4rpx;
			}

			.documentsTitleText {
				margin-left: 40rpx;
				line-height: 42rpx;

				text {
					font-size: 30rpx;
					color: #333333;
					font-weight: 400;
					font-family: SourceHanSansCN-Regular;
				}
			}
		}

		.documentItem {
			background: #FFFFFF;
			border-bottom: 1rpx solid #eee;
			margin: 0 40rpx 20rpx;
			padding-bottom: 30rpx;
			display: flex;
			line-height: 40rpx;

			image {
				margin-top: 12rpx;
				width: 16rpx;
				height: 16rpx;
			}

			text {
				font-size: 28rpx;
				color: #666666;
				font-family: SourceHanSansCN-Regular;
				font-weight: 400;
				margin-left: 10rpx;
			}
		}
	}
</style>
