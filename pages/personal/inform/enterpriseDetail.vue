<template>
	<view>
		<view class="header">
			<view class="nav" @click="clickBack">
				<image src="../../../static/enterprise/return.png"></image>
			</view>
			<view class="header-body">
				<text>东方邦信创投</text>
				<text>东方邦信创业投资有限公司是中国东方资产管理股份有限公司的主要子公司之一，注册资金5亿元。公司投资聚焦三大板块，即：民生板块、文化传媒板块、节能环保及新能源板块。</text>
			</view>
		</view>
		<view class="content">
			<view class="field">
				<text class="field-title">投资领域</text>
				<view class="field-body">
					<view class="field-body-item" v-for="(item, index) in investField" :key="index">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
			
			<view class="investNumber">
				<text>投资数量分布（起）</text>
				<investNumberBar class="investNumber-bar" :xData="ShowInvestNumberDataX" :yData="ShowInvestNumberDataY"></investNumberBar>
					<button class="investNumber-btn" @click="viewAllInvestNumber">
						<text>查看完整分布情况</text>
					</button>
			</view>
			
			<view class="investMoney">
				<text>投资金额分布（万元）</text>
				<investMoneyBar class="investMoney-bar" :xData="ShowInvestNumberDataX" :yData="ShowInvestNumberDataY"></investMoneyBar>
					<button class="investMoney-btn" @click="viewAllInvestMoney">
						<text>查看完整分布情况</text>
					</button>
			</view>
			
			<view class="eventTrend">
				<text>事件趋势</text>
				<eventTrendBar class="eventTrend-bar" :xData="eventTrendDataX" :yDataBar="eventTrendBarDataY" :yDataLine="eventTrendLineDataY"></eventTrendBar>
				<!-- <eventTrendBar></eventTrendBar> -->
			</view>
			
			<view class="investMoneyTrend">
				<text>投资额趋势</text>
				<investMoneyTrendBar class="investMoneyTrend-bar" :xData="investMoneyTrendDataX" :yDataBar="investMoneyTrendBarDataY" :yDataLine="investMoneyTrendLineDataY"></investMoneyTrendBar>
			</view>
			
			<view class="roundDistribution">
				<text>轮次分布</text>
				<roundDistributionBar class="roundDistribution-bar" :xData="ShowInvestNumberDataX" :yData="ShowInvestNumberDataY"></roundDistributionBar>
					<button class="roundDistribution-btn" @click="viewAllRoundDistribution">
						<text>查看完整分布情况</text>
					</button>
			</view>
			
			<view class="investMap">
				<text>重点投资地图（TOP5）</text>
				<!-- <roundDistributionBar class="roundDistribution-bar" :xData="ShowInvestNumberDataX" :yData="ShowInvestNumberDataY"></roundDistributionBar> -->
				<investMapPie class="investMap-pie" :investData="investMapData"></investMapPie>
			</view>
			
			<button class="delegation" @click="delegation">
				<text>委托对接</text>
			</button>
		</view>
		
		<!-- 遮罩层 -->
		<view class="mask" v-if="investNumberShow||investMoneyShow||roundDistributionShow"></view>
		<!-- 查看完整投资数量分布 -->
		<view class="dropList" v-if="investNumberShow">
			<view class="dropList-title">
				<text>投资数量分布（起）</text>
				<image @click="investNumberCloseDropList" src="../../../static/enterprise/cancel.png"></image>
			</view>
			<view class="dropList-body">
				<investNumberBar class="dropList-bar" :xData="investNumberDataX" :yData="investNumberDataY"></investNumberBar>
			</view>
		</view>
		<!-- 查看完整投资金额分布 -->
		<view class="dropList" v-if="investMoneyShow">
			<view class="dropList-title">
				<text>投资金额分布（万元）</text>
				<image @click="investMoneyCloseDropList" src="../../../static/enterprise/cancel.png"></image>
			</view>
			<view class="dropList-body">
				<investMoneyBar class="dropList-bar" :xData="investNumberDataX" :yData="investNumberDataY"></investMoneyBar>
			</view>
		</view>
		<!-- 查看完整轮数分布 -->
		<view class="dropList" v-if="roundDistributionShow">
			<view class="dropList-title">
				<text>轮次分布</text>
				<image @click="roundDistributionyCloseDropList" src="../../../static/enterprise/cancel.png"></image>
			</view>
			<view class="dropList-body">
				<roundDistributionBar class="dropList-bar" :xData="investNumberDataX" :yData="investNumberDataY"></roundDistributionBar>
			</view>
		</view>
		
		<!-- 委任对接对话框 -->
		<uni-popup id="delegationPopupDialog" ref="delegationPopupDialog" type="dialog">
			<uni-popup-dialog 
			type="info" 
			title="提示" 
			content="您是否想要委托园区帮您对接投资机构？"
			buttonLeftBgColor="#BDBDBD"
			buttonRightBgColor="#FF9000"
			textRightColor="#FFFFFF"
			title_left="取消"
			title_right="确定"
			:before-close="true" 
			@confirm="delegationConfirm" 
			@close="delegationClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import investNumberBar from '../../../components/bar/investNumberBar.vue'
	import investMoneyBar from '../../../components/bar/investMoneyBar.vue'
	import eventTrendBar from '../../../components/bar/eventTrendBar.vue'
	import investMoneyTrendBar from '../../../components/bar/investMoneyTrendBar.vue'
	import roundDistributionBar from '../../../components/bar/roundDistributionBar.vue'
	import investMapPie from '../../../components/bar/investMapPie.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components:{
			investNumberBar,
			investMoneyBar,
			eventTrendBar,
			investMoneyTrendBar,
			roundDistributionBar,
			investMapPie,
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				investNumberShow:false,
				investMoneyShow:false,
				roundDistributionShow:false,
				investField:['5G终端设备','5G文娱','5G教育','智能教育','无人机','磁体','微处理器','无人机','5G终端设备','硅钢','5G终端设备','5G文娱','5G教育','温湿度传感器'],
				// investNumberDataX: ['5G终端设备', '5G文娱', '5G教育', '5G交通运输', '5G金融', '智能教育', '无人机'],
				// investNumberDataY: [1746, 1326, 916, 696, 436, 376, 215],
				investNumberDataX: ['5G终端设备', '5G文娱', '5G教育', '5G交通运输', '5G金融', '智能教育', '无人机','5G终端设备', '5G文娱', '5G教育', '5G交通运输', '5G金融', '智能教育', '无人机','5G终端设备', '5G文娱', '5G教育', '5G交通运输', '5G金融', '智能教育', '无人机','5G终端设备', '5G文娱', '5G教育', '5G交通运输', '5G金融', '智能教育', '无人机'],
				investNumberDataY: [1746, 1326, 916, 696, 436, 376, 215,1746, 1326, 916, 696, 436, 376, 215,1746, 1326, 916, 696, 436, 376, 215,1746, 1326, 916, 696, 436, 376, 215],
				eventTrendDataX:['2015', '2016', '2017', '2018', '2019'],
				eventTrendBarDataY:[35, 70, 92, 79, 70],
				eventTrendLineDataY:[-1, -1.5, -2, -0.7, 1.5],
				investMoneyTrendDataX:['2015', '2016', '2017', '2018', '2019'],
				investMoneyTrendBarDataY:[35, 70, 92, 79, 70],
				investMoneyTrendLineDataY:[-1, -1.5, -2, -0.7, 1.5],
				investMapData:[
					{value: 5, name: '江苏省（5）'},
					{value: 4, name: '北京市（4）'},
					{value: 1, name: '广东省（1）'},
					{value: 4, name: '浙江省（4）'},
					{value: 3, name: '四川省（3）'}
				]
			}
		},
		methods: {
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			viewAllInvestNumber(){
				this.investNumberShow=true
			},
			investNumberCloseDropList(){
				this.investNumberShow=false
			},
			viewAllInvestMoney(){
				this.investMoneyShow=true
			},
			investMoneyCloseDropList(){
				this.investMoneyShow=false
			},
			viewAllRoundDistribution(){
				this.roundDistributionShow=true
			},
			roundDistributionyCloseDropList(){
				this.roundDistributionShow=false
			},
			// 委任对接
			delegation(){
				this.$refs.delegationPopupDialog.open()
			},
			delegationConfirm(done) {
				console.log('确定');
				// 需要执行 done 才能关闭对话框
				done()
			},
			/**
			 * 对话框取消按钮
			 */
			delegationClose(done) {
				console.log('取消');
				done()
			}
		},
		computed:{
			ShowInvestNumberDataX(){
				return this.investNumberDataX.slice(0,7)
			},
			ShowInvestNumberDataY(){
				return this.investNumberDataY.slice(0,7)
			}
		}
	}
