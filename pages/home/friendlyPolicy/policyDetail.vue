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
			<view class="description">
				<text class="title">{{policy.title}}</text>
				<view class="flag">
					<text>时间：{{policy.time}}</text>
					<text>{{policy.serialNumber}}</text>
				</view>
			</view>
			<view class="content">
				<!-- <text>{{policy.content}}</text> -->
				<rich-text :nodes="policy.content"></rich-text>
				<text>附件：{{policy.attachment}}</text>
				<text>{{policy.publisher}}</text>
			</view>
			<view class="attachment">
				<view class="img">
					<image src="../../../static/home/file.png"></image>
				</view>
				<text>{{policy.attachment}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				policy:{
					title:'',
					time:'',
					serialNumber:'',
					content:'',
					attachment:'',
					publisher:''
					/* 
					title:`国家发展改革委办公厅 关于2020年生物质发
电补贴项目申报结果的通知
`,
					time:'2020-12-02',
					serialNumber:'发改办能源〔2020〕865号',
					content:`各省、自治区、直辖市发展改革委、能源局，新疆生产建设兵团发展改革委：

根据《完善生物质发电项目建设运行的实施方案》（发改能源〔2020〕1421号）(以下简称《实施方案》)，在各省（区、市）组织申报、审核、公示的基础上，国家发展改革委、国家能源局组织开展了统一复核、汇总排序工作。现将2020年生物质发电中央补贴项目申报结果及有关要求通知如下：

 一、遵循公平、公正原则，经委托国家可再生能源信息管理中心对各省（区、市）通过审核、公示无异议的项目进行复核、汇总排序，拟将河北、山西等20个省（区、市）的77个项目纳入2020年生物质发电中央补贴规模，总装机容量171.4万千瓦，纳入补贴范围的项目所需补贴总额已达到2020年中央新增补贴资金额度15亿元。

二、按照《实施方案》有关要求，新增项目补贴额度累计达到中央补贴资金总额后，地方当年不再新核准需中央补贴的项目，企业据此合理安排项目建设时序。
`,
					attachment:`2020年生物质发电中央补贴项目申报结果`,
					publisher:`
					国家发展改革委办公厅
国家能源局综合司
2020年11月17日`
				 */}
			};
		},
		onLoad(option){
			let _this = this
			console.log('policyId')
			console.log(option.policyId)
			_this.$request({
				url:'/preferentialPolicies/Detail',
				data:{
					'policyId':option.policyId
				}
			}).then(res =>{
				console.log('policyDetail')
				console.log(res[1].data)
				let data = res[1].data
				_this.policy.title = data.title
				_this.policy.serialNumber=data.serialNumber
				_this.policy.content=data.content
				_this.policy.attachment=data.appendix
				_this.policy.publisher=data.source
				_this.policy.time=_this.parseTime(data.publicTime)
			}).catch(err =>{
				console.log(err)
			})
		},
		methods:{
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			parseTime(timestamp){
				let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
	
				let strDate = Y+M+D;
				console.log(strDate) //2020-05-08
				return strDate;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav{
		background-color: #2D6BDD;
		// padding-top: 36rpx;
		padding-top: 56rpx;
		padding-bottom: 56rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: -10;
		.head{
			height: 88rpx;
			display: flex;
			flex-direction: row;
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
				margin-right: 36rpx;
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
		position: absolute;
		overflow: scroll;
		// top: 140rpx;
		top: 160rpx;
		bottom: 0;
		padding-bottom: 47rpx;
		// position: relative;
		// top:-48rpx;
		.description{
			display: flex;
			flex-direction: column;
			border-bottom: 1rpx solid #BEBEBE;
			padding-bottom: 34rpx;
			.title{
				font-size: 34rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
			.flag{
				margin-top: 16rpx;
				text{
					font-size: 24rpx;
					font-family: Arial;
					font-weight: 400;
					color: #999999;
					line-height: 42rpx;
				}
			}
			.flag text:nth-child(1){
				margin-right: 40rpx;
			}
		}
		.content{
			padding-top: 37rpx;
			display: flex;
			flex-direction: column;
			text{
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333333;
				line-height: 52rpx;
			}
			text:nth-child(2){
				color: #999999;
			}
		}
		.attachment{
			margin-top: 44rpx;
			// height: 94rpx;
			background: #EFF6FF;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			padding-left: 26rpx;
			padding-top: 26rpx;
			padding-bottom: 26rpx;
			.img{
				height: 38rpx;
				width: 38rpx;
				margin-right: 18rpx;
				image{
					height: 38rpx;
					width: 38rpx;
				}
			}
			text{
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #666666;
				line-height: 34rpx;
			}
		}
	}
</style>
