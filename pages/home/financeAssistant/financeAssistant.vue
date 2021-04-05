<template>
	<view :class="isShowDiagnosis==true?'nos':''">
		<uniNavBar status-bar="true" backgroundColor="#2D6BDD" @clickLeft="clickBack">
			<view slot="left" class="uniNavBar_left">
				<image src="/static/enterprise/return.png"></image>
			</view>
			<view slot="center" class="uniNavBar_center">
				<text>融资助手</text>
			</view>
			<view slot="right" class="uniNavBar_right">
				<text>查看反馈</text>
			</view>
		</uniNavBar>
		<view class="tabCon">
			<view class="tabItem" :class="tabCurrent==index?'active':''" v-for="(item,index) in tabList" :key='index' @click="tapchange(index)">
				{{item}}
			</view>
		</view>
		<view style="height: 40rpx;">
			
		</view>
		<view class="listCon">
			<view class="listItem" v-for="(item,index) in 10" :key='index' @click="toDetail">
				<view class="leftCon">
					<view class="title">
						国内OLED发展两大阻碍因素：产能和良品率
					</view>
					<view class="desc">
						国内OLED技术发展水平正逐步提升，但仍存在两大制约发展的因素：产能和良品率。良品率低是导致OLED价格居高不下的主要因素，也因为良品率低导致产线产能无法扩大，不能满足下游厂商的需求，进而影响公司发展。
					</view>
					<view class="date">
						2019/02/27
					</view>
				</view>
				<view class="rightCon">
					<image src="https://img.36krcdn.com/20200410/v2_86bbf8245f754be79f3386a82b385093_img_000" mode=""></image>
				</view>
			</view>
		</view>
		<view class="searchFinance" @click="find">
			<image src="../../../static/home/zhaorongzi.png"></image>
			<text>找融资</text>
		</view>
		<!-- 遮罩层 -->
		<view class="mask" v-if="isShowDiagnosis"></view>
		
		<view class="diagnosis" v-if="isShowDiagnosis">
			<view class="diagnosis-title">
				<text>融资需求</text>
			</view>
			<view class="diagnosis-name">
				<view class="diagnosis-name-img">
					<image src="../../../static/home/diagnosis_name.png"></image>
				</view>
				<input
					type="text" 
					:placeholder="name_placeholder"
					placeholder-class="placeholderStyle"
					v-model="diagnosis_name"
					@focus="nameFocus"
					@blur="nameBlue"/>
			</view>
			
			<view class="diagnosis-phone">
				<view class="diagnosis-phone-img">
					<image src="../../../static/home/diagnosis_name.png"></image>
				</view>
				<input
					type="text" 
					:placeholder="phone_placeholder"
					placeholder-class="placeholderStyle"
					v-model="diagnosis_phone"
					@focus="phoneFocus"
					@blur="phoneBlue"/>
			</view>
			<view class="method">
				<view class="diagnosis-phone-img">
					<image src="../../../static/home/method.png"></image>
				</view>
               <picker @change="bindPickerChange" :value="index" :range="array" @click="changeFirst">
					<view class="zan" v-if="isFirst">希望融资的方式</view>
					<view class="uni-input" v-if="!isFirst">{{array[index]}}</view>
				</picker>
				<view class="diagnosis-phone-img">
				<image src="../../../static/home/down.png" mode="aspectFit"></image>
				</view>
			</view>
			<textarea 
					class="diagnosis-need"
					:placeholder="need_placeholder"
					placeholder-class="placeholderStyle"
					v-model="diagnosis_need"
					@focus="needFocus"
					@blur="needBlue">
			</textarea>
			
			<view class="diagnosis-btn">
				<view class="diagnosis-btn-left" @click="clickCancel">
					<text>取消</text>
				</view>
				<view class="diagnosis-btn-right" @click="clickConfirm">
					<text>确定</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				tabList: ["智能制造", "机器人", "人工智能", "5G"],
				tabCurrent: 0,
				isFind: false,
				isShowDiagnosis:false,
				isFirst:true,
				diagnosis_phone: '',
				name_placeholder:'您的姓名',
				phone_placeholder:'您的联系方式',
				need_placeholder:'融资需求说明',
				diagnosis_name:'',
				diagnosis_phone:'',
				diagnosis_need:'',
				array: ['股权融资', '技术融资', '政策融资', '银行融资'],
				index: 0,
				options: ['股权融资', '技术融资', '政策融资', '银行融资'],
			}
		},
		methods: {
			clickBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			find() {
				// this.isFind=true
				this.isShowDiagnosis=true;
			},
			toDetail(){
				console.log('asd')
				uni.navigateTo({
					url:'./financeAssistantDetail'
				})
			},
			tapchange(index) {
				this.tabCurrent = index
			},
			clickCancel(){
				console.log('取消')
				this.isShowDiagnosis=false
				this.isFirst=true
			},
			clickConfirm(){
				console.log('确定')
				this.isShowDiagnosis=false
				this.isFirst=true
			},
			changeFirst(){
				this.isFirst=false
			},
			   bindPickerChange(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.index = e.target.value
			        },
		}
	}
</script>