</script>

<style scoped>
	.header{
		padding-left: 39rpx;
		padding-right: 39rpx;
		padding-bottom: 68rpx;
		padding-top: 66rpx;
		background: linear-gradient(-35deg, #1D54BC, #108CF5);
	}
	.nav{
		display:inline-flex;
		align-items: center;
		justify-content: center;
	}
	.nav image{
		width: 36rpx;
		height: 36rpx;
	}
	.header-body{
		margin-top: 34rpx;
	}
	.header-body text:nth-child(1){
		display: block;
		font-size: 40rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.header-body text:nth-child(2){
		margin-top: 34rpx;
		display: block;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 40rpx;
	}
	.content{
		position: relative;
		top: -30rpx;
		z-index:10;
		/* height: 1000rpx; */
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0rpx 0rpx;
		padding: 48rpx 0rpx 40rpx 0rpx;
	}
	.field .field-title{
		padding-left: 39rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
	}
	.field .field-body{
		padding-left: 39rpx;
		padding-right: 25rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.field-body .field-body-item{
		margin-top: 14rpx;
		margin-right: 14rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		border: 1rpx solid #BFBFBF;
		border-radius: 5rpx;
	}
	.field-body-item text{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
	}
	.investNumber{
		margin-top: 60rpx;
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
	.investNumber text:nth-child(1){
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
	}
	.investNumber-bar{
		margin-top: 44rpx;
		height: 332rpx;
		width: 100%;
	}
	.investNumber-btn{
		width: 350rpx;
		height: 72rpx;
		border: 1rpx solid #888888;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.investNumber-btn text:nth-child(1){
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	
	.investMoney{
		margin-top: 60rpx;
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
	.investMoney text:nth-child(1){
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
	}
	.investMoney-bar{
		margin-top: 44rpx;
		height: 332rpx;
		width: 100%;
	}
	.investMoney-btn{
		width: 350rpx;
		height: 72rpx;
		border: 1rpx solid #888888;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.investMoney-btn text:nth-child(1){
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	
	.eventTrend{
		margin-top: 60rpx;
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
	.eventTrend text:nth-child(1){
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
	}
	.eventTrend-bar{
		width: 100%;
		height: 500rpx;
	}
	
	.investMoneyTrend{
		/* margin-top: 60rpx; */
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
	.investMoneyTrend text:nth-child(1){
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
	}
	.investMoneyTrend-bar{
		width: 100%;
		height: 500rpx;
	}
	
	.roundDistribution{
		/* margin-top: 60rpx; */
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
	.roundDistribution text:nth-child(1){
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
	}
	.roundDistribution-bar{
		margin-top: 44rpx;
		height: 332rpx;
		width: 100%;
	}
	.roundDistribution-btn{
		width: 350rpx;
		height: 72rpx;
		border: 1rpx solid #888888;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.roundDistribution-btn text:nth-child(1){
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	
	.investMap{
		margin-top: 60rpx;
		padding-left: 39rpx;
		padding-right: 39rpx;
	}
	.investMap text:nth-child(1){
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #333333;
	}
	.investMap-pie{
		/* margin-top: 44rpx; */
		height: 332rpx;
		width: 100%;
	}
	
	.delegation{
		margin: 20rpx 39rpx 40rpx 39rpx;
		background: #2D6BDD;
		border-radius: 10rpx;
	}
	.delegation text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 26rpx;
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
	.dropList{
		width: 100%;
		/* height: 100%; */
		background: #FFFFFF;
		border-radius: 30rpx 30rpx 0px 0px;
		position: fixed;
		bottom: 0;
		z-index: 30;
	}
	.dropList-title{
		margin-top: 44rpx;
		margin-left: 39rpx;
		margin-right: 39rpx;
		display: flex;
		justify-content:space-between;
	}
	.dropList-title text{
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 42rpx;
	}
	.dropList-title image{
		width: 34rpx;
		height: 34rpx;
	}
	.dropList .dropList-body{
		margin-top: 40rpx;
		margin-left: 39rpx;
		margin-right: 39rpx;
	}
	.dropList-body .dropList-bar{
		height: 1200rpx;
		width: 100%;
	}
</style>
