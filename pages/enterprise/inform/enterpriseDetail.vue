<template>
	<view>
		<view class="header">
			<view class="nav" @click="clickBack">
				<image src="../../../static/enterprise/return.png"></image>
			</view>
			<view class="header-body">
				<text class="name">{{enterpriseName}}</text>
				<view class="box">
					<text>{{content}}</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="field">
				<text class="field-title">投资领域</text>
				<view class="field-body">
					<view :class="[isShowMore ? 'industry-box-unfold' : 'industry-box-fold']">
						<view class="field-body-item" v-for="(item, index) in investField" :key="index">
							<text>{{item}}</text>
						</view>
					</view>
					
					<view class="field-body-item" id="item-omit" @click="openPopList">
						<view id="omit"></view>
						<view id="omit"></view>
						<view id="omit"></view>
					</view>
				</view>
			</view>
			
			<view class="investNumber">
				<text>投资数量分布（起）</text>
				<view :prop="investNumberOption" :change:prop="echarts.updateEcharts" id="echarts1" class="echarts1"></view>
				<button class="investNumber-btn" @click="viewAllInvestNumber">
					<text>查看完整分布情况</text>
				</button>
			</view>
			
			<view class="investMoney">
				<text>投资金额分布（万元）</text>
				<view :prop="investMoneyOption" :change:prop="echarts.updateEcharts" id="echarts2" class="echarts2"></view>
				<button class="investMoney-btn" @click="viewAllInvestMoney">
					<text>查看完整分布情况</text>
				</button>
			</view>
			
			<view class="eventTrend">
				<text>事件趋势</text>
				<view :prop="eventTrendOption" :change:prop="echarts.updateEcharts" id="echarts3" class="echarts3"></view>
			</view>
			
			<view class="investMoneyTrend">
				<text>投资额趋势</text>
				<view :prop="investMoneyTrendOption" :change:prop="echarts.updateEcharts" id="echarts4" class="echarts4"></view>
			</view>
			
			<view class="roundDistribution">
				<text>轮次分布</text>
				<view :prop="roundDistributionOption" :change:prop="echarts.updateEcharts" id="echarts5" class="echarts5"></view>
				<button class="roundDistribution-btn" @click="viewAllRoundDistribution">
					<text>查看完整分布情况</text>
				</button>
			</view>
			
			<view class="investMap">
				<text>重点投资地图（TOP5）</text>
				<view :prop="investMapOption" :change:prop="echarts.updateEcharts" id="echarts6" class="echarts6"></view>
			</view> 
			
			<button class="delegation" @click="delegation">
				<text>委托对接</text>
			</button>
			<!-- <investNumberBar :option="investNumberOption"  style="height: 300px;"></investNumberBar> -->
		</view>
		
		<!-- 遮罩层 -->
		<view class="mask" v-if="investNumberShow||investMoneyShow||roundDistributionShow"></view>
		<!-- 查看完整投资数量分布 -->
		<view class="dropList" v-show="investNumberShow">
			<view class="dropList-title">
				<text>投资数量分布（起）</text>
				<image @click="investNumberCloseDropList" src="../../../static/enterprise/cancel.png"></image>
			</view>
			<view class="dropList-body">
				<view :prop="allInvestNumberOption" :change:prop="echarts.updateEcharts" id="echartsAll1" class="dropList-bar"></view>
			</view>
		</view> -->
		<!-- 查看完整投资金额分布 -->
		<view class="dropList" v-show="investMoneyShow">
			<view class="dropList-title">
				<text>投资金额分布（万元）</text>
				<image @click="investMoneyCloseDropList" src="../../../static/enterprise/cancel.png"></image>
			</view>
			<view class="dropList-body">
				<view :prop="allInvestMoneyOption" :change:prop="echarts.updateEcharts" id="echartsAll2" class="dropList-bar"></view>
			</view>
		</view>
		<!-- 查看完整轮数分布 -->
		<view class="dropList" v-show="roundDistributionShow">
			<view class="dropList-title">
				<text>轮次分布</text>
				<image @click="roundDistributionyCloseDropList" src="../../../static/enterprise/cancel.png"></image>
			</view>
			<view class="dropList-body">
				<view :prop="allRoundDistributionOption" :change:prop="echarts.updateEcharts" id="echartsAll3" class="dropList-bar"></view>
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
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import * as echarts from 'echarts/core';
	import {
	    GridComponent,
		LegendComponent
	} from 'echarts/components';
	import {
	    BarChart,
		LineChart,
		PieChart
	} from 'echarts/charts';
	import {
	    CanvasRenderer
	} from 'echarts/renderers';
	
	echarts.use(
	    [GridComponent, LegendComponent, PieChart, BarChart, LineChart, CanvasRenderer]
	);
	export default {
		components:{
			uniPopup,
			uniPopupDialog
		},
		data() {
			return {
				isShowMore:false,
				investNumberShow:false,
				investMoneyShow:false,
				roundDistributionShow:false,
				enterpriseName:'',
				content:'',
				investField:[],
				
				investNumberDataX: [],
				investNumberDataY: [],
				
				investMoneyDataX: [],
				investMoneyDataY: [],
				
				eventTrendDataX:[],
				eventTrendDataY1: [],
				eventTrendDataY2: [],
				
				investMoneyTrendDataX: [],
				investMoneyTrendDataY1: [],
				investMoneyTrendDataY2: [],
				
				roundDistributionDataX: [],
				roundDistributionDataY: [],
				
				investMapData: [
								// {value: 5, name: '江苏省（5）'},
								// {value: 4, name: '北京市（4）'},
								// {value: 1, name: '广东省（1）'},
								// {value: 4, name: '浙江省（4）'},
								// {value: 3, name: '四川省（3）'}
							],
				investNumberOption : {},
				allInvestNumberOption : {},
				investMoneyOption : {},
				allInvestMoneyOption : {},
				eventTrendOption : {},
				investMoneyTrendOption : {},
				roundDistributionOption : {},
				allRoundDistributionOption : {},
				investMapOption : {},
				pkid:0,
				title:'',
				companyId:0,
				parkId:0,
				memberId: 0
			}
		},
		onLoad(option) {
			let _this = this
			let obj = JSON.parse(option.obj)
			console.log(obj)
			_this.pkid = obj.pkid
			_this.title = obj.companyTitle
			_this.companyId = obj.companyId
			_this.memberId = _this.$store.state.id
			if(_this.$store.state.kind==='0'){
				_this.parkId = _this.$store.state.enterpriseInfo.parkId
			}
			else{
				_this.parkId = _this.$store.state.userInfo.parkId
			}
			_this.$request({
				url:'/noticeService/mechanismDetail',
				data:{
					companyId: _this.companyId,
					pkid: _this.pkid
				}
			}).then(res=>{
				let data = res[1].data.data
				console.log(data)
				_this.enterpriseName = data.title
				_this.content = data.content
				// _this.investField = data.InvestmentField
				let investNumberObjList =[]
				let investMoneyObjList = []
				for(let i = 0; i< data.InvestmentField.length; i++){
					_this.investField.push(data.InvestmentField[i].title)
					let investNumberObj = {
						name: data.InvestmentField[i].title,
						value: Number(data.InvestmentField[i].events)
					}
					let investMoneyObj = {
						name: data.InvestmentField[i].title,
						value: Number(data.InvestmentField[i].money/10000)
					}
					investNumberObjList.push(investNumberObj)
					investMoneyObjList.push(investMoneyObj)
					
				}
				investNumberObjList = investNumberObjList.sort(function(a,b){return a.value-b.value})
				investMoneyObjList = investMoneyObjList.sort(function(a,b){return a.value-b.value})
				for(let i = 0; i<investNumberObjList.length;i++){
					_this.investNumberDataX.push(investNumberObjList[i].name)
					_this.investNumberDataY.push(investNumberObjList[i].value)
				}
				for(let i = 0; i<investMoneyObjList.length;i++){
					_this.investMoneyDataX.push(investMoneyObjList[i].name)
					_this.investMoneyDataY.push(investMoneyObjList[i].value)
				}
				console.log(investNumberObjList)
				console.log(investMoneyObjList)
				_this.$request({
					url:'/noticeService/trend',
					data:{
						pkid: _this.pkid
					}
				}).then(res=>{
					let data2 = res[1].data.data
					let moneyData = data2.moneylist
					let eventData = data2.eventslist
					console.log(data2)
					_this.investMoneyTrendDataX = moneyData.time
					_this.eventTrendDataX = eventData.time
					for(let i = 0; i<moneyData.money.length;i++){
						_this.investMoneyTrendDataY1.push(moneyData.money[i]/10000)
						_this.investMoneyTrendDataY2.push(moneyData.moneyGrowthrate[i])
					}
					for(let i = 0; i<eventData.events.length;i++){
						_this.eventTrendDataY1.push(eventData.events[i])
						_this.eventTrendDataY2.push(eventData.eventsGrowthrate[i])
					}
					_this.$request({
						url:'/noticeService/distributionCon',
						data:{
							pkid: _this.pkid
						}
					}).then(res=>{
						let data3 = res[1].data.data
						console.log(data3)
						let regional = data3.regional
						let round = data3.round
						let roundObjList = []
						for(let i = 0; i<round.length; i++){
							let roundObj = {
								name: round[i].name,
								value: Number(round[i].value)
							}
							roundObjList.push(roundObj)
						}
						roundObjList = roundObjList.sort(function(a,b){return a.value-b.value})
						for(let i = 0; i<roundObjList.length;i++){
							_this.roundDistributionDataX.push(roundObjList[i].name)
							_this.roundDistributionDataY.push(roundObjList[i].value)
						}
						
						for(let i = 0; i<regional.length; i++){
							let regionalObj ={
								value: Number(regional[i].value),
								name: regional[i].name+'（'+regional[i].value+'）' 
							}
							_this.investMapData.push(regionalObj)
						}
						// console.log(_this.investField)
						// console.log(_this.eventTrendDataX)
						// console.log(_this.eventTrendDataY1)
						// console.log(_this.eventTrendDataY2)
						// console.log(_this.investMoneyTrendDataX)
						// console.log(_this.investMoneyTrendDataY1)
						// console.log(_this.investMoneyTrendDataY2)
						// console.log(_this.roundDistributionDataX)
						// console.log(_this.roundDistributionDataY)
						// console.log(_this.investMapData)
						_this.setOption()
					}).catch(err=>{
						console.log(err)
					})
				}).catch(err=>{
					console.log(err)
				})
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {	
			setOption(){
				this.investNumberOption = {
					grid: {
						left: '0%',
						// right: '0%',
						top: '0%',
						bottom:'0%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						// boundaryGap: [0, 0.01],
						show:false
					},
					yAxis: {
						type: 'category',
						data: this.investNumberDataX.slice(-7),
						axisLabel: {
								show: true,
								color: '#777777',
								fontSize: 11,
							},
							axisTick: {
								show: false
							},
							axisLine: {
								show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
							}
					},
					series: [
					{
						type: 'bar',
						data: this.investNumberDataY.slice(-7),
						// barWidth:9, 		//无法同时设置宽度和间距
						barCategoryGap:'60%',
						label: {
								show: true,
								formatter:function(params){ //标签内容
									return params.value
								},
								position: 'right',
								fontSize: 11,
								color:'#777777'
						},
						itemStyle: {
								borderRadius:[0, 9, 9, 0],
								// color:'#7466CC'
								color: new echarts.graphic.LinearGradient(
												1, 0, 0, 1,
												[
													{offset: 0, color: '#7466CC'},
													{offset: 1, color: '#AD85FF'}
												]
								)
						},
					}	
					]
				},
				this.allInvestNumberOption = {
					grid: {
						left: '0%',
						// right: '0%',
						top: '0%',
						bottom:'0%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						// boundaryGap: [0, 0.01],
						show:false
					},
					yAxis: {
						type: 'category',
						data: this.investNumberDataX,
						axisLabel: {
								show: true,
								color: '#777777',
								fontSize: 11,
							},
							axisTick: {
								show: false
							},
							axisLine: {
								show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
							}
					},
					series: [
						{
							type: 'bar',
							data: this.investNumberDataY,
							// barWidth:9, 		//无法同时设置宽度和间距
							barCategoryGap:'60%',
							label: {
									show: true,
									formatter:function(params){ //标签内容
										return params.value
									},
									position: 'right',
									fontSize: 11,
									color:'#777777'
							},
							itemStyle: {
									borderRadius:[0, 9, 9, 0],
									// color:'#7466CC'
									color: new echarts.graphic.LinearGradient(
													1, 0, 0, 1,
													[
														{offset: 0, color: '#7466CC'},
														{offset: 1, color: '#AD85FF'}
													]
									)
							},
						}	
					]
				},
				this.investMoneyOption = {
				    grid: {
				        left: '0%',
				        // right: '0%',
				        top: '0%',
						bottom:'0%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				        // boundaryGap: [0, 0.01],
						show:false
				    },
				    yAxis: {
				        type: 'category',
						data: this.investMoneyDataX.slice(-7),
						axisLabel: {
						        show: true,
								color: '#777777',
								fontSize: 11,
						    },
						    axisTick: {
						        show: false
						    },
						    axisLine: {
						        show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
						    }
				    },
				    series: [
				        {
				            type: 'bar',
							data: this.investMoneyDataY.slice(-7),
							// barWidth:9, 		//无法同时设置宽度和间距
							barCategoryGap:'60%',
							label: {
									show: true,
									formatter:function(params){ //标签内容
										return params.value
									},
									position: 'right',
									fontSize: 11,
									color:'#777777'
							},
							itemStyle: {
									borderRadius:[0, 9, 9, 0],
									// color:'#7466CC'
									color: new echarts.graphic.LinearGradient(
													1, 0, 0, 1,
													[
														{offset: 0, color: '#3C77E6'},
														{offset: 1, color: '#01B4FF'}
													]
									)
							},
						}	
				    ]
				},
				this.allInvestMoneyOption = {
				    grid: {
				        left: '0%',
				        // right: '0%',
				        top: '0%',
						bottom:'0%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				        // boundaryGap: [0, 0.01],
						show:false
				    },
				    yAxis: {
				        type: 'category',
						data: this.investMoneyDataX,
						axisLabel: {
						        show: true,
								color: '#777777',
								fontSize: 11,
						    },
						    axisTick: {
						        show: false
						    },
						    axisLine: {
						        show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
						    }
				    },
				    series: [
				        {
				            type: 'bar',
							data: this.investMoneyDataY,
							// barWidth:9, 		//无法同时设置宽度和间距
							barCategoryGap:'60%',
							label: {
									show: true,
									formatter:function(params){ //标签内容
										return params.value
									},
									position: 'right',
									fontSize: 11,
									color:'#777777'
							},
							itemStyle: {
									borderRadius:[0, 9, 9, 0],
									// color:'#7466CC'
									color: new echarts.graphic.LinearGradient(
													1, 0, 0, 1,
													[
														{offset: 0, color: '#3C77E6'},
														{offset: 1, color: '#01B4FF'}
													]
									)
							},
						}	
				    ]
				},
				this.eventTrendOption = {
					grid: {
						left: '0%',
						right: 20,
						top: 20,
						bottom:60,
						containLabel: true
					},
					legend: {
						data: ['融资事件（起）', '增速'],
						// y:'right',     //可设定图例在上、下、居中
						bottom:20
					},
					xAxis: [
						{
							type: 'category',
							data: this.eventTrendDataX,
							axisPointer: {
								type: 'shadow'
							},
							axisTick: {
								show: false
							},
							axisLine: {
								show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							min: 0,
							max: 100,
							interval: 20,
							axisLine: {
								show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
							}
						},
						{
							type: 'value',
							min: -8,
							max: 8,
							interval: 1,
							axisLine: {
								show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
							}
						}
					],
					series: [
						{
							name: '融资事件（起）',
							type: 'bar',
							data: this.eventTrendDataY1,
							// barWidth:9, 		//无法同时设置宽度和间距
							barCategoryGap:'90%',
							label: {
									show: true,
									formatter:function(params){ //标签内容
										return  params.value
									},
									position: 'top',
									fontSize: 11,
									color:'#777777'
							},
							itemStyle: {
									borderRadius:[9, 9, 0, 0],
									color: new echarts.graphic.LinearGradient(
													0, 1, 0, 0,
													[
														{offset: 0, color: '#0086C5'},
														{offset: 1, color: '#2CD7FC'}
													]
									)
							},
						},
						{
							name: '增速',
							type: 'line',
							yAxisIndex: 1,
							data: this.eventTrendDataY2,
							itemStyle: {
								color: '#FFB922'
							},
						}
					]
				},
				this.investMoneyTrendOption = {
					grid: {
					    left: '0%',
					    // right: 20,
					    top: 20,
						bottom:60,
					    containLabel: true
					},
					legend: {
						data: ['融资金额（万元）', '增速'],
						// y:'right',     //可设定图例在上、下、居中
						bottom:20
					},
					xAxis: [
						{
							type: 'category',
							data: this.investMoneyTrendDataX,
							axisPointer: {
								type: 'shadow'
							},
							axisTick: {
								show: false
							},
							axisLine: {
								show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							min: 0,
							max: 100,
							interval: 20,
							axisLine: {
								show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
							}
						},
						{
							type: 'value',
							min: -8,
							max: 8,
							interval: 1,
							axisLine: {
								show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
							}
						}
					],
					series: [
						{
							name: '融资金额（万元）',
							type: 'bar',
							data: this.investMoneyTrendDataY1,
							// barWidth:9, 		//无法同时设置宽度和间距
							barCategoryGap:'90%',
							label: {
									show: true,
									formatter:function(params){ //标签内容
										return  params.value
									},
									position: 'top',
									fontSize: 11,
									color:'#777777'
							},
							itemStyle: {
									borderRadius:[9, 9, 0, 0],
									color: new echarts.graphic.LinearGradient(
													0, 1, 0, 0,
													[
														{offset: 0, color: '#00A197'},
														{offset: 1, color: '#00E1D4'}
													],
									)
							},
						},
						{
							name: '增速',
							type: 'line',
							yAxisIndex: 1,
							data: this.investMoneyTrendDataY2,
							// data:this.yDataLine,
							itemStyle: {
								color: '#FFB922'
							},
						}
					]
				},

				this.roundDistributionOption = {
				    grid: {
				        left: '0%',
				        // right: '20%',
				        top: '0%',
				        bottom:'0%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
						show:false
				    },
				    yAxis: {
				        type: 'category',
						data: this.roundDistributionDataX.slice(-7),
						axisLabel: {
						        show: true,
								color: '#777777',
								fontSize: 11,
						    },
						    axisTick: {
						        show: false
						    },
						    axisLine: {
						        show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
						    }
				    },
				    series: [
				        {
				            type: 'bar',
							data: this.roundDistributionDataY.slice(-7),
							// barWidth:9, 		//无法同时设置宽度和间距
							barCategoryGap:'60%',
							label: {
									show: true,
									formatter:function(params){ //标签内容
										return params.value
									},
									position: 'right',
									fontSize: 11,
									color:'#777777'
							},
							itemStyle: {
									borderRadius:[0, 9, 9, 0],
									// color:'#7466CC'
									color: new echarts.graphic.LinearGradient(
													1, 0, 0, 1,
													[
														{offset: 0, color: '#E0A13D'},
														{offset: 1, color: '#FFCD48'}
													]
									)
							},
						}	
				    ]
				},
				this.allRoundDistributionOption = {
				    grid: {
				        left: '0%',
				        // right: '20%',
				        top: '0%',
						bottom:'0%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'value',
				        // boundaryGap: [0, 0.01],
						show:false
				    },
				    yAxis: {
				        type: 'category',
						data: this.roundDistributionDataX,
						axisLabel: {
						        show: true,
								color: '#777777',
								fontSize: 11,
						    },
						    axisTick: {
						        show: false
						    },
						    axisLine: {
						        show: true,
								style:{
									width:1,
									color:'#BBBBBB'
								}
						    }
				    },
				    series: [
				        {
				            type: 'bar',
							data: this.roundDistributionDataY,
							// barWidth:9, 		//无法同时设置宽度和间距
							barCategoryGap:'60%',
							label: {
									show: true,
									formatter:function(params){ //标签内容
										return params.value
									},
									position: 'right',
									fontSize: 11,
									color:'#777777'
							},
							itemStyle: {
									borderRadius:[0, 9, 9, 0],
									// color:'#7466CC'
									color: new echarts.graphic.LinearGradient(
													1, 0, 0, 1,
													[
														{offset: 0, color: '#E0A13D'},
														{offset: 1, color: '#FFCD48'}
													]
									)
							},
						}	
				    ]
				},
				this.investMapOption = {
					grid: {
						// left:0,
						// right:0,
						// top:0,
						// bottom:0,
						containLabel: true
					},
					legend: {
						orient: 'vertical',
						left: 'right',
						top: 'center',
						bottom:'bottom'
						// right:'10%',
						// orient: 'vertical',
					},
					series: [
						{
							type: 'pie',
							center:['30%', '50%'],
							radius: ['20%', '60%'],
							avoidLabelOverlap: false,
							itemStyle: {
								// borderRadius: 10,
								borderColor: '#fff',
								borderWidth: 2
							},
							label: {
								show: true,
								formatter:function(params){ //标签内容
									return params.value+params.percent
								},
								position: 'inner',
								fontSize: 11,
								color:'#FFFFFF'
							},
							emphasis: {
							   scale:false
							},
							labelLine: {
								show: false
							},
							data: this.investMapData
						}
					]
				}
			},
			clickBack(){
				uni.navigateBack({
					delta:1
				})
			},
			openPopList(){
				this.isShowMore = !this.isShowMore
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
				let _this = this
				_this.$request({
					url:'/noticeService/addEntrust',
					data:{
						parkId: _this.parkId,
						pkid: _this.pkid,
						companyId:	_this.companyId,
						memberId: _this.memberId,
						companytitle: _this.title
					}
				}).then(res=>{
					let data = res[1].data
					console.log(data)
				}).catch(err=>{
					console.log(err)
				})
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
		}
	}
</script>

<script module="echarts" lang="renderjs">
	import * as echarts from 'echarts';//整体引用
	let myChart1,myChartAll1,myChart2,myChartAll2,myChart3,myChart4,myChart5,myChart6,myChartAll3
	export default {
		mounted() {
			setTimeout(()=>{
				this.initEcharts()
			},500)
		},
		methods: {
			initEcharts () {
				//投资数量分布
				function formatter(params){ //标签内容
						let str=''
						let number = params.value
						while(number > 1000){
							if(number%1000 == 0){
								str = '000' + str
								number = parseInt(number/1000)
							}
							else{
								str = String(number%1000) + str
								number = parseInt(number/1000)
							}
							  str = ',' + str
						}
						str = String(number) + str
						return str
				};
				myChart1 = echarts.init(document.getElementById('echarts1'))
				this.investNumberOption.series[0].label.formatter=formatter
				myChart1.setOption(this.investNumberOption);
				
				//完整投资数量分布
				myChartAll1 = echarts.init(document.getElementById('echartsAll1'))
				this.allInvestNumberOption.series[0].label.formatter=formatter
				myChartAll1.setOption(this.allInvestNumberOption);
				
				//投资金额分布
				myChart2 = echarts.init(document.getElementById('echarts2'))
				this.investMoneyOption.series[0].label.formatter=formatter
				myChart2.setOption(this.investMoneyOption);
				
				// 完整投资金额分布
				myChartAll2 = echarts.init(document.getElementById('echartsAll2'))
				this.allInvestMoneyOption.series[0].label.formatter=formatter
				myChartAll2.setOption(this.allInvestMoneyOption);
				
				// 事件趋势
				myChart3 = echarts.init(document.getElementById('echarts3'))
				myChart3.setOption(this.eventTrendOption);
				
				// 投资额趋势
				myChart4 = echarts.init(document.getElementById('echarts4'))
				myChart4.setOption(this.investMoneyTrendOption);
				
				//轮次分布	
				// function sum(arr){
				// 	let result = 0
				// 	for (let i=0;i<arr.length;i++){
				// 		result=result+arr[i]
				// 	}
				// 	return result
				// };
				// var dataSum = sum(this.investMapData)
				function roundDistributionFormatter(params){ //标签内容
					let str=''
					let number = params.value
					while(number > 1000){
					    if(number%1000 == 0){
					        str = '000' + str
					        number = parseInt(number/1000)
					    }
					    else{
					        str = String(number%1000) + str
					        number = parseInt(number/1000)
					    }
					      str = ',' + str
					} 
					str = String(number) + str
					return str
					// return  str + '(' + String(dataSum)+'%' + ')'
				};
				myChart5 = echarts.init(document.getElementById('echarts5'))
				this.roundDistributionOption.series[0].label.formatter=roundDistributionFormatter
				myChart5.setOption(this.roundDistributionOption);
				
				//完整轮次分布
				myChartAll3 = echarts.init(document.getElementById('echartsAll3'))
				this.allRoundDistributionOption.series[0].label.formatter=roundDistributionFormatter
				myChartAll3.setOption(this.allRoundDistributionOption);
				
				//重点投资地图（饼状图）
				function pieFormatter(params){ //标签内容
					return params.percent+"%"
				};
				myChart6 = echarts.init(document.getElementById('echarts6'))
				this.investMapOption.series[0].label.formatter=pieFormatter
				myChart6.setOption(this.investMapOption);
			}
		}
	}
</script>

<style scoped>
	.header{
		position: fixed;
		width: 100%;
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
		padding-bottom: 100rpx;
	}
	.header-body .name{
		display: block;
		font-size: 40rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}
	.box{
		overflow: scroll;
		height: 200rpx;
	}
	.box text{
		margin-top: 34rpx;
		display: block;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 40rpx;
	}
	.content{
		position: absolute;
		overflow: scroll;
		top: 420rpx;
		bottom: 0;
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
		/* flex-direction: row;
		flex-wrap: wrap; */
	}
	.industry-box-fold{
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		height: 62rpx;
		overflow: hidden;
	}
	.industry-box-unfold{
		flex: 1;
		display: flex;
		flex-wrap: wrap;
	}
	.field-body .field-body-item{
		margin-top: 14rpx;
		height: 48rpx;
		margin-right: 14rpx;
		padding-left: 15rpx;
		padding-right: 15rpx;
		border: 1rpx solid #BFBFBF;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
	}
	.field-body-item text{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #777777;
	}
	#item-omit{
		display: flex;
		justify-content: flex-end;
	}
	#omit{
		width: 6rpx;
		height: 6rpx;
		background: #B2B2B2;
		border-radius: 50%;
		margin-right: 2rpx;
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
	.echarts1{
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
	.echarts2{
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
	.echarts3{
		width: 100%;
		height: 700rpx;
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
	.echarts4{
		width: 100%;
		height: 700rpx;
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
	.echarts5{
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
	.echarts6{
		/* margin-top: 44rpx; */
		height: 900rpx;
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
		overflow: scroll;
		height: 1200rpx;
		width:750rpx;
	}
</style>