<style lang="scss" scoped>
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

	.uniNavBar_right {
		display: flex;
		align-items: center;
		justify-content: center;

		text {
			font-family: SourceHanSansCN-Regular;
			font-weight: 400;
			color: #FFFFFF;
			font-size: 28rpx;
		}
	}

	.tabCon {
		width: 100%;
		position: fixed;
		display: flex;
		height: 80rpx;
		z-index: 999;

		.tabItem {
			background: #F5F5F5;
			height: 80rpx;
			width: 100%;
			color: #666666;
			font-size: 32rpx;
			position: relative;
			border-bottom: 1rpx solid #D0D0D0;
			text-align: center;
			line-height: 80rpx;
		}

		.active {
			color: #2D6BDD;
			border-bottom: 4rpx solid #2D6BDD;
		}

	}

	.listCon {
		padding: 40rpx;
		width: 100%;
		box-sizing: border-box;

		.listItem {
			display: flex;
			width: 100%;
			height: 180rpx;
			margin-bottom: 40rpx;

			.leftCon {
				box-sizing: border-box;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				height: 180rpx;
				padding-right: 10rpx;

				.title {
					font-size: 30rpx;
					color: #333333;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.desc {
					width: 420rpx;
					color: #777777;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.date {
					color: #999999;
					font-size: 22rpx;
				}
			}

			.rightCon {
				margin-left: 10rpx;
				margin-top: 15rpx;

				image {
					width: 220rpx;
					height: 160rpx;
				}
			}
		}
	}

	.searchFinance {
		margin: 40rpx;
		margin-top: -25rpx;
		border-radius: 10rpx;
		background: #2D6BDD;
		height: 84rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 0;
		width: 670rpx;

		image {
			width: 34rpx;
			height: 34rpx;
			margin-right: 7.5rpx;
		}

		text {
			margin-left: 7.5rpx;
			color: #FFFFFF;
			font-size: 34rpx;
			line-height: 26rpx;
			font-family: SourceHanSansCN-Regular;
		}
	}

	.mask{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index:20;
		background-color: rgba(0, 0, 0, 0.4);
		transition: opacity 0.3s;
	}
	.diagnosis{
		
		position:fixed;
		top:50%;
		left:50%;
		transform:translateX(-50%) translateY(-50%);
		-ms-transform::translateX(-50%) translateY(-50%);
		-moz-transform::translateX(-50%) translateY(-50%);
		-webkit-transform::translateX(-50%) translateY(-50%);
		-o-transform::translateX(-50%) translateY(-50%);
		z-index: 30;
		background: #FFFFFF;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		// align-items: center;
		padding-top: 39rpx;
		padding-bottom: 57rpx;
		padding-left: 48rpx;
		padding-right: 48rpx;
		.diagnosis-title{
			display: flex;
			justify-content: center;
			text{
				font-size: 38rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
		}
		.diagnosis-tips{
			margin-top: 36rpx;
			font-size: 24rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #999999;
			line-height: 38rpx;
		}
		.diagnosis-name{
			margin-top: 38rpx;
			height: 84rpx;
			width: 100%;
			border: 1rpx solid #AAAAAA;
			border-radius: 10rpx;
			padding-left: 23rpx;
			display: flex;
			align-items: center;
			.diagnosis-name-img{
				display: flex;
				justify-content: flex-start;
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
				image{
					width: 28rpx;
					height: 28rpx;
				}
			}
			input{
				display: flex;
				flex: 1;
			}
		}
		.diagnosis-phone{
			margin-top: 38rpx;
			height: 84rpx;
			width: 100%;
			border: 1rpx solid #AAAAAA;
			border-radius: 10rpx;
			padding-left: 23rpx;
			display: flex;
			align-items: center;
			.diagnosis-phone-img{
				display: flex;
				justify-content: flex-start;
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
				image{
					width: 28rpx;
					height: 28rpx;
				}
			}
			input{
				display: flex;
				flex: 1;
			}
		}
		.method {
			margin-top: 38rpx;
			height: 84rpx;
			width: 100%;
			border: 1rpx solid #AAAAAA;
			border-radius: 10rpx;
			padding-left: 23rpx;
			display: flex;
			align-items: center;
			.diagnosis-phone-img{
				display: flex;
				justify-content: flex-start;
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
				image{
					width: 28rpx;
					height: 28rpx;
				}
			}
			picker{
				display: flex;
				flex: 1;
				.zan{
					color: #AAAAAA;
				}
			}
		}
		.diagnosis-need{
			margin-top: 38rpx;
			width: 100%;
			height: 240rpx;
			border: 1rpx solid #AAAAAA;
			border-radius: 10rpx;
			padding: 21rpx;
			box-sizing: border-box;
		}
		.diagnosis-btn{
			margin-top: 38rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.diagnosis-btn-left{
				width: 280rpx;
				height: 78rpx;
				background: #BDBDBD;
				border-radius: 39rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 64rpx;
				}
			}
			.diagnosis-btn-right{
				width: 280rpx;
				height: 78rpx;
				background: #FF9000;
				border-radius: 39rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text{
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 64rpx;
				}
			}
		}
	}
	.placeholderStyle{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AAAAAA;
	}
	.nos{
		 overflow:hidden;
		 position:fixed;
		 left:0;
		 top:0;
	}
</style>
